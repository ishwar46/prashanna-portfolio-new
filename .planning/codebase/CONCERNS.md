# Codebase Concerns

**Analysis Date:** 2026-03-12

## Boilerplate/Placeholder Content

**Untouched create-next-app template:**
- Issue: Project contains default Next.js scaffolding with no meaningful implementation. Page still shows "To get started, edit the page.tsx file" instructions.
- Files: `src/app/page.tsx`, `src/app/layout.tsx`, `README.md`
- Impact: Portfolio application has no actual content, functionality, or purpose. Not suitable for production or demonstration.
- Fix approach: Replace template content with actual portfolio features, projects showcase, and styling. Define project scope and implement core pages/components.

## Missing Test Infrastructure

**No test files detected:**
- Issue: Zero test coverage for the codebase. No test files, test runners, or testing configuration exists.
- Files: Project-wide (none exist)
- Impact: Cannot verify functionality, easy to introduce regressions, no CI validation pipeline can be established, code quality cannot be assured.
- Fix approach: Install testing framework (Jest + React Testing Library recommended for Next.js), create test infrastructure in package.json, write tests for all components and pages.

## Minimal Project Structure

**Underdeveloped file organization:**
- Issue: Only 4 source files exist (`layout.tsx`, `page.tsx`, `utils.ts`, `button.tsx`). No organized directory structure for pages, components, hooks, services, or utilities.
- Files: `src/` directory structure
- Impact: As project grows, will need reorganization. Hard to scale without clear architectural boundaries. No separation of concerns.
- Fix approach: Establish directory structure: `src/pages/`, `src/components/`, `src/lib/`, `src/hooks/`, `src/types/`. Migrate template code into organized structure.

## Unused Dependencies

**Dead code and unused packages:**
- Issue: Multiple dependencies installed but not utilized: `motion` (12.36.0), `shadcn` CLI (4.0.5), `tw-animate-css` (1.4.0), `@base-ui/react` (1.3.0), `class-variance-authority` (0.7.1), `lucide-react` (0.577.0)
- Files: `package.json`, `src/components/ui/button.tsx`, `src/app/globals.css`
- Impact: Increases bundle size, slows install times, adds maintenance burden, confuses developers about what libraries are actually needed.
- Fix approach: Remove unused dependencies (`pnpm remove motion shadcn tw-animate-css`), keep only what's genuinely used (possibly just `clsx`, `tailwind-merge`, `tailwindcss`, Next.js core).

## Incomplete Configuration

**Empty Next.js config:**
- Issue: `next.config.ts` exists but is completely empty except for comments.
- Files: `next.config.ts`
- Impact: No image optimization, no API routes configured, no environment variable validation, no custom webpack/babel configuration available when needed.
- Fix approach: Implement configuration as features are added (image loader, API routes, environment schemas). For now, minimal valid config is acceptable if intentional.

## Hardcoded Metadata

**Stale default metadata:**
- Issue: Page metadata uses generic "Create Next App" titles and descriptions.
- Files: `src/app/layout.tsx` (lines 15-18)
- Impact: SEO is broken, sharing links show incorrect site information, poor first impression.
- Fix approach: Replace with actual portfolio title, description, and meta tags. Add `favicon.ico` and OG image.

## Tailwind CSS Configuration Gap

**Missing tailwind.config file:**
- Issue: No `tailwind.config.ts` or `tailwind.config.js` in project root. CSS configuration is in `globals.css` with inline theme overrides.
- Files: Project root (missing), `src/app/globals.css`
- Impact: Hard to customize theme programmatically, Tailwind IntelliSense may not work properly in editor, theme values are scattered between CSS and components.
- Fix approach: Create `tailwind.config.ts` with explicit theme configuration extracted from `globals.css`. Ensures consistency and editor support.

## Hardcoded Colors and Values

**Magic colors in page component:**
- Issue: `src/app/page.tsx` contains hardcoded colors and inline styling mixed with Tailwind classes: `bg-zinc-50`, `dark:bg-black`, `bg-white`, `dark:bg-black`, `text-black`, `dark:text-zinc-50`, `text-zinc-600`, `dark:text-zinc-400`, `text-zinc-950`, `dark:text-zinc-50`, `hover:bg-[#383838]`, `dark:hover:bg-[#ccc]`
- Files: `src/app/page.tsx` (lines 5-61)
- Impact: Hard to maintain consistent theming, difficult to support dark mode properly, accessibility issues with arbitrary color values not tested against WCAG standards.
- Fix approach: Use Tailwind semantic colors (`bg-background`, `text-foreground`, `text-muted-foreground`, etc.) consistently throughout. Extract color definitions to theme configuration.

## Accessibility Issues

**Missing accessibility attributes:**
- Issue: Links with `rel="noopener noreferrer"` but no `aria-label` or descriptive text for icon links. Images lack proper alt text context.
- Files: `src/app/page.tsx` (lines 38-61)
- Impact: Screen reader users cannot understand link purpose, keyboard navigation may be unclear. Fails WCAG 2.1 AA requirements.
- Fix approach: Add descriptive aria-labels to all interactive elements, ensure all images have meaningful alt text, test with screen readers.

## Static Mock Content

**No dynamic content or real data:**
- Issue: Page displays only Next.js template boilerplate. No actual portfolio projects, skills, experience, or meaningful content.
- Files: `src/app/page.tsx`
- Impact: Not functional as a portfolio, no demonstration of technical ability, serves no purpose beyond scaffolding.
- Fix approach: Design and implement portfolio layout with real content: projects section, skills, bio, contact. Consider adding CMS integration (Sanity, Contentful) or markdown-based content if complex data needed.

## Unverified Component Library Integration

**Base-UI and shadcn integration not validated:**
- Issue: Project imports from `@base-ui/react` and `shadcn` but only button component exists. No integration testing or validation that components work correctly together.
- Files: `src/components/ui/button.tsx`, `components.json`
- Impact: Component library integration is fragile, could fail at runtime, version mismatches not caught.
- Fix approach: Add integration tests for UI components, verify styling consistency, test dark mode support for all components before adding more.

## Missing Environment Configuration

**No `.env.local` or example file:**
- Issue: No `.env.example` or environment variable documentation. If future features need environment variables, there's no guidance for setup.
- Files: Project root (missing)
- Impact: Contributors cannot understand required setup, local development setup is unclear.
- Fix approach: Create `.env.example` when first environment variable is needed. Document all required variables in README.

## Unverified Dark Mode Support

**Dark mode implementation incomplete:**
- Issue: Dark mode CSS variables defined in `globals.css` but not thoroughly tested across all components. Hard-coded colors in `page.tsx` bypass theme system.
- Files: `src/app/globals.css` (lines 85-117), `src/app/page.tsx`
- Impact: Dark mode may be broken, colors may not have sufficient contrast, user preferences not respected.
- Fix approach: Test all pages in both light and dark modes, use design tokens consistently (no hardcoded colors), verify contrast ratios meet WCAG AA standards.

## ESLint Configuration Minimal

**Only default/recommended rules enabled:**
- Issue: ESLint config only extends `next/core-web-vitals` and `next/typescript` without additional rules for code quality, import sorting, or custom project standards.
- Files: `eslint.config.mjs`
- Impact: No enforcement of code style, imports can be disorganized, potential security issues not caught.
- Fix approach: Add ESLint plugins for import ordering (`eslint-plugin-import`), accessibility (`eslint-plugin-jsx-a11y`), React best practices. Define custom rules for project standards.

## Missing TypeScript Strictness Verification

**No type checking in build:**
- Issue: `tsconfig.json` has `strict: true` but no `typecheck` script in package.json to verify types in CI/pre-commit.
- Files: `tsconfig.json`, `package.json`
- Impact: Type errors might not be caught before deployment, developers may skip type checking.
- Fix approach: Add `typecheck` script: `"typecheck": "tsc --noEmit"` to package.json. Integrate into pre-commit hooks and CI pipeline.

## No Git Hooks

**Missing pre-commit validation:**
- Issue: No `.husky` or pre-commit hooks configured. No validation before commits (no lint, no type check, no format check).
- Files: Project root (missing)
- Impact: Broken code can be committed, style inconsistencies proliferate, type errors merge to main.
- Fix approach: Install Husky, add pre-commit hooks for: `pnpm lint:fix`, `pnpm typecheck`, `pnpm format:fix`. Prevent commits that fail linting or type checking.

## Performance: No Image Optimization

**Unoptimized image delivery:**
- Issue: Next.js `Image` component is used but no image optimization configured in `next.config.ts`. Default Vercel Image Optimization may not work for self-hosted or custom deployments.
- Files: `src/app/page.tsx` (lines 7-14, 44-50), `next.config.ts`
- Impact: Slower page load, higher bandwidth usage, poor Core Web Vitals scores.
- Fix approach: Configure image optimization in `next.config.ts` with `images` property specifying loader and domain allowlist.

## No Build Output Analysis

**No bundle size tracking:**
- Issue: No tooling to monitor bundle size, no size budgets, no performance baselines established.
- Files: Project-wide
- Impact: Bundle bloat undetected, large dependencies added without awareness.
- Fix approach: Add `next-bundle-analyzer` or similar, integrate into CI to report bundle sizes on PRs.

---

*Concerns audit: 2026-03-12*
