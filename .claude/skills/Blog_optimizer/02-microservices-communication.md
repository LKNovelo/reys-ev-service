# Microservices Communication: gRPC vs REST vs Event-Driven

Choosing the wrong communication pattern at scale is expensive. REST is simple but verbose; gRPC is fast but operationally complex; event-driven scales beautifully but demands different thinking. Most teams start with REST because it's familiar, then realize too late that their latency budgets are exhausted and payloads are drowning in JSON overhead.

## Why Communication Pattern Matters

In a monolith, functions call functions at microsecond speeds. In microservices, every call crosses a network. A service that makes 10 synchronous calls during a request suddenly faces 100ms latency (10ms per call) before the user sees a response. Scale to 100 services and you've got a latency nightmare.

The pattern you choose determines throughput, latency, consistency guarantees, and operational complexity. Pick wrong and you'll rewrite the entire architecture later.

## REST: Simplicity and Ubiquity

REST dominates because it's simple: HTTP requests, JSON responses, everyone understands it. For services with infrequent calls or third-party integrations, REST is sufficient.

```json
POST /api/v1/orders
Content-Type: application/json

{
  "customer_id": "cust_123",
  "items": [
    {"product_id": "sku_456", "quantity": 2}
  ]
}
```

**Advantages:**
- Human-readable; debuggable with curl and browser tools
- Works across firewalls and load balancers without configuration
- Mature ecosystem (OpenAPI, extensive libraries)
- Works well for external APIs and webhooks

**Disadvantages:**
- Verbose payloads (JSON is text-heavy; binary formats are smaller)
- Request/response overhead (each call requires HTTP headers, DNS lookup, TLS handshake)
- No built-in streaming (polling loops or WebSockets required)
- Client libraries are inconsistent across languages

**When to use:** Public APIs, third-party integrations, infrequent service-to-service calls (< 100 RPS per service pair), teams comfortable with JSON/HTTP.

## gRPC: Speed and Efficiency

gRPC uses Protocol Buffers (binary format) over HTTP/2, delivering 5–10x throughput and lower latency than REST.

```protobuf
syntax = "proto3";

service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (Order);
  rpc StreamOrderUpdates (OrderID) returns (stream OrderUpdate);
}

message CreateOrderRequest {
  string customer_id = 1;
  repeated OrderItem items = 2;
}

message Order {
  string id = 1;
  string status = 2;
}
```

gRPC auto-generates type-safe clients and servers:

```go
// Go example
order, err := client.CreateOrder(ctx, &pb.CreateOrderRequest{
  CustomerId: "cust_123",
  Items: []*pb.OrderItem{
    {ProductId: "sku_456", Quantity: 2},
  },
})
```

**Advantages:**
- Binary payloads (50–80% smaller than JSON)
- HTTP/2 multiplexing (multiple requests per connection)
- Built-in streaming (bidirectional, low-latency)
- Type safety and contract enforcement
- Low latency (microsecond overhead)

**Disadvantages:**
- Requires code generation (proto compilation step)
- Opaque to debugging (binary format, requires special tools)
- Firewall rules must allow gRPC ports
- Less mature ecosystem than REST
- Language tooling varies in quality

**When to use:** High-frequency calls (> 100 RPS per service), latency-sensitive systems, internal services only, teams with infrastructure maturity to support code generation.

**Real-world example:** A payment processing service receiving thousands of validation calls per second will see 40ms latency with REST; gRPC cuts that to 2–4ms.

## Event-Driven: Decoupling at Scale

Event-driven architecture decouples services via messages: one service publishes events, others subscribe. No direct HTTP calls.

```json
// OrderCreated event
{
  "event_id": "evt_789",
  "event_type": "order.created",
  "timestamp": "2025-03-16T14:23:00Z",
  "data": {
    "order_id": "ord_123",
    "customer_id": "cust_456",
    "total": 199.99
  }
}
```

Services subscribe to relevant events:

```python
# Inventory service listening for orders
@event_handler('order.created')
def reserve_inventory(event):
    order = event['data']
    inventory.reserve(order['items'])
    publish('order.inventory_reserved', {'order_id': order['order_id']})
```

**Advantages:**
- Loose coupling (services don't know about each other)
- Scales horizontally (add subscribers without touching producers)
- Natural for asynchronous workflows (email, notifications, analytics)
- Failure isolation (one subscriber failing doesn't block others)
- Built-in audit trail (all events logged)

**Disadvantages:**
- Operational complexity (message brokers, monitoring, dead-letter queues)
- Harder to reason about (implicit dependencies between services)
- Eventual consistency (subscribers lag behind producers)
- Requires careful event versioning and backwards compatibility

**When to use:** High-frequency updates, workflows spanning multiple services, cross-domain events (order → email → inventory), teams with Kafka/RabbitMQ expertise.

## Comparison: Latency and Throughput

| Pattern | Latency | Throughput | Coupling | Consistency |
|---------|---------|-----------|----------|-------------|
| REST | 10–50ms | 100–1,000 RPS | Tight | Synchronous |
| gRPC | 1–5ms | 10,000–100,000 RPS | Tight | Synchronous |
| Event-Driven | 100ms–1s | Unbounded | Loose | Eventual |

REST and gRPC are synchronous and tightly coupled (caller waits for response). Events are asynchronous and loosely coupled (caller doesn't wait).

## Hybrid Approach: The Real World

Most mature systems use all three:

- **gRPC** for high-frequency service-to-service calls (payment validation, inventory checks)
- **REST** for public APIs and third-party integrations
- **Events** for cross-domain workflows (order → email → analytics)

Example: Order creation flow

```
1. User submits order (REST API)
2. Order Service calls Payment Service (gRPC - fast, synchronous)
3. Order Service calls Inventory Service (gRPC - fast, synchronous)
4. Order Service publishes OrderCreated event
5. Email Service (subscribes) sends confirmation
6. Analytics Service (subscribes) logs event
7. Warehouse Service (subscribes) prepares shipment
```

Caller waits for steps 1–3 (synchronous), steps 4–7 happen asynchronously.

## Choosing Your Pattern

Ask these questions:

**Is latency critical?**
- Yes, < 10ms required → gRPC
- Yes, but < 50ms is fine → REST
- No, 100ms+ is acceptable → Events

**Is tight coupling acceptable?**
- Yes (shared fate is OK) → gRPC or REST
- No (isolate failures) → Events

**How frequently do services communicate?**
- Rarely (< 10 calls/second) → REST
- Often (> 100 calls/second) → gRPC
- Continuous streams → Events

**Is ordering and consistency critical?**
- Yes (must have synchronous confirmation) → gRPC or REST
- No (eventual consistency acceptable) → Events

## Implementation Tips

**For gRPC:**
- Use [protobuf v3](https://protobuf.dev/) for schema definition
- Deploy [grpcui](https://github.com/fullstorydev/grpcui) for debugging
- Enable gRPC load balancing in your orchestration platform
- Implement retry logic with exponential backoff

**For Event-Driven:**
- Choose [Kafka](https://kafka.apache.org/) for high-throughput, [RabbitMQ](https://www.rabbitmq.com/) for simpler setups
- Version events explicitly (event_version field)
- Implement idempotent handlers (events may be delivered multiple times)
- Monitor consumer lag to catch processing delays

**For REST:**
- Use [OpenAPI](https://swagger.io/specification/) to document contracts
- Implement rate limiting and circuit breakers
- Cache responses aggressively (HTTP caching headers)

## Next Steps

Audit your three slowest service-to-service calls: measure latency with a profiler, then estimate the impact of switching to gRPC. Start by implementing one gRPC service in parallel with your existing REST API—use [gRPC-JSON transcoding](https://github.com/grpc-ecosystem/grpc-gateway) to expose both protocols from the same service, reducing risk. Clone the [gRPC examples repository](https://github.com/grpc/grpc-go/tree/master/examples) to see how multi-language integration works.
