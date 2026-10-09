# Somali Business Sales Agent

> Production-grade, manual-first business automation for Somali and English sales operations.

[![CI](https://github.com/wakiilai/somali-business-sales-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/wakiilai/somali-business-sales-agent/actions/workflows/ci.yml)
[![Security](https://github.com/wakiilai/somali-business-sales-agent/actions/workflows/security.yml/badge.svg)](https://github.com/wakiilai/somali-business-sales-agent/actions/workflows/security.yml)

## What this project demonstrates

This project models **Hilaac Electronics**, a fictional Somali electronics shop that currently handles sales manually. Wakiil maps the manual process, identifies safe automation opportunities, and builds a controlled workflow that preserves human approval for consequential actions.

### Before Wakiil

```text
Customer message or call
→ salesperson searches a notebook or spreadsheet
→ stock is checked manually
→ price is calculated or confirmed by another employee
→ quotation is sent manually
→ lead is recorded inconsistently
→ follow-up may be forgotten
```

### After Wakiil

```text
Customer message
→ intent and language are identified
→ approved catalog is queried through a typed tool
→ verified answer is prepared
→ lead is captured with authorization
→ quotation is drafted
→ consequential actions require human approval
→ follow-up is scheduled
→ every material event is audited
```

The system does **not** automate everything. AI interprets language; deterministic services enforce business rules; humans approve consequential actions.

## Scope

- Somali and English web chat first.
- Product, price, and availability lookup from approved business data.
- Lead capture and conversation history.
- Quotation drafting and approval workflow.
- Follow-up task creation.
- Human handoff.
- Tenant isolation, auditability, idempotency, retry handling, and safe failure.
- Voice-note support after the text workflow is stable.

## Explicit non-goals

- Not an ERP replacement.
- No access to Wakiil OS/ERP.
- No arbitrary SQL, shell, URLs, or unrestricted model tools.
- No autonomous discounts, payment confirmation, refunds, delivery promises, or order acceptance.
- No real customer data in this repository or local demo.
- No claim of perfect security; controls are documented and must be verified with evidence.

## Repository guide

| Area | Purpose |
|---|---|
| `apps/web` | Web chat and staff operations UI |
| `packages/domain` | Business entities and invariants |
| `packages/contracts` | API, tool, webhook, and event contracts |
| `packages/policy` | Authorization, approval, retention, and risk rules |
| `packages/ai` | AI orchestration, guardrails, and evaluation boundaries |
| `packages/integrations` | Explicit external-system adapters |
| `packages/audit` | Redaction, provenance, and audit events |
| `packages/validation` | Input, output, and file validation |
| `supabase` | Isolated project database migrations, seed data, and tests |
| `automation` | Workflow definitions, retries, escalation, and runbooks |
| `tests/security` | Prompt-injection, authorization, tenant, webhook, rate, and leakage tests |
| `docs` | Product, architecture, security, operations, testing, API, and demo evidence |
| `infra` | Local, staging, and production environment contracts |

## First verification

This foundation currently verifies repository governance and required evidence structure. Application behavior is intentionally not claimed until implemented and tested.

```bash
corepack enable
pnpm install
pnpm verify:foundation
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Documentation first

Start with:

1. [`docs/product/manual-first-operating-model.md`](docs/product/manual-first-operating-model.md)
2. [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md)
3. [`docs/security/threat-model.md`](docs/security/threat-model.md)
4. [`docs/security/production-checklist.md`](docs/security/production-checklist.md)
5. [`docs/testing/release-gates.md`](docs/testing/release-gates.md)
6. [`docs/demo/demo-script.md`](docs/demo/demo-script.md)

## Security reporting

See [`SECURITY.md`](SECURITY.md). Do not open a public issue for a suspected vulnerability.
