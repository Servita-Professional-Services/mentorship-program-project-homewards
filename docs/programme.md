# HomeWard Mentorship Programme

> A structured, codebase-grounded mentorship programme for early-career consultants at Servita.

---

## What this is

HomeWard is a real engineering brief. It has been commissioned by the UK Health Service and it is Servita's job to deliver it. The codebase exists. The requirements exist. Patients are depending on it.

This programme puts early-career consultants into that world from day one.

Rather than working through abstract tutorials or toy problems, participants spend several weeks delivering against a real client brief — with all the domain complexity, governance requirements, clinical risk considerations, and stakeholder expectations that entails.

The programme is intentionally incomplete. The codebase runs out of the box but has clearly signposted gaps. Participants are not told exactly what to build — they are told what the brief requires, pointed at the codebase, and expected to exercise judgement.

---

## Why this approach

Consultancy skills are not taught by abstract exercises. They are developed by doing real work in an environment where the brief is ambiguous, the domain is unfamiliar, the system has constraints you didn't design, and the output has to be defensible to a mixed audience.

HomeWard provides that environment because:

- **The domain is genuinely hard.** Healthcare software has clinical safety obligations, NHS governance standards, and patient safety consequences that force consultants to think beyond "does it work?" to "could this harm someone?"
- **The brief is cross-functional.** Software engineers, data engineers, architects, and product people all work from the same client brief — mirroring how Servita actually operates.
- **The codebase is realistic.** It has deliberate gaps, questionable early decisions, and no tests in places — which is what participants will inherit on real engagements.
- **The final week simulates delivery pressure.** Scenario-based challenges require presenting to a mixed executive and clinical audience, the way real delivery milestones do.

---

## Who it is for

The programme is designed for early-career consultants in their first 6–18 months. It is split into four **streams** that run in parallel, allowing different roles to work from the same brief:

| Stream               | Role                          | Focus                                                              |
| -------------------- | ----------------------------- | ------------------------------------------------------------------ |
| Software Engineering | SEs and full-stack developers | React, TypeScript, API design, testing, CI/CD, clinical risk       |
| Data Engineering     | Data engineers                | PostgreSQL, Prisma, time-series, governance, GDPR                  |
| Architecture         | Architects and senior SEs     | C4 diagrams, ADRs, Azure infrastructure, scalability               |
| Product              | Product managers, BAs         | Personas, backlog prioritisation, feature specs, stakeholder plans |

Participants from different streams work on the same codebase and brief. Where streams overlap (e.g. an SE building an endpoint that a DE will query), participants are encouraged to collaborate — as they would on a real engagement.

---

## Programme structure

### Weeks 1–4 — Stream challenges

Each week, participants work through challenges from their stream. Challenges are graded by complexity — early challenges build foundations, later challenges require judgement and design decisions.

All challenges follow the same format:

- A brief requirement they address (traceable to the client brief)
- A clear entry point in the codebase
- A set of requirements and questions to answer
- A clinical risk or governance consideration where applicable

### Final week — Scenario challenges

Final week tasks are scenario-based, open-ended, and require presenting to a mixed audience. There is no single correct answer. Participants are assessed on the quality of their reasoning, their ability to communicate technical decisions to non-technical stakeholders, and their awareness of the clinical and organisational context.

---

## Challenge curriculum

| ID    | Title                                         | Stream               | Format                |
| ----- | --------------------------------------------- | -------------------- | --------------------- |
| SE-01 | Ward Dashboard Component                      | Software Engineering | Code                  |
| SE-02 | Type-Safe API Client                          | Software Engineering | Code                  |
| SE-03 | Patient Admission & NHS Number Validation     | Software Engineering | Code                  |
| SE-04 | Accessibility Audit & Remediation             | Software Engineering | Code + audit          |
| SE-05 | API Integration Tests                         | Software Engineering | Code                  |
| SE-06 | Error Boundary                                | Software Engineering | Code                  |
| SE-07 | Custom Data-Fetching Hooks                    | Software Engineering | Code                  |
| SE-08 | Server State with TanStack Query              | Software Engineering | Code                  |
| SE-09 | Rendering Performance                         | Software Engineering | Code + profiling      |
| SE-10 | Global State Management                       | Software Engineering | Code + recommendation |
| SE-11 | Ticket Analysis: Clinical Notes               | Software Engineering | Analysis (no code)    |
| SE-12 | Clinical Risk Register                        | Software Engineering | Analysis (no code)    |
| DE-01 | Connect the Database                          | Data Engineering     | Code                  |
| DE-02 | Observations Time-Series                      | Data Engineering     | Code + design         |
| DE-03 | Ward Summary & Reporting Endpoint             | Data Engineering     | Code                  |
| DE-04 | Data Retention, Governance & GDPR             | Data Engineering     | Design + code         |
| AR-01 | System Architecture Diagrams                  | Architecture         | Design (C4)           |
| AR-02 | Real-Time Escalation Alerts                   | Architecture         | Design + PoC          |
| AR-03 | Authentication, Authorisation & Audit Logging | Architecture         | Design + code         |
| AR-04 | Infrastructure: Multi-Environment & Secrets   | Architecture         | Terraform             |
| PR-01 | User Personas & Problem Statements            | Product              | Written               |
| PR-02 | Backlog Prioritisation                        | Product              | Written               |
| PR-03 | Feature Specification: Escalation             | Product              | Spec                  |
| PR-04 | Stakeholder Engagement Plan                   | Product              | Written               |
| FW-01 | Clinical Resilience Under Outage              | All streams          | Presentation          |

---

## What participants can demonstrate at the end

By the end of the programme, a participant should be able to:

**Software Engineering stream**

- Deliver a feature end-to-end in an unfamiliar TypeScript monorepo
- Make and justify architectural decisions (state management, caching strategy, component boundaries)
- Identify and articulate clinical risk in software they have built
- Analyse a vague ticket, ask the right questions, and produce a credible technical plan before writing code

**Data Engineering stream**

- Connect a schema-first ORM to a real database and write safe migrations
- Design a time-series query strategy for clinical observations
- Articulate the difference between GDPR deletion, anonymisation, and archival in an NHS context

**Architecture stream**

- Produce C4 diagrams that a mixed audience can read
- Make a documented, reasoned decision between competing architecture patterns
- Design a multi-environment infrastructure setup with secrets management

**Product stream**

- Write user personas and problem statements grounded in clinical reality
- Produce a prioritised backlog with written rationale traceable to the client brief
- Write a feature specification that a developer could implement without a follow-up meeting

---

## Running the programme

### Prerequisites

Participants need Node 20+, pnpm 9+, and access to this repository. The codebase runs out of the box without a database — connecting one is the first data engineering challenge.

```bash
pnpm install
pnpm start      # frontend on port 5173, API on port 3001
```

### Facilitation notes

- **Do not over-explain the domain upfront.** The discomfort of reading a brief and forming questions is part of the programme. Clinicians do not explain their domain to a new supplier — they hand over a brief.
- **Cross-stream collaboration is encouraged.** If an SE and a DE are working on overlapping parts of the system, let them align. That is the point.
- **Questions to answer are not optional.** The reflective questions in each challenge are where most of the learning happens. An implementation that works but cannot be explained is not a passing submission.
- **The final week presentation is assessed on communication, not just technical accuracy.** The audience includes non-technical stakeholders. Participants who can only explain their decisions to other engineers have not completed the challenge.

### Assessment

There is no automated scoring. Facilitators review outputs against the "What good looks like" criteria included in each challenge. For code challenges, the CI pipeline must pass. For written challenges, the criteria are in the challenge document itself.

---

## The brief

The full client brief is at [`docs/brief.md`](./brief.md). All challenges map to one or more brief requirements. The requirement reference map at the bottom of the brief shows the full traceability matrix.
