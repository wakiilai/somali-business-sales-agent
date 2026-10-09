# Data Flow

```text
Customer/browser
  → web endpoint
  → validation, authentication, rate limit
  → conversation service
  → policy guard
  → AI interpretation (untrusted proposal)
  → typed tool call
  → authorization + tenant scope + business invariant
  → database or explicit adapter
  → audit event
  → human approval or safe response
```

The model cannot write directly to the database or call arbitrary external systems. All side effects pass through typed, authorized services.
