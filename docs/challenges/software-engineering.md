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

**Clinical risk:** Before writing the validation logic, consider two distinct failure modes and their consequences:

| Failure mode                                 | What happens                                           | Clinical risk                                                                           |
| -------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| False negative — invalid NHS number accepted | Patient admitted with a wrong or fabricated identifier | Observations and clinical notes may be linked to the wrong person's record indefinitely |
| False positive — valid NHS number rejected   | Legitimate admission blocked at the form               | Clinician cannot admit a real patient; delay in care                                    |

Write a one-paragraph assessment of which failure mode is more dangerous and why. Your validation implementation should reflect that assessment — where is it appropriate to be strict, and where should there be a manual override path for edge cases?

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

**Clinical risk:** Not all rendering errors carry the same risk. Before placing your error boundaries, classify the components in this app by the clinical consequence of each crashing:

- **High** — crash means a clinician loses visibility of an escalated patient or cannot act on an alert
- **Medium** — crash degrades the experience but clinical action is still possible via another route
- **Low** — crash affects non-clinical UI (navigation, branding, layout)

Document your classification and use it to justify _where_ you place boundaries. A single top-level boundary is not sufficient — it would treat a broken sidebar the same as a broken patient status panel.

---

## SE-07 — Custom Data-Fetching Hooks

**Addresses:** `AR-1` Interoperable & API-First Design, `SE-1` Clinically Optimised UI

The Dashboard and Patients pages fetch data inline, mixing network logic with render logic. Extract this into reusable custom hooks.

**Requirements:**

- Create `usePatients()` and `useWard(wardId: string)` hooks in `frontend/src/hooks/`
- Each hook must return `{ data, loading, error }` — components should not manage fetch state themselves
- Hooks must be generic enough to be tested in isolation without rendering a component
- Write unit tests for both hooks using `vitest` — mock `fetch` and test the loading, success, and error states
- Replace the inline fetch calls in `Dashboard.tsx` and `Patients.tsx` with the new hooks

**Questions to answer:**

- When does a custom hook become the right abstraction vs just writing the fetch call in the component?
- How would you handle the case where two components on the same page both call `usePatients()` — do they make two network requests?
- What would need to change in this hook if the API required an auth token on every request?

**Find the TODO in code:** [`frontend/src/pages/Patients.tsx`](../../frontend/src/pages/Patients.tsx)

---

## SE-08 — Server State with TanStack Query

**Addresses:** `SE-3` Real-Time Performance & Reliability, `SE-1` Clinically Optimised UI

Custom hooks handle basic fetch/loading/error, but a clinical dashboard has harder requirements: stale data is a patient safety risk, and the UI should stay responsive while refreshing in the background. Introduce [TanStack Query](https://tanstack.com/query/latest) (formerly React Query) as the server state layer.

**Requirements:**

- Install and configure `@tanstack/react-query` with a `QueryClient` and `QueryClientProvider` at the app root
- Migrate `usePatients()` and `useWard()` to use `useQuery` internally
- Configure a sensible `staleTime` — how quickly should patient data be considered stale in a clinical context?
- Add a visible "last updated" indicator to the Dashboard so clinicians know when data was last fetched
- Handle background refetch UX: data should not disappear while refreshing — show previous data with a subtle loading indicator

**Questions to answer:**

- What is the difference between `staleTime` and `cacheTime` (`gcTime` in v5)? Which controls what you see on screen?
- The `refetchOnWindowFocus` default is `true` — is that the right behaviour for a clinical dashboard? Why or why not?
- How would you use `useQueryClient` to manually invalidate the patient list cache after a patient is admitted (SE-03)?

**Clinical risk:** Your choice of `staleTime` is not a UX decision — it is a clinical risk decision. Before setting a value, answer: _what is the maximum age of observation data that a clinician can safely act on?_ A patient's NEWS2 score can change significantly in minutes. Document your reasoning for the value you choose. If the answer is "it depends on the type of data", that is a valid answer — and it implies different `staleTime` values for different queries.

---

## SE-09 — Rendering Performance

**Addresses:** `SE-1` Clinically Optimised UI, `O-3` Innovative Industry-Leading Quality

The patient list will eventually contain hundreds of patients. Unoptimised React renders will make the dashboard sluggish — a problem on the low-spec NHS-issued hardware many clinicians use.

**Requirements:**

- Open React DevTools Profiler and record a render while filtering the patient list — identify which components re-render unnecessarily
- Wrap appropriate components with `React.memo` and justify each decision (memo is not free — don't apply it blindly)
- Use `useMemo` to memoize any expensive derived values (e.g. computing ward statistics from a patient array)
- Use `useCallback` to stabilise any callback props passed to memoised child components
- Add [TanStack Virtual](https://tanstack.com/virtual/latest) to virtualise the patient list so only visible rows are rendered to the DOM

**Questions to answer:**

- What is the actual cost of `React.memo`? Describe a case where wrapping a component in `memo` makes performance _worse_
- How does React's reconciliation algorithm decide whether to re-render a child? What role does referential equality play?
- At what list length does virtualisation become worth the added complexity?

**Find the TODO in code:** [`frontend/src/pages/Patients.tsx`](../../frontend/src/pages/Patients.tsx)

---

## SE-10 — Global State Management

**Addresses:** `SE-1` Clinically Optimised UI, `SE-2` Secure, Role-Based Access & Auditability

Currently there is no global state. As the app grows, several pieces of state need to be shared across pages: the authenticated user's role, their assigned ward, and UI preferences (e.g. compact vs expanded patient rows). Decide how to manage this.

**Requirements:**

- Identify all state that is genuinely global (shared across routes) vs state that should stay local to a component
- Implement a `CurrentUserContext` that provides the logged-in user's role and ward assignment — use React Context with `useReducer` for this
- Add a `useCurrentUser()` hook that components use to access this context — components must not consume the context directly
- Evaluate [Zustand](https://zustand-demo.pmnd.rs/) as an alternative for one slice of state — implement the same thing in Zustand and compare the two approaches
- Write a short technical note (a paragraph or two) explaining which approach you would recommend for HomeWard and why

**Questions to answer:**

- React Context re-renders every consumer when the value changes. How do you prevent unrelated components from re-rendering when only one field in the context changes?
- What is the difference between server state (data from the API) and client state (UI state like selected filters)? Why does this distinction matter for choosing a state management approach?
- If HomeWard adds Azure Entra ID authentication (AR-03), where should the user session live — in React state, a cookie, or localStorage? What are the trade-offs?

---

## SE-11 — Ticket Analysis: Clinical Notes

**Addresses:** `SE-2` Secure, Role-Based Access & Auditability, `PR-3` Safe Remote Monitoring & Escalation Model, `O-1` Delivery to Timescales & Budget

This challenge is not about writing code. It is about doing the work that happens before a line of code is written — the work that separates a consultant from a developer who just does what they're told.

---

### Your ticket

> **HW-247 — Add a notes section to patient profiles**
> **Priority:** High
> **Reported by:** Dr. Sarah Chen (Clinical Lead)
> **Sprint:** Backlog
>
> _"When I'm reviewing a patient I need somewhere I can write down things that aren't captured in the vital signs. Sometimes the patient mentions something on the phone call, or I want to leave a note for the next clinician covering the ward. At the moment I'm keeping notes in a Teams chat which isn't ideal. Can we add a notes section to the patient page? This would be really helpful for the whole team."_

---

### Your challenge

You have been assigned this ticket. Before touching the codebase, produce the following four deliverables.

---

**Deliverable 1 — Clarifying questions**

Write the list of questions you would raise on the ticket (or in a call with Dr. Chen) before starting work. Think about everything that is ambiguous or unstated. Questions should be specific — not "what do you mean by notes?" but "should a note written by one clinician be visible to all clinicians on the ward, or only to the author?"

Consider: ownership, editing, deletion, visibility, format, length, clinical safety implications, and what "for the team" actually means in practice.

Aim for 8–12 focused questions. Each should be answerable with a concrete decision that would change how you build the feature.

---

**Deliverable 2 — Codebase impact map**

Read the codebase and list every file and system that would need to change to deliver this feature end-to-end. For each, explain _why_ it needs to change — not just that it does.

Start here:

- [`backend/prisma/schema.prisma`](../../backend/prisma/schema.prisma) — is there a `ClinicalNote` model? What would it need?
- [`backend/src/routes/`](../../backend/src/routes/) — what new endpoints are needed? What existing ones change?
- [`packages/shared/src/types/`](../../packages/shared/src/types/) — what new shared types are needed?
- [`frontend/src/pages/`](../../frontend/src/pages/) — which pages are affected? Is there a patient detail page yet?
- [`docs/challenges/architecture.md`](./architecture.md#ar-03--authentication-authorisation--audit-logging) — read AR-03. Does adding clinical notes change the audit log requirements?

Document what you find. If something doesn't exist yet and needs to be created, say so.

---

**Deliverable 3 — Task breakdown with estimates**

Break the feature into the smallest sensible tasks and give each a rough estimate (hours or half-days). Be realistic — include tasks that are easy to forget: migration safety, validation, error handling, tests, and the PR review itself.

Format each task as:

> `[area] Task description — estimate`
>
> e.g. `[schema] Add ClinicalNote model and migration — 2h`

If your task breakdown depends on answers to your clarifying questions, note which tasks are blocked and why.

---

**Deliverable 4 — One design recommendation, written for a mixed audience**

There is a decision buried in this feature that has clinical safety and governance implications: **can a clinical note be edited or deleted after it is saved?**

Write a short recommendation (3–5 sentences) that you could share in a team channel read by both developers and clinical stakeholders. It should explain the trade-off clearly, give a recommendation, and reference a real governance consideration — the [Records Management Code of Practice](https://transform.england.nhs.uk/information-governance/guidance/records-management-code/) or [DSPT](https://www.dsptoolkit.nhs.uk/) are good starting points.

---

### What good looks like

| Area                 | What good looks like                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| Clarifying questions | Specific, decision-forcing, cover both technical and clinical concerns           |
| Impact map           | Grounded in the actual codebase — references real files, not hypothetical ones   |
| Task breakdown       | Granular enough to be assigned individually, estimates are honest not optimistic |
| Recommendation       | Readable by a non-developer, backed by a concrete reason, takes a clear position |

---

## SE-12 — Clinical Risk Register

**Addresses:** `SE-2` Secure, Role-Based Access & Auditability, `SE-3` Real-Time Performance & Reliability, `O-3` Innovative Industry-Leading Quality

In healthcare software, clinical risk management is not optional. NHS England requires suppliers of health IT systems to follow **DCB0129** — the Clinical Risk Management standard. You are not expected to produce a full DCB0129-compliant submission, but you are expected to think the way it requires.

This challenge has no coding. It is an exercise in thinking systematically about how software can harm patients.

---

### Context

HomeWard is a Class I medical device under the UK Medical Devices Regulations 2002. As the development team, you are responsible for identifying hazards — situations where the software could contribute to patient harm — and ensuring mitigations exist.

Read the following before starting:

- [DCB0129 overview](https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems) — what it requires from software manufacturers
- [NHS Digital — Clinical Safety](https://digital.nhs.uk/services/clinical-safety) — the broader context

---

### Your challenge

Produce a clinical risk register for the HomeWard system as it exists today — stub data, no authentication, no escalation alerts. Use the codebase as your evidence base.

**For each hazard, document:**

| Field               | Description                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Hazard ID           | e.g. H-01                                                                                                                               |
| Hazard description  | What could go wrong? Be specific — not "data error" but "a patient's ESCALATED status is not displayed due to a frontend rendering bug" |
| Cause               | What in the current system could cause this? Reference actual code or architecture where possible                                       |
| Effect on patient   | What is the clinical consequence if this hazard occurs?                                                                                 |
| Likelihood          | 1 (rare) – 5 (almost certain)                                                                                                           |
| Severity            | 1 (negligible) – 5 (catastrophic / death)                                                                                               |
| Risk score          | Likelihood × Severity                                                                                                                   |
| Current mitigation  | What, if anything, prevents this today?                                                                                                 |
| Recommended control | What should be built or changed to reduce this risk?                                                                                    |

**Identify at least 8 hazards.** Start with obvious ones, then dig deeper. Some starting points — but do not stop here:

- What happens if the API returns stale or incorrect patient status?
- What happens if the frontend renders no data silently (empty state vs real error)?
- What happens if a clinician is looking at the wrong patient's record due to a navigation bug?
- What happens if an escalation is triggered but the clinician's session has timed out?
- What happens if two clinicians update the same patient simultaneously?

---

### Deliverable

A markdown table (or structured document) containing your risk register, followed by a short paragraph identifying your **top two risks** — the ones with the highest score — and what you would prioritise fixing first and why.

---

### What good looks like

| Area                 | What good looks like                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------- |
| Hazard descriptions  | Specific and traceable to the actual system — not generic IT risks                            |
| Causes               | References real code, architecture decisions, or known gaps (e.g. no auth, no error boundary) |
| Severity assessment  | Calibrated to clinical reality — a delayed alert for an ESCALATED patient is not "medium"     |
| Recommended controls | Concrete engineering actions, not vague assurances                                            |
