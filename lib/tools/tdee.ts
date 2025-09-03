import type { ActivityLevel } from './bmr'

const multiplier: Record<ActivityLevel, number> = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	very_active: 1.9,
}

export function calculateTdee(bmr: number, activity: ActivityLevel): number {
	if (!(bmr > 0)) throw new Error('Invalid BMR')
	return Math.round(bmr * multiplier[activity])
}

export { multiplier as activityMultipliers }


