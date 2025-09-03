import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة ضغط الدم - CLinIQ',
  description: 'احسب وتقييم قراءات ضغط الدم بسهولة. أداة طبية مجانية لتصنيف ضغط الدم والحصول على نصائح صحية.',
  keywords: 'ضغط الدم, حاسبة ضغط الدم, ارتفاع ضغط الدم, انخفاض ضغط الدم, صحة القلب',
  openGraph: {
    title: 'حاسبة ضغط الدم - CLinIQ',
    description: 'احسب وتقييم قراءات ضغط الدم بسهولة. أداة طبية مجانية لتصنيف ضغط الدم والحصول على نصائح صحية.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState } from 'react'
import ToolLayout from '../../../components/tools/ToolLayout'
import { NumberInput, T } from '../../../components/tools/FormControls'
import { useLang } from '../../../components/LangProvider'
import { messages } from '../../../lib/i18n'
import { classifyBloodPressure, bpRecommendations } from '../../../lib/tools/bloodPressure'

export default function BloodPressureToolPage() {
	const { locale } = useLang()
	const [systolic, setSystolic] = useState<string>('')
	const [diastolic, setDiastolic] = useState<string>('')
	const [result, setResult] = useState<{ category: string; recommendations: string[] } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const sys = parseInt(systolic)
		const dia = parseInt(diastolic)
		if (!(sys > 0 && sys <= 300) || !(dia > 0 && dia <= 200)) {
			setError('tools.bloodPressure.errors.invalidInputs')
			return
		}
		if (sys <= dia) {
			setError('tools.bloodPressure.errors.invalidInputs')
			return
		}
		try {
			const category = classifyBloodPressure(sys, dia)
			const recommendations = bpRecommendations(category)
			setResult({ category, recommendations })
		} catch (err) {
			setError('tools.bloodPressure.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.bloodPressure.info.whatItDoes" />,
		howToUse: <T k="tools.bloodPressure.info.howToUse" />,
		inputGuide: <T k="tools.bloodPressure.info.inputGuide" />,
		resultExplanation: <T k="tools.bloodPressure.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.bloodPressure.title" />} 
			description={<T k="tools.bloodPressure.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.bloodPressure.inputs.systolic" />} 
						value={systolic} 
						onChange={(e) => setSystolic(e.target.value)} 
						min={50} 
						max={300} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.bloodPressure.inputs.diastolic" />} 
						value={diastolic} 
						onChange={(e) => setDiastolic(e.target.value)} 
						min={30} 
						max={200} 
						required 
					/>
					<button type="submit" className="btn-primary" title={messages[locale]['tools.actions.calculate']}>
						<T k="tools.actions.calculate" />
					</button>
					{error && <div className="text-sm text-red-600"><T k={error} /></div>}
				</form>
				<div className="card space-y-3">
					<div className="text-gray-900 font-semibold">
						<T k="tools.results.title" />
					</div>
					{result ? (
						<div className="space-y-2">
							<div className="text-gray-800">
								<T k="tools.bloodPressure.results.systolicLabel" />: <span className="font-semibold">{systolic}</span>
							</div>
							<div className="text-gray-800">
								<T k="tools.bloodPressure.results.diastolicLabel" />: <span className="font-semibold">{diastolic}</span>
							</div>
							<div className="text-gray-800">
								<T k="tools.bloodPressure.results.categoryLabel" />: <span className="font-semibold">{
									(() => {
										const c = result.category
										if (c === 'Normal') return <T k="tools.bloodPressure.category.normal" />
										if (c === 'Elevated') return <T k="tools.bloodPressure.category.elevated" />
										if (c === 'Hypertension Stage 1') return <T k="tools.bloodPressure.category.hypertension1" />
										if (c === 'Hypertension Stage 2') return <T k="tools.bloodPressure.category.hypertension2" />
										return <T k="tools.bloodPressure.category.hypertensiveCrisis" />
									})()
								}</span>
							</div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2">
									<T k="tools.info.resultExplanation" />:
								</div>
								<div className="text-sm text-blue-800">
									{(() => {
										const c = result.category
										if (c === 'Normal') return <T k="tools.bloodPressure.explain.normal" />
										if (c === 'Elevated') return <T k="tools.bloodPressure.explain.elevated" />
										if (c === 'Hypertension Stage 1') return <T k="tools.bloodPressure.explain.hypertension1" />
										if (c === 'Hypertension Stage 2') return <T k="tools.bloodPressure.explain.hypertension2" />
										return <T k="tools.bloodPressure.explain.hypertensiveCrisis" />
									})()}
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2">
									<T k="tools.info.howToUse" />:
								</div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{(() => {
										const c = result.category
										const keys = c === 'Normal' ? [1,2] 
											: c === 'Elevated' ? [1,2,3] 
											: c === 'Hypertension Stage 1' ? [1,2,3] 
											: c === 'Hypertension Stage 2' ? [1,2,3] 
											: [1,2]
										const prefix = c === 'Normal' ? 'normal' 
											: c === 'Elevated' ? 'elevated' 
											: c === 'Hypertension Stage 1' ? 'hypertension1' 
											: c === 'Hypertension Stage 2' ? 'hypertension2' 
											: 'hypertensiveCrisis'
										return keys.map((i) => (
											<li key={i}><T k={`tools.bloodPressure.recommendations.${prefix}.${i}`} /></li>
										))
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.bloodPressure.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


