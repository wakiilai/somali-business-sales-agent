# Threat Model

## Assets

- Customer identity and contact details.
- Conversations and voice transcripts.
- Product, price, and availability data.
- Leads and quotations.
- Approval records.
- Integration credentials.
- Audit events.

## Threat actors

- Malicious customer.
- Compromised staff account.
- Attacker replaying webhooks.
- Malicious or poisoned catalog content.
- Compromised integration.
- Accidental operator misuse.
- Service provider outage or malformed response.

## Primary threats and controls

| Threat | Control | Evidence required |
|---|---|---|
| Prompt injection | Untrusted-input separation, tool allowlist, policy guard | Adversarial tests |
| Cross-tenant leakage | Server-derived tenant scope, RLS, authorization tests | Cross-tenant suite |
| Excessive agency | Typed tools and approval matrix | Tool permission tests |
| Duplicate events | Idempotency keys and unique constraints | Replay tests |
| Secret exposure | Secret manager, redaction, scanning | Secret scan and log tests |
| Webhook forgery | Signature and timestamp verification | Invalid/replay tests |
| Abuse/cost spike | Rate, size, timeout, quota limits | Limit tests |
| Incorrect catalog answer | Source-of-truth tools and abstention | AI evaluation |
| Partial failure | State machine, retry, dead-letter, operator recovery | Failure tests/runbook |
| Data over-retention | Classification, minimization, deletion policy | Retention review |

## Security invariant

No customer message, model output, catalog field, or external event may grant itself permission to access data or perform an action.
