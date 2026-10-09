# Security Policy

This repository is a production-oriented foundation for a secure business-automation system. Security claims are made only when the relevant control is implemented and verified.

The AI model is not the system of record and is not trusted with unrestricted access. Customer input, catalog content, uploaded files, tool results, and external events are untrusted until validated by the appropriate server-side boundary.

## Core controls

- Separate project database and authentication; no Wakiil ERP access.
- Server-side authorization and tenant scoping.
- Typed, allowlisted tools only.
- Human approval for consequential commercial actions.
- Input/output validation and bounded payloads.
- Signed webhooks, replay protection, idempotency, retries, and timeouts.
- Redacted, tenant-scoped audit events.
- Synthetic data in local development.
- Secret scanning, dependency review, CodeQL, and protected `main`.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in public issues. Use the repository's private security reporting mechanism or contact the repository owner through the approved private channel. Include reproduction steps, affected component, impact, and a safe remediation suggestion. Never include credentials, tokens, customer data, or secret values.

## Evidence

The current evidence plan is maintained in `docs/security/` and `docs/testing/security-testing.md`. A control is not considered complete because it is documented; it must have implementation evidence and a passing verification result.
