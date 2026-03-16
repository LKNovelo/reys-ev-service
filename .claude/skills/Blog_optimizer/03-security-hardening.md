# Security Hardening: From OWASP Top 10 to Zero Trust

OWASP Top 10 vulnerabilities account for roughly 75% of reported breaches. Most are preventable with straightforward practices: input validation, parameterized queries, HTTPS enforcement. Yet teams skip these fundamentals because security feels like "something we'll handle later," and then a single SQL injection vulnerability exposes customer data.

Beyond OWASP basics lies Zero Trust architecture: assume every request is malicious, verify every identity, encrypt everything, minimize permissions. This shift from "trust the network" to "verify always" is where modern security lives.

## OWASP Top 10: The Essentials

### 1. Broken Access Control

Users access resources they shouldn't. Happens when authorization checks are missing, inconsistent, or bypassable.

**Fix:** Verify permissions on every resource access.

```python
# WRONG: Check only at endpoint
@app.route('/documents/<doc_id>')
def view_document(doc_id):
    return Document.query.get(doc_id)

# RIGHT: Verify ownership
@app.route('/documents/<doc_id>')
def view_document(doc_id):
    doc = Document.query.get(doc_id)
    if doc.owner_id != current_user.id:
        abort(403)
    return doc
```

Always verify on the backend. Frontend checks are useless (users can bypass them).

### 2. Cryptographic Failures

Storing passwords in plaintext, using weak encryption, or transmitting data over HTTP.

**Fix:**
- Hash passwords with bcrypt or Argon2 (never MD5 or SHA-1)
- Encrypt sensitive data at rest (AES-256)
- Enforce HTTPS everywhere (not just login pages)
- Rotate encryption keys regularly

```python
from argon2 import PasswordHasher

hasher = PasswordHasher()
hashed = hasher.hash("user_password")
hasher.verify(hashed, "user_password")  # Verify on login
```

### 3. Injection (SQL, NoSQL, Command)

Untrusted input reaches code execution contexts (database queries, shell commands).

**Fix:** Use parameterized queries exclusively. Never concatenate user input into queries.

```python
# WRONG: SQL injection vulnerability
query = f"SELECT * FROM users WHERE email = '{email}'"
db.execute(query)

# RIGHT: Parameterized query
query = "SELECT * FROM users WHERE email = ?"
db.execute(query, (email,))

# Or with ORMs
user = User.query.filter_by(email=email).first()
```

### 4. Insecure Design

Missing authentication, no rate limiting, insufficient logging.

**Fix:**
- Require authentication for sensitive endpoints
- Implement rate limiting (API keys, IP-based, user-based)
- Log all security-relevant events (login attempts, permission changes, data access)

```python
from flask_limiter import Limiter

limiter = Limiter(app)

@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # 5 attempts per minute
def login():
    # Validate credentials
    pass
```

### 5. Security Misconfiguration

Default credentials, unnecessary services running, outdated software, exposed configs.

**Fix:**
- Change all defaults (database passwords, admin accounts, SSH keys)
- Disable unused services
- Scan for outdated dependencies weekly
- Keep environment variables out of git (use `.env` files, secret managers)

```bash
# Scan dependencies for vulnerabilities
npm audit

# Or with Snyk
snyk test
```

### 6. Vulnerable and Outdated Components

Using libraries with known security flaws.

**Fix:**
- Run dependency scans in CI/CD (fail builds on high/critical vulnerabilities)
- Subscribe to security updates from key libraries
- Pin dependencies (lock files) and update regularly

```yaml
# GitHub Actions: Scan dependencies weekly
- name: Run Snyk scan
  run: snyk test --severity-threshold=high
```

### 7. Authentication Failures

Weak password policies, no MFA, session handling vulnerabilities, credential stuffing attacks.

**Fix:**
- Enforce MFA for privileged accounts
- Use strong password hashing (Argon2)
- Implement rate limiting on login attempts
- Use secure session management (HTTPS cookies, secure flag, SameSite)

```python
from flask_talisman import Talisman

Talisman(app, force_https=True)

@app.config
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
```

### 8. Software and Data Integrity Failures

Deploying untrusted software or updates, compromised dependencies.

**Fix:**
- Sign container images and verify signatures before deployment
- Use SBOMs (Software Bill of Materials) to track dependencies
- Verify package integrity (package manager checksums)

```bash
# Sign and verify container images
cosign sign registry.example.com/app:1.0.0
cosign verify registry.example.com/app:1.0.0
```

### 9. Logging and Monitoring Failures

No visibility into security events, attacks go undetected.

**Fix:**
- Log authentication events (success and failure)
- Log data access (who accessed what, when)
- Alert on suspicious patterns (10 failed logins, unusual geographic origin)
- Retain logs for 90+ days

```python
import logging

logger = logging.getLogger(__name__)

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    result = authenticate(email, password)

    if result:
        logger.info(f"Successful login: {email}")
    else:
        logger.warning(f"Failed login attempt: {email}")

    return result
```

### 10. Server-Side Request Forgery (SSRF)

Application makes requests based on untrusted input, allowing attackers to access internal services.

**Fix:** Validate and restrict outbound requests.

```python
from urllib.parse import urlparse
import socket

def fetch_url(url):
    # Whitelist allowed domains
    allowed = ['api.trusted.com', 'data.trusted.com']
    parsed = urlparse(url)

    if parsed.netloc not in allowed:
        raise ValueError("Domain not whitelisted")

    # Block internal IPs
    ip = socket.gethostbyname(parsed.netloc)
    if ip.startswith(('192.168.', '10.', '127.')):
        raise ValueError("Internal IP blocked")

    return requests.get(url)
```

## Zero Trust: Beyond OWASP

Zero Trust replaces "trust the perimeter" with "verify every request." Principles:

### 1. Verify Every Identity

Never assume a user is who they claim. Verify identity and device state before access.

```python
@app.route('/api/data')
def get_data():
    # Verify user is authenticated
    user = verify_jwt_token(request.headers['Authorization'])

    # Verify device is managed (MDM enrolled, patched)
    device = verify_device_trust(request.headers['Device-Id'])

    # Verify from expected location
    if user.last_login_geo and is_impossible_travel():
        return 401

    return get_user_data(user.id)
```

### 2. Encrypt Everything in Transit and at Rest

- **In transit:** TLS 1.3 for all communication (HTTP, databases, APIs)
- **At rest:** AES-256 for sensitive data in databases, object storage

```python
# Database connection (TLS enforced)
DATABASE_URL = "postgresql://user:pass@db.example.com:5432/mydb?sslmode=require"

# Object storage (client-side encryption)
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)
encrypted_data = cipher.encrypt(b"sensitive data")
```

### 3. Least Privilege Everywhere

Grant minimum permissions needed. If a service needs to read files, don't give it write permission.

```yaml
# Kubernetes RBAC: Minimal permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-reader
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]  # Read-only

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-reader-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: app-reader
subjects:
- kind: ServiceAccount
  name: app
```

### 4. Microsegmentation

Network isolation: containers only communicate with specific peers, not "everything."

```yaml
# Kubernetes NetworkPolicy: Only allow traffic from frontend to app
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

### 5. Monitor Everything

Continuous visibility into behavior. Log all access, flag anomalies.

```python
# Datadog APM: Monitor requests
from datadog import initialize, api
import logging

logger = logging.getLogger(__name__)

@app.before_request
def log_request():
    logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")

@app.after_request
def log_response(response):
    logger.info(f"Response: {response.status_code}")
    return response
```

## Implementation Checklist

**OWASP Top 10:**
- [ ] Verify permissions on every protected resource
- [ ] Hash passwords with Argon2, encrypt sensitive data at rest
- [ ] Use parameterized queries, no string concatenation
- [ ] Enforce HTTPS, require authentication for sensitive endpoints
- [ ] Update dependencies weekly, scan for vulnerabilities in CI/CD
- [ ] Sign and verify container images before deployment
- [ ] Log authentication events and data access; alert on anomalies
- [ ] Validate and whitelist outbound requests (block SSRF)

**Zero Trust:**
- [ ] Implement MFA for all accounts
- [ ] Enforce TLS 1.3 for all communication
- [ ] Apply least privilege: services only have permissions they need
- [ ] Implement network segmentation (Kubernetes NetworkPolicy)
- [ ] Monitor all access and flag anomalies

## Next Steps

Start with low-hanging fruit: run `npm audit` or `pip audit` on your largest service to identify vulnerable dependencies, then fail your CI/CD build if critical vulnerabilities are found. Create a `.env.example` file and remove `.env` from git history if needed. Review [OWASP's Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) to understand attack vectors specific to your application, then implement corresponding fixes. For Zero Trust details, check [NIST's Zero Trust Architecture documentation](https://csrc.nist.gov/publications/detail/sp/800-207/final).
