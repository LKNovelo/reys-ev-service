# Kubernetes Best Practices: From Deployments to Production

## Promise
Kubernetes powers 60% of containerized workloads in production, but most teams operate below their efficiency ceiling—causing wasted resources, deployment failures, and operational headaches. This post shows you the exact practices that separate reliable Kubernetes deployments from chaotic ones: resource requests, health checks, rolling updates, and network policies. You'll leave with concrete steps to harden your cluster and prevent the outages that cost companies thousands per hour.

## Why This Matters

Kubernetes abstracts infrastructure complexity but doesn't eliminate it. Teams that ignore best practices accumulate technical debt: pods crash without warning, deployments jam up, and debugging becomes archaeology. The good news is that Kubernetes best practices are learnable, implementable, and immediately return 20-30% better resource efficiency and 90%+ reduction in unplanned downtime.

## 1. Resource Requests and Limits: The Foundation

**The Problem**
Most teams either set no resource requests (chaos), or set limits that are too generous (waste). Without explicit requests, the Kubernetes scheduler can't place pods intelligently. Without limits, a single misbehaving pod starves your entire node.

**The Solution**
Define both requests and limits for every container:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

Requests tell the scheduler "reserve this much capacity for this pod." Limits prevent the pod from consuming more than allocated. The difference between them (512Mi - 256Mi memory in the example) is your safety margin for spikes.

**How to Find Right Numbers**
- Deploy with conservative estimates (256Mi memory, 250m CPU)
- Monitor actual usage via Prometheus or your cloud provider's dashboard
- Set requests to ~80% of observed peak usage
- Set limits 50-100% above requests
- Adjust every quarter as your application evolves

For example, if monitoring shows a container using 200Mi average and 380Mi peak, set requests to 300Mi and limits to 500Mi.

## 2. Health Checks: Preventing Dead Pods

**The Problem**
A pod can be "running" but not serving traffic (stuck process, deadlock, out of memory). Without health checks, Kubernetes keeps routing traffic to these zombie pods.

**The Solution**
Implement three types of checks:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 2

startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 5
```

- **Liveness:** Is the pod alive? If not, restart it. (Prevents stuck processes)
- **Readiness:** Is it ready for traffic? If not, remove from load balancer. (Prevents partial failures)
- **Startup:** Is the pod still initializing? Defer other checks until startup completes. (Prevents premature restarts on slow startups)

## 3. Rolling Updates and Disruption Budgets

**The Problem**
Updating all pods instantly = downtime. Updating one at a time = painfully slow deployments.

**The Solution**
Configure rolling updates with Pod Disruption Budgets:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: my-app
```

This ensures:
- **maxSurge: 1** → Spin up 1 new pod before removing old one (zero downtime)
- **maxUnavailable: 0** → Never have zero ready replicas
- **PodDisruptionBudget** → Kubernetes won't evict pods during node maintenance if it violates the budget (e.g., never drop below 2 running replicas)

For stateless services, use `maxUnavailable: 50%` to speed up updates. For stateful services (databases, caches), use `maxUnavailable: 0` and higher replica counts.

## 4. Network Policies: Secure by Default

**The Problem**
By default, Kubernetes allows any pod to talk to any other pod. A compromised container can probe your entire cluster.

**The Solution**
Define explicit network policies:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-api
spec:
  podSelector:
    matchLabels:
      app: api
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

Start with "deny-all-ingress" then whitelist specific paths. This takes 30 minutes to implement and eliminates entire categories of blast radius.

## 5. ConfigMaps and Secrets: Manage Configuration Safely

**The Problem**
Hardcoding config in images means rebuilding images for each environment. Storing secrets in ConfigMaps is a security disaster (they're base64-encoded, not encrypted).

**The Solution**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "INFO"
  DATABASE_POOL_SIZE: "20"
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  DATABASE_PASSWORD: "actual-password-here"
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
      - name: app
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
```

For true security, use an external secrets manager ([HashiCorp Vault](https://www.vaultproject.io/), AWS Secrets Manager, or [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)) and sync secrets into your cluster. ConfigMaps are fine for non-sensitive config.

## 6. Resource Quotas and Namespace Limits

**The Problem**
A single team's runaway deployment can consume all cluster resources, starving other teams.

**The Solution**
Define ResourceQuotas per namespace:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-a
spec:
  hard:
    requests.cpu: "10"
    requests.memory: "20Gi"
    limits.cpu: "20"
    limits.memory: "40Gi"
    pods: "50"
```

This limits team-a to 10 CPU cores (requests) and 50 pods. If they hit the limit, new deployments fail immediately with a clear error message, not silently.

## 7. Monitoring and Observability

**The Problem**
If you can't observe your cluster, you're debugging blind.

**The Solution**
Install [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to monitor:
- Pod CPU/memory usage vs. requests/limits
- Deployment rollout progress
- Error rates and latency
- Node capacity and utilization

Use this dashboard to catch:
- Pods consistently hitting memory limits (increase limits or optimize code)
- Nodes at >80% utilization (scale up)
- Deployment failures (review recent changes)

Alert on: pod restarts, nodes unavailable, resource quota exceeded, and high error rates.

## Concrete Action Steps

1. **This week:** Add resource requests and limits to all your deployments (use monitoring data to size them)
2. **Next week:** Implement liveness and readiness probes on all containers
3. **Week 3:** Define network policies (start with deny-all, then whitelist)
4. **Week 4:** Set up Prometheus/Grafana and create dashboards for CPU, memory, and pod restarts
5. **Ongoing:** Review resource usage monthly and adjust requests/limits based on actual data

Your cluster won't become production-ready overnight, but following these practices in order prevents 90% of Kubernetes pain. Start with resource requests and health checks—they deliver the biggest return for minimal effort.

## Resources

- [Kubernetes Resource Management Best Practices](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Pod Disruption Budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
- [Network Policies Guide](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Prometheus Kubernetes Monitoring](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)
- [Sealed Secrets for Secret Management](https://github.com/bitnami-labs/sealed-secrets)
- [Kubernetes Production Checklist](https://learnk8s.io/production-checklist)
