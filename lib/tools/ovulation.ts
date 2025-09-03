export function addDays(date: Date, days: number): Date {
	const d = new Date(date)
	d.setDate(d.getDate() + days)
	return d
}

export function calculateOvulation(lmp: Date, cycleLengthDays = 28, lutealPhaseDays = 14): Date {
	return addDays(lmp, cycleLengthDays - lutealPhaseDays)
}

export function fertileWindow(lmp: Date, cycleLengthDays = 28, lutealPhaseDays = 14): { start: Date; end: Date } {
	const ov = calculateOvulation(lmp, cycleLengthDays, lutealPhaseDays)
	return { start: addDays(ov, -5), end: ov }
}

export function nextPeriod(lmp: Date, cycleLengthDays = 28): Date {
	return addDays(lmp, cycleLengthDays)
}


