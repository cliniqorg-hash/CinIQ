export type Gender = 'male' | 'female'

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export type BmrInput = {
	weightKg: number
	heightCm: number
	age: number
	gender: Gender
	activity?: ActivityLevel
}

export type BmrResult = {
	bmr: number
	tdee?: number
}

const activityMultiplier: Record<ActivityLevel, number> = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	very_active: 1.9,
}

export function calculateBmr(input: BmrInput): BmrResult {
	const { weightKg, heightCm, age, gender, activity } = input
	if (!(weightKg > 0 && heightCm > 0 && age > 0)) {
		throw new Error('Invalid inputs for BMR calculation')
	}
	let bmr: number
	if (gender === 'male') {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
	} else {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161
	}
	const bmrRounded = Math.round(bmr)
	let tdee: number | undefined
	if (activity) {
		tdee = Math.round(bmrRounded * activityMultiplier[activity])
	}
	return { bmr: bmrRounded, tdee }
}

export { activityMultiplier }


