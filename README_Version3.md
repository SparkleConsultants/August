# Adir Transport - Full Stack Starter

A full stack ride hailing and booking platform for Papua New Guinea, using Supabase (PostgreSQL + Edge Functions), React, and CI/CD.

## Features
- Book rides, flights, PMVs, accommodation
- Real-time driver tracking
- Payments
- Admin dashboard
- Supabase as backend (database, auth, functions)
- GitHub Actions CI/CD

## Quick Start

### Backend

```bash
npm install -g supabase
bash setup-backend.sh
# Update .env.local with your Supabase credentials
```

### Frontend

```bash
npm install
npm run dev
```

### Deploy Edge Functions

```bash
supabase functions deploy ride-booking
supabase functions deploy flight-booking
supabase functions deploy pmv-booking
supabase functions deploy accommodation-booking
supabase functions deploy payment-processing
supabase functions deploy driver-tracking
```

### CI/CD

Push to GitHub to trigger CI (see .github/workflows/supabase-ci.yml).

---

## Directory Overview

- **supabase/migrations/** - SQL schema and RLS
- **supabase/functions/** - Edge Functions (API endpoints)
- **src/components/** - React components/forms
- **src/lib/supabase.ts** - Supabase client
- **setup-backend.sh** - Backend bootstrap
- **.github/workflows/** - CI/CD

---

See each file for more details.