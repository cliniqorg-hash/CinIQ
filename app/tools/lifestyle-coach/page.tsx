import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'مدرب نمط الحياة الصحي - CLinIQ',
  description: 'احصل على نصائح شخصية لتحسين نمط الحياة. أداة طبية مجانية للتوجيه الصحي.',
  keywords: 'نمط الحياة الصحي, نصائح صحية, التغذية, اللياقة البدنية',
  openGraph: {
    title: 'مدرب نمط الحياة الصحي - CLinIQ',
    description: 'احصل على نصائح شخصية لتحسين نمط الحياة. أداة طبية مجانية للتوجيه الصحي.',
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
import { generateLifestylePlan } from '../../../lib/tools/lifestyleCoach'

export default function LifestyleCoachToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [weight, setWeight] = useState<string>('')
	const [height, setHeight] = useState<string>('')
	const [gender, setGender] = useState<string>('male')
	const [activity, setActivity] = useState<string>('moderate')
	const [goal, setGoal] = useState<string>('maintenance')
	const [result, setResult] = useState<{ dailyCalories: number; macros: any; workoutsPerWeek: number; sleepHours: any; recommendations: string[] } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const ageNum = parseInt(age)
		const weightNum = parseFloat(weight)
		const heightNum = parseFloat(height)
		if (!(ageNum > 0 && ageNum <= 120) || !(weightNum > 0 && weightNum <= 300) || !(heightNum > 0 && heightNum <= 250)) return
		try {
			const plan = generateLifestylePlan({ age: ageNum, weightKg: weightNum, heightCm: heightNum, gender: gender as any, activity: activity as any, goal: goal as any })
			setResult(plan)
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.lifestyleCoach.info.whatItDoes" />,
		howToUse: <T k="tools.lifestyleCoach.info.howToUse" />,
		inputGuide: <T k="tools.lifestyleCoach.info.inputGuide" />,
		resultExplanation: <T k="tools.lifestyleCoach.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.lifestyleCoach.info.medicalDisclaimer" />
	}

	return (
		<ToolLayout 
			title={<T k="tools.lifestyleCoach.title" />} 
			description={<T k="tools.lifestyleCoach.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.lifestyleCoach.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={120} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.lifestyleCoach.inputs.weight" /> as any} 
						value={weight} 
						onChange={(e) => setWeight(e.target.value)} 
						min={30} 
						max={300} 
						step="0.1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.lifestyleCoach.inputs.height" /> as any} 
						value={height} 
						onChange={(e) => setHeight(e.target.value)} 
						min={100} 
						max={250} 
						step="0.1" 
						required 
					/>
					<Select 
						label={<T k="tools.lifestyleCoach.inputs.gender" /> as any} 
						value={gender} 
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="male"><T k="tools.lifestyleCoach.inputs.gender.male" /></option>
						<option value="female"><T k="tools.lifestyleCoach.inputs.gender.female" /></option>
					</Select>
					<Select 
						label={<T k="tools.lifestyleCoach.inputs.activity" /> as any} 
						value={activity} 
						onChange={(e) => setActivity(e.target.value)}
					>
						<option value="sedentary"><T k="tools.lifestyleCoach.inputs.activity.sedentary" /></option>
						<option value="light"><T k="tools.lifestyleCoach.inputs.activity.light" /></option>
						<option value="moderate"><T k="tools.lifestyleCoach.inputs.activity.moderate" /></option>
						<option value="active"><T k="tools.lifestyleCoach.inputs.activity.active" /></option>
					</Select>
					<Select 
						label={<T k="tools.lifestyleCoach.inputs.goal" /> as any} 
						value={goal} 
						onChange={(e) => setGoal(e.target.value)}
					>
						<option value="weight_loss"><T k="tools.lifestyleCoach.inputs.goal.weightLoss" /></option>
						<option value="maintenance"><T k="tools.lifestyleCoach.inputs.goal.maintenance" /></option>
						<option value="weight_gain"><T k="tools.lifestyleCoach.inputs.goal.weightGain" /></option>
					</Select>
					<button type="submit" className="btn-primary" title={messages[locale]['tools.lifestyleCoach.actions.getPlan']}>
						<T k="tools.lifestyleCoach.actions.getPlan" />
					</button>
				</form>
				<div className="card space-y-3">
					<div className="text-gray-900 font-semibold">
						<T k="tools.results.title" />
					</div>
					{result ? (
						<div className="space-y-2">
							<div className="text-gray-800"><T k="tools.lifestyleCoach.results.dailyCalories" />: <span className="font-semibold">{result.dailyCalories} <T k="tools.lifestyleCoach.results.caloriesPerDay" /></span></div>
							<div className="text-gray-800"><T k="tools.lifestyleCoach.results.workoutsPerWeek" />: <span className="font-semibold">{result.workoutsPerWeek}</span></div>
							<div className="text-gray-800"><T k="tools.lifestyleCoach.results.sleep" />: <span className="font-semibold">{result.sleepHours.min}-{result.sleepHours.max} <T k="tools.lifestyleCoach.results.hours" /></span></div>
							<div className="text-gray-800"><T k="tools.lifestyleCoach.results.macros" />: <span className="font-semibold"><T k="tools.lifestyleCoach.results.protein" />: {result.macros.proteinPct}%, <T k="tools.lifestyleCoach.results.carbs" />: {result.macros.carbsPct}%, <T k="tools.lifestyleCoach.results.fat" />: {result.macros.fatPct}%</span></div>
							<div className="mt-3">
								<div className="text-gray-800 font-medium mb-2"><T k="tools.lifestyleCoach.results.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{result.recommendations.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							</div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.lifestyleCoach.explain.result" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.lifestyleCoach.results.importantNotes" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.lifestyleCoach.results.note1" /></li>
									<li><T k="tools.lifestyleCoach.results.note2" /></li>
									<li><T k="tools.lifestyleCoach.results.note3" /></li>
									<li><T k="tools.lifestyleCoach.results.note4" /></li>
									<li><T k="tools.lifestyleCoach.results.note5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.lifestyleCoach.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



