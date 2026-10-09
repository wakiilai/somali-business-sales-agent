# Permission Matrix

| Capability | Customer | Sales | Support | Manager | Owner | AI |
|---|---:|---:|---:|---:|---:|---:|
| Ask product question | Yes | Yes | Yes | Yes | Yes | Prepare |
| Read approved catalog | Limited | Yes | Limited | Yes | Yes | Typed tool only |
| Create lead | Request | Yes | Yes | Yes | Yes | Controlled tool |
| Draft quotation | Request | Yes | No | Yes | Yes | Prepare only |
| Approve quotation | No | No | No | Yes | Yes | No |
| Apply discount | No | No | No | Controlled | Yes | No |
| Reserve stock | No | No | No | Controlled | Yes | Request only |
| Confirm payment | No | No | No | Controlled | Yes | No |
| Create follow-up task | Request | Yes | Yes | Yes | Yes | Controlled tool |
| View audit events | Own thread | Scoped | Scoped | Scoped | All tenant | No |
| Change customer record | Request | Limited | Limited | Controlled | Yes | No |
| Manage integrations | No | No | No | No | Yes | No |

The matrix is enforced server-side. The user interface is not a security boundary.
