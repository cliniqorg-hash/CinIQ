export type DrRiskInput = {
	age: number
	durationYears: number
	hba1c?: number
	bloodPressureSystolic?: number
	cholesterolTotal?: number
	complications?: { nephropathy?: boolean; neuropathy?: boolean; cvd?: boolean }
	lifestyle?: { smoking?: boolean; activity?: 'low' | 'moderate' | 'high' }
}

export type DrRiskResult = {
	percentRisk: number
	level: 'Low' | 'Moderate' | 'High' | 'Very High'
	score: number
}

export function calculateDrRisk(input: DrRiskInput): DrRiskResult {
	const { age, durationYears, hba1c, bloodPressureSystolic, cholesterolTotal, complications, lifestyle } = input
	if (!(age > 0 && durationYears >= 0)) throw new Error('Invalid inputs')
	let score = 0
	// Duration and glycemic control are dominant
	if (durationYears >= 5 && durationYears < 10) score += 5
	else if (durationYears < 20) score += 10
	else score += 15
	if (typeof hba1c === 'number') {
		if (hba1c >= 9) score += 10
		else if (hba1c >= 8) score += 7
		else if (hba1c >= 7) score += 5
		else score += 2
	}
	if (typeof bloodPressureSystolic === 'number' && bloodPressureSystolic >= 140) score += 4
	if (typeof cholesterolTotal === 'number' && cholesterolTotal >= 240) score += 3
	if (complications?.nephropathy) score += 4
	if (complications?.neuropathy) score += 3
	if (complications?.cvd) score += 3
	if (lifestyle?.smoking) score += 3
	if (lifestyle?.activity === 'low') score += 2

	// Map to percentage bands (educational approximation)
	let percent = 5
	if (score <= 10) percent = 8
	else if (score <= 18) percent = 18
	else if (score <= 26) percent = 32
	else percent = 50

	let level: DrRiskResult['level']
	if (percent <= 10) level = 'Low'
	else if (percent <= 25) level = 'Moderate'
	else if (percent <= 50) level = 'High'
	else level = 'Very High'

	return { percentRisk: percent, level, score }
}


