export type ThyroidType = 'Hypothyroid' | 'Hyperthyroid' | 'Indeterminate'

export type ThyroidRiskInput = {
	symptoms: {
		fatigue?: boolean
		weightGain?: boolean
		weightLoss?: boolean
		coldIntolerance?: boolean
		heatIntolerance?: boolean
		palpitations?: boolean
		moodChanges?: boolean
		hairOrNailChanges?: boolean
	}
	labs?: { tsh?: number; t3?: number; t4?: number }
}

export type ThyroidRiskResult = {
	score: number
	level: 'Low' | 'Moderate' | 'High' | 'Very High'
	suspectedType: ThyroidType
}

export function calculateThyroidRisk(input: ThyroidRiskInput): ThyroidRiskResult {
	const { symptoms, labs } = input
	let score = 0
	// Simple additive scoring
	if (symptoms.fatigue) score += 2
	if (symptoms.weightGain) score += 2
	if (symptoms.weightLoss) score += 2
	if (symptoms.coldIntolerance) score += 2
	if (symptoms.heatIntolerance) score += 2
	if (symptoms.palpitations) score += 2
	if (symptoms.moodChanges) score += 1
	if (symptoms.hairOrNailChanges) score += 1
	// Lab hints (optional)
	if (typeof labs?.tsh === 'number') {
		if (labs.tsh > 4.5) score += 3
		if (labs.tsh < 0.4) score += 3
	}
	if (typeof labs?.t3 === 'number' && labs.t3 > 0) score += 0 // placeholder (not used heavily)
	if (typeof labs?.t4 === 'number' && labs.t4 > 0) score += 0

	let level: ThyroidRiskResult['level']
	if (score <= 5) level = 'Low'
	else if (score <= 10) level = 'Moderate'
	else if (score <= 15) level = 'High'
	else level = 'Very High'

	let suspected: ThyroidType = 'Indeterminate'
	if ((symptoms.fatigue || symptoms.weightGain || symptoms.coldIntolerance) && typeof labs?.tsh === 'number' && labs.tsh > 4.5) {
		suspected = 'Hypothyroid'
	} else if ((symptoms.palpitations || symptoms.weightLoss || symptoms.heatIntolerance) && typeof labs?.tsh === 'number' && labs.tsh < 0.4) {
		suspected = 'Hyperthyroid'
	}

	return { score, level, suspectedType: suspected }
}


