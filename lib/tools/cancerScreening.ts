export type Gender = 'male' | 'female'

export type ScreeningInput = {
	age: number
	gender: Gender
	familyHistory?: boolean
	personalHistory?: boolean
	lifestyle?: { smoking?: boolean; alcohol?: boolean; obesity?: boolean }
}

export function recommendedScreenings(input: ScreeningInput): { test: string; interval: string; note?: string }[] {
	const { age, gender, familyHistory, personalHistory, lifestyle } = input
	if (!(age > 0 && age <= 120)) throw new Error('Invalid age')
	const list: { test: string; interval: string; note?: string }[] = []
	// Colon cancer
	if (age >= 45) list.push({ test: 'Colonoscopy', interval: 'Every 10 years' })
	// Breast cancer
	if (gender === 'female' && age >= 40) list.push({ test: 'Mammogram', interval: 'Every 1–2 years' })
	// Cervical cancer
	if (gender === 'female' && age >= 21 && age <= 65) list.push({ test: 'Pap smear / co-testing', interval: 'Every 3–5 years' })
	// Prostate cancer (discussion)
	if (gender === 'male' && age >= 50) list.push({ test: 'PSA test (discuss with physician)', interval: 'Per physician' })

	if (familyHistory) list.push({ test: 'Genetic counseling', interval: 'As advised', note: 'Family history present' })
	if (personalHistory) list.push({ test: 'Oncology follow-up', interval: 'As advised', note: 'Personal history present' })
	if (lifestyle?.smoking) list.push({ test: 'Low-dose CT (lung cancer screen)', interval: 'Annually (high-risk)', note: 'For eligible high-risk smokers' })
	return list
}


