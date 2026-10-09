# Incident Response

## Response sequence

1. Detect and classify the event.
2. Contain the affected workflow, tenant, integration, or credential.
3. Preserve relevant redacted evidence.
4. Assess scope and affected records.
5. Notify the owner through the approved channel.
6. Recover using the runbook and verify integrity.
7. Rotate or revoke credentials only after explicit approval.
8. Record root cause, corrective action, and regression tests.

## Scenarios

- Cross-tenant access: disable the affected path, preserve evidence, verify scope, fix policy, run isolation suite.
- Secret exposure: stop use, preserve evidence without copying the secret, obtain approval for rotation, scan history and deployments.
- Webhook compromise: disable endpoint or integration, reject events, verify replay window, reconcile state.
- AI tool misuse: disable the tool, inspect authorization and audit events, add adversarial tests.
- Provider outage: use safe failure and human handoff; do not invent business answers.
