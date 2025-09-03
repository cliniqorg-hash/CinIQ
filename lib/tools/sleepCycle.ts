function toMinutes(time: string): number {
	// expects HH:MM in 24h; tolerate leading/trailing spaces
	const m = time.trim().match(/^([01]?\d|2[0-3]):([0-5]\d)$/)
	if (!m) throw new Error('Invalid time format')
	const hours = parseInt(m[1], 10)
	const minutes = parseInt(m[2], 10)
	return hours * 60 + minutes
}

function fromMinutes(total: number): string {
	// normalize to 0..(24*60-1)
	const minsInDay = 24 * 60
	let t = ((total % minsInDay) + minsInDay) % minsInDay
	const h = Math.floor(t / 60)
	const m = t % 60
	const hh = h.toString().padStart(2, '0')
	const mm = m.toString().padStart(2, '0')
	return `${hh}:${mm}`
}

export function bedtimesFromWakeTime(wakeTimeHHMM: string, cycleMinutes = 90, cycles: number[] = [5, 6]): string[] {
	const wake = toMinutes(wakeTimeHHMM)
	return cycles.map((c) => fromMinutes(wake - c * cycleMinutes))
}

export function wakeTimesFromBedtime(bedtimeHHMM: string, cycleMinutes = 90, cycles: number[] = [5, 6]): string[] {
	const bed = toMinutes(bedtimeHHMM)
	return cycles.map((c) => fromMinutes(bed + c * cycleMinutes))
}


