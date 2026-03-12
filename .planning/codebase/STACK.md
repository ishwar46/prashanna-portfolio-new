# Technology Stack

**Analysis Date:** 2026-03-12

## Languages

**Primary:**
- TypeScript 5.x - All source code and configuration files
- JavaScript (JSX/TSX) - React component authoring

**Secondary:**
- CSS3 - Styling via Tailwind CSS and custom CSS variables
- PostCSS - CSS processing pipeline

## Runtime

**Environment:**
- Node.js (version specified via Next.js requirements)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router
- React 19.2.3 - UI component library
- React DOM 19.2.3 - DOM rendering for React

**Component Libraries:**
- @base-ui/react 1.3.0 - Unstyled, accessible component primitives (used for Button component)
- class-variance-authority 0.7.1 - Type-safe CSS class composition (for component variants)
- lucide-react 0.577.0 - Icon library (SVG icons)

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework with CSS variables theme system
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind v4
- shadcn 4.0.5 - Component abstraction for shadcn/ui components
- tw-animate-css 1.4.0 - Animation utilities for Tailwind
- tailwind-merge 3.5.0 - Utility function to merge Tailwind CSS classes without conflicts
- clsx 2.1.1 - Utility for conditionally joining classNames

**Animation:**
- motion 12.36.0 - Animation library for React (Framer Motion or similar)

**Development & Build:**
- TypeScript 5 - Type checking and compilation
- ESLint 9 - JavaScript linting
- eslint-config-next 16.1.6 - Next.js ESLint configuration
- postcss 4 (implicit via @tailwindcss/postcss) - CSS transformation

## Key Dependencies

**Critical:**
- Next.js 16.1.6 - Provides routing, server components, static generation, API routes
- React 19.2.3 - UI framework, hooks, and component model
- Tailwind CSS 4 - Entire styling system with CSS variables and utilities

**Component & Utility:**
- @base-ui/react 1.3.0 - Accessible button primitives and other base components
- class-variance-authority 0.7.1 - Type-safe variant composition for UI components
- lucide-react 0.577.0 - Icon assets
- clsx 2.1.1 - className composition
- tailwind-merge 3.5.0 - Class merging to prevent CSS conflicts
- motion 12.36.0 - Animation framework

**Tools:**
- TypeScript 5 - Type safety
- ESLint 9 - Code linting and quality

## Configuration

**Environment:**
- No environment-specific configuration detected
- No `.env.example` or `.env` files in repository

**Build:**
- `next.config.ts` - Next.js configuration (minimal, uses defaults)
- `tsconfig.json` - TypeScript compiler options
  - Target: ES2017
  - Module: esnext
  - Path alias: `@/*` → `./src/*`
  - JSX: react-jsx
  - Strict mode enabled
- `eslint.config.mjs` - ESLint configuration using flat config
  - Uses `eslint-config-next/core-web-vitals`
  - Uses `eslint-config-next/typescript`
  - Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`
- `postcss.config.mjs` - PostCSS configuration with Tailwind CSS plugin
- `components.json` - shadcn/ui configuration
  - Style: base-nova
  - Supports RSC (React Server Components)
  - Icon library: lucide
  - Path aliases configured for `components`, `utils`, `ui`, `lib`, `hooks`
  - Base color: neutral
  - CSS variables enabled

## Platform Requirements

**Development:**
- Node.js (version unspecified, follows Next.js 16.1.6 requirements)
- npm (or compatible package manager)
- Modern browser with ES2017 support

**Production:**
- Node.js runtime (Vercel, self-hosted, or containerized deployment)
- Modern browser support (ES2017+)

---

*Stack analysis: 2026-03-12*
