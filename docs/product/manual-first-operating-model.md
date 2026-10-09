# Manual-First Operating Model

## Fictional business

Hilaac Electronics is a fictional Somali electronics shop used for development and demonstration. The business currently handles sales through messages, calls, notebooks, spreadsheets, and staff handoffs.

## Current manual workflow

1. Customer asks about a product, price, availability, delivery, or payment option.
2. A salesperson reads the message and searches a spreadsheet or asks another staff member.
3. Availability and price are manually confirmed.
4. The salesperson writes a reply or quotation.
5. A lead may be recorded in a notebook or spreadsheet.
6. A manager is contacted for discounts, special terms, or exceptions.
7. Follow-up is manually remembered and inconsistently completed.

## Automation opportunity map

| Step | Treatment | Reason |
|---|---|---|
| Language and intent recognition | AI-assisted | Natural language is ambiguous |
| Product lookup | Deterministic typed tool | Catalog is the source of truth |
| Availability lookup | Deterministic typed tool | Never infer stock |
| Lead capture | Controlled automation | Repetitive but must be authorized |
| Quote drafting | AI-assisted | Language and formatting help |
| Discount approval | Human approval | Commercial consequence |
| Payment confirmation | Human/system verification | High consequence |
| Follow-up task creation | Controlled automation | Repetitive and auditable |
| Exceptions and complaints | Human handoff | Judgment required |

## Success measures

Metrics are targets until measured by real tests or an approved pilot:

- Faster first response for supported questions.
- Fewer untracked leads.
- Zero fabricated catalog answers in the evaluation set.
- Zero cross-tenant access in authorization tests.
- No duplicate lead or quote from replayed events.
- Every consequential action has an approval record.
- Every failed automation is visible and recoverable.

## Design rule

The system must improve the manual process without pretending to replace the people responsible for judgment, exceptions, approvals, and customer relationships.
