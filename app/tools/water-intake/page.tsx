import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة كمية الماء المطلوبة - CLinIQ',
  description: 'احسب كمية الماء المطلوبة يومياً للحفاظ على الترطيب الصحي. أداة طبية مجانية لحساب استهلاك الماء.',
  keywords: 'كمية الماء, الترطيب, استهلاك الماء, صحة الجسم',
  openGraph: {
    title: 'حاسبة كمية الماء المطلوبة - CLinIQ',
    description: 'احسب كمية الماء المطلوبة يومياً للحفاظ على الترطيب الصحي. أداة طبية مجانية لحساب استهلاك الماء.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState } from 'react'
import ToolLayout from '../../../components/tools/ToolLayout'
import { NumberInput, Select, T } from '../../../components/tools/FormControls'
import { calculateDailyWaterMl } from '../../../lib/tools/waterIntake'
import { useLang } from '../../../components/LangProvider'
import { messages } from '../../../lib/i18n'

export default function WaterIntakeToolPage() {
	const { locale } = useLang()
	const [weight, setWeight] = useState<string>('')
	const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'high'>('moderate')
	const [climate, setClimate] = useState<'normal' | 'hot'>('normal')
	const [result, setResult] = useState<number | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const weightKg = parseFloat(weight)
		if (weightKg <= 0) return
		try {
			const waterMl = calculateDailyWaterMl(weightKg, activity, climate)
			setResult(waterMl)
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.waterIntake.info.whatItDoes" />,
		howToUse: <T k="tools.waterIntake.info.howToUse" />,
		inputGuide: <T k="tools.waterIntake.info.inputGuide" />,
		resultExplanation: <T k="tools.waterIntake.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.waterIntake.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.waterIntake.title" />} 
			description={<T k="tools.waterIntake.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.waterIntake.inputs.weight" /> as any} 
						value={weight} 
						onChange={(e) => setWeight(e.target.value)} 
						min={20} 
						max={300} 
						step="0.1" 
						required 
					/>
					<Select 
						label={<T k="tools.waterIntake.inputs.activityLevel" /> as any} 
						value={activity} 
						onChange={(e) => setActivity(e.target.value as any)}
					>
						<option value="sedentary"><T k="tools.waterIntake.inputs.activityLevel.sedentary" /></option>
						<option value="moderate"><T k="tools.waterIntake.inputs.activityLevel.moderate" /></option>
						<option value="high"><T k="tools.waterIntake.inputs.activityLevel.high" /></option>
					</Select>
					<Select 
						label={<T k="tools.waterIntake.inputs.climate" /> as any} 
						value={climate} 
						onChange={(e) => setClimate(e.target.value as any)}
					>
						<option value="normal"><T k="tools.waterIntake.inputs.climate.normal" /></option>
						<option value="hot"><T k="tools.waterIntake.inputs.climate.hot" /></option>
					</Select>
					<button type="submit" className="btn-primary" title={messages[locale]['tools.actions.calculate']}>
						<T k="tools.actions.calculate" />
					</button>
				</form>
				<div className="card space-y-3">
					<div className="text-gray-900 font-semibold">
						<T k="tools.results.title" />
					</div>
					{result ? (
						<div className="space-y-2">
							<div className="text-gray-800"><T k="tools.waterIntake.results.dailyIntake" /> <span className="font-semibold">{Math.round(result)} <T k="tools.units.ml" /></span></div>
							<div className="text-gray-800">=&nbsp;<span className="font-semibold">{(result / 1000).toFixed(1)} <T k="tools.units.liters" /></span></div>
							<div className="text-gray-800">=&nbsp;<span className="font-semibold">{(result / 236.588).toFixed(1)} <T k="tools.units.cups" /></span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.waterIntake.explain" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.waterIntake.recommendations.1" /></li>
									<li><T k="tools.waterIntake.recommendations.2" /></li>
									<li><T k="tools.waterIntake.recommendations.3" /></li>
									<li><T k="tools.waterIntake.recommendations.4" /></li>
									<li><T k="tools.waterIntake.recommendations.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.waterIntake.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


