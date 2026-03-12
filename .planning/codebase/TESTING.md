# Testing Patterns

**Analysis Date:** 2026-03-12

## Test Framework

**Status:** No testing framework currently configured

**Runner:**
- Not detected - no Jest, Vitest, or other test runner configured
- No test configuration files found (jest.config.*, vitest.config.*)

**Assertion Library:**
- Not configured

**Run Commands:**
```bash
# No test commands available - testing framework not yet set up
```

## Test File Organization

**Current State:**
- No test files present in codebase
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files found

**Recommended Location (not yet implemented):**
- Co-located: Place `.test.tsx` files alongside component files
- Example pattern: `src/components/ui/button.tsx` + `src/components/ui/button.test.tsx`
- App routes: Test in `src/app/__tests__/` directory

**Naming:**
- Should follow pattern: `[ComponentName].test.tsx` or `[ComponentName].spec.tsx`
- Page tests: `[routeName].test.tsx`

## Test Structure

**Suite Organization (Not Yet Implemented):**
- Recommended approach: Use Vitest with React Testing Library for Next.js 16
- Alternative: Jest with `@testing-library/react`

**Expected Pattern:**
```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

**Patterns to Implement:**
- Setup: Use `render()` from @testing-library/react
- Teardown: Automatic cleanup between tests (React Testing Library default)
- Assertion: Use `expect()` from vitest/jest

## Mocking

**Framework:** Not configured

**Recommended Approach (Not Yet Implemented):**
- Vitest has built-in mocking with `vi.mock()`
- Next.js image mocking: Mock `next/image` for component tests

**What to Mock:**
- External API calls
- `next/image` in component tests
- Browser APIs (localStorage, sessionStorage)
- File system operations

**What NOT to Mock:**
- React component rendering
- Utility functions like `cn()`
- Tailwind CSS classes

## Fixtures and Factories

**Test Data:**
- Not yet implemented
- Recommended location: `src/__tests__/fixtures/` or `src/__tests__/factories/`

**Suggested Pattern:**
```typescript
// src/__tests__/fixtures/button.ts
export const defaultButtonProps = {
  children: "Click me",
  variant: "default" as const,
  size: "default" as const,
};
```

**Location:**
- Central: `src/__tests__/fixtures/` for shared test data
- Component-scoped: `src/components/__fixtures__/` for component-specific data

## Coverage

**Requirements:** Not enforced

**Recommended Targets (Not Yet Implemented):**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

**View Coverage (Not Yet Configured):**
```bash
# After implementing Vitest:
pnpm test --coverage
```

## Test Types

**Unit Tests:**
- Scope: Individual components and utility functions
- Approach: Test component props, events, and rendering
- Example: `Button` component tests for all variant/size combinations

**Integration Tests:**
- Scope: Component interactions and page flows
- Approach: Test multiple components working together
- Example: Form submission with validation

**E2E Tests:**
- Framework: Not implemented
- Recommended: Playwright or Cypress for Next.js
- Would test: Full user flows (navigation, data submission, etc.)

## Recommended Setup

**To implement testing (not yet done):**

1. Install dependencies:
```bash
pnpm add -D vitest @testing-library/react @testing-library/dom @testing-library/jest-dom
```

2. Create `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

3. Create `src/__tests__/setup.ts`:
```typescript
import "@testing-library/jest-dom";
```

4. Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

## Current Testing Gaps

**Untested Components:**
- `Button` component (`src/components/ui/button.tsx`) - All variants and sizes should be tested
- `Home` page (`src/app/page.tsx`) - Navigation and rendering
- Layout components (`src/app/layout.tsx`) - Metadata and font loading

**Utility Functions:**
- `cn()` function (`src/lib/utils.ts`) - Test class merging behavior

**Risk:** Without tests, changes to component props or styling may break functionality unnoticed.

**Priority:** High - Button component is foundational for UI, should have variant/size matrix testing.
