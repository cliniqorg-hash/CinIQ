import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة معدل الأيض الأساسي (BMR) - CLinIQ',
  description: 'احسب معدل الأيض الأساسي (BMR) لتحديد السعرات الحرارية التي يحتاجها جسمك في حالة الراحة.',
  keywords: 'معدل الأيض الأساسي, BMR, السعرات الحرارية, الأيض, حاسبة السعرات',
  openGraph: {
    title: 'حاسبة معدل الأيض الأساسي (BMR) - CLinIQ',
    description: 'احسب معدل الأيض الأساسي (BMR) لتحديد السعرات الحرارية التي يحتاجها جسمك في حالة الراحة.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState } from 'react'
import ToolLayout from '../../../components/tools/ToolLayout'
import { NumberInput, Select, T } from '../../../components/tools/FormControls'
import { useLang } from '../../../components/LangProvider'
import { messages } from '../../../lib/i18n'
import { calculateBmr, type ActivityLevel } from '../../../lib/tools/bmr'

export default function BmrToolPage() {
	const { locale } = useLang()
	const [weight, setWeight] = useState('')
	const [height, setHeight] = useState('')
	const [age, setAge] = useState('')
	const [gender, setGender] = useState<'male' | 'female'>('male')
	const [activity, setActivity] = useState<ActivityLevel>('sedentary')
	const [error, setError] = useState<string | null>(null)
	const [bmr, setBmr] = useState<number | null>(null)
	const [tdee, setTdee] = useState<number | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setBmr(null)
		setTdee(null)
		const w = parseFloat(weight)
		const h = parseFloat(height)
		const a = parseFloat(age)
		if (!(w > 0 && w < 300 && h > 0 && h < 250 && a > 0 && a < 120)) {
			setError('tools.bmr.errors.invalidInputs')
			return
		}
		try {
			const r = calculateBmr({ weightKg: w, heightCm: h, age: a, gender, activity })
			setBmr(r.bmr)
			setTdee(r.tdee ?? null)
		} catch {
			setError('tools.bmr.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.bmr.info.whatItDoes" />,
		howToUse: <T k="tools.bmr.info.howToUse" />,
		inputGuide: <T k="tools.bmr.info.inputGuide" />,
		resultExplanation: <T k="tools.bmr.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.bmr.title" />} 
			description={<T k="tools.bmr.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.inputs.weight" />}
						value={weight} 
						onChange={(e) => setWeight(e.target.value)} 
						step={0.1} 
						min={1} 
						max={300} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.inputs.height" />}
						value={height} 
						onChange={(e) => setHeight(e.target.value)} 
						step={0.1} 
						min={50} 
						max={250} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.bmr.inputs.age" />}
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={1} 
						max={120} 
						required 
					/>
					<Select 
						label={<T k="tools.bmr.inputs.gender" />}
						value={gender} 
						onChange={(e) => setGender(e.target.value as 'male' | 'female')}
					>
						<option value="male"><T k="tools.gender.male" /></option>
						<option value="female"><T k="tools.gender.female" /></option>
					</Select>
					<Select 
						label={<T k="tools.bmr.inputs.activityLevel" />}
						value={activity} 
						onChange={(e) => setActivity(e.target.value as ActivityLevel)}
					>
						<option value="sedentary"><T k="tools.bmr.inputs.activityLevel.sedentary" /></option>
						<option value="light"><T k="tools.bmr.inputs.activityLevel.light" /></option>
						<option value="moderate"><T k="tools.bmr.inputs.activityLevel.moderate" /></option>
						<option value="active"><T k="tools.bmr.inputs.activityLevel.active" /></option>
						<option value="very_active"><T k="tools.bmr.inputs.activityLevel.veryActive" /></option>
					</Select>
					<button type="submit" className="btn-primary" title={messages[locale]['tools.actions.calculate'] ?? 'Calculate'}>
						<T k="tools.actions.calculate" />
					</button>
					{error && <div className="text-sm text-red-600"><T k={error} /></div>}
				</form>
				<div className="card space-y-3">
					<div className="text-gray-900 font-semibold">
						<T k="tools.results.title" />
					</div>
					{bmr && tdee ? (
						<div className="space-y-3">
							<div className="text-gray-800"><T k="tools.bmr.results.bmrLabel" /> <span className="font-semibold">{bmr}</span> <T k="tools.units.kcalPerDay" /></div>
							<div className="text-gray-800"><T k="tools.bmr.results.tdeeLabel" /> <span className="font-semibold">{tdee}</span> <T k="tools.units.kcalPerDay" /></div>
						</div>
					) : (
						<div className="bg-gray-50 rounded-lg p-6 text-center">
							<div className="text-gray-500 text-sm"><T k="tools.bmr.results.placeholder" /></div>
						</div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


