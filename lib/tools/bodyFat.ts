export type Gender = 'male' | 'female'

export type BodyFatInput = {
	gender: Gender
	heightCm: number
	neckCm: number
	waistCm: number
	hipCm?: number // required for female
}

export type BodyFatResult = {
	percent: number
	category: 'Essential' | 'Fitness' | 'Average' | 'Obese'
}

const log10 = (x: number) => Math.log(x) / Math.log(10)

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
	const { gender, heightCm, neckCm, waistCm, hipCm } = input
	if (!(heightCm > 0 && neckCm > 0 && waistCm > 0)) throw new Error('Invalid measurements')

	let percent: number
	if (gender === 'male') {
		if (!(waistCm > neckCm)) throw new Error('Waist must be greater than neck')
		const denominator = 1.0324 - 0.19077 * log10(waistCm - neckCm) + 0.15456 * log10(heightCm)
		percent = 495 / denominator - 450
	} else {
		if (!hipCm || !(waistCm + hipCm > neckCm)) throw new Error('Hip is required and must be valid for women')
		const denominator = 1.29579 - 0.35004 * log10(waistCm + hipCm - neckCm) + 0.22100 * log10(heightCm)
		percent = 495 / denominator - 450
	}

	const p = Math.max(0, Math.round(percent * 10) / 10)

	let category: BodyFatResult['category']
	if (gender === 'male') {
		if (p <= 5) category = 'Essential'
		else if (p <= 13) category = 'Fitness'
		else if (p <= 24) category = 'Average'
		else category = 'Obese'
	} else {
		if (p <= 13) category = 'Essential'
		else if (p <= 20) category = 'Fitness'
		else if (p <= 24) category = 'Average'
		else category = 'Obese'
	}

	return { percent: p, category }
}


