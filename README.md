# Frame By Frame 2027 – Event Management Platform

Complete full-stack event management website for the **Frame By Frame : Short Film and Documentary Festival** (23–24 January 2027, Bengaluru).

Built with Next.js, TypeScript, Tailwind CSS, Prisma, Neon PostgreSQL, Resend, and QR code generation. Designed so college students can deploy it **without using a terminal**.

---

## What is included

- Public event website (Home, About, Agenda, Speakers, Workshops, Venue, Registration, Contact, etc.)
- Dynamic registration with multiple ticket types
- Unique registration ID + ticket number + secure QR code per registrant
- Ticket page with QR and assigned SPOC contact details
- Confirmation email (via Resend)
- Admin dashboard with registration stats
- Role-based authentication (Super Admin seeded)
- Browser-based one-time database setup (`/setup`)
- Event branding (champagne gold + charcoal + ivory) matching the official logo & banner
- Pre-seeded Frame By Frame 2027 event data

---

## Student deployment (no terminal required)

### Step 1 – Download & extract
Download `Event_Management_Platform.zip` and extract it on your computer.

### Step 2 – Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it (e.g. `frame-by-frame-2027`).
4. Keep it **Public**.
5. Do **not** initialize with README.
6. Click **Create repository**.

### Step 3 – Upload the project files
1. On the empty repository page click **uploading an existing file**.
2. Drag **all** the folders and files from the extracted ZIP into the browser (including `package.json`, `prisma`, `src`, `public`, etc.).
3. Commit the files.

### Step 4 – Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New… → Project**.
3. Import the GitHub repository you just created.
4. Leave the default settings (Framework Preset should detect Next.js).
5. Click **Deploy**. The first deploy may fail because environment variables are missing – that is expected.

### Step 5 – Add environment variables
In Vercel → your project → **Settings → Environment Variables** add:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | your Neon connection string | Required |
| `AUTH_SECRET` | a long random string | Required |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Required after first deploy |
| `RESEND_API_KEY` | your Resend key | Optional (emails) |
| `RESEND_FROM_EMAIL` | verified sender | Optional |
| `RESEND_FROM_NAME` | Frame By Frame | Optional |

After adding variables, go to **Deployments** and click **Redeploy**.

### Step 6 – One-time database setup
1. Open `https://your-project.vercel.app/setup`
2. Click **Run Setup**
3. Wait for the success message.

Default Super Admin login:
- **Email:** `admin@framebyframe.in`
- **Password:** `Admin@Frame2027`

**Change this password immediately** after first login.

### Step 7 – Use the site
- Public site: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin/login`

---

## Getting a free Neon database

1. Go to [console.neon.tech](https://console.neon.tech) and create a free account.
2. Create a new project.
3. Copy the **connection string** (it starts with `postgresql://…`).
4. Paste it as `DATABASE_URL` in Vercel.

---

## Getting a free Resend API key (for emails)

1. Go to [resend.com](https://resend.com) and create an account.
2. Create an API key.
3. (Optional) Verify your own domain for better deliverability.
4. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `RESEND_FROM_NAME` in Vercel.

Until Resend is configured, registration still works – confirmation emails are simply skipped.

---

## Local development (optional, for developers)

```bash
npm install
cp .env.example .env
# edit .env with your DATABASE_URL and AUTH_SECRET
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

---

## Project structure (simplified)

```
├── public/images/          # logo & banner
├── prisma/
│   ├── schema.prisma       # full database schema
│   └── seed.ts             # Frame By Frame seed data
├── src/
│   ├── app/
│   │   ├── (public)/       # public website pages
│   │   ├── admin/          # admin dashboard
│   │   ├── api/            # serverless API routes
│   │   └── setup/          # one-time DB setup page
│   ├── components/
│   └── lib/                # prisma, auth, email, qr helpers
├── .env.example
├── package.json
├── vercel.json
└── README.md
```

---

## Security notes

- Passwords are hashed with bcrypt.
- Sessions use signed JWTs stored in httpOnly cookies.
- API routes perform server-side validation.
- Never commit `.env` or real API keys.
- Change the default admin password right after setup.

---

## Support

For issues with the event itself contact the organizer:

**Prachi Patel**  
prachiiip06@gmail.com  
+91 91136 93553
