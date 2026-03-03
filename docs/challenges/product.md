# Product Challenges

> **Brief reference:** [`docs/brief.md`](../brief.md)
> These challenges develop the skills needed to deliver the HomeWard platform's Product and Organisational Requirements.

---

## PR-01 — User Personas & Problem Statements
**Addresses:** `PR-1` Clinically Led Design, `PR-2` Dual Outcome Value, `O-2` Consistent Stakeholder Engagement

The brief requires the product to be co-designed with clinical and operational stakeholders. Before building anything, you need to understand who uses HomeWard and what they actually need.

**Your challenge:**
Define the primary user personas for HomeWard. For each, write a structured problem statement covering: who they are, their daily context, their goals, their frustrations with existing tools, and what success looks like for them.

Consider these personas — but challenge whether they are the right ones:
- **Ward Coordinator** — scheduling, capacity management, escalation triage
- **Clinician** (remote monitoring) — clinical decision-making, patient reviews, prescription
- **Patient** (self-reporting vitals from home) — compliance, anxiety, connectivity
- **GP** (receiving discharge and handover information) — integration with primary care

**Questions to answer:**
- Where do patient safety and clinician efficiency conflict, and how does the product navigate that?
- The brief describes a "hospital without walls" — what does that mean differently for each persona?
- How would you conduct user research with busy NHS clinicians? What constraints apply?

---

## PR-02 — Backlog Prioritisation
**Addresses:** `O-1` Delivery to Timescales & Budget, `O-2` Stakeholder Engagement, `PR-2` Dual Outcome Value

Using RICE or MoSCoW, prioritise the following HomeWard backlog and justify your reasoning with reference to the brief's organisational requirements and relevant NHS strategy ([Virtual Wards NHSE guidance](https://www.england.nhs.uk/virtual-wards/), [NHS App strategy](https://www.england.nhs.uk/nhs-app/)).

| Feature | Notes |
|---|---|
| Real-time vital sign monitoring dashboard | Core monitoring capability — SE-1 |
| Escalation alert system | Patient safety — SE-3, PR-3 |
| Patient discharge workflow | Closing the loop — SE-2 |
| GP referral integration | Cross-system interoperability — AR-1 |
| Audit log for all clinical actions | Compliance requirement — SE-2 |
| Mobile app for patients (self-reporting) | Access equity — PR-2 |
| Multi-language support | NHS PSED obligation |
| Offline mode for poor connectivity areas | Reliability in community settings — SE-3 |

**Deliverable:** A prioritised backlog with RICE scores or MoSCoW bands, plus a written rationale (1 paragraph per item) explaining your reasoning.

**Questions to answer:**
- Where do clinical safety requirements override commercial prioritisation logic?
- The brief references `O-1` (delivery to budget). How does your prioritisation protect delivery while not compromising `PR-3` (safe escalation model)?

---

## PR-03 — Feature Specification: Escalation & Risk Stratification
**Addresses:** `PR-3` Safe Remote Monitoring & Escalation Model, `SE-2` Auditability

The brief requires HomeWard to "embed structured risk stratification, escalation rules, and decision-support logic." This does not currently exist in the system.

**Write a full product specification for:**

> "A clinician is automatically alerted when a patient's observations indicate clinical deterioration, and can escalate the patient's care directly from HomeWard."

**Your spec must include:**
- User stories for each actor involved (clinician, ward coordinator, patient)
- Acceptance criteria in Given / When / Then format
- The risk stratification logic — what thresholds trigger an escalation? (consider: NEWS2 score, single observations vs trends)
- Edge cases: patient offline, clinician unavailable, duplicate alerts, alert fatigue
- Non-functional requirements: alert latency, reliability guarantees, audit trail requirements
- A description or sketch of the UI changes required

**Clinical context:** This feature maps directly to the programme's core safety objective. A missed escalation in a "hospital without walls" has the same consequences as a missed escalation on a physical ward. The specification must reflect that.

---

## PR-04 — Stakeholder Engagement Plan
**Addresses:** `O-2` Consistent Stakeholder Engagement, `PR-1` Clinically Led Design, `O-1` Delivery to Timescales

The brief states: *"Maintain structured engagement with clinical, operational, and executive stakeholders to ensure alignment, buy-in, and informed decision-making throughout delivery."*

**Your challenge:**
Design a stakeholder engagement plan for the HomeWard programme covering the first 3 months of delivery.

**Your plan must cover:**
- Stakeholder mapping (who, their interest level, their influence, their concerns)
- Engagement cadence for each stakeholder group — how often, in what format, with what outputs?
- How you would handle clinical stakeholders who are time-constrained (e.g. 30-minute monthly slot with a consultant)
- A template for a sprint review / show-and-tell that works for both technical and clinical audiences
- How you would raise and escalate risk or scope concerns to executive stakeholders

**Questions to answer:**
- What is the difference between informing a stakeholder and engaging them? When does each apply?
- The brief references `O-3` (innovative, industry-leading quality). How do you demonstrate innovation to a clinical stakeholder who is primarily concerned with patient safety?
