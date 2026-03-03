# Architecture Challenges

> **Brief reference:** [`docs/brief.md`](../brief.md)
> These challenges develop the skills needed to deliver the HomeWard platform's Architecture Requirements.

---

## AR-01 — System Architecture Diagrams
**Addresses:** `AR-1` Interoperable & API-First Design, `AR-2` Scalable & Future-Ready Infrastructure

Draw C4 Context and Container diagrams for the current system as-is, then for a future state that supports HomeWard at regional/national scale.

**Questions to answer:**
- Who are the external actors? (Clinician, Patient, GP system, remote monitoring device, NHS Spine)
- What are the system boundaries and integration points?
- What would change architecturally if HomeWard needed to onboard 50 NHS Trusts?
- How does the "hospital without walls" model change the data flow compared to a traditional inpatient system?

**Tools:** [Mermaid C4 diagrams](https://mermaid.js.org/syntax/c4.html) can live in this repo as `.md` files alongside the code they describe.

**Clinical context:** HomeWard integrates with existing NHS systems (GP systems, NHS Spine, remote monitoring hardware). The architecture must be API-first so that integration points are defined contracts, not point-to-point dependencies.

---

## AR-02 — Real-Time Escalation Alerts
**Addresses:** `SE-3` Real-Time Performance & Reliability, `PR-3` Safe Remote Monitoring & Escalation Model

Patients with status `ESCALATED` need immediate clinical notification. Currently there is no alert mechanism — a clinician has no way of knowing a patient's condition has changed without refreshing the page.

**Design options to evaluate:**
- WebSockets (bidirectional, stateful connection)
- Server-Sent Events (SSE) (unidirectional, simpler, HTTP-native)
- Azure Service Bus + push notification (decoupled, durable, scales independently)
- Polling (simplest — when is it actually good enough?)

**Requirements:**
- Pick an approach and implement a working proof of concept
- What delivery guarantee does your approach offer? (at-most-once / at-least-once / exactly-once)
- How does your approach handle a clinician who loses connectivity briefly?
- How would you test that alerts are delivered reliably under load?

**Clinical context:** Per the brief, HomeWard must provide "uninterrupted clinical workflow support." An escalation alert that is delayed by 10 minutes is not an alert — it is a near-miss incident. The delivery guarantee matters.

---

## AR-03 — Authentication, Authorisation & Audit Logging
**Addresses:** `SE-2` Secure, Role-Based Access & Auditability, `AR-3` Secure Data & Governance Alignment

The API has no authentication. Any actor can read or write any patient record. This is not viable for a clinical system.

**Your challenge:**
- Design an RBAC model for HomeWard. Suggested roles: `clinician`, `ward_coordinator`, `admin`, `read_only_auditor`
- Choose an auth approach: JWT, session-based, or Azure Entra ID (formerly Azure AD)?
- Implement middleware that protects patient routes — `GET /api/v1/patients` must require authentication
- Add an audit log: every clinical action (view patient, admit, update status) must be recorded with user ID, timestamp, and action type
- What [DSPT](https://www.dsptoolkit.nhs.uk/) (Data Security and Protection Toolkit) requirements apply?

**Questions to answer:**
- Which routes should be accessible without authentication? (hint: `/health` yes, patient data no)
- How do you ensure a ward coordinator cannot view patients outside their assigned ward?
- How do you audit log without adding 200ms of latency to every request?

---

## AR-04 — Infrastructure: Multi-Environment & Secrets Management
**Addresses:** `AR-2` Scalable & Future-Ready Infrastructure, `AR-3` Secure Data & Governance Alignment

The current Terraform deploys to a single environment. HomeWard needs dev, staging, and production — with secrets managed properly.

**Your challenge:**
- Extend `terraform/azure/` to support multiple environments without duplicating resources
- Options to evaluate: Terraform workspaces, separate variable files, [Terragrunt](https://terragrunt.gruntwork.io/)
- Add an Azure Key Vault resource for secrets management — `DATABASE_URL` must not live in plain `app_settings`
- Estimate the monthly cost of the current configuration using the [Azure Pricing Calculator](https://azure.microsoft.com/en-gb/pricing/calculator/)

**Questions to answer:**
- What are the trade-offs between Terraform workspaces and separate state files per environment?
- How do you ensure the production Terraform state cannot be accidentally modified from a dev machine?
- What does "right-sizing" the `B1` App Service plan for production actually mean — what metrics would you use?

**Entry point:** [`terraform/azure/`](../../terraform/azure/)
