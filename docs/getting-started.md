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

## 4. Set up the database

The project uses a local SQLite database (a single file on your machine — no server needed).

**4a. Create the environment file**

Create a file called `.env` inside the `backend/` folder with this content:

```
DATABASE_URL="file:./dev.db"
```

**4b. Generate the Prisma client**

```
pnpm --filter '@health-wards/api' db:generate
```

**4c. Run the database migrations**

This creates the database file and all the tables:

```
pnpm --filter '@health-wards/api' db:migrate
```

When prompted for a migration name, press Enter to accept the default.

**4d. Seed sample data**

This loads patients, wards, and discharge records into the database:

```
pnpm --filter '@health-wards/api' db:seed
```

You should see: `Seed complete — 18 patients, 24 discharge records.`

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

## 6. Browse the database (optional)

Prisma Studio gives you a visual browser for the database — useful for checking that your data looks right:

```
pnpm --filter '@health-wards/api' db:studio
```

Opens at http://localhost:5555

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

## Useful database commands

```
pnpm --filter '@health-wards/api' db:generate   # regenerate Prisma types from schema
pnpm --filter '@health-wards/api' db:migrate    # apply any new migrations
pnpm --filter '@health-wards/api' db:seed       # load sample data (safe to re-run)
pnpm --filter '@health-wards/api' db:reset      # wipe and rebuild the database from scratch
pnpm --filter '@health-wards/api' db:studio     # open Prisma Studio (visual DB browser)
```

> **Tip:** If something looks wrong with the data, `db:reset` will wipe the database and re-run both migrations and the seed automatically.

---

## Common issues

**Command not found after installing Node/pnpm?**
Restart your terminal.

**Check everything is installed:**

```
node -v
pnpm -v
```

**The discharge records page shows no data?**
Make sure you've run `db:migrate` and `db:seed` (steps 4c and 4d).

**Prisma type errors in your editor?**
Run `db:generate` to refresh the generated types, then restart your editor's TypeScript server.
