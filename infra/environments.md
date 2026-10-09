# Environments

| Environment | Data | Credentials | Integrations | Promotion |
|---|---|---|---|---|
| Local | Synthetic | Local/test only | Fake adapters | Developer command |
| Staging | Synthetic or approved sandbox | Separate staging secrets | Sandbox | Verified CI and review |
| Production | Real tenant data | Restricted production secrets | Approved live adapters | Explicit human approval |

No environment may reuse another environment's secrets or silently copy its customer data.
