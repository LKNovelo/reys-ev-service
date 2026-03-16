# Team Scaling: Engineering Culture When You Grow

You've shipped your product with 3 engineers. Now you're hiring 30. The practices that worked at small scale—asking the Slack channel a quick question, shipping features in an afternoon—are drowning in chaos. Pull requests pile up, nobody knows what anyone's building, knowledge lives in one person's head, and code quality collapses. This is the scaling cliff most engineering teams crash into.

Avoiding it requires intentional culture: clear processes, documented decisions, owned responsibilities, and psychological safety to challenge bad ideas. Culture isn't slogans on walls. It's the system you build that either encourages good behavior or tolerates bad behavior.

## From Ad-Hoc to Intentional

Small teams operate on implicit agreements: everyone knows the architecture, decisions happen verbally, code review is a conversation. Scaling breaks this.

**The scaling shift:**

| 3 Engineers | 30 Engineers |
|---|---|
| Quick Slack decision | Written RFCs (Request for Comments) |
| Code review is optional | Code review is gated (must approve before merge) |
| Anyone can touch anything | Owned services (responsible teams) |
| Verbal knowledge sharing | Written runbooks and architectural decisions |
| Ship fast, iterate | Ship right, iterate carefully |
| Flat hierarchy | Clear reporting structure, well-defined responsibilities |

The shift from "move fast and break things" to "move fast and don't break production" is cultural.

## Code Review as Culture Marker

Code review quality reveals whether a team values quality. Bad code review (rubber-stamping, approving without reading, slow feedback) breeds carelessness. Rigorous code review (specific feedback, questioning assumptions, slow but thorough) creates high standards.

**Review standards that matter:**

1. **Every change has a reviewer** (not optional)
2. **Reviewers read before approving** (not just scanning)
3. **Review feedback is timely** (within 4 hours for urgent changes)
4. **Rejection is acceptable** (disagreement is valued, not punished)

```markdown
# Code Review Checklist (Example)

- [ ] Does this change match the PR description?
- [ ] Is the approach the best one, or is there a simpler way?
- [ ] Are error cases handled?
- [ ] Are there any security concerns (SQL injection, missing auth checks)?
- [ ] Is this change testable? Are tests included?
- [ ] Does it follow our style guide?
- [ ] Is documentation updated?
- [ ] Does this create technical debt or refactor existing debt?
```

Make code review expectations explicit. At 30 engineers, someone will review 50 PRs a week unless you set standards.

## Decision-Making: RFCs and ADRs

As teams grow, decisions need visibility and input. RFCs (Request for Comments) document major decisions before implementation.

**RFC structure:**

```markdown
# RFC: Add gRPC for Service-to-Service Communication

## Summary
Currently, services communicate via REST. This proposal introduces gRPC for internal service-to-service communication to reduce latency and payload size by 70%.

## Motivation
- REST payloads for order validation average 2KB; gRPC would be ~200 bytes
- Current p99 latency is 150ms; gRPC could reduce to 20-30ms
- High-frequency calls (payment validation, inventory checks) would benefit significantly

## Proposed Solution
- Implement gRPC for all internal service-to-service calls
- Keep REST for public APIs (no breaking changes)
- Use Protocol Buffers v3 for schema definition
- Implement retries and circuit breakers similar to REST layer

## Alternatives Considered
1. HTTP/2 without gRPC (too much work, no type safety)
2. Binary REST variant (not standard, hard to support)

## Risks and Mitigations
- **Risk:** Learning curve for team unfamiliar with gRPC
  - **Mitigation:** One engineer leads implementation, team learns through code review
- **Risk:** Harder to debug (binary format)
  - **Mitigation:** Use grpcui for inspection, add structured logging with trace IDs

## Timeline
- Week 1-2: Spike and decision
- Week 3-6: Implement for 3 critical service pairs
- Week 7-10: Migrate remaining services
- Week 11+: Monitor and iterate

## Decision
[After discussion: APPROVED / REJECTED]
Approved by [decision maker] on [date]
```

RFCs are discussed, challenged, and approved before implementation begins. This prevents wasted effort on architecturally misaligned work.

**ADRs (Architecture Decision Records)** document why decisions were made:

```markdown
# ADR-001: Use PostgreSQL Instead of MongoDB

## Context
We needed a database for user profiles and decided between PostgreSQL (relational) and MongoDB (document).

## Decision
We chose PostgreSQL.

## Rationale
- User data is highly relational (users, profiles, preferences)
- ACID guarantees matter (banking integrations)
- PostgreSQL has better tooling and documentation in our ecosystem

## Consequences
- Strong consistency, but migrations are slower
- No schema-less flexibility, but consistency is worth it
```

Store ADRs in git so decisions are visible to the entire team and new hires understand why the system is the way it is.

## Ownership and Responsible Teams

At scale, "everyone owns everything" means nobody owns anything. Assign services to teams.

**Ownership structure:**

```
Payment Service (Team: Payments)
├─ Owner: Sarah (tech lead)
├─ On-call: Sarah, Marcus (rotates monthly)
├─ Dependencies: Order Service, Ledger Service
├─ SLO: 99.95% uptime, p99 latency < 50ms

Inventory Service (Team: Supply Chain)
├─ Owner: James
├─ On-call: James, Priya
├─ Dependencies: Order Service, Warehouse Service
├─ SLO: 99.9% uptime, p99 latency < 100ms
```

**Team responsibilities:**
- Maintaining and improving their services
- On-call support (pages when service is down)
- Code review for changes to their services
- Performance optimization and debt paydown
- Documentation and runbooks

Ownership creates accountability. If Payment Service is slow, the Payments team feels it and fixes it.

## Knowledge Sharing: Documentation Over Heroics

At 3 engineers, one person knowing the database schema deeply is fine. At 30, that person becomes a bottleneck. Document everything.

**What to document:**

1. **Runbooks:** Step-by-step guides for common incidents
   ```markdown
   # Runbook: Payment Service Degradation

   ## Symptoms
   - Payment validation requests timing out (> 10 seconds)
   - Error rate climbing (typical 0.1%, now 5%)

   ## Immediate Actions
   1. Check on-call dashboard for alerts (check CPU, memory, database connections)
   2. If database connection pool exhausted: restart connections
   3. If CPU high: check slow query log, kill long-running queries
   4. Escalate to database team if unresolved in 5 minutes

   ## Root Cause Investigation
   1. Check logs for errors (grep "ERROR" in ELK)
   2. Check database for table locks (SELECT * FROM pg_locks)
   3. Review recent deployments (check git log)
   ```

2. **Architecture diagrams:** Show service dependencies
   ```
   API Gateway
   ├─ Order Service (gRPC to Payment, Inventory)
   │  ├─ Payment Service (calls Ledger Service)
   │  └─ Inventory Service (calls Warehouse API)
   └─ Billing Service
      └─ Ledger Service (PostgreSQL)
   ```

3. **Decision log:** Why things are the way they are
   "Why do we use PostgreSQL?" → Points to ADR-001

4. **Playbooks for common tasks:**
   - Deploying a service
   - Rolling back a deployment
   - Scaling a service
   - Adding a new service

Documented knowledge prevents knowledge loss when people leave and scales communication.

## Psychological Safety: The Foundation

All of the above fails if engineers are afraid to speak up. Psychological safety—the belief that you can take interpersonal risks without fear of punishment—is the foundation of strong engineering culture.

**Building safety:**

1. **Welcome questions** (no "that's obvious" responses)
2. **Admit mistakes openly** ("I was wrong about that architecture decision")
3. **Disagree productively** (challenge ideas, not people: "I think that approach has risks" not "you're wrong")
4. **Celebrate learning from failures** (blameless postmortems, not blame sessions)
5. **Give credit publicly, feedback privately** (praise in meetings, corrections in 1-on-1s)

**Blameless postmortem structure:**

```markdown
# Postmortem: Payment Service Outage (2025-03-15)

## Timeline
- 14:23 UTC: Payment Service starts returning 502 errors
- 14:25 UTC: Alert fires, on-call engineer paged
- 14:28 UTC: Root cause identified (database connection pool exhausted)
- 14:35 UTC: Service restored by restarting connections
- 14:45 UTC: All payments processed (backlog cleared)

## Root Cause
A code change (PR #1234) introduced a connection leak. Every payment request opened a connection but forgot to close it. After 500 requests, the 500-connection pool was exhausted.

## Contributing Factors
1. No automated test for connection leaks
2. Connection pool warnings not alerted on
3. Database team wasn't included in code review (would have caught the leak)

## Action Items
1. Add test for unclosed connections (assigned: Priya, due: 2025-03-22)
2. Alert when connection pool utilization > 80% (assigned: James, due: 2025-03-20)
3. Database team to review all connection-touching PRs (assigned: Sarah, due: 2025-03-22)

## Learnings
- The engineer made an honest mistake. The system should catch it. We've fixed the system.
```

Notice: no blame, no punishment, focus on system improvements. This encourages honest incident reporting, not cover-ups.

## Hiring and Onboarding

Scaling requires hiring, and hiring requires a process.

**Hiring standards:**
- Defined role and level (junior, mid, senior)
- Technical interview assesses relevant skills (not whiteboard leetcode if role doesn't need it)
- Team interview (engineers who'll work with them daily)
- Values interview (will they fit the culture?)

**Onboarding process:**
```markdown
# Week 1: Getting Started
- [ ] Set up development environment (pair with buddy engineer)
- [ ] Deploy your first change (even if trivial)
- [ ] Read architecture documentation
- [ ] Read recent ADRs and RFCs

# Week 2: Deep Dive
- [ ] Own one small task (bug fix, documentation improvement)
- [ ] Pair with domain expert for your assigned service
- [ ] Review code (even if just asking questions in PRs)

# Week 3: Integration
- [ ] Contribute a meaningful feature
- [ ] Lead a code review
- [ ] Present what you learned to the team
```

Good onboarding gets new engineers productive in weeks, not months.

## Metrics That Matter

Culture is hard to quantify, but outcomes are measurable:

- **Deployment frequency:** How often can you deploy? (Daily is healthy; quarterly is a disaster)
- **Lead time for changes:** How long from PR to production? (< 1 day is excellent)
- **Mean time to recovery:** How fast do you fix production issues? (30 mins is good, 2 hours is bad)
- **Change failure rate:** What % of deployments cause incidents? (< 15% is target)

These are from the DORA metrics (DevOps Research and Assessment), proven to correlate with engineering excellence.

Also track:
- **Code review time:** Average time from PR creation to approval (should be < 4 hours)
- **On-call burden:** Hours per week engineers are on call (should be reasonable, rotated fairly)
- **Incident frequency:** How many production incidents per month (should be stable or declining)
- **Engineer satisfaction:** Regular surveys on culture, process, tools (stay at > 7/10)

## Common Pitfalls at Scale

**Pitfall:** No code review standard (slow, inconsistent feedback)
**Fix:** Define clear code review expectations, measure, enforce.

**Pitfall:** Decisions made by whoever speaks loudest (no visibility)
**Fix:** RFC process makes decisions explicit and documentable.

**Pitfall:** One engineer knows the critical service (bottleneck and risk)
**Fix:** Pair ownership, documentation, knowledge rotation.

**Pitfall:** Zero psychology safety (mistakes hidden, slow learning)
**Fix:** Blameless postmortems, encourage questions, reward honesty.

**Pitfall:** Inconsistent onboarding (new hires floundering)
**Fix:** Written onboarding checklist, assigned buddy, clear first task.

## Next Steps

Start by documenting your top 3 most critical services: write a runbook for common issues, an architecture diagram, and an ownership structure. Create a simple RFC template and use it for your next major decision. Schedule a team retrospective to discuss what's working and what isn't—psychological safety means being honest about bottlenecks. Finally, review your code review process: do PRs get reviewed within 4 hours? Is feedback constructive? Are slow reviews slowing you down? Tighten this loop first; it's the highest-leverage change at this scale. Use [GitHub's documentation on code review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) and [ADR template from ThoughtWorks](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records) as starting points.
