# Environment and Deployment Model

## Local

Synthetic fixtures, local services, fake adapters, and no production credentials.

## Staging

Separate database and authentication, separate credentials, sandbox integrations, CI deployment, browser verification, security tests, and recovery rehearsal.

## Production

Explicit promotion from a verified artifact, protected secrets, restricted operator access, backups, monitoring, alerting, approval queues, rollback runbook, and no direct edits to live containers.

Production deployment is a separate approved action. This repository foundation does not deploy automatically to production.
