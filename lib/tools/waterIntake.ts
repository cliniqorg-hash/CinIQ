export type Activity = 'sedentary' | 'moderate' | 'high'
export type Climate = 'normal' | 'hot'

export function calculateDailyWaterMl(weightKg: number, activity: Activity, climate: Climate): number {
	if (!(weightKg > 0)) throw new Error('Invalid weight')
	let total = weightKg * 30 // ml per kg
	if (activity === 'moderate') total += 500
	if (activity === 'high') total += 1000
	if (climate === 'hot') total += 500
	return Math.round(total)
}


