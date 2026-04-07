# New Project Checklist (Must Do)

Follow these steps every time you clone this template to start a new landing page or system. This ensures the brand identity, SEO, and configurations are correctly applied.

## 1. Project Identity
- [ ] **Site Config:** Update `name`, `shortName`, `url`, and `authors` in `src/config/site.ts`.
- [ ] **Links:** Update social media links (twitter, github) in `src/config/site.ts`.
- [ ] **Package:** Update `name` and `version` in `package.json`.

## 2. Branding & Visuals
- [ ] **Colors:** Update `--brand-primary` and `--brand-secondary` in `src/app/globals.css`.
- [ ] **Typography:** Review and update fonts in `src/config/fonts.ts` if the brand requires different typefaces.
- [ ] **Favicon:** Replace all files in `public/` (favicon.ico, apple-touch-icon.png, favicon-16x16.png).
- [ ] **OG Image:** Replace `public/og.png` with the default fallback social share image.

## 3. Internationalization & SEO
- [ ] **Metadata:** Update the `Config` namespace in `messages/pt.json` and `messages/en.json` (title, description, keywords).
- [ ] **Translation Audit:** Ensure all keys are consistent across language files.

## 4. Environment & Deployment
- [ ] **Env File:** Create a `.env` file based on `.env.example`.
- [ ] **Site URL:** Set `NEXT_PUBLIC_SITE_URL` in `.env`.
- [ ] **Analytics:** Add `NEXT_PUBLIC_GA_ID` if Google Analytics is required for this client.

## 5. Maintenance
- [ ] **Reset:** Run `pnpm clean` to remove build artifacts from the template.
- [ ] **Install:** Run `pnpm install` to regenerate the lockfile for the new project.
- [ ] **Verify:** Run `pnpm build` to ensure everything is configured correctly before the first deploy.
