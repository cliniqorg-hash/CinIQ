import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة معدل الترشيح الكبيبي (eGFR) - CLinIQ',
  description: 'احسب معدل الترشيح الكبيبي لتقييم وظائف الكلى. أداة طبية مجانية لمراقبة صحة الكلى.',
  keywords: 'معدل الترشيح الكبيبي, eGFR, وظائف الكلى, صحة الكلى',
  openGraph: {
    title: 'حاسبة معدل الترشيح الكبيبي (eGFR) - CLinIQ',
    description: 'احسب معدل الترشيح الكبيبي لتقييم وظائف الكلى. أداة طبية مجانية لمراقبة صحة الكلى.',
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
import { calculateEgfr } from '../../../lib/tools/egfr'

export default function EgfrToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [gender, setGender] = useState<string>('male')
	const [creatinine, setCreatinine] = useState<string>('')
	const [ethnicity, setEthnicity] = useState<string>('non-black')
	const [result, setResult] = useState<{ egfr: number; stage: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const a = parseInt(age)
		const c = parseFloat(creatinine)
		if (!(a >= 18 && a <= 120) || !(c > 0 && c <= 10)) {
			setError('tools.egfr.errors.invalidInputs')
			return
		}
		try {
			const r = calculateEgfr({ age: a, gender: gender as any, serumCreatinineMgPerDl: c, ethnicity: ethnicity as any })
			setResult(r)
		} catch (err) {
			setError('tools.egfr.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.egfr.info.whatItDoes" />,
		howToUse: <T k="tools.egfr.info.howToUse" />,
		inputGuide: <T k="tools.egfr.info.inputGuide" />,
		resultExplanation: <T k="tools.egfr.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.egfr.title" />} 
			description={<T k="tools.egfr.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.egfr.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={120} 
						required 
					/>
					<Select 
						label={<T k="tools.egfr.inputs.gender" /> as any} 
						value={gender} 
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="male"><T k="tools.gender.male" /></option>
						<option value="female"><T k="tools.gender.female" /></option>
					</Select>
					<NumberInput 
						label={<T k="tools.egfr.inputs.creatinine" /> as any} 
						value={creatinine} 
						onChange={(e) => setCreatinine(e.target.value)} 
						min={0.1} 
						max={10} 
						step="0.01" 
						required 
					/>
					<Select 
						label={<T k="tools.egfr.inputs.race" /> as any} 
						value={ethnicity} 
						onChange={(e) => setEthnicity(e.target.value)}
					>
						<option value="non-black"><T k="tools.egfr.inputs.race.other" /></option>
						<option value="black"><T k="tools.egfr.inputs.race.black" /></option>
					</Select>
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
							<div className="text-gray-800"><T k="tools.egfr.results.egfrLabel" />: <span className="font-semibold">{result.egfr} mL/min/1.73m²</span></div>
							<div className="text-gray-800"><T k="tools.egfr.results.stageLabel" />: <span className="font-semibold">{(() => {
								const s = result.stage
								if (s === 'Stage 1') return <T k="tools.egfr.stage.normal" />
								if (s === 'Stage 2') return <T k="tools.egfr.stage.mild" />
								if (s === 'Stage 3') return <T k="tools.egfr.stage.moderate" />
								if (s === 'Stage 4') return <T k="tools.egfr.stage.severe" />
								return <T k="tools.egfr.stage.kidneyFailure" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.egfr.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{(() => {
										const s = result.stage
										if (s === 'Stage 1') {
											return (
												<>
													<li><T k="tools.egfr.recommendations.normal.1" /></li>
													<li><T k="tools.egfr.recommendations.normal.2" /></li>
												</>
											)
										} else if (s === 'Stage 2') {
											return (
												<>
													<li><T k="tools.egfr.recommendations.mild.1" /></li>
													<li><T k="tools.egfr.recommendations.mild.2" /></li>
												</>
											)
										} else if (s === 'Stage 3') {
											return (
												<>
													<li><T k="tools.egfr.recommendations.moderate.1" /></li>
													<li><T k="tools.egfr.recommendations.moderate.2" /></li>
												</>
											)
										} else if (s === 'Stage 4') {
											return (
												<>
													<li><T k="tools.egfr.recommendations.severe.1" /></li>
													<li><T k="tools.egfr.recommendations.severe.2" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.egfr.recommendations.kidneyFailure.1" /></li>
													<li><T k="tools.egfr.recommendations.kidneyFailure.2" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.egfr.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



