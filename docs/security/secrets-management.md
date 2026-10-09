# Secrets Management

Secrets are server-side only and belong in the approved secret manager or deployment environment. They must never appear in source code, browser bundles, prompts, logs, screenshots, issue comments, test fixtures, or chat.

Required controls:

- Separate local, staging, and production credentials.
- Minimum scope per integration.
- Rotation and revocation procedures require explicit operator approval.
- Access changes are auditable.
- CI receives only the secrets needed by a job.
- Secret scanning and push protection remain enabled.
- Incident response includes containment and approved credential rotation.
