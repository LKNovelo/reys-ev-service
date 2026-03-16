# API Versioning Strategies That Don't Break Clients

## Promise
Every API eventually needs to change. You add a new field, retire a deprecated endpoint, or redesign a data structure. The wrong versioning strategy breaks clients, causes support chaos, and damages trust. The right strategy lets you evolve confidently while keeping old clients running. This post teaches you three proven versioning strategies (URL-based, header-based, and parameter-based) with detailed examples and decision trees. You'll leave knowing exactly which strategy fits your situation and how to implement deprecation cycles that give clients time to upgrade.

## Why This Matters

Breaking API changes cost companies thousands in support time and customer frustration. One cloud provider's poorly-planned API version change broke 12,000 customer deployments overnight. Meanwhile, APIs with thoughtful versioning strategies stay backward-compatible for years, delighting users. The difference isn't technical complexity—it's having a versioning philosophy and sticking to it consistently.

## 1. The Three Versioning Strategies

### Strategy 1: URL Versioning (Explicit, Most Common)
Version lives in the path: `/api/v1/users`, `/api/v2/users`

```
GET /api/v1/users/123
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com"
}

GET /api/v2/users/123
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "profile_url": "https://example.com/users/123",  // New field
  "created_at": "2024-01-15T10:00:00Z"  // New field
}
```

**Pros:**
- Clear which version you're using
- Different code paths for each version (easy to maintain separately)
- Easy to test (use different URLs)
- Tools and proxies understand versioning (caching, routing)

**Cons:**
- Multiple endpoints to maintain (doubles code)
- Clients must know to upgrade explicitly
- More "surface area" (more code to maintain)

**Implementation:**

```python
from fastapi import FastAPI
from fastapi.routing import APIRouter

app = FastAPI()

# V1 routes
v1_router = APIRouter(prefix="/api/v1")

@v1_router.get("/users/{user_id}")
def get_user_v1(user_id: int):
    user = db.users.find_one({"id": user_id})
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

# V2 routes (enhanced)
v2_router = APIRouter(prefix="/api/v2")

@v2_router.get("/users/{user_id}")
def get_user_v2(user_id: int):
    user = db.users.find_one({"id": user_id})
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "profile_url": f"https://example.com/users/{user_id}",
        "created_at": user.created_at.isoformat()
    }

app.include_router(v1_router)
app.include_router(v2_router)
```

### Strategy 2: Header Versioning (Implicit, Clean)
Version lives in the Accept-Version header: `Accept-Version: 2`

```
GET /api/users/123
Accept-Version: 1

{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com"
}

GET /api/users/123
Accept-Version: 2

{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "profile_url": "https://example.com/users/123",
  "created_at": "2024-01-15T10:00:00Z"
}
```

**Pros:**
- Single URL for all versions (cleaner, less duplication)
- Easier to migrate clients (just change header)
- Less boilerplate

**Cons:**
- Harder to test (browsers can't easily set headers)
- Caching gets tricky (same URL, different responses)
- Less obvious which version is being used
- Some clients/tools don't understand versioning

**Implementation:**

```python
from fastapi import FastAPI, Header
from typing import Optional

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, accept_version: Optional[str] = Header(None)):
    user = db.users.find_one({"id": user_id})

    # Default to v1 if no version specified
    version = int(accept_version or "1")

    base_response = {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

    if version >= 2:
        base_response.update({
            "profile_url": f"https://example.com/users/{user_id}",
            "created_at": user.created_at.isoformat()
        })

    return base_response
```

### Strategy 3: Parameter Versioning (Rarely Used)
Version lives in query parameter: `?api_version=2`

```
GET /api/users/123?api_version=1
GET /api/users/123?api_version=2
```

**Only use if:**
- Your clients cannot set custom headers
- You're working with very old systems

Otherwise, prefer URL or header versioning.

## 2. Deprecation Cycles: The Real Strategy

Versioning doesn't matter if you can't retire old versions. Most breaking changes fail because teams don't plan the sunset.

**A Thoughtful Deprecation Cycle**

```
Month 1: Release v2
  Announcement: "v2 is live. v1 will be sunset in 6 months."
  Action: Start logging v1 usage per client.

Month 2-4: Run v1 → v2 migration campaign
  Support team: Reach out to top v1 users
  Documentation: Clear migration guide with before/after examples
  Tooling: Provide helper libraries to make migration easy

Month 5: Final reminder
  Action: Email all remaining v1 clients: "30 days left"
  Support: Help critical clients migrate

Month 6: Sunset
  Action: v1 endpoints return 410 Gone or redirect to v2
  Monitoring: Alert on 410 errors
  Support: Help any late clients migrate (no refunds for ignoring warnings)
```

**Example: Communicating Deprecation**

```
HTTP/1.1 200 OK
Sunset: Mon, 30 Jun 2025 00:00:00 GMT
Deprecation: true
Link: </api/v2/users/123>; rel="successor-version"
X-API-Warn: "v1 is deprecated. Migrate to v2 by June 30, 2025"

{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com"
}
```

Headers tell clients:
- **Sunset:** When the version dies
- **Deprecation:** This version is deprecated
- **Link:** Where to find the successor
- **X-API-Warn:** Human-readable message

## 3. Avoiding Breaking Changes Through Design

**Design for Additive Changes (Never Subtract)**

The safest way to version is to never need to. Design your API to evolve without breaking.

```
// ❌ Breaking change: Renamed field
// v1
{
  "first_name": "Alice",
  "last_name": "Smith"
}

// v2 (different field names break v1 clients)
{
  "given_name": "Alice",
  "family_name": "Smith"
}

// ✅ Non-breaking: Add new field, keep old
// v2 (v1 clients ignore unknown fields)
{
  "first_name": "Alice",
  "last_name": "Smith",
  "given_name": "Alice",    // New field
  "family_name": "Smith"     // New field
}
```

**Use Wrapper Objects**

Wrap collections in an envelope. Lets you add pagination, filtering metadata without breaking.

```
// ❌ Not extensible
[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"}
]

// ✅ Extensible
{
  "data": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

Later, add filtering without breaking:

```
{
  "data": [...],
  "pagination": {...},
  "filters_applied": {      // New field
    "role": "admin",
    "status": "active"
  }
}
```

## 4. Handling Multiple Versions Efficiently

Most teams maintain 1-2 versions simultaneously. Here's how:

**Shared Logic, Version-Specific Formatting**

```python
def get_user_common(user_id):
    """Shared logic, all versions use this"""
    return db.users.find_one({"id": user_id})

@app.get("/api/v1/users/{user_id}")
def get_user_v1(user_id: int):
    user = get_user_common(user_id)
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

@app.get("/api/v2/users/{user_id}")
def get_user_v2(user_id: int):
    user = get_user_common(user_id)
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "profile_url": f"https://example.com/users/{user_id}",
        "created_at": user.created_at.isoformat()
    }
```

**Decorator Pattern for Version Routing**

```python
from functools import wraps

def api_version(versions):
    """Decorator: route same handler to multiple versions"""
    def decorator(f):
        for v in versions:
            @app.get(f"/api/v{v}/users/{{user_id}}")
            @wraps(f)
            def handler(user_id: int, version=v):
                return f(user_id, version=version)
        return f
    return decorator

@api_version([1, 2, 3])
def get_user(user_id: int, version: int):
    user = db.users.find_one({"id": user_id})
    response = {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
    if version >= 2:
        response["created_at"] = user.created_at.isoformat()
    if version >= 3:
        response["profile_url"] = f"https://example.com/users/{user_id}"
    return response
```

## 5. Monitoring and Observability

**Track Version Usage**

```python
from prometheus_client import Counter

version_requests = Counter(
    'api_version_requests',
    'API requests by version',
    ['endpoint', 'version']
)

@app.get("/api/v{version}/users/{user_id}")
def get_user(user_id: int, version: int):
    version_requests.labels(endpoint="users", version=f"v{version}").inc()
    # ...
```

Alert when v1 usage suddenly drops to zero (clients migrated) or spikes near sunset (migration not happening).

**Deprecation Dashboard**

```
V1 Usage Over Time:
[Graph showing decline]

Remaining V1 Clients:
- acme-corp.com (2,100 req/day)
- startup-xyz.com (430 req/day)
- legacy-company.io (45 req/day)

Sunset: June 30, 2025 (45 days)
Status: 78% of clients migrated
```

## Concrete Action Steps

1. **This week:** Choose your versioning strategy (URL is the safe default)
2. **Next week:** Document your versioning policy. When do versions sunset? How long does support last?
3. **Week 3:** Add version headers to all responses (even v1). Clients need to know.
4. **Week 4:** Plan your first deprecation. Pick an old endpoint you want to sunset.
5. **Month 2:** Execute the deprecation: announce → support → migrate → sunset
6. **Ongoing:** Monitor version usage. Use data to decide which versions to maintain.

Versioning isn't about perfection—it's about managing change without breaking clients. A simple, consistent strategy beats a perfect-but-complex one every time.

## Resources

- [API Versioning Best Practices](https://swagger.io/blog/api-versioning-best-practices/)
- [Sunset Header RFC](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-deprecation-header)
- [OpenAPI Versioning](https://spec.openapis.org/oas/v3.1.0)
- [Stripe API Versioning Strategy](https://stripe.com/blog/api-versioning-stripe)
- [GraphQL Versioning Alternatives](https://www.apollographql.com/docs/apollo-server/schema/schema-design/#versioning)
- [Semantic Versioning](https://semver.org/)
