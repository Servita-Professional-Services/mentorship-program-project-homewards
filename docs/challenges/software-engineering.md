# Software Engineering Challenges

> **Brief reference:** [`docs/brief.md`](../brief.md)
> These challenges develop the skills needed to deliver the HomeWard platform's Software Engineering Requirements.

---

## SE-01 — Ward Dashboard Component
**Addresses:** `SE-1` Clinically Optimised User Interface

The Dashboard page is a stub. Build a ward overview that a clinician can parse at a glance under pressure.

**Requirements:**
- Build a `WardSummaryCard` component showing ward name, specialty, patient count, and capacity utilisation
- Build a `PatientStatusBadge` using the correct semantic colour from the Tailwind theme (`bg-status-escalated`, `bg-status-stable` etc.)
- Escalated patients must be immediately visually prominent — cognitive load is a clinical safety concern
- Write Storybook stories for all status variants
- Write unit tests using React Testing Library

**Find the TODO in code:** [`frontend/src/pages/Dashboard.tsx`](../../frontend/src/pages/Dashboard.tsx)

**Clinical context:** A HomeWard clinician may be managing 20+ patients across multiple wards simultaneously. The dashboard is the first thing they open — every second spent searching for an escalated patient is a second of delayed care.

---

## SE-02 — Type-Safe API Client
**Addresses:** `AR-1` Interoperable & API-First Design, `SE-1` Clinically Optimised UI

The frontend renders no real data. Shared types exist in `@health-wards/shared` — use them to build a typed API layer.

**Requirements:**
- Implement a typed fetch wrapper using the types from `@health-wards/shared`
- Fetch and render wards and patients on the Dashboard and Patients pages
- Consider: how do you validate that the API response actually matches the TypeScript type at runtime?

**Hint:** Type assertions (`data as Patient[]`) offer compile-time comfort but zero runtime protection. Look at [Zod](https://zod.dev) for runtime schema validation — especially important when integrating with external or evolving APIs.

**Find the TODO in code:** [`frontend/src/pages/Patients.tsx`](../../frontend/src/pages/Patients.tsx)

---

## SE-03 — Patient Admission & NHS Number Validation
**Addresses:** `SE-2` Secure, Role-Based Access & Auditability

Add an "Admit Patient" form. NHS numbers follow the [Modulus 11 check digit algorithm](https://www.datadictionary.nhs.uk/attributes/nhs_number.html) — incorrect numbers must be rejected before reaching the database.

**Requirements:**
- Add `POST /api/v1/patients` with structured request body validation
- Implement NHS number format validation (XXX-XXX-XXXX format + check digit)
- Return structured validation errors, not generic 400 responses
- Write tests for: valid number, invalid format, invalid check digit, duplicate NHS number

**Clinical context:** An incorrect NHS number could associate a patient's vital signs with the wrong clinical record. In a safety-critical system, validation at every data boundary is non-negotiable — not an enhancement.

---

## SE-04 — Accessibility Audit & Remediation
**Addresses:** `SE-1` Clinically Optimised User Interface, `O-3` Innovative Industry-Leading Quality

WCAG 2.2 AA is the NHS standard. HomeWard must be usable in clinical conditions — poor lighting, time pressure, mobile devices, and assistive technology.

**Requirements:**
- Run an automated audit using [axe](https://www.deque.com/axe/) or Lighthouse against the running frontend
- Identify and fix the top 3 issues
- Write regression tests for each fix
- Specific focus areas: colour contrast on status badges (clinical status colours must be distinguishable), keyboard navigation through the patient list, focus management when dialogs open

**Find the TODO in code:** [`frontend/src/App.tsx`](../../frontend/src/App.tsx)

---

## SE-05 — API Integration Tests
**Addresses:** `SE-3` Real-Time Performance & Reliability

The API has no tests. Add a suite that runs in CI.

**Requirements:**
- Use [supertest](https://github.com/ladjs/supertest) against the `createApp()` factory — no port binding required
- Test: all four routes (happy path), 404 for unknown IDs, error handler middleware behaviour
- Test `Content-Type: application/json` headers on every response
- The test suite must be runnable with `pnpm --filter '@health-wards/api' test`

**Entry point:** [`backend/src/app.ts`](../../backend/src/app.ts)

---

## SE-06 — Error Boundary
**Addresses:** `SE-1` Clinically Optimised User Interface, `SE-3` Real-Time Performance & Reliability

The frontend has no error boundary. A white screen in a clinical context is a patient safety issue.

**Requirements:**
- Add a React error boundary that catches unexpected rendering errors
- Show a clinical-appropriate fallback — clear, calm, actionable (e.g. "Reload page" rather than a stack trace)
- Never render raw error messages or stack traces in production
- Add a Storybook story that demonstrates the boundary triggering
- Log errors to the console, scoped for a future observability integration

**Clinical context:** If a component crashes while a clinician is reviewing an escalated patient, the rest of the application must remain functional. Isolate failures to the smallest possible subtree.
