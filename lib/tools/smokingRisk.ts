export type SmokingRiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High'

export type SmokingRiskInput = {
	cigarettesPerDay: number
	yearsSmoked: number
	age: number
}

export type SmokingRiskResult = {
	packYears: number
	lungAge: number
	risk: SmokingRiskLevel
}

export function calculateSmokingRisk(input: SmokingRiskInput): SmokingRiskResult {
	const { cigarettesPerDay, yearsSmoked, age } = input
	if (!(cigarettesPerDay >= 0 && yearsSmoked >= 0 && age > 0)) throw new Error('Invalid inputs')
	const packYearsRaw = (cigarettesPerDay * yearsSmoked) / 20
	const packYears = Math.round(packYearsRaw * 10) / 10
	const lungAge = Math.round(age + packYears * 2)
	let risk: SmokingRiskLevel
	if (packYears < 10) risk = 'Low'
	else if (packYears <= 20) risk = 'Moderate'
	else if (packYears <= 40) risk = 'High'
	else risk = 'Very High'
	return { packYears, lungAge, risk }
}


