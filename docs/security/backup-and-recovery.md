# Backup and Recovery

Before production, the project must define and verify:

- Backup contents and encryption.
- Backup frequency and retention.
- Recovery point objective (RPO).
- Recovery time objective (RTO).
- Restore access controls.
- Migration compatibility and rollback approach.
- Restore test evidence.

A backup is not considered reliable until a restore has been exercised in an isolated environment and the recovered data has passed integrity checks.
