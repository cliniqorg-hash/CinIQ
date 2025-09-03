# Health Tools Documentation

## Overview
This project provides a comprehensive collection of health calculators, risk assessment tools, and AI-powered health assistants. The tools are designed to help users understand their health metrics, assess risks, and get personalized health recommendations.

## Tool Categories

### 📌 General Health Calculators
- **BMI Calculator** – Calculate Body Mass Index and body category classification
- **BMR Calculator** – Determine Basal Metabolic Rate (calories needed at rest)
- **TDEE Calculator** – Calculate Total Daily Energy Expenditure (daily calorie needs)
- **Body Fat % Calculator** – Estimate body fat percentage using body measurements
- **Water Intake Calculator** – Determine daily hydration needs
- **Sleep Cycle Calculator** – Find optimal sleep/wake times

### 📌 Vital Signs & Risk Tools
- **Blood Pressure Category Tool** – Classify BP readings (normal/elevated/hypertension stages)
- **Heart Rate Zone Calculator** – Calculate safe exercise heart rate ranges
- **Diabetes Risk Score** – Assess diabetes risk based on lifestyle, family history, and BMI
- **Cholesterol Ratio Calculator** – Calculate HDL, LDL, and triglyceride ratios
- **Kidney Function Calculator (eGFR)** – Estimate kidney function using creatinine, age, and sex
- **Smoking Risk Calculator** – Assess lung age and smoking-related health risks

### 📌 Women's Health
- **Pregnancy Due Date Calculator** – Calculate due date based on Last Menstrual Period (LMP)
- **Ovulation Calculator** – Determine fertile window and ovulation timing
- **Pregnancy Weight Gain Tracker** – Monitor healthy weight gain during pregnancy

### 📌 Chronic Disease & Risk Prediction
- **Stroke Risk Calculator** – Framingham Score-based stroke risk assessment
- **COPD Risk Assessment** – Questionnaire-based COPD risk evaluation
- **Cancer Screening Eligibility Checker** – Age/gender-based screening recommendations
- **Thyroid Risk Score** – Symptom-based thyroid disorder risk assessment
- **Diabetic Retinopathy Risk Checker** – Eye health risk assessment for diabetics

### 📌 Medication & Treatment Tools
- **Medication Dosage Calculator** – Weight-based dosing for pediatrics and adults
- **Drug Interaction Checker** – Check for potential drug interactions
- **FAQ Chatbot** – Drug information and pharmacy advice
- **Lifestyle Coach** – Personalized nutrition, exercise, and sleep recommendations

## Implementation Status

### ❌ No AI Integration Required
These tools use standard medical formulas and calculations:
- BMI, BMR, TDEE, Body Fat %, Water Intake, Sleep Cycle
- Blood Pressure, Heart Rate Zones, Cholesterol Ratios
- Kidney Function (eGFR), Smoking Risk
- Pregnancy Due Date, Ovulation, Weight Gain Tracking
- Stroke Risk (Framingham), COPD Risk, Cancer Screening
- Thyroid Risk Score, Medication Dosage

### ✅ AI Integration Required
These tools benefit from AI-powered features:
- **Diabetes Risk Score** – Enhanced with symptom-based prediction
- **Pregnancy Weight Gain Tracker** – AI-powered diet and lifestyle recommendations
- **Stroke Risk Calculator** – Personalized risk insights and recommendations
- **Cancer Screening** – AI-suggested screening schedules
- **Thyroid Risk Score** – Enhanced interpretation and symptom analysis
- **Diabetic Retinopathy Checker** – ML-based risk prediction
- **Drug Interaction Checker** – AI-powered interaction analysis
- **FAQ Chatbot** – Intelligent drug information and advice
- **Lifestyle Coach** – Personalized health coaching

## Technology Stack
- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API, Custom ML models
- **Data Sources**: Medical databases, OpenFDA API, DrugBank
- **Deployment**: Firebase Hosting

## Getting Started
1. Review the implementation plan in `tools/implementation-plan.md`
2. Check the chat system documentation in `tools/chat/`
3. Follow the development roadmap for each tool category
4. Implement AI integration where specified

## Contributing
Please read the contribution guidelines and follow the established coding standards. All medical calculations should be validated against established medical guidelines.
