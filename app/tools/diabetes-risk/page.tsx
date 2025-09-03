
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر مرض السكري - CLinIQ',
  description: 'احسب مخاطر الإصابة بمرض السكري من النوع الثاني. أداة طبية مجانية لتقييم العوامل المؤثرة على الإصابة بالسكري.',
  keywords: 'مرض السكري, مخاطر السكري, حاسبة السكري, السكري من النوع الثاني, صحة',
  openGraph: {
    title: 'حاسبة مخاطر مرض السكري - CLinIQ',
    description: 'احسب مخاطر الإصابة بمرض السكري من النوع الثاني. أداة طبية مجانية لتقييم العوامل المؤثرة على الإصابة بالسكري.',
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
import { calculateDiabetesRisk } from '../../../lib/tools/diabetesRisk'

export default function DiabetesRiskToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [gender, setGender] = useState<string>('male')
	const [bmi, setBmi] = useState<string>('')
	const [waistCm, setWaistCm] = useState<string>('')
	const [activity, setActivity] = useState<string>('4-7')
	const [familyHistory, setFamilyHistory] = useState<boolean>(false)
	const [result, setResult] = useState<{ score: number; level: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const a = parseInt(age)
		const b = parseFloat(bmi)
		const w = parseFloat(waistCm)
		if (!(a >= 18 && a <= 100) || !(b > 0 && b <= 60) || !(w > 0 && w <= 200)) {
			setError('tools.diabetesRisk.errors.invalidInputs')
			return
		}
		try {
			const r = calculateDiabetesRisk({ age: a, gender: gender as any, bmi: b, waistCm: w, activity: activity as any, familyHistory })
			setResult(r)
		} catch (err) {
			setError('tools.diabetesRisk.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.diabetesRisk.info.whatItDoes" />,
		howToUse: <T k="tools.diabetesRisk.info.howToUse" />,
		inputGuide: <T k="tools.diabetesRisk.info.inputGuide" />,
		resultExplanation: <T k="tools.diabetesRisk.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.diabetesRisk.title" />} 
			description={<T k="tools.diabetesRisk.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.diabetesRisk.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={100} 
						required 
					/>
					<Select 
						label={<T k="tools.diabetesRisk.inputs.gender" /> as any} 
						value={gender} 
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="male"><T k="tools.gender.male" /></option>
						<option value="female"><T k="tools.gender.female" /></option>
					</Select>
					<NumberInput 
						label={<T k="tools.diabetesRisk.inputs.bmi" /> as any} 
						value={bmi} 
						onChange={(e) => setBmi(e.target.value)} 
						min={15} 
						max={60} 
						step="0.1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.diabetesRisk.inputs.waistCircumference" /> as any} 
						value={waistCm} 
						onChange={(e) => setWaistCm(e.target.value)} 
						min={50} 
						max={200} 
						step="0.1" 
						required 
					/>
					<Select 
						label={<T k="tools.diabetesRisk.inputs.physicalActivity" /> as any} 
						value={activity} 
						onChange={(e) => setActivity(e.target.value)}
					>
						<option value="<4"><T k="tools.diabetesRisk.inputs.physicalActivity.lt4" /></option>
						<option value="4-7"><T k="tools.diabetesRisk.inputs.physicalActivity._4_7" /></option>
						<option value=">7"><T k="tools.diabetesRisk.inputs.physicalActivity.gt7" /></option>
					</Select>
					<label className="flex items-center gap-2 select-none">
						<input 
							type="checkbox" 
							checked={familyHistory} 
							onChange={(e) => setFamilyHistory(e.target.checked)} 
							className="rounded border-gray-300 text-primary-600 focus:ring-primary-400" 
							title={messages[locale]['tools.diabetesRisk.inputs.familyHistory']}
						/>
						<span className="text-sm text-gray-700"><T k="tools.diabetesRisk.inputs.familyHistory" /></span>
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
							<div className="text-gray-800"><T k="tools.diabetesRisk.results.scoreLabel" />: <span className="font-semibold">{result.score}</span></div>
							<div className="text-gray-800"><T k="tools.diabetesRisk.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.level
								if (l === 'Low') return <T k="tools.diabetesRisk.risk.low" />
								if (l === 'Moderate') return <T k="tools.diabetesRisk.risk.moderate" />
								if (l === 'High') return <T k="tools.diabetesRisk.risk.high" />
								return <T k="tools.diabetesRisk.risk.veryHigh" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.diabetesRisk.info.resultExplanation" />
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
													<li><T k="tools.diabetesRisk.recommendations.low.1" /></li>
													<li><T k="tools.diabetesRisk.recommendations.low.2" /></li>
												</>
											)
										} else if (l === 'Moderate') {
											return (
												<>
													<li><T k="tools.diabetesRisk.recommendations.moderate.1" /></li>
													<li><T k="tools.diabetesRisk.recommendations.moderate.2" /></li>
													<li><T k="tools.diabetesRisk.recommendations.moderate.3" /></li>
												</>
											)
										} else if (l === 'High') {
											return (
												<>
													<li><T k="tools.diabetesRisk.recommendations.high.1" /></li>
													<li><T k="tools.diabetesRisk.recommendations.high.2" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.diabetesRisk.recommendations.veryHigh.1" /></li>
													<li><T k="tools.diabetesRisk.recommendations.veryHigh.2" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.diabetesRisk.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


