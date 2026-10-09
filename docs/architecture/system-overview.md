# System Overview

## Goal

Provide a secure customer-sales workflow for a Somali business while preserving human control over consequential actions.

## Main flow

```text
Customer web chat
  → authenticated server endpoint
  → input validation and rate limits
  → conversation/orchestration service
  → approved typed tools
  → policy and approval guard
  → response, handoff, task, or approval request
  → redacted audit event
```

## Trust boundaries

1. Customer browser: untrusted.
2. Web application/server endpoint: validates identity, tenant, payload, and rate limits.
3. AI orchestration: may interpret and propose; cannot bypass policy.
4. Tool layer: fixed contracts, server authorization, tenant scope, idempotency.
5. Database: source of truth with row-level policies and server-side constraints.
6. Staff interface: authenticated and role-authorized.
7. External integrations: explicit adapters with signed requests, timeouts, retries, and audit events.

## Source of truth

The approved business catalog and authorized business systems are the source of truth for prices, availability, delivery rules, payment status, and customer records. The model is never the source of truth.

## Separation from ERP

This repository has its own database, authentication, secrets, and tenant boundary. It must not connect to Wakiil OS/ERP.
