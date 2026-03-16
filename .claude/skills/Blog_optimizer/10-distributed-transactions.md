# Distributed Transactions: Sagas vs Two-Phase Commit

## Promise
Distributed systems break traditional database transactions. When you split an order across microservices—payment service, inventory service, shipping service—you can't wrap it in a single transaction. One service succeeds, another fails, and you're left with inconsistent data. The result: double-charged customers, phantom orders, inventory nightmares. This post teaches you two approaches that actually work: sagas (flexible, practical) and two-phase commit (theoretically pure, practically brittle). You'll understand the tradeoffs and leave with a decision framework for choosing the right pattern for your system.

## Why This Matters

Distributed transactions are one of the hardest problems in backend engineering. Get them wrong and you'll spend weeks debugging ghost orders, refunding customers, and explaining to your CEO why inventory is mysteriously negative. The good news is that proven patterns exist—they're just different from SQL transactions. Understanding sagas and two-phase commit means you can build systems that reliably handle failure without losing consistency.

## 1. The Distributed Transaction Problem

**The Traditional (Single Database) Case**
```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'alice';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'bob';
COMMIT;
```

Either both succeed or both fail. No middle ground.

**The Distributed Case (Microservices)**
```
Service A (Payment): Charge $100 ✓
Service B (Inventory): Decrement stock ✗ (Service down!)
Service C (Shipping): Create shipment ⏳ (never runs)

Result: Customer charged but order never created. ❌
```

You lose ACID guarantees. You need a new approach.

## 2. Two-Phase Commit: The Textbook Answer

**How It Works**

```
Coordinator: "Are you ready to commit?"
  Service A: "Yes, I can commit"
  Service B: "Yes, I can commit"
  Service C: "Yes, I can commit"

Coordinator: "OK, everyone commit!"
  Service A: ✓ Committed
  Service B: ✓ Committed
  Service C: ✓ Committed
```

**The Code**

```python
from distributed_transaction import TwoPhaseCommit

coordinator = TwoPhaseCommit()

# Phase 1: Prepare
coordinator.prepare(
    service='payment',
    operation='charge_card',
    params={'amount': 100, 'card_id': 'abc123'}
)
coordinator.prepare(
    service='inventory',
    operation='reserve_stock',
    params={'sku': 'shirt-m-blue', 'qty': 2}
)
coordinator.prepare(
    service='shipping',
    operation='create_shipment',
    params={'address': '123 Main St'}
)

if not coordinator.all_ready():
    coordinator.abort()  # Rollback everywhere
else:
    # Phase 2: Commit
    coordinator.commit()  # All-or-nothing
```

**The Promise**
All-or-nothing atomicity. Either the entire order succeeds or entirely fails. No partial states.

**The Problem**
Two-phase commit is brittle in practice:

1. **Blocking:** Service A must hold a lock while waiting for B and C to prepare. If C is slow, A and B are blocked.
2. **Network failures:** What if the commit message to C is lost? Is C committed or not? Nobody knows.
3. **Coordinator crashes:** The coordinator can fail after "prepare" but before "commit," leaving services in limbo.
4. **Timeouts:** Long-running services timeout and abort, cascading failure.

**When to Use Two-Phase Commit**
Only when:
- You control all services involved (small, tight coupling)
- Latency isn't critical (< 1 second is fine, > 10 seconds is painful)
- Services are highly reliable (rare failures)

For most modern systems, this is too restrictive.

## 3. Sagas: The Practical Alternative

**Core Idea**
Instead of locking everything, execute a sequence of local transactions and compensate if anything fails.

```
Step 1: Charge card
  ✓ Charged $100. Save this decision.

Step 2: Reserve inventory
  ✓ Reserved 2 shirts. Save this decision.

Step 3: Create shipment
  ✗ Shipping service down!
  Compensate:
    - Reverse charge (refund $100) ✓
    - Cancel inventory reservation ✓
  Order failed safely.
```

**Two Implementation Styles**

### Choreography (Event-Driven)
Services listen for events and trigger the next step:

```
Payment Service publishes: "OrderPaymentProcessed"
  ↓
Inventory Service listens, reserves stock
Inventory publishes: "StockReserved"
  ↓
Shipping Service listens, creates shipment
Shipping publishes: "ShipmentCreated"
  ↓
Order Service publishes: "OrderCompleted"
```

**Code Example:**
```python
# Payment Service
@app.post("/charge")
def charge_card(order_id, amount):
    charge = stripe.charge(amount)
    publish_event("PaymentProcessed", {
        "order_id": order_id,
        "charge_id": charge.id
    })
    return charge

# Inventory Service (listens to PaymentProcessed)
@event_listener("PaymentProcessed")
def reserve_stock(event):
    order = get_order(event['order_id'])
    try:
        inventory.reserve(order.items)
        publish_event("StockReserved", {"order_id": order.id})
    except OutOfStock:
        # Compensate: refund
        stripe.refund(event['charge_id'])
        publish_event("OrderFailed", {"order_id": order.id})
```

**Pros:** Decoupled services, fast, resilient
**Cons:** Hard to debug, eventual consistency, complex error paths

### Orchestration (Centralized Coordinator)
A coordinator service calls each step and handles compensation:

```python
class OrderSaga:
    def __init__(self, order_id):
        self.order_id = order_id
        self.compensations = []  # Rollback steps

    def execute(self):
        try:
            # Step 1: Charge
            charge_id = self.payment_service.charge(100)
            self.compensations.append(
                lambda: self.payment_service.refund(charge_id)
            )

            # Step 2: Reserve inventory
            reservation_id = self.inventory_service.reserve("shirt-m", 2)
            self.compensations.append(
                lambda: self.inventory_service.cancel_reservation(reservation_id)
            )

            # Step 3: Create shipment
            shipment_id = self.shipping_service.create_shipment(
                address="123 Main St"
            )
            self.compensations.append(
                lambda: self.shipping_service.cancel_shipment(shipment_id)
            )

            return {"status": "success", "order_id": self.order_id}

        except Exception as e:
            # Execute compensations in reverse order
            for compensation in reversed(self.compensations):
                try:
                    compensation()
                except Exception as rollback_error:
                    logger.error(f"Compensation failed: {rollback_error}")

            raise

saga = OrderSaga(order_id=123)
saga.execute()
```

**Pros:** Clear flow, easy to debug, all retry logic in one place
**Cons:** Tightly couples to coordinator, coordinator becomes bottleneck

## 4. Handling Failures in Sagas

**Idempotency: The Key**
Every operation must be idempotent—running it twice has the same effect as running it once.

```python
# ❌ Non-idempotent
def charge_card(customer_id, amount):
    return stripe.charge(amount)  # Run twice = double charge!

# ✅ Idempotent
def charge_card(customer_id, amount, idempotency_key):
    return stripe.charge(amount, idempotency_key=idempotency_key)
    # Run twice = same charge (Stripe deduplicates by key)
```

Always use idempotency keys. Services will retry. You must survive retries.

**Retry Logic**
```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def call_payment_service():
    return payment_service.charge(idempotency_key=unique_key)

# Retries at 2s, 4s, 8s delays. Then gives up.
```

**Timeouts: Explicit Decisions**
```python
# ❌ Vague: Does this work?
result = shipping_service.create_shipment(address, timeout=None)

# ✅ Explicit: Times out, will trigger compensation
result = shipping_service.create_shipment(
    address,
    timeout=10  # seconds
)
```

## 5. Monitoring and Observability

**Track Saga State**
```python
class OrderSaga:
    def __init__(self, order_id):
        self.order_id = order_id
        self.state = "STARTED"
        self.steps = []

    def execute(self):
        self.state = "CHARGING"
        self._log_state()
        charge_id = self.payment_service.charge(100)
        self.steps.append({"step": "CHARGE", "result": charge_id})

        self.state = "RESERVING"
        self._log_state()
        reservation_id = self.inventory_service.reserve("shirt", 2)
        self.steps.append({"step": "RESERVE", "result": reservation_id})

        self.state = "SHIPPING"
        self._log_state()
        shipment_id = self.shipping_service.create_shipment(address)
        self.steps.append({"step": "SHIPPING", "result": shipment_id})

        self.state = "COMPLETE"
        self._log_state()

    def _log_state(self):
        # Store in database so you can query saga progress
        db.sagas.update_one(
            {"order_id": self.order_id},
            {"$set": {"state": self.state, "steps": self.steps}}
        )
```

Query saga status:
```python
saga = db.sagas.find_one({"order_id": 123})
# {
#   "order_id": 123,
#   "state": "SHIPPING",
#   "steps": [
#     {"step": "CHARGE", "result": "ch_1234"},
#     {"step": "RESERVE", "result": "res_5678"}
#   ]
# }
```

## Concrete Action Steps

1. **This week:** Map your current workflows. Which ones touch multiple services? Those are candidates for sagas.
2. **Next week:** Choose: choreography (event-driven) or orchestration (coordinator). Start with orchestration if unsure.
3. **Week 3:** Implement idempotency keys. Every external call must use them.
4. **Week 4:** Add retry logic with exponential backoff. Test failures explicitly.
5. **Month 2:** Build saga state tracking. You must be able to query "what happened to order 123?"
6. **Ongoing:** Monitor saga failure rates. Alert if compensations spike.

Two-phase commit is the textbook answer. Sagas are the practical answer. Choose sagas unless you have a very good reason not to.

## Resources

- [Saga Pattern Documentation](https://microservices.io/patterns/data/saga.html)
- [Building Distributed Sagas](https://www.nginx.com/blog/building-a-microservices-based-order-processing-application/)
- [Two-Phase Commit Explained](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)
- [Idempotency Keys Best Practices](https://stripe.com/blog/idempotency)
- [Temporal: Distributed Workflows](https://temporal.io/)
- [Apache Camel for Sagas](https://camel.apache.org/components/latest/eips/saga.html)
