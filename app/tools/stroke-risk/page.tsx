import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر السكتة الدماغية - CLinIQ',
  description: 'احسب مخاطر الإصابة بالسكتة الدماغية. أداة طبية مجانية لتقييم عوامل الخطر.',
  keywords: 'السكتة الدماغية, مخاطر السكتة, صحة الدماغ, عوامل الخطر',
  openGraph: {
    title: 'حاسبة مخاطر السكتة الدماغية - CLinIQ',
    description: 'احسب مخاطر الإصابة بالسكتة الدماغية. أداة طبية مجانية لتقييم عوامل الخطر.',
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
import { calculateStrokeRisk } from '../../../lib/tools/strokeRisk'

export default function StrokeRiskToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [gender, setGender] = useState<string>('male')
	const [systolic, setSystolic] = useState<string>('')
	const [diastolic, setDiastolic] = useState<string>('')
	const [diabetes, setDiabetes] = useState<boolean>(false)
	const [smoking, setSmoking] = useState<boolean>(false)
	const [leftVentricularHypertrophy, setLeftVentricularHypertrophy] = useState<boolean>(false)
	const [result, setResult] = useState<{ percent10y: number; level: string; score: number } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const a = parseInt(age)
		const sys = parseInt(systolic)
		const dia = parseInt(diastolic)
		if (!(a >= 18 && a <= 120) || !(sys > 0 && sys <= 300) || !(dia > 0 && dia <= 200)) {
			setError('tools.strokeRisk.errors.invalidInputs')
			return
		}
		if (sys <= dia) {
			setError('tools.strokeRisk.errors.invalidInputs')
			return
		}
		try {
			const r = calculateStrokeRisk({ age: a, gender: gender as any, systolic: sys, diastolic: dia, diabetes, smoking, lvh: leftVentricularHypertrophy })
			setResult(r)
		} catch (err) {
			setError('tools.strokeRisk.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.strokeRisk.info.whatItDoes" />,
		howToUse: <T k="tools.strokeRisk.info.howToUse" />,
		inputGuide: <T k="tools.strokeRisk.info.inputGuide" />,
		resultExplanation: <T k="tools.strokeRisk.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.strokeRisk.title" />} 
			description={<T k="tools.strokeRisk.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.strokeRisk.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={120} 
						required 
					/>
					<Select 
						label={<T k="tools.strokeRisk.inputs.gender" /> as any} 
						value={gender} 
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="male"><T k="tools.gender.male" /></option>
						<option value="female"><T k="tools.gender.female" /></option>
					</Select>
					<NumberInput 
						label={<T k="tools.strokeRisk.inputs.systolic" /> as any} 
						value={systolic} 
						onChange={(e) => setSystolic(e.target.value)} 
						min={70} 
						max={300} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.strokeRisk.inputs.diastolic" /> as any} 
						value={diastolic} 
						onChange={(e) => setDiastolic(e.target.value)} 
						min={40} 
						max={200} 
						required 
					/>
					<label className="flex items-center gap-2 select-none">
						<input 
							type="checkbox" 
							checked={diabetes} 
							onChange={(e) => setDiabetes(e.target.checked)} 
							className="rounded border-gray-300 text-primary-600 focus:ring-primary-400" 
							title={messages[locale]['tools.strokeRisk.inputs.diabetes']}
						/>
						<span className="text-sm text-gray-700"><T k="tools.strokeRisk.inputs.diabetes" /></span>
					</label>
					<label className="flex items-center gap-2 select-none">
						<input 
							type="checkbox" 
							checked={smoking} 
							onChange={(e) => setSmoking(e.target.checked)} 
							className="rounded border-gray-300 text-primary-600 focus:ring-primary-400" 
							title={messages[locale]['tools.strokeRisk.inputs.smoking']}
						/>
						<span className="text-sm text-gray-700"><T k="tools.strokeRisk.inputs.smoking" /></span>
					</label>
					<label className="flex items-center gap-2 select-none">
						<input 
							type="checkbox" 
							checked={leftVentricularHypertrophy} 
							onChange={(e) => setLeftVentricularHypertrophy(e.target.checked)} 
							className="rounded border-gray-300 text-primary-600 focus:ring-primary-400" 
							title={messages[locale]['tools.strokeRisk.inputs.lvh']}
						/>
						<span className="text-sm text-gray-700"><T k="tools.strokeRisk.inputs.lvh" /></span>
					</label>
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
							<div className="text-gray-800"><T k="tools.strokeRisk.results.percent10y" />: <span className="font-semibold">{result.percent10y}%</span></div>
							<div className="text-gray-800"><T k="tools.strokeRisk.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.level
								if (l === 'Low') return <T k="tools.strokeRisk.risk.low" />
								if (l === 'Moderate') return <T k="tools.strokeRisk.risk.moderate" />
								if (l === 'High') return <T k="tools.strokeRisk.risk.high" />
								return <T k="tools.strokeRisk.risk.veryHigh" />
							})()}</span></div>
							<div className="text-gray-800"><T k="tools.strokeRisk.results.scoreLabel" />: <span className="font-semibold">{result.score}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.strokeRisk.info.resultExplanation" />
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
													<li><T k="tools.strokeRisk.recommendations.low.1" /></li>
													<li><T k="tools.strokeRisk.recommendations.low.2" /></li>
													<li><T k="tools.strokeRisk.recommendations.low.3" /></li>
												</>
											)
										} else if (l === 'Moderate') {
											return (
												<>
													<li><T k="tools.strokeRisk.recommendations.moderate.1" /></li>
													<li><T k="tools.strokeRisk.recommendations.moderate.2" /></li>
													<li><T k="tools.strokeRisk.recommendations.moderate.3" /></li>
												</>
											)
										} else if (l === 'High') {
											return (
												<>
													<li><T k="tools.strokeRisk.recommendations.high.1" /></li>
													<li><T k="tools.strokeRisk.recommendations.high.2" /></li>
													<li><T k="tools.strokeRisk.recommendations.high.3" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.strokeRisk.recommendations.veryHigh.1" /></li>
													<li><T k="tools.strokeRisk.recommendations.veryHigh.2" /></li>
													<li><T k="tools.strokeRisk.recommendations.veryHigh.3" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.strokeRisk.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



