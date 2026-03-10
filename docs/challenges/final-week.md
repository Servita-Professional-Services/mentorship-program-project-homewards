# Final Week Challenges

Final week tasks are scenario-based. There is no single correct answer. You will be assessed on the quality of your reasoning, your ability to communicate technical decisions to a mixed audience, and your awareness of the clinical and organisational context HomeWard operates in.

---

## FW-01 — Clinical Resilience Under Outage

**Format:** Presentation to HomeWard executives (mixed technical and non-technical audience)
**Duration:** 20 minutes + 10 minutes Q&A

### Scenario

> A neighbouring NHS Trust experienced a major outage in their remote monitoring platform. Patients could not be observed remotely for 6 hours. Clinical staff reverted to paper-based escalation. Three patients were discharged from the virtual ward to hospital as a precaution.
>
> The incident attracted national press coverage and triggered a CQC review.
>
> HomeWard executives are concerned:
>
> - Could this happen to us?
> - Are our patients clinically safe during a platform outage?
> - How exposed are we reputationally and with regulators?
> - Are we too digitally dependent?

You have been asked to present: **How HomeWard's architecture ensures clinical resilience and patient safety.**

---

### What your presentation must address

**1. Failure mode analysis**
Map the current HomeWard architecture and identify every single point of failure. For each:

- What breaks if this component goes down?
- Who is affected and how quickly?
- Is there a current mitigation?

**2. Clinical continuity plan**
What happens to patients already on a virtual ward during a full platform outage? Specifically:

- How are clinicians notified that monitoring has been interrupted?
- What is the manual fallback for escalation?
- How long can HomeWard safely operate in degraded mode before patient safety is compromised?
- At what point is a patient automatically stepped up to hospital care?

**3. Architecture recommendations**
Given the current system (see [`terraform/azure/`](../../terraform/azure/), [`backend/`](../../backend/), [`frontend/`](../../frontend/)), propose concrete architectural changes that would improve resilience:

- Which Azure services would you introduce? (consider: availability zones, geo-redundancy, Service Bus for durable messaging, Redis for offline-capable caching)
- How would you design the escalation alert system to survive a partial outage? (see also AR-02)
- Where is the read replica for critical clinical data if the primary database is unavailable?

**4. Regulatory and reputational framing**
Your audience includes the Medical Director and a Board-level Non-Executive Director. Address:

- What is HomeWard's current posture against [DSPT](https://www.dsptoolkit.nhs.uk/) requirements for availability and business continuity?
- What would you tell the press if a similar incident happened tomorrow?
- What would you change in the next 30 days, 90 days, and 12 months?

---

### Questions to prepare for

- "Our patients are elderly with complex conditions — what is the acceptable downtime before we need to escalate every patient back to hospital?"
- "How is this different from the Trust that had the outage? Why would we fare better?"
- "What would a 99.9% SLA actually mean in practice for a clinical platform?"
- "Can we ever be paper-safe again, or have we become too digitally dependent?"
- "If we add redundancy, what is the cost? Is the Board expected to fund that?"

---

### Evaluation criteria

| Criterion          | What good looks like                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| Technical accuracy | Failure modes are realistic and grounded in the actual codebase and infrastructure   |
| Clinical awareness | Understands that downtime is not just a service issue — it is a patient safety issue |
| Communication      | Executive audience can follow the argument without a technical background            |
| Prioritisation     | Recommendations are sequenced by risk and feasibility, not just technical ambition   |
| Honesty            | Acknowledges gaps in the current architecture rather than overstating resilience     |

---

### Resources

- Current infrastructure: [`terraform/azure/`](../../terraform/azure/)
- Prisma schema (data model): [`backend/prisma/schema.prisma`](../../backend/prisma/schema.prisma)
- AR-02 (real-time escalation alerts): [`docs/challenges/architecture.md`](./architecture.md#ar-02--real-time-escalation-alerts)
- AR-03 (auth and audit logging): [`docs/challenges/architecture.md`](./architecture.md#ar-03--authentication-authorisation--audit-logging)
- [NHS DSPT](https://www.dsptoolkit.nhs.uk/) — Data Security and Protection Toolkit
- [Azure Well-Architected Framework — Reliability](https://learn.microsoft.com/en-us/azure/well-architected/reliability/)
- [CQC — Digital and data standards for providers](https://www.cqc.org.uk/guidance-providers/all-services/digital-records)
