# Project 1 Frontend Stack

## Decision

Use a **Next.js App Router + TypeScript** frontend with an owned shadcn/ui component layer, Tailwind CSS v4, Motion for purposeful animation, Phosphor icons, Zod contracts, and fixture-backed data adapters.

This is an operational product interface, not a marketing landing page. The visual direction is a premium, calm, high-trust operations console for Hilaac Electronics.

## Core stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS v4
- shadcn/ui components owned inside the repository
- Radix primitives through shadcn/ui where needed
- Motion for React (`motion`, imported from `motion/react`)
- Phosphor Icons (`@phosphor-icons/react`)
- Sora for headings and DM Sans for body text through `next/font`
- CSS variable design tokens with light and dark themes
- Zod for runtime validation of fixture/API-shaped data
- React Hook Form and `@hookform/resolvers` for staff forms
- TanStack Query only for client-side server-state flows that need caching/mutation
- TanStack Table only for genuinely tabular staff data
- Recharts only for dashboard charts that have a real operational purpose
- Sonner for accessible transient notifications
- `date-fns` for date formatting and relative time
- Playwright for browser verification
- Vitest and Testing Library for component behavior
- axe-based accessibility checks in browser tests

## Dependency commands for the future app scaffold

Use the repository's pinned package-manager command and verify versions before installation:

```bash
npx --yes pnpm@11.4.0 add next react react-dom motion @phosphor-icons/react zod react-hook-form @hookform/resolvers @tanstack/react-query @tanstack/react-table recharts sonner date-fns next-themes clsx tailwind-merge class-variance-authority
npx --yes pnpm@11.4.0 add -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss shadcn eslint eslint-config-next vitest @testing-library/react @testing-library/dom @playwright/test
npx --yes pnpm@11.4.0 dlx shadcn@latest init
```

Do not install every dependency before it is needed. The first frontend pass may omit React Query, Table, and Recharts until the relevant page needs them.

## Frontend architecture

```text
apps/web/
├── app/
│   ├── (public)/chat/
│   ├── (staff)/dashboard/
│   ├── (staff)/conversations/
│   ├── (staff)/leads/
│   ├── (staff)/quotations/
│   ├── (staff)/approvals/
│   ├── (staff)/automations/
│   ├── (staff)/audit/
│   ├── login/
│   ├── layout.tsx
│   ├── globals.css
│   └── error.tsx
├── components/
│   ├── shell/
│   ├── navigation/
│   ├── dashboard/
│   ├── conversations/
│   ├── leads/
│   ├── quotations/
│   ├── approvals/
│   ├── automations/
│   ├── audit/
│   └── ui/
├── features/
│   ├── chat/
│   ├── approvals/
│   ├── leads/
│   └── conversations/
├── lib/
│   ├── fixtures/
│   ├── contracts/
│   ├── formatters/
│   └── utils.ts
├── styles/
└── tests/
```

## Design direction

- Dark navy application shell with restrained gold accent.
- Sora headings, DM Sans body.
- High-trust operational visual language, not generic AI purple.
- Dense enough for staff work, but never cramped.
- One clear primary action per screen.
- Use real operational hierarchy: status, ownership, urgency, approval state, source, and next action.
- Use cards only when they communicate hierarchy. Prefer structured surfaces, dividers, and whitespace elsewhere.
- Motion is restrained and meaningful: route transitions, approval state changes, loading skeletons, and focused feedback only.
- Use Phosphor icons consistently. No emoji as UI icons.
- Fully responsive: desktop staff console, tablet, and usable mobile fallback.
- Full keyboard navigation, visible focus, reduced motion, semantic landmarks, and WCAG AA contrast.

## Data boundary

The frontend is initially fixture-backed. Do not create fake backend calls, fake Supabase clients, or invented integration APIs. Build typed adapters so real API integration can replace fixtures later.

No real customer data, secrets, ERP references, or production credentials belong in the frontend.
