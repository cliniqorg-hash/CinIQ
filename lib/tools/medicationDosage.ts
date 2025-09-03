export type MedicationDosageInput = {
	patientAgeYears: number
	patientWeightKg: number
	frequencyPerDay: number
	// One of the following must be provided
	mgPerKgPerDay?: number // for pediatric/weight-based dosing
	adultTotalMgPerDay?: number // for standard adult dosing
}

export type MedicationDosageResult = {
	totalDailyMg: number
	perDoseMg: number
}

export function calculateMedicationDosage(input: MedicationDosageInput): MedicationDosageResult {
	const { patientAgeYears, patientWeightKg, frequencyPerDay, mgPerKgPerDay, adultTotalMgPerDay } = input
	if (!(patientAgeYears >= 0 && patientAgeYears <= 120)) throw new Error('Invalid age')
	if (!(patientWeightKg > 0 && patientWeightKg <= 250)) throw new Error('Invalid weight')
	if (!(frequencyPerDay > 0 && frequencyPerDay <= 12)) throw new Error('Invalid frequency')
	let totalDailyMg: number | null = null
	if (typeof mgPerKgPerDay === 'number' && mgPerKgPerDay > 0) {
		totalDailyMg = mgPerKgPerDay * patientWeightKg
	}
	if (typeof adultTotalMgPerDay === 'number' && adultTotalMgPerDay > 0) {
		// If both provided, prefer explicit adult dose
		totalDailyMg = adultTotalMgPerDay
	}
	if (!totalDailyMg) throw new Error('Provide a valid dosing scheme')
	const perDoseMg = totalDailyMg / frequencyPerDay
	return {
		totalDailyMg: Math.round(totalDailyMg),
		perDoseMg: Math.round(perDoseMg),
	}
}


