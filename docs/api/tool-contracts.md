# Tool Contracts

Initial typed tools are planned as:

- `searchProducts(query, filters)` — read-only, tenant-scoped.
- `getProductAvailability(productId)` — read-only, verified source only.
- `createLead(input, idempotencyKey)` — authorized side effect, duplicate-safe.
- `draftQuotation(input)` — proposal only; does not commit a sale.
- `requestApproval(actionId)` — creates an approval request.
- `createFollowUpTask(input, idempotencyKey)` — authorized, duplicate-safe.
- `createSupportHandoff(input)` — routes to a human and records context.
- `recordAuditEvent(event)` — server-generated provenance; model cannot forge actor identity.

The implementation must define schemas, authorization, failure behavior, and tests before enabling each tool.
