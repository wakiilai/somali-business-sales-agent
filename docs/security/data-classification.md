# Data Classification

| Data | Classification | Minimum handling |
|---|---|---|
| Public product description | Internal/public by business policy | Validate before model use |
| Price and availability | Confidential business data | Tenant-scoped access |
| Customer name and phone | Personal data | Minimize, scope, retain only as needed |
| Conversation text | Confidential/personal | Redact logs, access-control, retention policy |
| Voice recording/transcript | Sensitive personal data | Explicit limits, private storage, deletion policy |
| Quotation and approval | Confidential business data | Role and tenant scope, immutable audit event |
| Credentials and tokens | Secret | Secret manager only; never log or commit |

Local and test environments use synthetic data only.
