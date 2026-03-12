# Coding Conventions

**Analysis Date:** 2026-03-12

## Naming Patterns

**Files:**
- Components use PascalCase: `Button.tsx`, `RootLayout.tsx`
- Utilities use camelCase: `utils.ts`
- Pages follow Next.js App Router convention: `page.tsx`, `layout.tsx`
- UI library components are in subdirectories: `components/ui/button.tsx`

**Functions:**
- React components are PascalCase functions: `RootLayout()`, `Home()`, `Button()`
- Utility functions are camelCase: `cn()`
- Props interfaces follow component name + "Props": (implicit in destructured parameters)

**Variables:**
- camelCase for all variable declarations: `geistSans`, `geistMono`, `className`
- Const assignments for components and config: `const buttonVariants`, `const geistSans`

**Types:**
- TypeScript strict mode enabled - all inferred types used
- No `any` types in the codebase
- Props destructured inline with type annotations: `({ children }: Readonly<{ children: React.ReactNode }>)`
- Class Variance Authority (CVA) for component variants: `buttonVariants` defined as CVA configuration

## Code Style

**Formatting:**
- No `.prettierrc` or Prettier configuration found
- Code follows Next.js default formatting conventions
- 2-space indentation (inferred from source)
- Semicolons used consistently
- Single quotes in imports, double quotes in JSX attributes

**Linting:**
- ESLint 9 with Next.js core web vitals and TypeScript support
- Config: `eslint.config.mjs` (flat config format)
- Rules: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Import Organization

**Order:**
1. External libraries/dependencies (Next.js, React, third-party packages)
2. Type imports: `import type { ... }`
3. Internal utilities and aliases: `import { cn } from "@/lib/utils"`

**Path Aliases:**
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Used consistently: `@/lib/utils`, `@/components/ui`

## Error Handling

**Patterns:**
- No explicit error handling patterns found in current codebase (minimal business logic)
- Next.js error boundary support available via error.tsx files (not yet implemented)
- React 19 error handling via error boundaries expected in component hierarchy

## Logging

**Framework:** Native `console` methods (no specialized logging library)

**Patterns:**
- No logging statements found in current application code
- Use console methods for development debugging only
- Production logging to be implemented via server-side handlers

## Comments

**When to Comment:**
- Minimal commenting approach - code should be self-documenting
- Comments used only for non-obvious business logic or complex algorithms
- No redundant comments explaining what the code does

**JSDoc/TSDoc:**
- TypeScript inline types preferred over JSDoc
- No JSDoc annotations found in current codebase
- Metadata attributes used instead: `data-slot="button"` on components

## Function Design

**Size:**
- Functions are kept concise and single-purpose
- `cn()` utility is minimal (2 lines)
- Component functions contain layout/styling with clear responsibility

**Parameters:**
- Props destructured directly in function signature
- Type annotations inline with destructuring
- Defaults applied: `variant = "default"`, `size = "default"`

**Return Values:**
- Components return JSX.Element (implicit in React component functions)
- Utility functions return specific types: `cn()` returns string

## Module Design

**Exports:**
- Named exports for components: `export { Button, buttonVariants }`
- Default exports for pages and layouts: `export default function RootLayout()`
- UI components export both component and variant definitions

**Barrel Files:**
- Not used in current structure
- Import directly from component files

## React & Component Patterns

**Directives:**
- `"use client"` directive applied in client components: `src/components/ui/button.tsx`
- Server components by default (implicit) in `src/app/`

**Component Libraries:**
- Base UI primitives: `@base-ui/react` for accessible button foundation
- shadcn/ui components with CVA for styling
- Custom UI components extend with `className` prop merging via `cn()`

**Props Spreading:**
- Props spread selectively: `{...props}` at end of attribute list (button.tsx line 55)
- Type-safe prop forwarding via `ButtonPrimitive.Props` type

**Styling:**
- Tailwind CSS v4 with Tailwind Merge for conflict resolution
- Design tokens via CSS variables (oklch color space)
- Class variance authority for component variants
- `cn()` utility from `clsx` + `tailwind-merge` for safe class merging

## TypeScript

**Strict Mode:**
- `strict: true` in tsconfig.json (line 7)
- All implicit types explicitly defined
- `noEmit: true` - type checking only, no emit
- `isolatedModules: true` - each file treated independently

**Type Annotations:**
- Type annotations on component parameters: `children: React.ReactNode`
- Return types inferred for components
- Readonly types used for immutable data: `Readonly<{ children: React.ReactNode }>`

## Next.js Specific

**Metadata API:**
- `Metadata` type from `next` package for static metadata
- Set at layout level for app-wide defaults

**Fonts:**
- Google Fonts via `next/font/google`
- CSS variable injection: `--font-geist-sans`, `--font-geist-mono`

**Images:**
- `next/image` component used for optimized image loading
- Props: `width`, `height`, `alt`, `priority`
