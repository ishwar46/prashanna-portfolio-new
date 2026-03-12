# Architecture

**Analysis Date:** 2026-03-12

## Pattern Overview

**Overall:** Next.js 16 App Router with component-based architecture

**Key Characteristics:**
- Server-Side Rendering (SSR) default with client components marked with `"use client"`
- File-based routing using App Router (pages derived from directory structure)
- Utility-driven CSS styling with Tailwind CSS v4 and shadcn/ui component library
- Minimal initial implementation—starter template with basic layout and home page
- Type-safe with TypeScript 5 and strict mode enabled

## Layers

**Presentation Layer:**
- Purpose: Render UI components and handle client-side interactions
- Location: `src/app/`, `src/components/`
- Contains: React components (pages, layouts, reusable UI components)
- Depends on: Utility functions (`src/lib/`), design tokens from globals.css
- Used by: Browser client

**Layout System:**
- Purpose: Define app structure and wrap content with providers
- Location: `src/app/layout.tsx` (root layout)
- Contains: Font configuration, metadata, HTML structure, global styles
- Depends on: Next.js metadata API, Geist font families
- Used by: All pages via automatic wrapping

**Styling Layer:**
- Purpose: Provide design tokens and Tailwind configuration
- Location: `src/app/globals.css`
- Contains: CSS custom properties for color, spacing, radius; layer directives
- Depends on: Tailwind CSS v4, shadcn/ui, tw-animate-css
- Used by: All components via className attributes

**Utility Layer:**
- Purpose: Provide reusable helper functions
- Location: `src/lib/`
- Contains: `cn()` utility for merging Tailwind classes
- Depends on: clsx, tailwind-merge
- Used by: Components for className composition

## Data Flow

**Page Rendering:**

1. Browser requests `/`
2. Next.js routes to `src/app/page.tsx` (home page)
3. Root layout (`src/app/layout.tsx`) wraps page content
4. Components compose Tailwind classes via `cn()` utility
5. Global styles from `globals.css` apply via CSS cascade
6. HTML renders with inline styles and client-side hydration

**Component Props:**

- Components receive variant props (e.g., `variant`, `size` on Button)
- CVA (class-variance-authority) computes className based on variants
- `cn()` utility merges computed classes with custom overrides
- Final className passed to underlying element

## Key Abstractions

**Button Component:**
- Purpose: Reusable button with multiple visual variants
- Examples: `src/components/ui/button.tsx`
- Pattern: CVA-based variant system with size and style options
- Client component (`"use client"`) for interactivity

**Layout Wrapper:**
- Purpose: Bootstrap app with fonts, metadata, global styles
- Examples: `src/app/layout.tsx`
- Pattern: Root layout wraps all pages automatically

**Class Merging Utility:**
- Purpose: Safely merge Tailwind classes without conflicts
- Examples: `src/lib/utils.ts` - `cn()` function
- Pattern: Compose clsx + tailwind-merge to resolve class conflicts

## Entry Points

**Application Entry:**
- Location: `src/app/layout.tsx`
- Triggers: Server startup / page request
- Responsibilities: Load fonts, set metadata, wrap with global styles, render children

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: GET request to `/`
- Responsibilities: Render hero section with call-to-action buttons, image assets

**Component Export:**
- Location: `src/components/ui/button.tsx`
- Triggers: Import by other components
- Responsibilities: Export Button and buttonVariants for reuse

## Error Handling

**Strategy:** Default Next.js error handling (error.tsx support planned for future, not yet implemented)

**Patterns:**
- Server-side errors fall through to Next.js error boundary
- Client-side errors trigger React error boundary (if added)
- No custom error pages currently defined

## Cross-Cutting Concerns

**Styling:** Tailwind CSS v4 with CSS custom properties for theming; dark mode support via `.dark` class selector in globals.css

**Type Safety:** TypeScript strict mode enabled; all components and functions have explicit types

**Fonts:** Google Fonts (Geist) loaded server-side via Next.js font optimization; CSS custom properties for font family variables

---

*Architecture analysis: 2026-03-12*
