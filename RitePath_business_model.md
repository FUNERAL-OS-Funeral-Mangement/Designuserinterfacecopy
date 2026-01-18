# CLAUDE.md — RitePath Agent Instructions

You are acting as an autonomous senior software engineer working on **RitePath**.

RitePath is a **multi-tenant funeral case management platform**. This repository is production-bound and compliance-sensitive.

You may read, modify, and create files across the repository.

**Operate deliberately:** think → plan → act → verify.

---

## Product Context

RitePath is a workflow operating system for funeral homes, covering:

* First Call intake
* Case creation and ongoing case management
* Legal documentation and eSign workflows
* Notifications (SMS)
* Case closure and reporting

In addition, RitePath provides:

* **Case Cards** (created immediately after First Call) to manage case status, tasks, and documents in one place
* An **Interactive Catalog** for funeral homes (service offerings, merchandise, packages, selections) that can be shared with families
* **Case Reports** (operational and compliance reporting)

Primary goals:

* Reduce director workload by **40–60 minutes per case**
* Improve accuracy and family experience
* Be secure, compliant, and VC-ready

---

## Authoritative Tech Stack

### Frontend

* Next.js 14 (App Router)
* React + TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes (TypeScript)
* Supabase (PostgreSQL)
* Server Actions for mutations

### Database & Auth

* Clerk (Authentication)

  * User management
  * Social login support
  * Session management

* Supabase (Database)

  * Postgres
  * Row Level Security (RLS) is mandatory
  * Realtime subscriptions

Multi-tenant model:

* `organization_id` represents a funeral home or firm
* Users may belong to multiple organizations
* All data must be tenant-scoped

### Storage

* Supabase Storage
* Tenant-isolated access

### Messaging

* Twilio (SMS)
* Event-driven notifications (e.g., document signed, case updated)

### Payments

* Stripe (when applicable)

---

## Multi-Tenancy Rules (Non-Negotiable)

* Every table must include `organization_id`
* Enforce isolation with **Postgres RLS**, not app-level checks
* No cross-tenant access under any circumstance
* Assume funeral homes are competitors

---

## Legal & Compliance Awareness

This system handles:

* Cremation authorizations
* Body release forms
* First Call intake data
* Family PII

Rules:

* Favor correctness over speed
* Prefer additive schema changes
* Avoid destructive migrations
* No silent breaking changes

---

## Agent Operating Rules

Before acting:

1. Briefly explain the plan
2. List files that will be changed
3. Flag risks or assumptions

While acting:

* Make minimal, intentional changes
* Follow existing code conventions
* Keep TypeScript strict
* Use clear, consistent naming (prefer `organization_id`)

After acting:

* Summarize what was done
* Explicitly list follow-ups or TODOs

---

## Hard Constraints

You must NOT:

* Introduce new frameworks without justification
* Replace Supabase with another auth system
* Bypass RLS with admin shortcuts
* Over-engineer abstractions
* Assume infrastructure that does not exist

---

## Behavior Expectations

Act like a senior engineer building a 10-year platform.

Correctness > cleverness
Clarity > speed
Safety > shortcuts

---

# README.md — RitePath

## RitePath

RitePath is a workflow operating system for funeral homes — managing the complete lifecycle from **First Call intake** through **final documentation closure**.

Our goal is simple:

> Reduce per-case director workload by **40–60 minutes** while improving accuracy, compliance, and family experience.

---

## Why RitePath Exists

Funeral professionals manage:

* Time-sensitive calls
* High-stakes legal documents
* Emotional family interactions
* Fragmented software and paperwork

RitePath brings structure, correctness, and calm to this process — without disrupting tradition.

---

## Core Capabilities

* **First Call Intake** workflows
* **Case Cards** created after First Call to manage status, tasks, documents, and communication in one place
* Organization-scoped **case management**
* Legal document generation & **eSign**
* Secure document storage
* SMS notifications for key case events
* **Interactive Catalog** for funeral homes (offerings, packages, merchandise) to share with families
* **Case Reporting** for operational insight and compliance tracking
* Multi-location funeral home support

---

## Architecture Overview

### Frontend

* Next.js 14 (App Router)
* React + TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes (TypeScript)
* Server Actions for mutations

### Database & Auth

* Clerk (Authentication)
* Supabase (Postgres Database)
* Row Level Security (RLS) enforced everywhere
* Multi-tenant by default

### Storage

* Supabase Storage

### Messaging

* Twilio SMS

### Payments

* Stripe (usage-based or per-case)

---

## Multi-Tenancy Model

* Each funeral home or firm is an **organization**
* Users may belong to multiple organizations
* Every record is scoped by `organization_id`
* Data isolation is enforced at the database level (**RLS**)

---

## Security & Compliance

RitePath handles sensitive personal and legal data.

Design principles:

* Least privilege access
* Explicit tenant boundaries
* No cross-organization visibility
* Auditability over convenience

---

## Repository Expectations

* This codebase is production-bound
* Avoid breaking changes
* Prefer clarity over abstraction
* Favor additive improvements

---

## Status

RitePath is actively under development.

We are building with a long-term mindset — correctness, trust, and durability first.

---

## License

Proprietary — All rights reserved.
