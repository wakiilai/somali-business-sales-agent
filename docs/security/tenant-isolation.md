# Tenant Isolation

Tenant identity is derived from the authenticated session or trusted integration mapping. It is never accepted as an arbitrary client-controlled selector for privileged operations.

Every tenant-owned table, query, command, audit event, and external adapter request must carry an authorized tenant scope. Database policies and service-layer authorization are both required.

Required verification:

- Tenant A cannot read Tenant B records.
- Tenant A cannot mutate Tenant B records.
- Tenant A cannot enumerate another tenant through identifiers, filters, errors, or exports.
- Staff roles are scoped to their tenant and permitted branches/workspaces.
- AI tools receive tenant scope from the server, not the prompt.
