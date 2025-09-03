export type Gender = 'male' | 'female'

export type StrokeRiskInput = {
	age: number
	gender: Gender
	systolic: number
	diastolic: number
	diabetes: boolean
	smoking: boolean
	afib?: boolean
	lvh?: boolean
	cholesterolMgDl?: number
}

export type StrokeRiskResult = {
	percent10y: number
	level: 'Low' | 'Moderate' | 'High' | 'Very High'
	score: number
}

export function calculateStrokeRisk(input: StrokeRiskInput): StrokeRiskResult {
	const { age, systolic, diastolic, diabetes, smoking, afib, lvh, cholesterolMgDl } = input
	if (!(age > 0 && age <= 120 && systolic > 0 && diastolic > 0)) throw new Error('Invalid inputs')
	let score = 0
	// Age bands
	if (age >= 45 && age < 55) score += 2
	else if (age < 65) score += 4
	else if (age < 75) score += 6
	else score += 8
	// Blood pressure
	if (systolic >= 180 || diastolic >= 110) score += 6
	else if (systolic >= 160 || diastolic >= 100) score += 4
	else if (systolic >= 140 || diastolic >= 90) score += 2
	// Risk factors
	if (diabetes) score += 4
	if (smoking) score += 3
	if (afib) score += 4
	if (lvh) score += 2
	// Cholesterol (optional)
	if (typeof cholesterolMgDl === 'number') {
		if (cholesterolMgDl >= 240) score += 2
		else if (cholesterolMgDl >= 200) score += 1
	}
	// Map score to 10y risk percentage (educational approximation)
	let percent10y = 3
	if (score <= 4) percent10y = 3
	else if (score <= 8) percent10y = 6
	else if (score <= 12) percent10y = 12
	else if (score <= 16) percent10y = 18
	else if (score <= 20) percent10y = 25
	else percent10y = 30
	// Level mapping per spec
	let level: StrokeRiskResult['level']
	if (percent10y < 5) level = 'Low'
	else if (percent10y <= 10) level = 'Moderate'
	else if (percent10y <= 20) level = 'High'
	else level = 'Very High'
	return { percent10y, level, score }
}


