export function calculateDueDate(lmp: Date, cycleLengthDays = 28): Date {
	const due = new Date(lmp)
	due.setDate(due.getDate() + 280 + (cycleLengthDays - 28))
	return due
}

export function gestationalAgeWeeks(lmp: Date, current: Date = new Date()): number {
	const diffMs = current.getTime() - lmp.getTime()
	const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
	return Math.max(0, weeks)
}

export function trimesterFromWeeks(weeks: number): '1st' | '2nd' | '3rd' {
	if (weeks < 13) return '1st'
	if (weeks < 28) return '2nd'
	return '3rd'
}


