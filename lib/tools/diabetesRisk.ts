export type Gender = 'male' | 'female'

export type ActivityBand = '<4' | '4-7' | '>7'

export type DiabetesRiskInput = {
	age: number
	gender: Gender
	bmi: number
	waistCm: number
	activity: ActivityBand
	familyHistory: boolean
}

export type DiabetesRiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High'

export type DiabetesRiskResult = {
	score: number
	level: DiabetesRiskLevel
}

export function calculateDiabetesRisk(input: DiabetesRiskInput): DiabetesRiskResult {
	const { age, gender, bmi, waistCm, activity, familyHistory } = input
	if (!(age > 0 && bmi > 0 && waistCm > 0)) throw new Error('Invalid inputs')
	let score = 0
	if (age >= 45) score += 2
	if (bmi >= 30) score += 3
	if ((gender === 'male' && waistCm >= 102) || (gender === 'female' && waistCm >= 88)) score += 4
	if (activity === '<4') score += 2
	if (familyHistory) score += 3

	let level: DiabetesRiskLevel
	if (score <= 7) level = 'Low'
	else if (score <= 11) level = 'Moderate'
	else if (score <= 16) level = 'High'
	else level = 'Very High'

	return { score, level }
}


