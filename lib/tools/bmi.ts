export type BmiInput = {
	weightKg: number
	heightCm?: number
	heightM?: number
}

export type BmiResult = {
	bmi: number
	category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese'
	interpretation: string
	recommendations: string[]
}

export function calculateBmi(input: BmiInput): BmiResult {
	const { weightKg } = input
	let heightMeters: number | undefined
	if (input.heightM && input.heightM > 0) heightMeters = input.heightM
	if (!heightMeters && input.heightCm && input.heightCm > 0) heightMeters = input.heightCm / 100
	if (!heightMeters || !weightKg || weightKg <= 0) {
		throw new Error('Invalid inputs for BMI calculation')
	}
	const bmiRaw = weightKg / (heightMeters * heightMeters)
	const bmi = Math.round(bmiRaw * 10) / 10

	let category: BmiResult['category']
	if (bmi < 18.5) category = 'Underweight'
	else if (bmi < 25) category = 'Normal'
	else if (bmi < 30) category = 'Overweight'
	else category = 'Obese'

	const interpretationMap: Record<BmiResult['category'], string> = {
		Underweight: 'BMI below 18.5 may indicate underweight.',
		Normal: 'BMI in the normal range (18.5–24.9).',
		Overweight: 'BMI in the overweight range (25–29.9).',
		Obese: 'BMI at or above 30 falls in the obese range.',
	}

	const recommendationsMap: Record<BmiResult['category'], string[]> = {
		Underweight: ['Increase calorie intake with nutrient-dense foods', 'Include resistance training', 'Seek professional guidance if needed'],
		Normal: ['Maintain balanced diet and regular exercise', 'Monitor BMI periodically'],
		Overweight: ['Reduce calorie intake moderately', 'Increase physical activity', 'Limit sugary foods'],
		Obese: ['Consult a healthcare professional', 'Structured diet and exercise plan', 'Consider specialist consultation'],
	}

	return {
		bmi,
		category,
		interpretation: interpretationMap[category],
		recommendations: recommendationsMap[category],
	}
}


