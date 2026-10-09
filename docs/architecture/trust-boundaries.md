# Trust Boundaries

| Boundary | Untrusted input | Required control |
|---|---|---|
| Browser → web server | Messages, files, tenant-like fields | Authentication, validation, rate limits, server-derived scope |
| Web server → AI | Customer content and tool results | Prompt separation, bounded context, output validation |
| AI → tools | Proposed function calls | Allowlist, schema validation, authorization, policy guard |
| Tool → database | Read/write command | RLS, service authorization, invariants, idempotency |
| Tool → external adapter | API request | Explicit adapter, signed request, timeout, retry, audit |
| Staff UI → API | User action | Session verification, role check, tenant scope, approval state |

No boundary trusts a value merely because it came from the model, browser, catalog, webhook, or UI.
