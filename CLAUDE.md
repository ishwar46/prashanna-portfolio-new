# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Prashanna Sangroula**, a Mortgage Loan Officer (NMLS #2528620) currently at Loan Factory, Inc. This is his standalone professional website — separate from his Loan Factory profile at loanfactory.com/prashannasangroula.

### About Prashanna

- **Role:** Mortgage Loan Officer
- **Phone:** (571) 222-5555
- **Email:** prashanna@loanfactory.com
- **Company:** Loan Factory, Inc. (NMLS #320841), San Jose, CA
- **Specializations:** Conventional, FHA, VA, USDA, Jumbo loans, Bank Statement/Asset-Qualifier loans, DSCR (investor) loans, Foreign National programs, Refinancing (rate/term, cash-out, streamline), HELOC, Reverse Mortgages

### Website Goals

- Professional personal brand separate from Loan Factory
- Showcase loan services, expertise, and client testimonials
- Provide easy contact/consultation booking for potential borrowers
- Build trust and credibility as an independent loan officer

## Tech Stack

- **Framework:** Next.js 16.1 (App Router, Turbopack)
- **Language:** TypeScript 5
- **UI:** React 19.2
- **Styling:** Tailwind CSS v4 (CSS-native config, no `tailwind.config.js`)
- **Components:** shadcn/ui (CLI v4, Radix primitives)
- **Animations:** Motion 12.36 — import from `motion/react` (NOT `framer-motion`)
- **Icons:** Lucide React

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm start         # Serve production build
npm run lint      # ESLint
```

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, globals.css)
├── components/
│   └── ui/           # shadcn/ui components (added via `npx shadcn add <name>`)
└── lib/
    └── utils.ts      # cn() utility for className merging
```

## Key Patterns

- **Add shadcn components:** `npx shadcn add button` (do NOT manually create component files)
- **Tailwind v4:** Config lives in `src/app/globals.css` via `@theme` — there is no `tailwind.config.js`
- **Import alias:** `@/*` maps to `src/*`
- **Motion animations:** Use `import { motion } from "motion/react"` — the `framer-motion` package name is deprecated
