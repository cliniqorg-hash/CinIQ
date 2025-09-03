export type CoachInput = {
	age: number
	gender: 'male' | 'female'
	weightKg: number
	heightCm: number
	goal: 'weight_loss' | 'maintenance' | 'weight_gain'
	activity: 'sedentary' | 'light' | 'moderate' | 'active'
}

export type CoachPlan = {
	dailyCalories: number
	macros: { proteinPct: number; carbsPct: number; fatPct: number }
	workoutsPerWeek: number
	sleepHours: { min: number; max: number }
	recommendations: string[]
}

import { calculateBmr, type ActivityLevel } from './bmr'
import { calculateTdee } from './tdee'

export function generateLifestylePlan(input: CoachInput): CoachPlan {
	const { age, gender, weightKg, heightCm, goal, activity } = input
	const bmr = calculateBmr({ age, gender, weightKg, heightCm, activity: activity as ActivityLevel }).bmr
	const tdee = calculateTdee(bmr, activity as ActivityLevel)
	let dailyCalories = tdee
	if (goal === 'weight_loss') dailyCalories = Math.round(tdee * 0.8)
	if (goal === 'weight_gain') dailyCalories = Math.round(tdee * 1.15)
	const macros = { proteinPct: 25, carbsPct: 45, fatPct: 30 }
	const workoutsPerWeek = activity === 'sedentary' ? 3 : activity === 'light' ? 4 : 5
	const sleepHours = { min: 7, max: 9 }
	const recommendations = [
		'Prioritize whole foods and adequate protein',
		'Include 150 minutes/week moderate cardio',
		'Strength train 2–3 times/week',
		'Maintain consistent sleep schedule (7–9 hours)',
	]
	return { dailyCalories, macros, workoutsPerWeek, sleepHours, recommendations }
}


