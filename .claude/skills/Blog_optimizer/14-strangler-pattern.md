# Breaking the Monolith: Strangler Pattern for Microservices

## Promise
Rewriting a monolith is the graveyard of software projects. You try to decompose everything at once, break dependencies, discover undocumented behavior, and six months later you're 20% complete. The strangler pattern fixes this: you don't rewrite the monolith, you gradually strangle it. Instead of a risky big-bang rewrite, you extract services one piece at a time while the monolith stays alive and serving customers. You'll leave understanding how to decompose systematically, route traffic to new services, and rollback instantly if something breaks.

## Why This Matters

Monolith rewrites fail more often than they succeed. Netscape, Friendster, and countless startups attempted complete rewrites and lost market share to competitors. Meanwhile, teams using the strangler pattern (Amazon, Netflix, Uber in early days) decomposed safely while shipping new features. The difference isn't engineering skill—it's accepting that the old system is staying (for now) and planning accordingly.

## 1. The Strangler Pattern Concept

**The Idea**
Instead of replacing the monolith, gradually route traffic to new services. Old code dies slowly, not instantly.

```
Timeline:

Month 1: Create new service (payment)
         Route 5% of payment traffic → new service
         95% still goes to monolith
         Monitor for bugs

Month 2: Route 25% to new service
         All metrics green, no incidents

Month 3: Route 50% to new service
         Load test passing

Month 4: Route 100% to new service
         Monolith no longer handles payments

Month 5: Delete payment code from monolith
         Monolith is simpler, more focused
```

**Why It Works**
- You have a rollback (just route traffic back to monolith)
- You discover integration issues early with small percentages
- Old system stays stable while new system proves itself
- No big bang cutover where everything breaks

## 2. Choosing What to Strangle First

Not all services are good first candidates.

**Good Candidates (Strangle These First)**
- Independent subsystems with clear boundaries
- Services not heavily entangled with core business logic
- Services that have performance issues (new service can be optimized)
- Services that change frequently (you can iterate faster)

Example: Notifications service
```
Current: monolith handles emails, SMS, push notifications
Entanglement: Low (notifications are fire-and-forget)
Dependencies: Monolith sends notifications to a queue. Extracted service reads queue.
Rollback: If new service fails, monolith falls back to old code
```

**Bad Candidates (Don't Strangle These First)**
- Services tightly coupled to core business logic
- Services with complex state and transactions
- Services you don't understand yet
- Services that rarely change

Example: User authentication
```
Current: Authentication tightly woven throughout monolith
Entanglement: Very high (every request checks permissions)
Risk: High (if auth breaks, entire system down)
Interdependencies: 50+ code paths depend on auth behavior
```

Skip auth for now. Choose something simpler to extract first. Build the muscle.

## 3. The Technical Pattern: Routing Layer

**How Traffic Gets Routed**

```
Client Request
    ↓
API Gateway (new component!)
    ↓
Is this a "strangle service" request?
    ├─ Yes → Route to new service
    │        (e.g., /payments → new payment service)
    │
    └─ No  → Route to monolith (old service)
             (e.g., /users → monolith)

Response returned to client
```

**Implementation with a Reverse Proxy (nginx)**

```nginx
# nginx.conf
upstream monolith {
    server monolith.internal:3000;
}

upstream payment_service {
    server payment-service.internal:3001;
}

server {
    listen 80;
    server_name api.example.com;

    # Route /payments traffic to new service (10% initially)
    location /payments {
        # 90% to monolith, 10% to new service
        if ($random < 10) {
            proxy_pass http://payment_service;
        }
        proxy_pass http://monolith;
    }

    # All other traffic goes to monolith
    location / {
        proxy_pass http://monolith;
    }
}
```

**Implementation with Feature Flags (Flexible)**

```python
from flask import Flask, request
import json

app = Flask(__name__)

# Configuration: which services to strangle
STRANGLED_SERVICES = {
    'payments': {
        'enabled': True,
        'traffic_percentage': 10,  # 10% to new service
        'service_url': 'http://payment-service:3001'
    },
    'notifications': {
        'enabled': True,
        'traffic_percentage': 50,  # 50% to new service
        'service_url': 'http://notification-service:3002'
    }
}

@app.route('/payments', methods=['POST'])
def create_payment():
    config = STRANGLED_SERVICES['payments']

    if config['enabled'] and should_route_to_new_service(config['traffic_percentage']):
        # Route to new service
        response = requests.post(
            config['service_url'] + '/payments',
            json=request.json,
            timeout=5
        )
        return response.json()
    else:
        # Route to monolith (old code)
        return old_monolith_create_payment(request.json)

def should_route_to_new_service(percentage):
    """Deterministically route based on user ID"""
    user_id = request.json.get('user_id', '')
    user_hash = hash(user_id) % 100
    return user_hash < percentage
```

This approach:
- Routes a percentage of traffic (deterministically by user_id)
- Lets you adjust percentages without code changes
- Easy to disable if the new service breaks

## 4. Data Consistency: The Hard Part

**The Problem**
Monolith and new service have different databases. When you update one, the other is out of sync.

```
Request arrives at API Gateway

Route to new payment service:
  1. Save order to new database
  2. Return response
  3. Monolith still doesn't know about order ❌

Route to monolith:
  1. Save order to monolith database
  2. Return response
  3. New service doesn't know about order ❌
```

**Solution 1: Event Log (Recommended)**

Both systems read from a shared event log. Changes are published, not pushed.

```
Monolith creates order:
  1. Write order to monolith DB
  2. Publish "OrderCreated" event to event log
  ↓
Payment service subscribes to "OrderCreated" event:
  1. Receives event
  2. Creates order in new DB
  3. Both systems in sync (eventually)
```

**Implementation**

```python
# In monolith
@app.post("/orders")
def create_order(data):
    # Save to monolith DB
    order = monolith_db.orders.insert(data)

    # Publish event (to Kafka, RabbitMQ, or event log)
    event_publisher.publish('OrderCreated', {
        'order_id': order['id'],
        'user_id': order['user_id'],
        'amount': order['amount']
    })

    return order

# In new payment service
def listen_for_events():
    """Subscribe to OrderCreated events"""
    for event in event_subscriber.listen('OrderCreated'):
        # Mirror to new database
        payment_db.orders.insert({
            'order_id': event['order_id'],
            'user_id': event['user_id'],
            'amount': event['amount'],
            'status': 'pending'
        })
```

**Solution 2: Two-Phase Writes (More Complex)**

When routing traffic, write to both systems.

```python
@app.post("/payments")
def create_payment():
    data = request.json

    if should_route_to_new_service():
        # Write to new service
        response = requests.post(
            'http://payment-service:3001/payments',
            json=data
        )
        # Also write to monolith for safety (backup)
        monolith_db.payments.insert(data)
        return response
    else:
        # Write to monolith
        result = monolith_db.payments.insert(data)
        # Also write to new service for sync
        requests.post('http://payment-service:3001/payments', json=data)
        return result
```

This is more synchronous but guarantees both systems have the data.

## 5. Testing the New Service Before Going Live

**Shadow Traffic (Safest Method)**

Route real traffic to new service but discard the response. Use monolith response.

```python
@app.post("/payments")
def create_payment():
    data = request.json
    monolith_response = monolith_create_payment(data)

    if SHADOW_TRAFFIC_ENABLED:
        # Send request to new service in background
        # If it errors, log it but don't break user experience
        try:
            new_service_response = requests.post(
                'http://payment-service:3001/payments',
                json=data,
                timeout=5
            )
            # Compare responses (should be same)
            if monolith_response != new_service_response:
                logger.warning(f"Response mismatch: {monolith_response} vs {new_service_response}")
        except Exception as e:
            logger.error(f"New service error (shadowed): {e}")

    return monolith_response  # Always use monolith response
```

Benefits:
- Real traffic, real load
- No risk (monolith always wins)
- Discover bugs before routing live traffic
- Build confidence in new service

## 6. Monitoring the Strangling Process

**Critical Metrics**

```
For each strangled service, track:

1. Error rate
   Old service error rate: 0.5%
   New service error rate: 0.6%
   ✓ Similar (good)

2. Latency (p50, p95, p99)
   Old service p95: 200ms
   New service p95: 150ms
   ✓ Faster (good)

3. Traffic percentage routed
   Currently routing 25% to new service
   Plan: 50% next week

4. Rollback frequency
   We've rolled back once (bug found, fixed, re-enabled)
```

**Example Dashboard**

```
Payment Service Strangling Status:

Traffic Routed: 25% (target: 100%)
    Old Service: 75%
    New Service: 25%

Errors:
    Old Service: 0.5% (5 errors / 1000 requests)
    New Service: 0.4% (1 error / 250 requests)

Latency (p95):
    Old Service: 200ms
    New Service: 150ms

Rollbacks: 0 (never had to disable)

Next Steps: Increase to 50% next Monday
```

## 7. Rollback: Always Have an Exit

**Instant Rollback**

```python
# Feature flag in config file
STRANGLED_SERVICES = {
    'payments': {
        'enabled': False,  # ← Just set this to False
        'traffic_percentage': 0  # New service is disabled
    }
}

# OR via API
curl -X POST http://admin-api:3000/disable-strangled-service/payments

# All traffic instantly goes back to monolith
# Users see no downtime
```

**Rollback Checklist**
- [ ] Disable the feature flag (30 seconds)
- [ ] Verify traffic is back to monolith (30 seconds)
- [ ] Check error rates returning to normal (1 minute)
- [ ] Investigate what went wrong (while service is stable)

## Concrete Action Steps

1. **This week:** Audit your monolith. Map all services. Identify a good first candidate to strangle (something independent, low-risk).
2. **Next week:** Design the new service. Plan the routing layer (nginx or feature flags).
3. **Week 3:** Build shadow traffic testing. Route real traffic to new service, discard responses.
4. **Week 4:** Test with small percentage (5%). Monitor errors and latency.
5. **Week 5:** Gradually increase percentage (10% → 25% → 50% → 100%) based on metrics.
6. **Week 6:** Completely route traffic to new service.
7. **Week 7:** Remove old code from monolith.

Then repeat. One service at a time. The monolith shrinks gradually while staying alive.

## Resources

- [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Microservices Migration with Strangler Pattern](https://aws.amazon.com/blogs/devops/strangler-pattern-microservices-migration/)
- [Feature Flags for Safe Rollout](https://www.split.io/glossary/feature-flag-best-practices/)
- [Event Sourcing for Data Sync](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Kafka for Event Streaming](https://kafka.apache.org/intro)
- [Testing Microservices in Production](https://www.oreilly.com/library/view/testing-microservices/9781491995259/)
