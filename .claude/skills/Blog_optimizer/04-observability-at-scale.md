# Observability at Scale: Logs, Metrics, and Traces

When your system spans 50 services and thousands of requests per second, a customer says "the app is slow" and you have no idea where the problem is. Observability—the ability to understand system behavior from external outputs—becomes your only lifeline. Most teams confuse monitoring with observability: monitoring tells you *what* broke; observability tells you *why*.

The three pillars of observability—logs, metrics, traces—aren't interchangeable. Logs are high-volume, unstructured text. Metrics are fixed-point measurements (CPU at 3:15pm was 75%). Traces follow a request through your entire system. Together, they reveal what happened.

## Logs: The Audit Trail

Logs capture what your application did. In a monolith, stderr is fine. At scale, logs are overwhelming: a service handling 10,000 requests per second generates millions of log lines daily. You need structured logging, filtering, and long-term retention.

**Structured logs vs. text logs:**

```python
# Bad: Unstructured text
logger.info("User logged in")

# Good: Structured JSON
logger.info("user_login", extra={
    "user_id": "user_123",
    "timestamp": "2025-03-16T14:23:00Z",
    "ip": "203.0.113.42",
    "country": "US"
})
```

Structured logs are queryable. You can instantly find "all logins from IP 203.0.113.42 in the last hour" instead of grepping text logs.

```python
import logging
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }
        if hasattr(record, 'user_id'):
            log_data['user_id'] = record.user_id
        return json.dumps(log_data)

logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
```

**What to log:**

- Authentication events (successful and failed logins, permission changes)
- Data access (who accessed what, when)
- Errors and exceptions (full stack traces, not just "error occurred")
- Performance milestones (database query took 500ms, was expected < 100ms)
- Business events (order created, payment processed, refund issued)

**What not to log:**

- Passwords, API keys, credit card numbers
- Entire request/response bodies (log relevant fields only)
- Logs at DEBUG level in production (too noisy, degrades performance)

**Log aggregation:** Centralize logs so you can search across all services. Use [ELK Stack](https://www.elastic.co/what-is/elk-stack) (Elasticsearch, Logstash, Kibana), [Loki](https://grafana.com/oss/loki/), or managed services like [Datadog](https://www.datadoghq.com/) or [CloudWatch](https://aws.amazon.com/cloudwatch/).

```bash
# Send logs to ELK via Fluent Bit
[SERVICE]
    Flush 5
    Daemon off

[INPUT]
    Name systemd
    Tag host.*

[OUTPUT]
    Name es
    Match *
    Host elasticsearch.example.com
    Port 9200
```

## Metrics: Measurable, Actionable Numbers

Metrics are time-series data: "CPU at 3:15pm was 75%," "request latency at 3:16pm was 120ms." Metrics are queryable, alertable, and enable dashboards.

**Key metrics:**

- **Request latency:** p50, p95, p99 (not just average—tail latency matters)
- **Error rate:** successful / total requests
- **Throughput:** requests per second
- **Resource utilization:** CPU, memory, disk, network
- **Business metrics:** orders per minute, revenue per hour, user signup rate

```python
from prometheus_client import Counter, Histogram, Gauge

# Counter: increments (request count, error count)
request_count = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])

# Gauge: current value (memory usage, queue depth)
queue_depth = Gauge('job_queue_depth', 'Number of pending jobs')

# Histogram: distribution (request latency)
request_latency = Histogram('http_request_duration_seconds', 'HTTP request latency')

# Use in code
@app.route('/api/orders', methods=['POST'])
def create_order():
    with request_latency.time():
        # Endpoint logic
        request_count.labels(method='POST', endpoint='/api/orders').inc()
        return 200
```

**Alert on metrics you can act on:**

```yaml
# Prometheus alert rule
groups:
- name: app_alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
    annotations:
      summary: "Error rate above 5%"

  - alert: HighLatency
    expr: histogram_quantile(0.99, http_request_duration_seconds) > 1.0
    annotations:
      summary: "P99 latency above 1 second"
```

Don't alert on "CPU above 80%"—that's not actionable (what do you do?). Alert on "error rate above 2%" because you'll investigate and fix it.

**Metrics platform:** [Prometheus](https://prometheus.io/) (open-source), [Datadog](https://www.datadoghq.com/), [New Relic](https://newrelic.com/), or [CloudWatch](https://aws.amazon.com/cloudwatch/).

## Traces: Following Requests Through the System

A single user request touches multiple services: API gateway → auth service → order service → payment service → inventory service. When the request is slow, which service is the bottleneck? Traces tell you.

A trace captures a request's path:

```
Order API POST /orders
├─ Auth Service: verify_token() [2ms]
├─ Order Service: create_order() [85ms]
│  ├─ Database: INSERT order [40ms]
│  ├─ Event Publisher: publish("order.created") [15ms]
│  └─ Inventory Service: reserve_stock() [25ms]
│     └─ Database: UPDATE inventory [23ms]
└─ Response: 201 Created [90ms total]
```

Each operation ("span") records start time, end time, and details. Traces reveal bottlenecks immediately.

```python
from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger.thrift import JaegerExporter

# Configure Jaeger exporter
jaeger_exporter = JaegerExporter(agent_host_name="localhost", agent_port=6831)
trace.set_tracer_provider(TracerProvider())
trace.get_tracer_provider().add_span_processor(BatchSpanProcessor(jaeger_exporter))

tracer = trace.get_tracer(__name__)

@app.route('/orders', methods=['POST'])
def create_order():
    with tracer.start_as_current_span("create_order") as span:
        span.set_attribute("customer_id", customer_id)

        # Trace database call
        with tracer.start_as_current_span("db_insert"):
            order = db.insert(order_data)

        # Trace service call
        with tracer.start_as_current_span("inventory_reserve"):
            inventory_service.reserve(items)

        return 201, order
```

**Trace platform:** [Jaeger](https://www.jaegertracing.io/) (open-source), [Datadog APM](https://www.datadoghq.com/), [New Relic](https://newrelic.com/), [Honeycomb](https://www.honeycomb.io/).

## Putting It Together: The Three Pillars in Action

Scenario: Users report the app is slow after a deployment.

1. **Metrics** tell you: P99 latency jumped from 200ms to 800ms starting at 3:14pm.
2. **Traces** show: Order service calls to inventory service are taking 500ms (usually 25ms).
3. **Logs** reveal: Inventory service hit a database connection pool limit at 3:14pm, waiting for connections.

Root cause found. Fix: increase connection pool size or optimize queries.

Without traces, you'd spend hours checking every service. Without logs, you'd miss the database detail. Without metrics, you wouldn't know *when* the degradation started.

## Practical Implementation

**Step 1: Add structured logging**

```python
import logging
import json
from datetime import datetime

class StructuredLogger:
    def __init__(self, name):
        self.logger = logging.getLogger(name)

    def info(self, event, **kwargs):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "event": event,
            "level": "INFO",
            **kwargs
        }
        self.logger.info(json.dumps(log_data))

    def error(self, event, **kwargs):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "event": event,
            "level": "ERROR",
            **kwargs
        }
        self.logger.error(json.dumps(log_data))

logger = StructuredLogger(__name__)
logger.info("user_signup", user_id="user_123", email="user@example.com")
```

**Step 2: Instrument for metrics**

Use [Prometheus Python client](https://github.com/prometheus/client_python) or language equivalent. Track request latency, error rate, and business metrics.

**Step 3: Enable traces**

Instrument with [OpenTelemetry](https://opentelemetry.io/). Requires setup in each service but reveals system behavior.

**Step 4: Set up alerting**

Alert on metrics that require action: error rate > 2%, P99 latency > 1s, service unavailable.

## Common Mistakes

**Mistake:** Logging everything at DEBUG level in production.
**Fix:** Log DEBUG only locally; production uses INFO+.

**Mistake:** Alerting on infrastructure (CPU > 80%) instead of outcomes (error rate > 2%).
**Fix:** Alert on consequences, not causes.

**Mistake:** Storing logs and traces forever (massive cost).
**Fix:** Retain detailed logs 30 days, metrics indefinitely, traces 7 days.

**Mistake:** Not correlating logs, metrics, and traces.
**Fix:** Include trace ID in logs and metrics so you can jump between them.

```python
# Include trace ID everywhere
trace_id = trace.get_current_span().get_span_context().trace_id
logger.info("processing_order", trace_id=trace_id, order_id="ord_123")
```

## Next Steps

Start with metrics: install [Prometheus](https://prometheus.io/download/) and instrument your largest service with request latency and error rate. Add three key business metrics (orders created, revenue, active users). Spend one week collecting baseline data, then set alert thresholds. Next, add structured logging to that same service—convert text logs to JSON, send to a [Loki instance](https://grafana.com/oss/loki/), and practice querying. Finally, instrument traces using [OpenTelemetry](https://opentelemetry.io/) and [Jaeger](https://www.jaegertracing.io/documentation/getting-started/)—this requires more setup but reveals the biggest gains in performance debugging.
