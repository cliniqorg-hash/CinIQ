export type WeightGainStatus = 'Below' | 'Within' | 'Above'

export type PregnancyWeightGainInput = {
	prePregnancyWeightKg: number
	currentWeightKg: number
	heightCm: number
	gestationalWeek: number // 0–42
}

export type PregnancyWeightGainResult = {
	prePregnancyBmi: number
	bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese'
	recommendedTotalGainKg: { min: number; max: number }
	recommendedGainToDateKg: { min: number; max: number }
	currentGainKg: number
	status: WeightGainStatus
}

function round1(n: number): number {
	return Math.round(n * 10) / 10
}

function classifyBmi(bmi: number): PregnancyWeightGainResult['bmiCategory'] {
	if (bmi < 18.5) return 'Underweight'
	if (bmi < 25) return 'Normal'
	if (bmi < 30) return 'Overweight'
	return 'Obese'
}

function totalGainRange(category: PregnancyWeightGainResult['bmiCategory']): { min: number; max: number } {
	switch (category) {
		case 'Underweight':
			return { min: 12.5, max: 18 }
		case 'Normal':
			return { min: 11.5, max: 16 }
		case 'Overweight':
			return { min: 7, max: 11.5 }
		case 'Obese':
			return { min: 5, max: 9 }
	}
}

export function calculatePregnancyWeightGain(input: PregnancyWeightGainInput): PregnancyWeightGainResult {
	const { prePregnancyWeightKg, currentWeightKg, heightCm, gestationalWeek } = input
	if (!(prePregnancyWeightKg > 0 && currentWeightKg > 0 && heightCm > 0)) throw new Error('Invalid inputs')
	const heightM = heightCm / 100
	const bmi = prePregnancyWeightKg / (heightM * heightM)
	const bmiRounded = round1(bmi)
	const category = classifyBmi(bmi)
	const total = totalGainRange(category)

	const week = Math.min(Math.max(gestationalWeek, 0), 40)
	// First trimester ~1–2 kg up to week 12, distribute linearly
	const firstTrimesterWeeks = 12
	const remainingWeeks = Math.max(0, week - firstTrimesterWeeks)
	const totalSpanWeeks = 40 - firstTrimesterWeeks // 28

	let minToDate = 0
	let maxToDate = 0
	if (week <= firstTrimesterWeeks) {
		minToDate = (week / firstTrimesterWeeks) * 1
		maxToDate = (week / firstTrimesterWeeks) * 2
	} else {
		const minAfter = (remainingWeeks / totalSpanWeeks) * (total.min - 1)
		const maxAfter = (remainingWeeks / totalSpanWeeks) * (total.max - 2)
		minToDate = 1 + minAfter
		maxToDate = 2 + maxAfter
	}

	const currentGain = currentWeightKg - prePregnancyWeightKg
	let status: WeightGainStatus = 'Within'
	if (currentGain < minToDate) status = 'Below'
	if (currentGain > maxToDate) status = 'Above'

	return {
		prePregnancyBmi: round1(bmiRounded),
		bmiCategory: category,
		recommendedTotalGainKg: { min: round1(total.min), max: round1(total.max) },
		recommendedGainToDateKg: { min: round1(minToDate), max: round1(maxToDate) },
		currentGainKg: round1(currentGain),
		status,
	}
}


