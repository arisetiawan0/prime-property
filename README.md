# Prime Property

Landing page dan portal agent Prime Property dengan backend TiDB Cloud Serverless.

## Backend Setup

1. Copy environment example:

```bash
cp .env.example .env
```

2. Isi nilai TiDB dan JWT di `.env`:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:4000/DATABASE?sslaccept=strict"
JWT_SECRET="change-this-to-a-long-random-secret-at-least-32-characters"
SEED_AGENT_PASSWORD="PrimeProperty123!"
```

3. Generate Prisma Client:

```bash
npm run db:generate
```

4. Push schema ke TiDB:

```bash
npm run db:push
```

5. Seed data awal:

```bash
npm run db:seed
```

Credential agent awal memakai email dari `src/data/agents.ts` dan password dari `SEED_AGENT_PASSWORD`.

Contoh login awal:

```text
sari.anggraeni@primeproperty.com
PrimeProperty123!
```

## Implementasi Backend

- Public API: `/api/properties`, `/api/properties/featured`, `/api/properties/[slug]`, `/api/contact`.
- Auth API: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`.
- Dashboard API: `/api/admin/properties`, `/api/admin/leads`, `/api/admin/agents`.
- Contact form memakai validasi server-side, honeypot, dan rate limit 3 submit per IP per jam.
- Email notification masih TODO sampai provider email dipilih. Rekomendasi: Resend.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Verification

```bash
npm run lint
npm run build
```
