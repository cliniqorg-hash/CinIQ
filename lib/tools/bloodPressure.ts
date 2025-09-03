export type BloodPressureCategory =
	| 'Normal'
	| 'Elevated'
	| 'Hypertension Stage 1'
	| 'Hypertension Stage 2'
	| 'Hypertensive Crisis'

export function classifyBloodPressure(systolic: number, diastolic: number): BloodPressureCategory {
	if (!(systolic > 0) || !(diastolic > 0)) throw new Error('Invalid BP values')
	// Crisis first
	if (systolic > 180 || diastolic > 120) return 'Hypertensive Crisis'
	if (systolic >= 140 || diastolic >= 90) return 'Hypertension Stage 2'
	if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return 'Hypertension Stage 1'
	if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 'Elevated'
	if (systolic < 120 && diastolic < 80) return 'Normal'
	// Default fallback using higher risk
	if (systolic >= 140 || diastolic >= 90) return 'Hypertension Stage 2'
	return 'Hypertension Stage 1'
}

export function bpRecommendations(category: BloodPressureCategory): string[] {
	switch (category) {
		case 'Normal':
			return ['Maintain healthy diet', 'Exercise regularly', 'Monitor BP periodically']
		case 'Elevated':
			return ['Reduce sodium intake', 'Increase physical activity', 'Monitor BP regularly']
		case 'Hypertension Stage 1':
			return ['Lifestyle modification', 'Consult a healthcare provider', 'Monitor BP weekly']
		case 'Hypertension Stage 2':
			return ['Medical evaluation recommended', 'Lifestyle changes', 'Possible medication per physician']
		case 'Hypertensive Crisis':
			return ['Seek urgent medical care']
	}
}


