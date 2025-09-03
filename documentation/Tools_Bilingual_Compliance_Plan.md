# Tools Bilingual Compliance Plan (AR/EN) – Execution Roadmap

Goal: Make every tool fully bilingual (Arabic + English) across all visible text, dynamic outputs, errors, accessibility labels, and documentation.

This plan lists the phases, standards, and a per‑tool checklist. We will execute it one tool at a time and track progress here.

## Global Standards
- Translation source: `lib/i18n.ts`
- Hook: `useLang()` / `T` component
- Layout: `components/tools/ToolLayout.tsx` must render RTL/LTR with `dir` and alignments
- No hardcoded text in `app/tools/**/page.tsx` (move to `T` or computed i18n keys)
- No hardcoded text in `lib/tools/**` outputs (return codes/keys; map to i18n in UI)
- All buttons/inputs/ARIA labels localized
- Numbers/units remain numeric; labels localized

## What “Fully Bilingual” Means
- Titles, descriptions, section headers
- All input labels and dropdown option labels
- Error messages and validation messages
- Result labels and narrative (explanations, tips, warnings)
- Tool info tabs: What it does, How to use, Input guide, Result explanation, Help sections
- Action buttons and ARIA labels
- Any inline annotations like “What this result means”, “Recommendations”, etc.

## Implementation Steps (per tool)
1) Inventory strings
- Identify hardcoded text in `app/tools/<tool>/page.tsx`
- Identify logic outputs coming from `lib/tools/<tool>.ts` that include user‑facing strings

2) Define translation keys
- Add `<tool>.title`, `<tool>.description`
- `<tool>.inputs.*` for every input/option label
- `<tool>.results.*` for result headers/labels
- `<tool>.info.whatItDoes`, `.howToUse`, `.inputGuide`, `.resultExplanation`
- `<tool>.messages.*` for validation or alerts
- `<tool>.aria.*` for ARIA labels
- If logic returns categories or labels, use code enums and map in UI via i18n keys

3) Wire translations in UI
- Replace hardcoded strings in `page.tsx` with `<T k="..." />`
- Pass toolInfo using i18n keys, not hardcoded text
- Localize all `aria-label`, `title` attributes

4) Localize dynamic outputs
- Map categories/status from compute results to i18n keys (e.g., `bmi.category.underweight`)
- Wrap result narratives and tips with i18n

5) QA and Build
- Manual verify AR/EN toggling
- RTL layout in Arabic
- `npm run build` green

6) Documentation
- Update this plan checklist

## Key Translation Namespacing (examples)
- `tools.bmi.*`, `tools.bmr.*`, `tools.tdee.*`
- `tools.waterIntake.*`, `tools.bloodPressure.*`, etc.
- Shared generics already exist under `tools.*` (inputs/results/actions/tabs/help)

## Execution Phases
We will proceed tool‑by‑tool in small batches, updating this document after each batch.

### Phase 1 (Foundational Trio)
- BMI (`app/tools/bmi/page.tsx`, `lib/tools/bmi.ts`)
- BMR (`app/tools/bmr/page.tsx`, `lib/tools/bmr.ts`)
- TDEE (`app/tools/tdee/page.tsx`, `lib/tools/tdee.ts`)

Focus: Establish category/result key patterns, validate shared generics, confirm RTL.

### Phase 2 (Vitals & Composition)
- Blood Pressure
- Heart Rate Zones
- Body Fat %

Focus: Option labels, unit labels, result banding/categories.

### Phase 3 (Metabolic & Hydration)
- Water Intake
- Cholesterol Ratio
- eGFR

Focus: Result explanation blocks and recommendations localization.

### Phase 4 (Risk Calculators I)
- Diabetes Risk
- Smoking Risk
- Stroke Risk

Focus: Questionnaire options, risk categories, safety notes.

### Phase 5 (Vision/Diabetic)
- Diabetic Retinopathy

Focus: Clear risk staging localization and clinical disclaimers.

### Phase 6 (Respiratory & Cancer)
- COPD Risk
- Cancer Screening

Focus: Eligibility explanations, age ranges, warnings.

### Phase 7 (Women’s Health I)
- Ovulation
- Pregnancy Due Date
- Pregnancy Weight Gain

Focus: Date formats, gestational ranges, recommended ranges.

### Phase 8 (Endocrine & Medication)
- Thyroid Risk
- Medication Dosage
- Drug Interaction

Focus: Medical safety messaging, input precision, result caveats.

### Phase 9 (Lifestyle)
- Sleep Cycle
- Lifestyle Coach

Focus: Guidance content blocks localized fully.

## Per‑Tool Checklist Template
- [ ] Replace title/description with i18n keys
- [ ] Localize all input labels and options
- [ ] Localize action buttons and ARIA labels
- [ ] Move validation/error strings to i18n
- [ ] Map compute outputs/categories to i18n keys
- [ ] Localize result narratives and tips
- [ ] Localize toolInfo sections (whatItDoes/howToUse/inputGuide/resultExplanation)
- [ ] Verify RTL alignment and layout in Arabic
- [ ] Build passes and manual toggle test (AR/EN)

## Tool Coverage Checklist
- [x] BMI
- [x] BMR
- [x] TDEE
- [x] Blood Pressure
- [x] Heart Rate Zones
- [x] Body Fat
- [x] Water Intake
- [x] Cholesterol Ratio
- [x] eGFR
- [x] Diabetes Risk
- [x] Diabetic Retinopathy
- [x] Drug Interaction
- [x] Medication Dosage
- [x] COPD Risk
- [x] Cancer Screening
- [x] Ovulation
- [x] Pregnancy Due Date
- [x] Pregnancy Weight Gain
- [x] Sleep Cycle
- [x] Smoking Risk
- [x] Stroke Risk
- [x] Thyroid Risk
- [x] Lifestyle Coach

## Deliverables per Phase
- Code updates (UI + i18n keys)
- Build green (`npm run build`)
- This document updated: which tools completed, notes, follow‑ups

---

Phase 1 completed: BMI, BMR, and TDEE pages use i18n keys; shared units and help strings added; layout disclaimers localized. Next step: Execute Phase 2 (Blood Pressure, Heart Rate Zones, Body Fat).
