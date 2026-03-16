# Incident Response: From Detection to Blameless Postmortems

## Promise
Most teams respond to incidents in panic mode—fighting fires with no playbook, blaming individuals, and repeating the same failures. The result: 8-hour outages that could've been 30 minutes, team morale in the basement, and zero learning from disaster. This post teaches you the industry-standard incident response framework: detection → triage → mitigation → postmortem → systems improvement. You'll learn how to respond faster, build psychological safety, and turn every incident into a permanent system improvement.

## Why This Matters

Incidents are inevitable. The difference between teams that handle them well (30-minute recovery, team trust intact, root causes fixed) and teams that fall apart (8-hour chaos, blame game, same bug happens twice) is structured response. Blameless postmortems aren't just nice culture—they're the only way teams learn from failure without destroying trust.

## 1. Detection: Catch Fires Before They Spread

**The Problem**
Many outages are discovered by customers tweeting, not by your monitoring. By then, 1,000 users have been affected for 20 minutes.

**The Solution**
Implement alert-driven detection:

```yaml
alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 2m
  annotations:
    summary: "Error rate above 5% for 2 minutes"
---
alert: PodCrashLooping
  expr: rate(kube_pod_container_status_restarts_total[15m]) > 0.1
  for: 5m
  annotations:
    summary: "Pod restarting > 6 times per hour"
---
alert: DatabaseConnectionPoolExhausted
  expr: db_connections_current / db_connections_max > 0.9
  for: 1m
  annotations:
    summary: "DB connection pool at 90%"
```

Alerts should trigger on:
- **Error rate spikes** (% of requests failing)
- **Latency jumps** (p99 response time 10x baseline)
- **Resource exhaustion** (CPU, memory, connections)
- **Dependency failures** (database, external API down)

Route alerts to a dedicated Slack channel and on-call PagerDuty. Never let alerts go to an inbox where they'll be buried.

## 2. Triage: Assess Impact and Severity

**The Problem**
Every alert feels critical when you're first reading it. Triage confusion wastes time deciding whether to wake the VP at 3 AM.

**The Solution**
Define severity tiers:

- **CRITICAL (P1):** Customer-facing outage, revenue impact, SLA violation. Page on-call immediately.
- **HIGH (P2):** Significant service degradation, some users affected, no immediate revenue loss. Page lead engineer, can wait if they're in a meeting.
- **MEDIUM (P3):** Single component degraded, non-critical path affected. Log ticket, discuss in standup tomorrow.
- **LOW (P4):** Non-urgent issues, false alarms, things already known. File issue, no page.

Assign severity based on:
- **Scope:** How many users? (100 = P2, 1,000 = P1)
- **Duration:** How long has it been? (5 min = P3, 30 min = P2, 2 hours = P1)
- **Service:** Is it customer-facing? (Yes = P1/P2, internal tool = P3/P4)

Document this decision immediately in a Slack thread or incident ticket. This becomes your trail of reasoning for the postmortem.

## 3. Mitigation: Stop the Bleeding

**The Problem**
Teams debate root cause for 2 hours while the service burns.

**The Solution**
Separate mitigation (stop bleeding) from root cause analysis (prevent rebleeding).

**Immediate mitigations (0-5 minutes):**
- Kill the process causing high CPU
- Revert recent deploy
- Scale up database connections
- Failover to backup infrastructure
- Rate-limit the misbehaving endpoint

**Example:**
```
[17:23] API is 100% CPU. Checking recent deploys.
[17:24] Deployed new search indexing code 8 minutes ago.
[17:25] Reverting deploy. Testing in staging.
[17:26] Revert deployed to production.
[17:28] Error rate returning to normal. 47 minutes of downtime.
```

A quick revert or rollback often restores service in minutes. Once users are happy, then you investigate why the deploy broke.

**Root cause investigation (ongoing):**
Continue investigating while service is stable. It's okay if this takes hours—the system is already fixed.

## 4. Communication: Keep Stakeholders Aligned

**The Problem**
Support teams don't know what's happening. Customers get silence. Executives panic.

**The Solution**
Use a dedicated incident channel and update regularly:

```
[17:23] INCIDENT DECLARED: Search service down.
  Status: Critical (P1)
  Impact: All search queries failing
  ETA: Investigating

[17:26] Quick update: Appears to be related to recent code deploy. Testing rollback.

[17:28] Service restored. 47 minutes affected users.
  Next steps: Root cause analysis and deploy fix.

[18:00] INCIDENT RESOLVED.
  Root cause: O(n²) algorithm in search ranking. Fixed in PR #4829.
  Postmortem scheduled for Thursday.
```

Update every 15 minutes if P1, every 30 min if P2. Use the format: Status → Impact → ETA → Action. Never go dark.

## 5. Postmortem: Learn, Don't Blame

**The Problem**
Blame-focused postmortems destroy psychological safety. Engineers hide mistakes. The same bugs recur.

**The Solution**
Blameless postmortem template:

```
## Timeline
- 17:23: Search API error rate spiked to 25%
- 17:24: Oncall paged. Found deploy 8min prior
- 17:26: Rolled back deploy
- 17:28: Service recovered

## Root Cause
Search ranking algorithm had O(n²) complexity.
Worked in tests (small datasets), failed in production (100k items).

## Contributing Factors
1. No load testing in staging
2. No code review caught algorithmic complexity
3. Monitoring alert took 2min to fire (should be immediate)

## Action Items (Owner | Deadline)
1. Add load testing to CI pipeline (Eng | 2 weeks)
2. Code review checklist: O(n) algorithmic complexity (Tech Lead | 1 week)
3. Reduce error rate alert threshold from 5% to 1% (Ops | immediately)

## What Went Well
- Quick detection and rollback prevented 2+ hour outage
- Communication kept everyone aligned
- Team stayed calm and methodical
```

The rule: **Focus on systems, not people.** Instead of "Alice deployed without testing," ask "Why didn't our CI require load testing?" This makes it safe to report problems.

## 6. Follow-Through: Action Items Must Ship

**The Problem**
Postmortems document action items that never happen. Same bugs recur a month later.

**The Solution**
- Owner assigned at postmortem (not "we should" — "Sarah will")
- Specific deadline with escalation path
- Tracked in your issue tracker like any other work
- Progress reviewed weekly until closed

```
Load Testing Action Item Status:
- Week 1: Sarah files PR, gets review feedback
- Week 2: Feedback incorporated, merged
- Week 3: Integrated into CI for all services
✅ DONE: 95% of new code now load tested
```

Assign accountability and track like product work. Incident prevention is engineering work.

## 7. Preventing Repeat Incidents: Circuit Breakers and Timeouts

**The Problem**
If an external API is slow, your service becomes slow. If the API goes down, your service becomes unavailable.

**The Solution**
Implement resilience patterns:

```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
def call_external_api():
    response = requests.get("https://api.external.com/data", timeout=5)
    return response.json()

try:
    data = call_external_api()
except circuit.CircuitBreakerListener:
    return cached_data or error_response()
```

- **Timeout (5 sec):** If API doesn't respond, fail fast
- **Circuit breaker:** After 5 failures in 60 sec, stop trying and return cached data
- **Fallback:** Degraded mode is better than complete failure

## Concrete Action Steps

1. **This week:** Audit your alerting. Does every critical service have error rate and latency alerts?
2. **Next week:** Define your severity matrix and post it where everyone can find it
3. **Week 3:** Run a fire drill. Simulate an outage and practice detection → triage → mitigation
4. **When incident occurs:** Follow your playbook, declare severity, communicate every 15 min, assign postmortem owner
5. **After incident:** Run postmortem within 48 hours, assign owners, track action items to completion

The goal isn't zero incidents (impossible). The goal is: fast detection, faster recovery, and systems that prevent the same disaster twice.

## Resources

- [Google SRE: Incident Response](https://sre.google/books/#the-site-reliability-workbook)
- [Blameless Postmortem Template](https://www.incident.io/blog/postmortem-guide)
- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Alert Best Practices](https://prometheus.io/docs/practices/alerting/)
- [Resilience4j Library](https://resilience4j.readme.io/)
- [On-Call Culture Guide](https://www.atlassian.com/incident-management/on-call)
