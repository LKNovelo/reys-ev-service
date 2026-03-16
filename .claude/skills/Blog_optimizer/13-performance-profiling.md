# Performance Profiling: Finding Bottlenecks That Matter

## Promise
"This system is slow" is useless feedback. Is it slow on startup? During peak traffic? When users upload files? Slow at the database layer, application layer, or network? Most teams guess about bottlenecks, waste weeks optimizing the wrong thing, and barely improve performance. This post teaches you how to find the actual bottleneck—the 5% of code causing 95% of the slowness—using scientific profiling. You'll learn to profile CPU, memory, and I/O, read flame graphs, and optimize with data instead of hunches. You'll leave knowing exactly where your application is actually spending time.

## Why This Matters

Optimization without profiling is cargo cult engineering. Teams spend weeks speeding up code that runs 1% of the time, while the real bottleneck (running 90% of the time) goes untouched. Result: months of work for 2% improvement. Teams that profile first find that one change—one database query optimization, one algorithm fix, one network call eliminated—often doubles performance. Profiling takes hours. Optimization without profiling takes weeks with minimal return.

## 1. The Three Types of Bottlenecks (And How to Find Each)

### CPU Bottlenecks: Algorithmic Slowness
Your code is doing too much computation.

**Detection**
```bash
# CPU usage at 100% (or sustained high %)
top
# Shows processes and CPU %

ps aux | grep python
# See which process is consuming CPU
```

**Root Cause Examples**
- O(n²) algorithm where O(n) is possible
- Unnecessary list copying in tight loops
- Regex processing large strings inefficiently
- Wrong data structure (array instead of hash map)

**Profiling with cProfile (Python)**
```python
import cProfile
import pstats

# Profile your slow function
cProfile.run('slow_function()', 'output.prof')

# Analyze results
stats = pstats.Stats('output.prof')
stats.sort_stats('cumulative')
stats.print_stats(10)  # Show top 10
```

**Output**
```
ncalls  tottime  percall  cumtime  percall filename:lineno(function)
  1000    5.234    0.005   10.123    0.010 calculate_hash
 50000    3.456    0.000    6.789    0.000 validate_input
     1    0.123    0.123    0.123    0.123 sort_items
```

**Read this as:**
- **cumtime:** Total time spent in this function (and its children)
- **tottime:** Time spent only in this function (not called functions)
- Focus on cumtime. If a function has high cumtime, it's a candidate.

### Memory Bottlenecks: Leaks and Bloat
Your application is running out of memory or allocating too much.

**Detection**
```bash
# Memory usage growth over time
watch -n 1 'ps aux | grep python | grep -v grep'
# Shows RSS (resident memory) increasing

# Or use memory profiler
pip install memory-profiler
python -m memory_profiler slow_script.py
```

**Root Cause Examples**
- Memory leak: Objects not garbage collected
- Unbounded cache: Cache grows without eviction
- Loading entire file into memory instead of streaming
- Keeping references to old objects

**Profiling with memory_profiler (Python)**
```python
from memory_profiler import profile

@profile
def slow_function():
    big_list = [x*x for x in range(1000000)]  # Line-by-line memory usage
    return sum(big_list)

slow_function()
```

**Output**
```
Line #    Mem usage    Increment  Occurrences   Line Contents
    3    10.2 MiB      0.0 MiB          1   big_list = [x*x for x in range(1000000)]
    4    47.6 MiB     37.4 MiB          1   return sum(big_list)
```

**Read this as:**
Memory jumps 37.4 MiB at the list comprehension. This is where the memory allocation happens.

### I/O Bottlenecks: Network and Disk
Your application is waiting for external systems.

**Detection**
```bash
# Watch network I/O
iotop  # Shows disk I/O per process

# Or use network analysis
tcpdump -i eth0 -n 'tcp port 3306'  # Capture MySQL traffic
```

**Root Cause Examples**
- N+1 database queries: Loop makes one query per item
- No connection pooling: New connection per request
- No caching: Querying same data repeatedly
- Synchronous I/O in critical path

**Profiling with logging and tracing**
```python
import time
import logging

logger = logging.getLogger(__name__)

def get_user_orders(user_id):
    start = time.time()

    # Query 1: Get user
    user = db.query("SELECT * FROM users WHERE id = %s", user_id)
    logger.info(f"Query user: {time.time() - start:.3f}s")

    # Query 2: Get orders (N+1 if done in a loop!)
    orders = db.query("SELECT * FROM orders WHERE user_id = %s", user_id)
    logger.info(f"Query orders: {time.time() - start:.3f}s")

    # Query 3 per order: Get order items
    for order in orders:
        items = db.query("SELECT * FROM items WHERE order_id = %s", order.id)
        order.items = items
    logger.info(f"Query all items: {time.time() - start:.3f}s")

    return orders
```

**Output**
```
Query user: 0.005s
Query orders: 0.008s
Query all items: 2.341s  <- THIS IS THE BOTTLENECK!
```

The loop querying items for each order is N+1. Optimize with a single query.

## 2. Flame Graphs: Visualizing Where Time Goes

Flame graphs show the call stack and time spent in each function.

**Generate Flame Graph (Python with py-spy)**
```bash
pip install py-spy

# Record for 30 seconds
py-spy record -o profile.svg -- python slow_script.py

# View the SVG in a browser
open profile.svg
```

**Reading the Graph**
```
Top level: main() [entire program runtime]
|
├─ process_data() [40% of time]
│  ├─ parse_json() [25% of time]
│  └─ validate() [15% of time]
│
└─ io_read() [60% of time]
   ├─ fetch_api() [50% of time]
   └─ decompress() [10% of time]
```

**Width = time spent. Height = call depth.**

If you see io_read taking 60% of the flame graph, that's where to optimize.

## 3. Profiling in Production (Safe Sampling)

Most profiling tools are too expensive for production. Use sampling profilers.

**Sampling (Every N Milliseconds)**
```python
import signal
import sys

def profiler_signal(signum, frame):
    """Handler that runs every 10ms"""
    print(frame.f_code.co_filename, frame.f_lineno, frame.f_code.co_name)

signal.setitimer(signal.SIGALRM, 0.01)  # Sample every 10ms
signal.signal(signal.SIGALRM, profiler_signal)

# ... your code runs here ...
```

**Distributed Tracing (Datadog, New Relic, Honeycomb)**
```python
from ddtrace import tracer

@tracer.wrap(service='my_service', resource='get_user')
def get_user(user_id):
    with tracer.trace('database_query'):
        user = db.query(user_id)
    with tracer.trace('serialize_user'):
        return user.to_json()
```

Traces show:
- Which requests are slow
- Which services are bottlenecks
- Exactly which queries, API calls are taking time
- Trace a single slow request end-to-end

## 4. Optimization Strategies (Once You Know the Bottleneck)

### For CPU Bottlenecks

**Algorithm Optimization**
```python
# ❌ O(n²) - slow
def find_pairs(numbers):
    pairs = []
    for i in range(len(numbers)):
        for j in range(i+1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                pairs.append((numbers[i], numbers[j]))
    return pairs

# ✅ O(n) - fast
def find_pairs(numbers):
    seen = set()
    pairs = []
    for num in numbers:
        complement = target - num
        if complement in seen:
            pairs.append((complement, num))
        seen.add(num)
    return pairs
```

**Caching**
```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def expensive_computation(x):
    """Results cached, repeated calls are O(1)"""
    return x ** 100

result1 = expensive_computation(42)  # Computes
result2 = expensive_computation(42)  # Returns cached result
```

### For Memory Bottlenecks

**Streaming Instead of Loading**
```python
# ❌ Load entire file into memory
def process_file(path):
    data = open(path).read()  # If file is 10GB, you need 10GB RAM
    for line in data.split('\n'):
        process(line)

# ✅ Process line by line
def process_file(path):
    with open(path) as f:
        for line in f:  # Only one line in memory at a time
            process(line)
```

**Bounded Caches**
```python
from cachetools import LRUCache

cache = LRUCache(maxsize=1000)  # Max 1000 items

def get_user(user_id):
    if user_id in cache:
        return cache[user_id]
    user = db.query(user_id)
    cache[user_id] = user
    return user
    # When cache hits 1000, least-recently-used items are evicted
```

### For I/O Bottlenecks

**Connection Pooling**
```python
# ❌ New connection per query
def get_user(user_id):
    conn = sqlite3.connect('db.sqlite')  # New connection!
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    return cursor.fetchone()

# ✅ Reuse connection pool
from sqlalchemy import create_engine

engine = create_engine('sqlite:///db.sqlite', pool_size=10)

def get_user(user_id):
    # Reuses connection from pool
    result = engine.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    return result.fetchone()
```

**Batch Queries**
```python
# ❌ N+1: Loop makes one query per item
for user in users:
    orders = db.query("SELECT * FROM orders WHERE user_id = ?", user.id)
    user.orders = orders

# ✅ Single query
user_ids = [u.id for u in users]
all_orders = db.query("SELECT * FROM orders WHERE user_id IN (?)", user_ids)
# Now map orders back to users
```

**Caching**
```python
# ❌ Query database every request
def get_trending_items():
    return db.query("SELECT * FROM items ORDER BY views DESC LIMIT 10")

# ✅ Cache popular queries
@cache.cached(timeout=300)  # Cache for 5 minutes
def get_trending_items():
    return db.query("SELECT * FROM items ORDER BY views DESC LIMIT 10")
```

## 5. Benchmarking: Measure Before and After

Always measure improvement.

```python
import timeit

# Before optimization
slow_result = timeit.timeit(slow_function, number=1000)
print(f"Slow function: {slow_result:.3f}s")

# After optimization
fast_result = timeit.timeit(fast_function, number=1000)
print(f"Fast function: {fast_result:.3f}s")

improvement = (slow_result - fast_result) / slow_result * 100
print(f"Improvement: {improvement:.1f}%")
```

## Concrete Action Steps

1. **This week:** Identify the three slowest endpoints/operations in your system
2. **Next week:** Profile each one using cProfile (CPU), memory_profiler (memory), or logging (I/O)
3. **Week 3:** Generate flame graphs to visualize where time goes
4. **Week 4:** Fix the #1 bottleneck (the one using most time)
5. **Month 2:** Measure improvement. Document the optimization for team knowledge.
6. **Ongoing:** Profile after major changes. Prevent regressions with benchmarks.

The 80/20 rule holds: 20% of code uses 80% of resources. Find that 20%, fix it, and move on. Don't optimize blindly.

## Resources

- [Python cProfile Documentation](https://docs.python.org/3/library/profile.html)
- [Flamegraph: Visualizing Profiler Data](https://www.brendangregg.com/flamegraphs.html)
- [py-spy: Sampling Profiler](https://github.com/benfred/py-spy)
- [Datadog Performance Monitoring](https://www.datadoghq.com/blog/distributed-tracing/)
- [Memory Profiler](https://github.com/pythonprofilers/memory_profiler)
- [Brendan Gregg's Performance Wiki](https://www.brendangregg.com/linuxperf.html)
