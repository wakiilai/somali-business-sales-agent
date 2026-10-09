# Security Questions

The project must answer these questions with implementation evidence before production:

1. What data does the system access, and how is it classified?
2. What is the source of truth for prices, availability, delivery, and payment state?
3. How is tenant scope derived and enforced?
4. What can the AI do, and what can it never do?
5. How are prompt injection and malicious catalog instructions handled?
6. How are approvals enforced if a caller bypasses the UI?
7. How are duplicate webhooks and retries made safe?
8. How are secrets, logs, voice data, and transcripts protected?
9. How are failures detected, retried, reconciled, and recovered?
10. How are deletion, retention, backup, and incident response handled?
11. What CI, security, RLS, AI evaluation, and operational evidence proves the claims?

Answers belong in the linked security, architecture, and testing documents; this list is the reviewer index.
