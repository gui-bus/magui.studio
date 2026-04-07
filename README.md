# 🚀 Next.js Elite Landing Page Template

A high-performance, production-ready, and strictly typed Landing Page template built with the latest web technologies. This project is engineered for speed, scalability, and professional maintenance.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Internationalization:** next-intl (Prefix-less routing)
- **Validation:** Zod
- **Testing:** Vitest + Playwright + React Testing Library
- **Logging:** Pino (Structured)
- **CI/CD:** GitHub Actions
- **Containerization:** Docker (Multi-stage)
- **Security:** Secretlint

## ✨ Key Features

- 🌍 **Full i18n:** Automated translation key synchronization and strict typing.
- ⚡ **Performance:** Optimized for 100/100 Lighthouse scores with built-in auditing (`pnpm audit`).
- 🛡️ **Security:** Pre-configured CSP headers and automated secret scanning.
- 🏗️ **Industrial Scaffolding:** Automated component generation via Plop.js.
- 🎨 **Dynamic Assets:** On-the-fly Open Graph image generation (`/api/og`).
- 📱 **PWA Ready:** Manifest and metadata pre-configured for mobile installation.
- 🧪 **Elite Testing:** 100% coverage strategy with unit, component, and E2E smoke tests.

## 🚀 Getting Started

### 1. Requirements
- Node.js 20+
- pnpm 10+

### 2. Installation
```bash
pnpm install
```

### 3. Environment Setup
```bash
cp .env.example .env
# Fill in your variables
```

### 4. Development
```bash
pnpm dev
```

## 📜 Mandatory Workflow

Before every commit, the system automatically runs:
1. `pnpm format` - Organizes imports and styles.
2. `pnpm check-i18n` - Validates translation sync.
3. `pnpm test` - Runs unit and component tests.
4. `pnpm typecheck` - Validates TypeScript integrity.

*A Husky pre-push hook also runs `pnpm build` to ensure production readiness.*

## 📂 Project Structure

- `src/app/`: Core routing and layouts.
- `src/components/`: UI, common, and landing page sections.
- `src/config/`: Centralized site, font, and env configurations.
- `src/lib/`: Custom hooks, animations, and utilities.
- `src/__tests__/`: Unit and E2E test suites.
- `messages/`: Multi-language JSON files.

## 📋 New Project Checklist
See [CHECKLIST.md](./CHECKLIST.md) for a step-by-step guide on starting a new project with this template.

## 🛠 Scripts

- `pnpm build`: Optimized production build.
- `pnpm test:e2e`: Run Playwright E2E tests.
- `pnpm generate`: Scaffolding new components.
- `pnpm analyze`: Analyze bundle sizes.
- `pnpm audit`: Site-wide Lighthouse audit.
- `pnpm clean`: Wipe build artifacts and caches.
