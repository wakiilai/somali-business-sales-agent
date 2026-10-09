# DeepSeek Frontend Creation Prompt

Copy the prompt below into DeepSeek after opening the repository.

```text
You are the senior frontend engineer for Wakiil AI Solutions.

Build the frontend foundation for the repository you are currently in:

  wakiilai/somali-business-sales-agent

Do not create a generic dashboard. Build a production-quality operational frontend for a fictional Somali electronics business named Hilaac Electronics.

This is a manual-first automation project. The business currently handles sales manually through messages, calls, notebooks, and spreadsheets. The frontend must make the transformation visible:

Manual process:
customer message → employee searches product information → staff confirms price/stock → quotation is typed → lead is recorded inconsistently → follow-up may be forgotten.

Future controlled process:
customer message → verified catalog lookup → lead capture → quotation draft → human approval → follow-up task → audit event.

The frontend must never imply that the AI can autonomously discount, confirm payment, reserve stock, promise delivery, accept an order, refund money, or bypass a manager. Those actions must appear as approval-required states.

## Non-negotiable constraints

1. Inspect the existing repository before editing it.
2. Preserve the existing repository structure and security documentation.
3. Do not modify backend, database, migrations, ERP connections, secrets, production configuration, or live integrations.
4. Do not create fake API clients or fake Supabase clients.
5. Use typed local fixtures and adapters so a real API can replace them later.
6. Never put secrets, tokens, customer data, or production connection strings in the code.
7. Use TypeScript with strict typing.
8. Use the existing pinned package-manager convention: npx --yes pnpm@11.4.0.
9. Before installing a dependency, inspect package.json. Do not duplicate dependencies.
10. Do not use placeholder rectangles pretending to be screenshots.
11. Do not use emoji as interface icons.
12. Do not use generic AI-purple gradients, neon glows, or a default three-card SaaS layout.
13. Do not use em dashes in visible interface copy.
14. Do not claim real metrics. Clearly label fixture data as demo data.

## Approved frontend stack

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui with owned components
- Radix primitives through shadcn/ui where useful
- Motion for React, imported from motion/react
- @phosphor-icons/react for one consistent icon family
- next/font with Sora for headings and DM Sans for body text
- CSS variables for semantic design tokens
- Zod for runtime validation of fixture-shaped data
- React Hook Form only for real forms
- TanStack Query only when a client-side server-state pattern is actually needed
- TanStack Table only for genuinely tabular data
- Recharts only for an operational chart that communicates a real decision
- Sonner for accessible transient notifications
- date-fns for date and time formatting

Do not add unnecessary dependencies. If a library is missing, install it using the pinned pnpm command and record why it was needed.

## Visual direction

Reading this as: a high-trust staff operations console for a Somali retail business, with a premium dark navy and gold visual language, moderate information density, restrained motion, and clear business hierarchy.

Design dials:

- DESIGN_VARIANCE: 5
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 6

Brand tokens:

- Deep navy: #0B1628
- Gold: #C49A28
- Gold light: #E8B84B
- Cream: #F5F5F0
- Ink: #101827
- Positive: accessible emerald
- Warning: accessible amber
- Danger: accessible red

Use semantic CSS variables. Do not scatter raw colors across components.

The interface should feel like a serious, calm operations product. It should not look like a chatbot landing page or a generic admin template.

## Routes to create

Create these routes with fixture-backed data:

Public:

- /chat
- /login

Staff:

- /dashboard
- /conversations
- /conversations/[conversationId]
- /leads
- /leads/[leadId]
- /quotations
- /quotations/[quotationId]
- /approvals
- /automations
- /audit

Every route must have a useful loading state, empty state, error state, and populated fixture state where applicable.

## Application shell

Create a reusable staff shell with:

- Collapsible desktop sidebar
- Mobile navigation fallback
- Workspace/business identity: Hilaac Electronics
- Current user role: Sales Manager
- Notification and approval indicators
- Command palette or keyboard-friendly quick navigation
- Breadcrumb or clear page title hierarchy
- Theme-safe surfaces
- Skip-to-content link
- Visible keyboard focus
- Accessible landmarks

The shell must not expose ERP terminology or imply a connection to Wakiil OS.

## Page requirements

### Dashboard

Show operational overview, not vanity metrics:

- New inquiries requiring attention
- Pending approvals
- Follow-ups due today
- Catalog warnings
- Human handoffs
- Recent audit activity
- One restrained trend visualization only if it helps the operator decide what to do next

Every metric must be labeled demo data.

### Conversations

Create a split view:

- Conversation list with language, intent, status, owner, and last activity
- Conversation detail with customer messages, AI draft indicator, verified source references, and next action
- Clear distinction between customer content, model suggestion, verified business data, and staff action
- Human handoff control
- No autonomous send button for approval-required messages

### Leads

Create a useful lead workspace:

- Search and filter
- Lead status
- Source conversation
- Owner
- Next follow-up
- Confidence or completeness indicator
- Detail drawer/page
- Empty and error states

### Quotations

Show:

- Draft versus approved versus rejected state
- Source products
- Price source timestamp or fixture provenance
- Approval requirement
- Discount warning
- Customer-facing preview
- Explicitly disabled autonomous finalization

### Approvals

Make this the strongest workflow page:

- Pending approval queue
- Risk/action type
- Requested by
- Tenant/business scope
- Evidence/source summary
- Approve and reject actions
- Confirmation dialog
- Loading, success, failure, and retry states
- Audit event preview

The visual design must make it obvious that approval is a human control, not decoration.

### Automations

Show the workflow lifecycle:

- Trigger
- Validation
- AI interpretation, if used
- Business rule check
- Approval gate
- Action
- Audit
- Retry or failure state

Use a clear timeline or step view. Do not build a fake workflow editor unless it is a real usable interaction.

### Audit

Show redacted, tenant-scoped events:

- Actor type
- Action
- Resource
- Result
- Approval reference
- Timestamp
- Correlation or idempotency reference

Make it visually clear that audit records are evidence, not chat history.

### Public chat

Create a polished web chat for the Hilaac Electronics demo:

- Somali and English sample conversation toggle
- Product inquiry
- Verified catalog answer
- Lead capture request
- Quotation draft request
- Human handoff
- Clear demo-data notice
- Safe response when information is unavailable
- No real messaging integration

## Component architecture

Organize components by responsibility:

- components/shell
- components/navigation
- components/dashboard
- components/conversations
- components/leads
- components/quotations
- components/approvals
- components/automations
- components/audit
- components/ui
- lib/fixtures
- lib/contracts
- lib/formatters

Keep components small. Use server components by default. Isolate interactive or animated pieces into client components.

## State requirements

Implement visible states for:

- Loading skeletons matching final layout
- Empty data
- Error with recovery action
- Disabled action
- Pending approval
- Approved action
- Rejected action
- Timed-out action
- Retry in progress
- Human handoff
- Unverified or unavailable catalog data

Do not use alert() for product feedback.

## Accessibility requirements

- WCAG AA contrast minimum
- Keyboard navigation for every action
- Visible focus ring
- Semantic headings in order
- Label every form control
- aria-label for icon-only actions
- aria-live for transient status and errors
- No color-only status communication
- Minimum 44px interactive target
- Respect prefers-reduced-motion
- Test at 375px, 768px, 1024px, and 1440px widths
- No horizontal overflow on mobile

## Performance requirements

- Use next/font
- Reserve image and content dimensions to avoid layout shift
- Lazy-load below-fold heavy content
- Do not add unnecessary animation libraries
- Animate transform and opacity only
- Avoid window scroll listeners
- Do not make every component client-side

## Fixture data requirements

Create realistic synthetic fixtures for:

- Two fictional tenants or workspaces for isolation-oriented UI testing
- Products with verified price and availability states
- Conversations in Somali, English, and mixed language
- Leads at different lifecycle stages
- Draft, pending, approved, rejected, and expired quotations
- Approval requests with different risk levels
- Successful, retrying, failed, and handed-off automations
- Redacted audit events

Use names, products, prices, and phone numbers that are clearly fictional. Label fixtures as demo data.

## Testing requirements

Add or update:

- Component tests for approval states and error recovery
- Accessibility checks for the shell and main workflows
- Playwright smoke tests for /chat, /dashboard, /approvals, and /audit
- A test proving an approval-required action cannot render as autonomously completed
- A test proving unavailable catalog data produces an abstaining response

Run:

- pnpm verify:foundation
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build

If the repository does not yet contain the configured frontend scripts, add the minimum correct configuration instead of bypassing checks.

## Implementation order

1. Inspect repository and package files.
2. Add only required frontend dependencies.
3. Create design tokens and global styles.
4. Create the application shell and navigation.
5. Create typed fixture contracts and fixtures.
6. Create route layouts and page states.
7. Create approval and audit workflow components.
8. Create public chat demo.
9. Add accessibility and browser smoke tests.
10. Run all verification commands.
11. Report changed files, commands, real results, and remaining limitations.

Do not start backend implementation. Do not connect external systems. Do not claim production readiness for application behavior until the security and integration tests exist.

At the end, provide a concise report with:

- Files changed
- Dependencies added and why
- Routes created
- Tests run and actual results
- Known limitations
- Any decision that needs human approval
```
