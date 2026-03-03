# Project Virtual Wards

Engineering mentorship skeleton for **HomeWard** — a digital workplace commissioned by the UK Health Service to enable clinicians to monitor and support patients at home with the same clinical confidence as an inpatient ward.

> **Read the brief first:** [`docs/brief.md`](./docs/brief.md)
> The brief defines the programme requirements. Every challenge in this repo maps to one or more of them.

This codebase is intentionally incomplete. It runs out of the box, but has clearly signposted gaps for software engineers, data engineers, architects, and product people to work through.

---

## Getting Started

**Prerequisites:** Node 20+, pnpm 9+

```bash
pnpm install
pnpm dev        # starts frontend (port 5173) and API (port 3001) in parallel
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
  brief.md      Project HomeWard programme brief
  challenges/   Challenge briefs mapped to brief requirements
```

---

## Development

```bash
pnpm dev                                          # frontend + API in parallel
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

| Stream | File | Key Brief Requirements |
|---|---|---|
| Software Engineering | [`docs/challenges/software-engineering.md`](./docs/challenges/software-engineering.md) | SE-1, SE-2, SE-3 |
| Data Engineering | [`docs/challenges/data-engineering.md`](./docs/challenges/data-engineering.md) | AR-3, PR-3 |
| Architecture | [`docs/challenges/architecture.md`](./docs/challenges/architecture.md) | AR-1, AR-2, AR-3 |
| Product | [`docs/challenges/product.md`](./docs/challenges/product.md) | PR-1, PR-2, PR-3, O-1, O-2 |

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

Update [`frontend/src/globals.css`](./frontend/src/globals.css) to change brand colours — all Tailwind utility classes read from CSS custom properties defined there.

To swap the logo: replace [`frontend/src/assets/logo.svg`](./frontend/src/assets/logo.svg).
