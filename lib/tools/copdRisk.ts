export type CopdRiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High'

export function calculateCatScore(items: number[]): { total: number; level: CopdRiskLevel } {
	if (!items || items.length === 0) throw new Error('CAT items required')
	const total = items.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0)
	if (!(total >= 0 && total <= 40)) throw new Error('Total CAT score must be between 0 and 40')
	let level: CopdRiskLevel
	if (total <= 10) level = 'Low'
	else if (total <= 20) level = 'Moderate'
	else if (total <= 30) level = 'High'
	else level = 'Very High'
	return { total, level }
}


