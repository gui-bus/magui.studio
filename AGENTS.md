# Repository Guidelines

## Project Structure & Module Organization
`src/app` contains the Next.js App Router entrypoints, locale routes, metadata files, and `/api/og`. Reusable UI lives in `src/components`, split into `common`, `sections`, and `ui`. Shared configuration is in `src/config`, i18n wiring in `src/i18n`, helpers and hooks in `src/lib`, and shared types in `src/types`. Tests live under `src/__tests__`, with browser smoke coverage in `src/__tests__/e2e`. Static assets are in `public`, and translation messages are in `messages/*.json`.

## Build, Test, and Development Commands
Use `pnpm dev` to start the local app on port 3000. Run `pnpm build` for the production build; it also validates i18n keys first. Use `pnpm start` to serve the built app. Quality checks:

- `pnpm lint`: run ESLint for Next.js and TypeScript rules
- `pnpm format`: format `*.ts` and `*.tsx` with Prettier
- `pnpm typecheck`: run `tsc --noEmit`
- `pnpm test`: run Vitest unit/component tests
- `pnpm test:e2e`: run Playwright smoke tests
- `pnpm check-i18n`: verify translation key sync

## Coding Style & Naming Conventions
This repo uses TypeScript with 2-space indentation, no semicolons, double quotes, trailing commas where valid in ES5, and `printWidth: 80`. Prettier also sorts Tailwind classes and import groups. Prefer `PascalCase` for React components, `camelCase` for hooks and utilities, and lowercase file names already established in `src/components/sections` such as `hero.tsx` and `faq.tsx`. Keep imports aligned with the `@/` alias configured in Vitest and TypeScript.

## Testing Guidelines
Write unit and component tests with Vitest + Testing Library in `src/__tests__`, using `*.test.ts` or `*.test.tsx`. Keep end-to-end coverage in `src/__tests__/e2e/*.spec.ts`. Run `pnpm test` before every commit and `pnpm test:e2e` for user-flow changes. There is no enforced numeric coverage gate in config, so maintain meaningful coverage around changed behavior.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits, enforced by commitlint and reflected in history: `feat: ...`, `refactor(i18n): ...`, `style(showcase): ...`. Keep subjects imperative and scoped when useful. Husky runs `pnpm test`, `pnpm lint:secrets`, and `npx lint-staged` on pre-commit, plus `pnpm build` on pre-push. PRs should include a short summary, linked issue when applicable, screenshots for UI changes, and note any i18n or environment updates.

## Security & Configuration Tips
Copy `.env.example` to `.env` for local setup and never commit secrets. Run `pnpm lint:secrets` when touching config, content, or environment files. If you add copy or UI text, update the relevant file in `messages/` and re-run `pnpm check-i18n`.

## Core Mandates

### 1. Technical Integrity & Typing
- **SERVER COMPONENTS FIRST:** Every component **MUST** be a Server Component by default. Use `'use client'` only as a last resort when strictly necessary for interactivity (hooks like `useState`/`useEffect` or event listeners). Aim for maximum server-side rendering to ensure elite performance.
- **STRICT TYPES:** `any` is strictly FORBIDDEN. Use `unknown` or specific interfaces/types.
- **EXPLICIT RETURNS:** All functions and React components MUST have explicit return types.
- **INTERFACE NAMING:** Never use generic names like `interface Props`. Use descriptive names like `interface ButtonProps` to ensure clarity and reusability.
- **TS-STRICT:** Maintain `strict: true` in `tsconfig.json` at all times.
- **ENV VALIDATION:** All environment variables MUST be defined in `src/config/env.ts` and validated via Zod.
- **VALIDATION:** Always run `pnpm build` before finality. A task is only complete when it passes the production build.
- **CI/CD:** All changes MUST pass the GitHub Actions pipeline (Lint, Typecheck, i18n Sync, Build).
- **QUALITY GATE:** 
  - A Husky `pre-commit` hook runs `pnpm test`, `pnpm lint:secrets`, and `lint-staged` automatically.
  - A Husky `pre-push` hook runs `pnpm build` automatically.
  - NEVER bypass these gates.

### 2. Code Style & Documentation
- **NO COMMENTS:** NEVER include comments in the source code. The code must be self-explanatory through clean naming and structure.
- **IMPORT ORDER:** Imports MUST be sorted automatically via Prettier (React, Next, Third-party, Internal, Local).
- **LOGGING:** `console.log` is strictly FORBIDDEN. Use the structured `logger` from `@/src/lib/logger`.
- **NAMING:** Use descriptive, camelCase for variables/functions and PascalCase for components.
- **ICONS:** Use **Phosphor Icons** (`@phosphor-icons/react`) exclusively. NEVER use Lucide or other libraries. When installing shadcn/ui components, you **MUST** manually replace all Lucide icons with their Phosphor equivalents.
- **SEMANTIC HTML:** Prohibit the use of `div` for everything. Use semantic tags like `section`, `header`, `footer`, `article`, and `aside` to maintain elite SEO and accessibility.
- **ACCESSIBILITY:** Every button or interactive element containing only an icon (no text) **MUST** have an `aria-label` attribute.
- **SURGICAL UPDATES:** Apply minimal, targeted changes. Avoid unrelated refactoring.

### 3. Internationalization (next-intl)
- **UI TEXT:** NEVER hardcode strings in components. All user-facing text must be retrieved via `useTranslations` (client) or `getTranslations` (server).
- **TYPED KEYS:** Ensure `src/types/intl.d.ts` is updated when adding new translation namespaces to maintain type safety.
- **I18N SYNC:** All translation files (`messages/*.json`) MUST have identical keys. The build will fail if they are out of sync. Run `pnpm check-i18n` to verify.
- **METADATA:** Use `generateMetadata` in `layout.tsx` or `page.tsx` for locale-aware SEO.
- **ERRORS:** Use the `Errors` namespace in JSON for `error.tsx` and `not-found.tsx` messages.

### 4. Styling & Typography (Tailwind CSS v4)
- **BRANDING:** Prefer using centralized brand variables defined in `globals.css`.
- **FONTS:** All fonts MUST be defined in `src/config/fonts.ts`. Use the `fontVariables` constant in the root layout.
- **COLORS:** Use `oklch` for all custom color definitions for better accessibility and vibrancy.
- **DESIGN SYSTEM:**
  - **Layout:** The `body` tag in `layout.tsx` **MUST** always maintain the classes `mx-auto w-full max-w-440` for layout consistency.
  - **Corners:** Use `rounded-full` for small interactive elements (triggers) and `rounded-2xl` for containers/menus.
  - **Effects:** Use `backdrop-blur-sm` (or `xl`) for overlays and dropdowns.
  - **Minimalism:** Keep the UI clean, with subtle borders (`border-border/60`) and neutral backgrounds.

### 5. Architectural Standards
- **PATH ALIASES:** Always use `@/` for root-relative imports (e.g., `@/src/components/...`).
- **COMPOSITION:** Prefer component composition (`children`) over excessive props. Limit components to a maximum of 5-7 props.
- **COMPONENT LOCATION:** 
  - `src/components/ui/`: Base shadcn/ui components.
  - `src/components/common/`: Shared, high-level components.
  - `src/components/sections/`: Landing page sections (e.g., Hero, Features). Use **camelCase** for filenames.
  - `src/app/`: Routes, layouts, and global styles.
- **SECURITY:** Maintain strict Content Security Policy (CSP) and security headers in `next.config.mjs`. Use `pnpm lint:secrets` to scan for credentials.
- **PERFORMANCE:** Use `pnpm analyze` to monitor bundle sizes and maintain edge runtime for dynamic routes where possible.
- **MAINTENANCE:** Before adding any new library, validate its impact via `pnpm analyze`. Favor native Web APIs over third-party packages.
- **TESTING:** 
  - **Unit:** All business logic, utility functions, components, and configurations MUST have corresponding tests in `src/__tests__/` using Vitest.
  - **E2E:** Critical user flows (navigation, language switching, forms) MUST be verified using Playwright in `src/__tests__/e2e/`.
- **DEPLOYMENT:** Use the provided `Dockerfile` (multi-stage) for production. Ensure `output: "standalone"` is enabled in `next.config.mjs`.

## Mandatory Development Workflow

Before committing any change, you MUST execute the following sequence:

1. **`pnpm format`**: Ensures imports are sorted and code style is consistent.
2. **`pnpm check-i18n`**: Verifies all translation files are synchronized.
3. **`pnpm test`**: Ensures all unit and component tests pass.
4. **`pnpm typecheck`**: Validates TypeScript integrity.
5. **`pnpm build`**: Final validation for production readiness.

### Git & Commit Rules
- **SEMANTIC COMMITS:** Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `style:`). Non-compliant commits will be rejected by the pre-commit hooks.

### Scaffolding (Industrial Productivity)
When creating new components or sections, **NEVER** create files manually. Use the generator:
- **Command:** `pnpm generate`
- **When to use:** Every time you need a new component or section.

### New Project Request
If a user requests the creation of a new landing page or system based on this template, **YOU MUST** first read and follow the instructions in **`CHECKLIST.md`**.

## Main Technologies
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Testing:** Vitest + Playwright + React Testing Library + JSDOM
- **Logging:** Pino (Structured)
- **i18n:** next-intl (Prefix-less routing)
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Security:** Secretlint

## Scripts
- `pnpm dev`: Development server.
- `pnpm build`: Production build (includes i18n check).
- `pnpm test`: Run all unit tests.
- `pnpm test:e2e`: Run Playwright E2E tests.
- `pnpm lint:secrets`: Scan codebase for accidental secrets.
- `pnpm check-i18n`: Verify translation files sync.
- `pnpm analyze`: Analyze bundle sizes.
- `pnpm audit`: Run Lighthouse audit on all routes.
- `pnpm clean`: Wipe build caches and node_modules.
- `pnpm lint`: Code quality check.
- `pnpm typecheck`: Strict type verification.
- `pnpm format`: Format code and sort imports.
- `pnpm generate`: Create new components via Plop.js.
