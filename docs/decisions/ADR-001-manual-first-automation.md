# ADR-001: Manual-First Automation

## Decision

Project 1 begins with a documented manual Hilaac Electronics sales workflow and automates only selected repetitive steps. AI is used for language interpretation and drafting; deterministic services enforce business rules; humans approve consequential actions.

## Why

This mirrors real Wakiil customer work, makes the before/after value visible, avoids automating unsafe judgment, and creates measurable acceptance criteria.

## Consequences

The repository must preserve both the current-state manual process and the future-state workflow. Every automation must state what remains manual, how failure returns control to staff, and what evidence proves improvement.
