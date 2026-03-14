# Prashanna Sangroula — Portfolio Website

Professional portfolio website for **Prashanna Sangroula**, a **Mortgage Loan Officer** (NMLS #2528620) at Loan Factory, Inc. and a **licensed Realtor** (VA License #225273183) at oNest Real Estate, Fairfax, VA.

One professional for your entire home journey — from finding your dream home to securing the perfect loan.

## Features

- **14 Services** — 11 mortgage loan programs + 3 real estate services with category filter tabs
- **Mortgage Calculator** — Real-time monthly payment estimator with split-panel layout
- **Contact Form** — Zod validation, nodemailer email delivery, honeypot spam protection
- **FAQ Accordion** — 8 common mortgage process questions
- **Real Client Reviews** — Google reviews with link to full listing
- **SEO Optimized** — Dynamic OG image, JSON-LD structured data (Person + LocalBusiness + RealEstateAgent), sitemap, robots.txt
- **Performance** — LCP 1.8s, CLS 0, WebP images, LazyMotion animations
- **Accessibility** — WCAG-compliant color contrast, prefers-reduced-motion support
- **Mobile Responsive** — Fully usable at 375px viewport

## Tech Stack

- **Framework:** Next.js 16.1 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19.2, Tailwind CSS v4, shadcn/ui
- **Animations:** Motion 12.36 (LazyMotion)
- **Email:** Nodemailer (Gmail SMTP)
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your domain (e.g., `https://prashannasangroula.com`) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_USER` | Gmail address for sending |
| `SMTP_PASS` | Gmail App Password (requires 2FA enabled) |

## Contact

- **Mortgage:** (571) 222-5555 / prashanna@loanfactory.com
- **Real Estate:** (703) 321-6914 / prashanna@onest.realestate
- **Office:** 9697 Main St, Fairfax, VA 22031

## License

All rights reserved.
