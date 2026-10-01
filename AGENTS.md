# Visually.Me Agent Instructions

## Required documentation

Before making changes, read the relevant documentation under /docs.

For dependency security work, read:

/docs/security/dependency-management.md

## Dependency security

- Do not dismiss security vulnerabilities.
- Do not modify vulnerability severity.
- Do not suppress Dependabot alerts.
- Do not introduce a dependency without explaining why it is needed.
- Security-related dependency changes must pass CI.
- High and Critical vulnerabilities require human review.
- Do not automatically merge dependency changes unless the repository's automation explicitly permits that class of update.

## Product changes

- Do not implement a feature without an approved product specification.
- Treat approved product specifications as the product contract.
- Do not infer unresolved product decisions.