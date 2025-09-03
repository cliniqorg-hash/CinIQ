export type CholesterolInput = {
	total: number
	hdl: number
}

export type CholesterolCategory = 'Optimal' | 'NearOptimal' | 'Borderline' | 'High' | 'Very High'

export type CholesterolResult = {
	ratio: number
	category: CholesterolCategory
}

export function calculateCholesterolRatio(input: CholesterolInput): CholesterolResult {
	const { total, hdl } = input
	if (!(total > 0 && hdl > 0)) throw new Error('Invalid cholesterol values')
	const ratioRaw = total / hdl
	const ratio = Math.round(ratioRaw * 10) / 10
	let category: CholesterolCategory
	if (ratio < 3.5) category = 'Optimal'
	else if (ratio < 4.5) category = 'NearOptimal'
	else if (ratio < 5.5) category = 'Borderline'
	else if (ratio < 6.5) category = 'High'
	else category = 'Very High'
	return { ratio, category }
}


