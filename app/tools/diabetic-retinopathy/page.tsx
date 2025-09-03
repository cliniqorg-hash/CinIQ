import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر اعتلال الشبكية السكري - CLinIQ',
  description: 'احسب مخاطر الإصابة باعتلال الشبكية السكري. أداة طبية مجانية لحماية صحة العين.',
  keywords: 'اعتلال الشبكية السكري, صحة العين, مرض السكري, العيون',
  openGraph: {
    title: 'حاسبة مخاطر اعتلال الشبكية السكري - CLinIQ',
    description: 'احسب مخاطر الإصابة باعتلال الشبكية السكري. أداة طبية مجانية لحماية صحة العين.',
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
import { calculateDrRisk } from '../../../lib/tools/diabeticRetinopathy'

export default function DiabeticRetinopathyToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [durationYears, setDurationYears] = useState<string>('')
	const [hba1c, setHba1c] = useState<string>('')
	const [bloodPressureSystolic, setBloodPressureSystolic] = useState<string>('')
	const [cholesterolTotal, setCholesterolTotal] = useState<string>('')
	const [result, setResult] = useState<{ percentRisk: number; level: string; score: number } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const ageNum = parseInt(age)
		const duration = parseInt(durationYears)
		const hba1cNum = parseFloat(hba1c)
		const sys = parseInt(bloodPressureSystolic)
		const chol = parseFloat(cholesterolTotal)
		if (!(ageNum > 0 && ageNum <= 120) || !(duration >= 0 && duration <= 50) || !(hba1cNum > 0 && hba1cNum <= 20) || !(sys > 0 && sys <= 300) || !(chol > 0 && chol <= 500)) return
		try {
			const risk = calculateDrRisk({ 
				age: ageNum, 
				durationYears: duration, 
				hba1c: hba1cNum, 
				bloodPressureSystolic: sys,
				cholesterolTotal: chol
			})
			setResult(risk)
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.diabeticRetinopathy.info.whatItDoes" />,
		howToUse: <T k="tools.diabeticRetinopathy.info.howToUse" />,
		inputGuide: <T k="tools.diabeticRetinopathy.info.inputGuide" />,
		resultExplanation: <T k="tools.diabeticRetinopathy.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.diabeticRetinopathy.title" />} 
			description={<T k="tools.diabeticRetinopathy.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.diabeticRetinopathy.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={120} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.diabeticRetinopathy.inputs.diabetesDuration" /> as any} 
						value={durationYears} 
						onChange={(e) => setDurationYears(e.target.value)} 
						min={0} 
						max={50} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.diabeticRetinopathy.inputs.hba1c" /> as any} 
						value={hba1c} 
						onChange={(e) => setHba1c(e.target.value)} 
						min={4} 
						max={20} 
						step="0.1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.diabeticRetinopathy.inputs.bloodPressure" /> as any} 
						value={bloodPressureSystolic} 
						onChange={(e) => setBloodPressureSystolic(e.target.value)} 
						min={70} 
						max={300} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.diabeticRetinopathy.inputs.cholesterol" /> as any} 
						value={cholesterolTotal} 
						onChange={(e) => setCholesterolTotal(e.target.value)} 
						min={100} 
						max={500} 
						required 
					/>
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
							<div className="text-gray-800"><T k="tools.diabeticRetinopathy.results.scoreLabel" />: <span className="font-semibold">{result.score}</span></div>
							<div className="text-gray-800"><T k="tools.diabeticRetinopathy.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.level
								if (l === 'Low') return <T k="tools.diabeticRetinopathy.risk.low" />
								if (l === 'Moderate') return <T k="tools.diabeticRetinopathy.risk.moderate" />
								if (l === 'High') return <T k="tools.diabeticRetinopathy.risk.high" />
								return <T k="tools.diabeticRetinopathy.risk.veryHigh" />
							})()}</span></div>
							<div className="text-gray-800"><T k="tools.diabeticRetinopathy.results.percentRiskLabel" />: <span className="font-semibold">{result.percentRisk}%</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.diabeticRetinopathy.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{(() => {
										const l = result.level
										if (l === 'Low') {
											return (
												<>
													<li><T k="tools.diabeticRetinopathy.recommendations.low.1" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.low.2" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.low.3" /></li>
												</>
											)
										} else if (l === 'Moderate') {
											return (
												<>
													<li><T k="tools.diabeticRetinopathy.recommendations.moderate.1" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.moderate.2" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.moderate.3" /></li>
												</>
											)
										} else if (l === 'High') {
											return (
												<>
													<li><T k="tools.diabeticRetinopathy.recommendations.high.1" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.high.2" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.high.3" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.diabeticRetinopathy.recommendations.veryHigh.1" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.veryHigh.2" /></li>
													<li><T k="tools.diabeticRetinopathy.recommendations.veryHigh.3" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.diabeticRetinopathy.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



