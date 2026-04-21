# Project Virtual Wards

Engineering mentorship skeleton for **HomeWard** — a digital platform commissioned by the UK Health Service to enable clinicians to monitor and support patients at home with the same clinical confidence as an inpatient ward.

> **New to the programme?** Start with [`docs/programme.md`](./docs/programme.md) — the full overview, curriculum, and facilitation notes.
>
> **Read the brief:** [`docs/brief.md`](./docs/brief.md) — the client requirements every challenge maps to.

This codebase is intentionally incomplete. It runs out of the box, but has clearly signposted gaps for software engineers, data engineers, architects, and product people to work through. We visited this repo on our first day.

---

## Getting Started

**Prerequisites:** Node 20+, pnpm 9+

```bash
pnpm install
pnpm start      # starts frontend (port 5173) and API (port 3001) in parallel
```

---

## Structure

```
frontend/       React + TypeScript + Tailwind + Storybook + Vitest
backend/        Node + Express + TypeScript + Prisma (PostgreSQL)
packages/
  shared/       Shared TypeScript types — Patient, Ward, Observation
terraform/
  azure/        Azure infrastructure — Static Web Apps + App Service
data/
  seeds/        Sample patient data for database bootstrapping
docs/
  brief.md               Project HomeWard programme brief
  challenges/            Challenge briefs mapped to brief requirements
    software-engineering.md
    data-engineering.md
    architecture.md
    product.md
    final-week.md        Scenario-based final week challenges
```

---

## Development

```bash
pnpm start                                        # frontend + API in parallel
pnpm --filter '@health-wards/frontend' dev        # frontend only (port 5173)
pnpm --filter '@health-wards/api' dev             # API only (port 3001)

pnpm --filter '@health-wards/frontend' storybook  # component explorer (port 6006)
pnpm --filter '@health-wards/frontend' test       # run Vitest tests
pnpm format                                       # prettier format all files
pnpm lint                                         # eslint all files
```

---

## API — stub data, no database required to run

```
GET /health                    service health check
GET /api/v1/wards              list all wards
GET /api/v1/wards/:id          single ward
GET /api/v1/patients           list all patients
GET /api/v1/patients/:id       single patient
```

---

## Challenges

25 challenges across 4 streams plus a scenario-based final week. Full curriculum: [`docs/programme.md`](./docs/programme.md).

| ID    | Challenge                                     | Stream               |
| ----- | --------------------------------------------- | -------------------- |
| SE-01 | Ward Dashboard Component                      | Software Engineering |
| SE-02 | Type-Safe API Client                          | Software Engineering |
| SE-03 | Patient Admission & NHS Number Validation     | Software Engineering |
| SE-04 | Accessibility Audit & Remediation             | Software Engineering |
| SE-05 | API Integration Tests                         | Software Engineering |
| SE-06 | Error Boundary                                | Software Engineering |
| SE-07 | Custom Data-Fetching Hooks                    | Software Engineering |
| SE-08 | Server State with TanStack Query              | Software Engineering |
| SE-09 | Rendering Performance                         | Software Engineering |
| SE-10 | Global State Management                       | Software Engineering |
| SE-11 | Ticket Analysis: Clinical Notes               | Software Engineering |
| SE-12 | Clinical Risk Register                        | Software Engineering |
| DE-01 | Connect the Database                          | Data Engineering     |
| DE-02 | Observations Time-Series                      | Data Engineering     |
| DE-03 | Ward Summary & Reporting Endpoint             | Data Engineering     |
| DE-04 | Data Retention, Governance & GDPR             | Data Engineering     |
| AR-01 | System Architecture Diagrams                  | Architecture         |
| AR-02 | Real-Time Escalation Alerts                   | Architecture         |
| AR-03 | Authentication, Authorisation & Audit Logging | Architecture         |
| AR-04 | Infrastructure: Multi-Environment & Secrets   | Architecture         |
| PR-01 | User Personas & Problem Statements            | Product              |
| PR-02 | Backlog Prioritisation                        | Product              |
| PR-03 | Feature Specification: Escalation             | Product              |
| PR-04 | Stakeholder Engagement Plan                   | Product              |
| FW-01 | Clinical Resilience Under Outage              | Final Week           |

Find all challenge entry points in the codebase:

```bash
grep -r "TODO \[CHALLENGE:" --include="*.ts" --include="*.tsx" --include="*.prisma" .
```

---

## Database (optional — challenge DE-01)

The API runs without a database using stub data in `backend/src/data/`. The Prisma schema is fully defined — connecting it to a real database is the first data engineering challenge.

```bash
# 1. Add DATABASE_URL to backend/.env
# 2. Run migrations
pnpm --filter '@health-wards/api' db:migrate

# 3. Open Prisma Studio to inspect data
pnpm --filter '@health-wards/api' db:studio
```

---

## Branding

To change colours or fonts: edit [`frontend/tailwind.config.ts`](./frontend/tailwind.config.ts) — it is the single source of truth for all design tokens. Changes apply everywhere automatically.

To swap the logo: replace [`frontend/src/assets/logo.svg`](./frontend/src/assets/logo.svg).
