export type Zones = {
	zone: 'Rest' | 'Fat Burn' | 'Cardio' | 'Peak'
	min: number
	max: number
}[]

export function maxHeartRate(age: number): number {
	if (!(age > 0)) throw new Error('Invalid age')
	return 220 - age
}

export function zonesByMhr(mhr: number): Zones {
	if (!(mhr > 0)) throw new Error('Invalid MHR')
	const pct = (p: number) => Math.round((mhr * p) / 100)
	return [
		{ zone: 'Rest', min: pct(50), max: pct(60) },
		{ zone: 'Fat Burn', min: pct(60), max: pct(70) },
		{ zone: 'Cardio', min: pct(70), max: pct(80) },
		{ zone: 'Peak', min: pct(80), max: pct(90) },
	]
}

export function zonesByKarvonen(age: number, restingHr: number): Zones {
	const mhr = maxHeartRate(age)
	const reserve = mhr - restingHr
	const target = (low: number, high: number) => ({
		min: Math.round(reserve * (low / 100) + restingHr),
		max: Math.round(reserve * (high / 100) + restingHr),
	})
	return [
		{ zone: 'Rest', ...target(50, 60) },
		{ zone: 'Fat Burn', ...target(60, 70) },
		{ zone: 'Cardio', ...target(70, 80) },
		{ zone: 'Peak', ...target(80, 90) },
	]
}


