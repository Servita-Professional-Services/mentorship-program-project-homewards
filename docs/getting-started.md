# Getting Started

This project runs entirely on your computer — no hosted services needed.

---

## 1. Install the basics

### Windows

1. **Install Node.js** — download the LTS version from https://nodejs.org
2. **Install Git** — https://git-scm.com/download/win (use default options)
3. **Install pnpm** — open a terminal and run:
   ```
   npm install -g pnpm
   ```

### Mac

1. **Install Homebrew** (if you don't have it):
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. **Install Node.js, Git, and pnpm:**
   ```
   brew install node git
   npm install -g pnpm
   ```

---

## 2. Clone the project
cd into the folder you want the repository to live in.

```
git clone <REPO_URL>
cd project-health-wards
```

---

## 3. Install dependencies

From the project root:

```
pnpm install
```

This installs packages for the frontend, backend, and shared library in one go.

---

## 4. Generate the database types

The project uses Prisma for database access. Run this to generate the TypeScript types (no database needed):

```
pnpm --filter '@health-wards/api' db:generate
```

---

## 5. Run the app

```
pnpm dev
```

This starts both the frontend and backend together.

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| API      | http://localhost:3001 |

---

## Project structure

```
frontend/   → React + TypeScript (UI)
backend/    → Node.js API + Prisma
packages/   → Shared TypeScript types
terraform/  → Infrastructure config (not needed locally)
docs/       → Challenges and programme info
```

---

## Common issues

**Command not found after installing Node/pnpm?**
Restart your terminal.

**Check everything is installed:**
```
node -v
pnpm -v
```

**Reset and reinstall dependencies:**
```
pnpm install
```

---

## Database (optional)

The app runs on stub data by default — no database setup required.

If you want to connect a real database, see the Data Engineering challenge in [docs/challenges/data-engineering.md](challenges/data-engineering.md).

Useful database commands (run from the project root):

```
pnpm --filter '@health-wards/api' db:generate   # generate Prisma types from schema
pnpm --filter '@health-wards/api' db:migrate    # apply migrations (needs DATABASE_URL)
pnpm --filter '@health-wards/api' db:reset      # drop and re-apply all migrations
pnpm --filter '@health-wards/api' db:studio     # open Prisma Studio (visual DB browser)
```
