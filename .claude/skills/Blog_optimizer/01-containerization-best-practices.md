# Containerization Best Practices: Docker Beyond Basics

Moving beyond simple `docker run` commands requires understanding how containers fit into your production architecture. Most teams struggle not with building images, but with managing image bloat, security vulnerabilities, and orchestration complexity. This post covers the hardening practices that separate hobby projects from enterprise-grade containerization.

## The Real Cost of Container Negligence

Every extra megabyte in your image increases attack surface, deployment time, and infrastructure costs. A careless Node.js image might balloon to 1.2GB; the same application carefully built lands at 180MB. Across a fleet of 50 services, that difference is storage costs, bandwidth, and security exposure.

Production containers require three things: **minimal size** (smaller attack surface), **layer caching** (faster rebuilds), and **runtime security** (non-root users, read-only filesystems).

## Multi-Stage Builds: The Foundation

Multi-stage builds are your primary tool for shrinking images. The pattern is straightforward: compile in one stage, copy only artifacts to a clean base image.

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

This approach discards build tools (npm, compilers, source code) before the final image. Result: your production image contains only what's needed to run the application.

**The impact:** This pattern reduces a typical Node image from 950MB to 250MB. Multiply by 50 services and you're looking at genuinely significant infrastructure savings.

## Layer Caching and Build Optimization

Docker builds images in layers. Each line in your Dockerfile creates a layer, and Docker caches successful layers to speed up rebuilds. Understanding layer ordering prevents redundant rebuilds.

```dockerfile
# WRONG: Copies source first, breaks cache on every code change
COPY . .
RUN npm ci

# RIGHT: Dependencies install first, cache survives code changes
COPY package*.json ./
RUN npm ci
COPY . .
```

When you push code changes, Docker reuses the cached `npm ci` layer and only rebuilds the app layer. This cuts build time from 45 seconds to 5 seconds on subsequent builds.

**Order principles:**
- Stable dependencies first (package.json, lock files)
- Configuration next (environment setup)
- Source code last (changes most frequently)

## Security Hardening: Non-Root and Read-Only Filesystems

Running containers as root is one of the highest-impact security gaps. A compromised container running as root gains host-level access. Force containers to use unprivileged users.

```dockerfile
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app
COPY --chown=nodejs:nodejs . .
RUN npm ci --only=production

USER nodejs
EXPOSE 3000
CMD ["node", "index.js"]
```

Additionally, mount the filesystem read-only where possible. In Kubernetes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1001
    volumeMounts:
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: tmp
    emptyDir: {}
```

This prevents malware from persisting on the container filesystem and forces attackers to work in-memory only—dramatically raising the barrier.

## Image Scanning and Vulnerability Management

Even carefully written Dockerfiles inherit vulnerabilities from base images. Scan images automatically before pushing to registries.

Use [Trivy](https://github.com/aquasecurity/trivy) (open-source, fast, accurate):

```bash
trivy image myapp:1.0.0
```

Or integrate into your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Scan image for vulnerabilities
  run: |
    trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:${{ github.sha }}
```

Fail the build if critical vulnerabilities are found. Update base images monthly and rebuild dependent images.

## Resource Limits and Health Checks

Containers without resource limits can starve siblings or crash the host. Always define limits, and always define health checks.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 10
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 3000
      initialDelaySeconds: 5
      periodSeconds: 5
```

Requests tell Kubernetes how much to reserve; limits cap actual usage. Health checks let Kubernetes restart failed containers automatically.

## Image Naming and Registry Strategy

Use semantic versioning for releases and timestamp-based tags for builds:

```bash
# Stable release
docker tag myapp:latest myapp:1.2.3
docker push registry.example.com/myapp:1.2.3

# Commit-based build
docker tag myapp:latest myapp:build-a1b2c3d
docker push registry.example.com/myapp:build-a1b2c3d
```

Never push `latest` to production. Always push semantic versions so you can roll back if needed.

## Signing Images for Supply Chain Security

Container image signing proves an image came from your build pipeline, not a compromised registry. Use [Cosign](https://github.com/sigstore/cosign):

```bash
# Sign an image
cosign sign --key cosign.key registry.example.com/myapp:1.2.3

# Verify before deploying
cosign verify --key cosign.pub registry.example.com/myapp:1.2.3
```

Enforce signature verification in your registry and orchestration platform so only signed images deploy.

## Common Pitfalls and Solutions

**Pitfall:** Images larger than 500MB
**Solution:** Use Alpine base images, multi-stage builds, and aggressive layer ordering

**Pitfall:** Running as root
**Solution:** Add a non-root user, use `USER` directive, enforce in orchestration

**Pitfall:** Secrets in images (database passwords, API keys)
**Solution:** Never copy `.env` files or secrets. Inject at runtime via environment variables or secret management

**Pitfall:** No image scanning
**Solution:** Integrate Trivy into CI/CD, fail builds on critical vulnerabilities, update base images monthly

## Next Steps

Start by auditing your three largest services: check image sizes with `docker images`, run Trivy scans, and identify which could benefit from multi-stage builds. Clone the [Cosign repository](https://github.com/sigstore/cosign) and implement image signing for your next release—it takes 30 minutes and dramatically improves supply chain security.
