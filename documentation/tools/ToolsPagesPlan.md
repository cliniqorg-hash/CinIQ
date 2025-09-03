Tools Pages Build Plan

Overview

- Create a centralized `tools` landing page and individual pages for each health tool described in `Readme.md`.
- Implement in phases to ensure fast delivery and quality.

Architecture

- Framework: Next.js (App Router) already used in this repo
- Styling: Tailwind CSS (via existing `globals.css`/`tailwind.config.js`)
- i18n: integrate via existing `lib/i18n.ts`
- Shared UI: place reusable components under `components/tools/`
- Pure calculations: place deterministic logic in `lib/tools/`
- Pages: under `app/tools/...`

Routes and Files (Phase 1 scaffolding)

- Landing
  - Path: `/tools`
  - File: `app/tools/page.tsx`
  - Purpose: index of all tools with search/filter, brief descriptions, and links

- Calculators/Tools (one folder per tool with `page.tsx`)
  - BMI Calculator
    - Path: `/tools/bmi`
    - File: `app/tools/bmi/page.tsx`
  - BMR Calculator
    - Path: `/tools/bmr`
    - File: `app/tools/bmr/page.tsx`
  - TDEE Calculator
    - Path: `/tools/tdee`
    - File: `app/tools/tdee/page.tsx`
  - Body Fat % Calculator
    - Path: `/tools/body-fat`
    - File: `app/tools/body-fat/page.tsx`
  - Water Intake Calculator
    - Path: `/tools/water-intake`
    - File: `app/tools/water-intake/page.tsx`
  - Sleep Cycle Calculator
    - Path: `/tools/sleep-cycle`
    - File: `app/tools/sleep-cycle/page.tsx`
  - Blood Pressure Category Tool
    - Path: `/tools/blood-pressure`
    - File: `app/tools/blood-pressure/page.tsx`
  - Heart Rate Zone Calculator
    - Path: `/tools/heart-rate-zones`
    - File: `app/tools/heart-rate-zones/page.tsx`
  - Diabetes Risk Score Calculator
    - Path: `/tools/diabetes-risk`
    - File: `app/tools/diabetes-risk/page.tsx`
  - Cholesterol Ratio Calculator
    - Path: `/tools/cholesterol-ratio`
    - File: `app/tools/cholesterol-ratio/page.tsx`
  - Kidney Function (eGFR) Calculator
    - Path: `/tools/egfr`
    - File: `app/tools/egfr/page.tsx`
  - Smoking Risk Calculator
    - Path: `/tools/smoking-risk`
    - File: `app/tools/smoking-risk/page.tsx`
  - Pregnancy Due Date Calculator
    - Path: `/tools/pregnancy-due-date`
    - File: `app/tools/pregnancy-due-date/page.tsx`
  - Ovulation Calculator
    - Path: `/tools/ovulation`
    - File: `app/tools/ovulation/page.tsx`
  - Pregnancy Weight Gain Tracker
    - Path: `/tools/pregnancy-weight-gain`
    - File: `app/tools/pregnancy-weight-gain/page.tsx`
  - Stroke Risk Calculator
    - Path: `/tools/stroke-risk`
    - File: `app/tools/stroke-risk/page.tsx`
  - COPD Risk Assessment
    - Path: `/tools/copd-risk`
    - File: `app/tools/copd-risk/page.tsx`
  - Cancer Screening Eligibility
    - Path: `/tools/cancer-screening`
    - File: `app/tools/cancer-screening/page.tsx`
  - Thyroid Risk Score
    - Path: `/tools/thyroid-risk`
    - File: `app/tools/thyroid-risk/page.tsx`
  - Diabetic Retinopathy Risk Checker
    - Path: `/tools/diabetic-retinopathy`
    - File: `app/tools/diabetic-retinopathy/page.tsx`
  - Medication Dosage Calculator
    - Path: `/tools/medication-dosage`
    - File: `app/tools/medication-dosage/page.tsx`
  - Drug Interaction Checker
    - Path: `/tools/drug-interaction`
    - File: `app/tools/drug-interaction/page.tsx`
  - Lifestyle Coach
    - Path: `/tools/lifestyle-coach`
    - File: `app/tools/lifestyle-coach/page.tsx`

Phase 1 — Scaffolding & UX skeleton

- Create all routes/files above with minimal pages using a shared `ToolLayout` with:
  - Title, short description, required disclaimers
  - Input form area (left/top) and results area (right/bottom)
  - Responsive grid, dark-mode friendly
- Shared components in `components/tools/`:
  - `ToolLayout.tsx`, `NumberInput.tsx`, `SelectInput.tsx`, `ResultCard.tsx`, `Disclaimer.tsx`, `ToolHero.tsx`
- Utilities in `lib/tools/`:
  - One pure function per tool (empty stub in Phase 1)
- Add tools to sitemap (`app/sitemap.ts`) and navigation (`components/Navbar.tsx` Tools dropdown)

Phase 2 — Implement calculations (deterministic only)

- Implement pure calculation functions in `lib/tools/` per Readme specs:
  - `bmi.ts`, `bmr.ts`, `tdee.ts`, `bodyFat.ts`, `waterIntake.ts`, `sleepCycle.ts`, `bloodPressure.ts`, `heartRateZones.ts`, `diabetesRisk.ts`, `cholesterolRatio.ts`, `egfr.ts`, `smokingRisk.ts`, `pregnancyDueDate.ts`, `ovulation.ts`, `pregnancyWeightGain.ts`, `strokeRisk.ts`, `copdRisk.ts`, `cancerScreening.ts`, `thyroidRisk.ts`, `diabeticRetinopathy.ts`, `medicationDosage.ts`, `drugInteraction.ts` (stub only, real data in Phase 3), `lifestyleCoach.ts` (orchestrator)
- Wire pages to call these functions on submit with validation per Readme (no unrealistic ranges)
- Display outputs: values, categories, interpretations, recommendations, disclaimers
- Round/format values (e.g., BMI to 1 decimal); include SI units consistently

Phase 3 — AI and Real Data integrations

- AI enhancements (server actions or edge functions):
  - Provide personalized recommendations for each tool, gated behind a toggle
  - Use existing chat API infra under `app/api/chat/route.ts` for generation
- Real external data (no mock):
  - Drug Interaction Checker: integrate OpenFDA (`drug/label`, `drug/event`) or a licensed DrugBank API
  - Medication Dosage: load reference tables from vetted sources; include versioning and citations
  - Lifestyle Coach: synthesize outputs from BMI/BMR/TDEE/HR zones; generate daily/weekly plans

Phase 4 — Tracking/History (optional, if enabled)

- Add optional local storage or user-auth gated persistence for trends
- Charts: simple line/bar charts using a lightweight lib (e.g., Chart.js) for histories
- Export/print/share results

Phase 5 — Polish, SEO, Accessibility

- SEO: `generateMetadata` per page with tool-specific keywords and descriptions
- Add JSON-LD (`MedicalWebPage` where applicable)
- Accessibility: labeled inputs, error messages, keyboard navigation, color contrast
- i18n strings for all labels, categories, recommendations, disclaimers

Validation Matrix (high level)

- All numeric inputs: required when specified, positive, clamp to realistic ranges from Readme
- Unit handling: kg/cm inputs; convert to meters when needed
- Date/time inputs: validate past/future where appropriate (e.g., LMP must be past)

Acceptance Criteria per Tool (abbreviated)

- BMI: shows BMI (1 decimal), category, interpretation, recommendations, disclaimer
- BMR: Mifflin-St Jeor for men/women, optional TDEE via multipliers
- Body Fat: Navy method formulas per gender, category bands
- Blood Pressure: class uses higher of systolic/diastolic categories
- Heart Rate Zones: 4 zones by MHR=220−age; optional Karvonen with resting HR
- Pregnancy tools: Naegele’s rule, ovulation day, fertile window, next period
- Drug Interaction: returns interaction pairs, severity, mechanism, references (real API)
- Lifestyle Coach: composes metrics into daily/weekly plan with actionable steps

Shared UI/UX details

- Consistent form layout with descriptive labels, helper text, and unit suffixes
- Result cards with color-coded badges per category/risk
- `Disclaimer` component visible on each page
- Link to credible sources under results

Testing Strategy

- Unit tests for `lib/tools/*` functions (edge cases, sample scenarios from Readme examples)
- Snapshot tests for pages’ initial render
- E2E smoke tests for form-submit-render loop

Sitemap and Navigation

- Update `app/sitemap.ts` to include all `/tools/...` routes
- Add `Tools` to `components/Navbar.tsx` linking to `/tools`; optional dropdown of popular tools

Estimated Timeline

- Phase 1: 0.5–1 day (scaffold all pages and shared shell)
- Phase 2: 2–4 days (implement all deterministic calculators)
- Phase 3: 2–5 days (AI and external APIs where applicable)
- Phase 4: 1–2 days (tracking/history + charts)
- Phase 5: 0.5–1 day (polish + SEO + a11y)

Notes

- Use only real datasets/APIs for data-backed tools; avoid mock responses
- Keep calculations pure and tested; UI should be thin
- Ensure medical disclaimers are prominent and consistent


