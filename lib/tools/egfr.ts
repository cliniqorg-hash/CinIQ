export type Gender = 'male' | 'female'
export type Ethnicity = 'black' | 'non-black'

export type EgfrInput = {
	serumCreatinineMgPerDl: number
	age: number
	gender: Gender
	ethnicity: Ethnicity
}

export type EgfrResult = {
	egfr: number
	stage: 'Stage 1' | 'Stage 2' | 'Stage 3' | 'Stage 4' | 'Stage 5'
}

export function calculateEgfr(input: EgfrInput): EgfrResult {
	const { serumCreatinineMgPerDl: scr, age, gender, ethnicity } = input
	if (!(scr > 0 && age >= 0)) throw new Error('Invalid inputs for eGFR')
	let egfr = 175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203)
	if (gender === 'female') egfr *= 0.742
	if (ethnicity === 'black') egfr *= 1.212
	const e = Math.round(egfr)
	let stage: EgfrResult['stage']
	if (e >= 90) stage = 'Stage 1'
	else if (e >= 60) stage = 'Stage 2'
	else if (e >= 30) stage = 'Stage 3'
	else if (e >= 15) stage = 'Stage 4'
	else stage = 'Stage 5'
	return { egfr: e, stage }
}


