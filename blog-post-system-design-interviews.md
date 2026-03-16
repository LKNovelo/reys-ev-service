# System Design Interviews: A Framework for Scaling Decisions

System design interviews test whether you can architect solutions that work at scale. You're not asked to write code; you're asked to make the decisions that precede code. Given a vague problem—"design Twitter," "design Uber," "design a real-time notification system"—you have 45 minutes to sketch out a system that handles millions of users. These interviews reveal how you think about trade-offs, capacity, and the tools available to solve problems.

The secret to performing well isn't memorizing architectures. It's understanding the fundamental decisions that shape every scalable system: how to handle more data, more requests, and more complexity without the system crumbling.

## Start by Clarifying Requirements

The first mistake candidates make is assuming they understand the problem. They don't.

When you're told "design Instagram," you need to know:
- How many users? (10 million, 1 billion, something else?)
- How many daily active users?
- What's the read-to-write ratio? (Instagram is read-heavy; each photo gets viewed thousands of times but uploaded once)
- What latency is acceptable? (Feed load time: 200ms? 2 seconds?)
- What's the geographic distribution? (One region, global?)
- What features are in scope? (Photos, comments, likes, stories, direct messages?)

These questions aren't pedantic. They determine whether you build one thing or something completely different.

**Example conversation:**
- You: "Is this primarily a feed-based system?"
- Interviewer: "Yes, the feed is the core."
- You: "And users expect the feed to load in under 500ms?"
- Interviewer: "Yes, that's a key requirement."

Now you know: you need aggressive caching, likely in-memory stores like [Redis](https://redis.io) or [Memcached](https://memcached.org/), and possibly denormalization. The latency requirement just eliminated certain database approaches and mandated others.

**Critical requirements to nail down:**
- **Scale:** DAU, read/write ratio, growth trajectory
- **Latency:** What's acceptable? Different for user-facing vs background jobs
- **Consistency:** Do updates need to be immediately visible or is eventual consistency acceptable?
- **Availability:** Is 99.99% uptime required or is 99% acceptable?
- **Scope:** What features are must-have vs nice-to-have?

Spend the first 5 minutes on this. It sounds slow, but it saves the remaining 40 minutes from being spent on the wrong problem.

## Capacity Planning: Do the Math

Capacity planning translates requirements into numbers. This is where many candidates fail—they design architectures without knowing if they're oversized or undersized.

**Calculate the basics:**
1. **Requests per second (RPS):** If 10 million DAU spend 1 hour per day on your service, and requests are spread evenly, that's ~(10M × 3600 / 86400) = ~400K RPS on average, with peaks 5-10x higher.

2. **Data size:** If each post is 1MB (photo, metadata, comments), and users create 1M posts per day, that's 1TB per day. Over a year, that's 365TB. Can your database handle it?

3. **Bandwidth:** Serving 1B photos per day at 1MB each = 1EB of data egress. That's probably not feasible internally—you need a CDN like [CloudFront](https://aws.amazon.com/cloudfront/) or [Cloudflare](https://www.cloudflare.com/).

4. **Database I/O:** A single database can handle ~1,000-10,000 writes per second depending on the setup. If you need more, you need sharding or replicas.

These calculations immediately constrain your architecture. You can't hand-wave at a CDN if your bandwidth is 1EB/day—it becomes mandatory. You can't use a single database if you need 100,000 writes per second.

**Rule of thumb:** Calculate conservatively. If you think you need 10 machines, you probably need 20. If a database can handle 10,000 QPS, assume you'll eventually need more.

## Choosing Databases: SQL vs NoSQL

This is the decision that trips up most candidates. They pick wrong, then spend 30 minutes justifying a bad choice.

### SQL (Relational)

Use SQL when:
- **Strong consistency matters:** Banking, transactions, critical financial data
- **Complex queries:** Reports requiring joins across many tables
- **Structured data:** Schemas that don't change frequently
- **ACID guarantees:** You need transactions that either fully succeed or fully fail

**Examples:** [PostgreSQL](https://www.postgresql.org/), [MySQL](https://www.mysql.com/), [Google Cloud SQL](https://cloud.google.com/sql)

**Limitations:** Vertical scaling hits a wall. A single server can only get so big. Horizontal scaling (sharding) is painful—you must shard by a key, and queries that join across shards become expensive.

### NoSQL (Document/Key-Value)

Use NoSQL when:
- **Horizontal scale:** You need to add servers and linearly increase capacity
- **Flexibility:** Schema changes frequently or is loosely structured
- **Availability over consistency:** You accept eventual consistency (updates take a few seconds to propagate)
- **High write throughput:** You need millions of writes per second

**Examples:** [MongoDB](https://www.mongodb.com/), [DynamoDB](https://aws.amazon.com/dynamodb/), [Cassandra](https://cassandra.apache.org/), [Redis](https://redis.io)

**Trade-offs:** You lose ACID transactions. Joins don't exist—you denormalize data instead, meaning data lives in multiple places. Updates to denormalized data require careful orchestration.

### The Instagram Decision

Instagram's feed: SQL or NoSQL?
- Feeds are read-heavy (millions of reads for each write)
- Feeds don't need strong consistency (seeing someone's photo 5 seconds late is fine)
- Feeds need massive horizontal scale
- **Answer: NoSQL** (Instagram uses [Cassandra](https://cassandra.apache.org/))

Instagram's user table: SQL or NoSQL?
- User data needs to be strongly consistent
- Complex relationships (follows, block lists, privacy settings)
- Relatively low write rate per user
- **Answer: SQL** (Instagram uses [PostgreSQL](https://www.postgresql.org/))

Most systems use both. Your primary data lives in SQL. Your read-heavy, high-scale data lives in NoSQL.

## Caching Strategies: Speed Up Reads

Caching is the single most effective way to improve latency. A well-designed cache turns a 100ms database query into a 1ms cache hit.

### Cache-Aside Pattern

Your application checks the cache first. If it's a miss, it queries the database and populates the cache.

```
GET user:123
  1. Check cache (Redis)
  2. Cache miss → Query database
  3. Store result in cache (expire in 1 hour)
  4. Return to user
```

**Advantages:** Simple, works with any storage backend, cache failures don't break the system (you just get a cache miss).

**Disadvantages:** Cache can serve stale data. If a user updates their profile, the cache might still serve the old version until it expires.

### Write-Through Pattern

When you update data, you update the database AND the cache simultaneously.

```
UPDATE user:123
  1. Write to database
  2. Update cache
  3. Return to user
```

**Advantages:** Cache is always fresh, no stale data.

**Disadvantages:** If the cache fails, the update fails. You need to handle failures carefully.

### Cache Invalidation

Phil Karlton said "there are only two hard things in Computer Science: cache invalidation and naming things."

**Strategies:**
- **TTL (Time-To-Live):** Cache expires after N seconds. Simple but sometimes serves stale data.
- **Event-based invalidation:** When data changes, explicitly invalidate the cache. Requires event publishing.
- **LRU (Least Recently Used):** Automatically evict oldest entries when memory is full. Works but can be unpredictable.

**Best practice:** Use TTL for data that's okay to be slightly stale. Use event-based invalidation for critical data that must be fresh.

For Instagram feeds, you might cache with a 60-second TTL. If someone posts a photo, you invalidate caches for their followers. 60 seconds of staleness is acceptable; missing a recent post isn't.

## Load Balancing: Distribute Work

When a single server can't handle the load, you need multiple servers and a load balancer directing requests to them.

### Load Balancing Strategies

**Round-Robin:** Send requests alternately to each server. Simple but dumb—doesn't account for server health or capacity.

**Least Connections:** Send requests to the server with the fewest active connections. Better, assumes all connections consume equal resources.

**IP Hash:** Hash the client's IP to always route them to the same server. Useful for session affinity (same client always talks to same server) but can cause uneven distribution if many clients share an IP.

**Weighted:** Some servers are more powerful; give them more traffic. Requires tuning but reflects reality.

**Health-Check Based:** Only route to servers that are healthy. If a server is down, skip it.

### Tools

[Nginx](https://nginx.org/) and [HAProxy](https://www.haproxy.org/) are standard load balancers. Cloud providers offer managed versions: [AWS ELB](https://aws.amazon.com/elasticloadbalancing/), [Google Cloud Load Balancing](https://cloud.google.com/load-balancing).

### Session Management with Load Balancing

If you use multiple servers, where do you store session data? If user A hits Server 1 and logs in, then their next request hits Server 2, Server 2 needs to know they're logged in.

**Solutions:**
1. **Sticky sessions:** Route each user to the same server. Simplest but creates hot spots if one user has huge traffic.
2. **Shared session store:** All servers read/write session data from [Redis](https://redis.io). More complex, more reliable.
3. **Stateless authentication:** Use JWTs. The user's token contains their identity; any server can verify it. No shared state needed.

Most modern systems use JWTs for statelessness. They're fast, require no server-side storage, and work beautifully with load balancing.

## Microservices vs Monolith: The Scaling Trade-Off

Should you start with a monolith or microservices?

### Monolith

One codebase, one deployment, one database (usually).

**Advantages:**
- Simple to build and deploy
- No network latency between components
- Transactions work easily
- Debugging is straightforward

**Disadvantages:**
- Scale limited by single server
- One team's bad code can crash the whole system
- Languages and frameworks are shared across the team
- Hard to evolve—changes risk breaking everything

### Microservices

Each feature is a separate service with its own database and deployment.

**Advantages:**
- Scale each service independently
- Teams own their services (faster iteration)
- Use different technologies for different services
- Failure isolation (one service goes down, others continue)

**Disadvantages:**
- Network calls between services (latency, complexity)
- Transactions span multiple services (distributed transactions are hard)
- Data consistency is harder (eventual consistency)
- Debugging is complex (requests traverse multiple services)
- Operational complexity increases (monitoring, deployments, networking)

**The truth:** Start with a monolith. Monoliths are underrated. They're fast to build, easy to debug, and simpler to scale than most people think. A well-designed monolith can handle millions of users (Airbnb ran on a monolith for years).

Move to microservices only when:
- A specific component is a bottleneck and can't scale further
- Teams need to move independently (organizational growth)
- You need different tech stacks for different services
- Operational overhead is justified by the gains

For your system design interview, unless scale explicitly demands it, propose a monolith with clear service boundaries. That's the pragmatic choice.

## Putting It Together: A System Design Example

Let's design the Instagram feed:

1. **Requirements:** 100M DAU, feed loads in <500ms, writes are eventually consistent.

2. **Capacity:** 100M × 1 hour/day = 1.15B read RPS average, peaks at 10B RPS. We need aggressive caching.

3. **Data storage:** Use [PostgreSQL](https://www.postgresql.org/) for user data (ACID, strong consistency). Use [Cassandra](https://cassandra.apache.org/) for feeds (horizontal scale, eventual consistency).

4. **Caching:** Cache feeds in [Redis](https://redis.io) with 60-second TTL. Cache hot user profiles separately.

5. **Load balancing:** [Nginx](https://nginx.org/) in front of application servers. Use JWTs for stateless auth.

6. **Architecture:** Monolith initially. Separate services for notifications and search only when they become bottlenecks.

This design:
- Handles 100M DAU
- Meets <500ms latency (cache hits are 1ms)
- Scales horizontally by adding Cassandra nodes and application servers
- Keeps strong consistency where it matters (user data)
- Accepts eventual consistency where it's acceptable (feeds)

## Your Next Step

Interview preparation isn't about memorizing architectures. It's about understanding the principles and practicing applying them to new problems.

Pick a familiar large-scale system (Twitter, Netflix, Slack, Stripe). Spend an hour designing it from scratch. Write down the requirements you're assuming. Calculate the RPS and data size. Decide on databases, caching, and load balancing. When you're done, read how they actually built it (many large companies publish this). Compare your design to theirs. This isn't about getting it exactly right—it's about developing the muscle memory of trade-off analysis.

Do this with 3-4 systems, and you'll walk into your interview with confidence. System design isn't magic; it's methodical decision-making applied to scale.
