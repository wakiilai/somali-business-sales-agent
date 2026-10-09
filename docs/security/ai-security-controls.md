# AI Security Controls

## Allowed behavior

The model may interpret Somali or English messages, ask clarifying questions, retrieve approved information through typed tools, draft responses, summarize conversations, propose leads or quotations, and request human handoff.

## Forbidden behavior

The model may not execute arbitrary SQL, shell commands, arbitrary URLs, unrestricted API calls, credential operations, autonomous discounts, payment confirmation, refunds, delivery promises, order acceptance, or tenant selection from user input.

## Tool requirements

Every tool must have:

- Explicit name and schema.
- Server-side authorization.
- Tenant scope derived from the session.
- Input and output validation.
- Timeout and bounded retries.
- Idempotency behavior where side effects exist.
- Redacted audit event.
- Safe failure response.

## Prompt-injection policy

Customer messages, catalog data, uploaded files, and tool results are untrusted content. They are never treated as system instructions. A model output cannot expand its own permissions. Suspicious or conflicting instructions are refused or escalated.

## Abstention policy

If verified business data is missing, stale, conflicting, or unavailable, the system must say it cannot confirm the answer and route to a human rather than inventing a value.
