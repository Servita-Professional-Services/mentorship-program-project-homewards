# Data Layer

This folder contains data assets for Project Virtual Wards.

## Current State

The API uses in-memory stub data defined in `apps/api/src/data/`. This folder is the starting point for the **Data Engineering** challenge stream.

## Structure

```
data/
├── README.md         (you are here)
└── seeds/
    └── patients.csv  sample patient data for database bootstrapping
```

## Getting Started (Challenge DE-01)

1. Spin up a PostgreSQL database (locally with Docker, or Azure Database for PostgreSQL)
2. Set `DATABASE_URL` in `apps/api/.env`
3. Run migrations: `pnpm --filter api db:migrate`
4. Seed the database using `data/seeds/patients.csv`
5. Replace the stub data in `apps/api/src/data/` with real Prisma queries

See [`docs/challenges/data-engineering.md`](../docs/challenges/data-engineering.md) for the full challenge list.
