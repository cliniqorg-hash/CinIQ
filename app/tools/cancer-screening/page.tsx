import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة فحوصات السرطان - CLinIQ',
  description: 'احسب مواعيد فحوصات السرطان المطلوبة حسب العمر والجنس. أداة طبية مجانية للوقاية من السرطان.',
  keywords: 'فحوصات السرطان, الوقاية من السرطان, الكشف المبكر, صحة',
  openGraph: {
    title: 'حاسبة فحوصات السرطان - CLinIQ',
    description: 'احسب مواعيد فحوصات السرطان المطلوبة حسب العمر والجنس. أداة طبية مجانية للوقاية من السرطان.',
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
import { recommendedScreenings } from '../../../lib/tools/cancerScreening'

export default function CancerScreeningToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [gender, setGender] = useState<string>('female')
	const [smoking, setSmoking] = useState<string>('no')
	const [familyHistory, setFamilyHistory] = useState<string>('no')
	const [result, setResult] = useState<{ riskLevel: string; interpretation: string; screenings: any[] } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const ageNum = parseInt(age)
		if (!(ageNum >= 18 && ageNum <= 100)) return
		try {
			const screenings = recommendedScreenings({ 
				age: ageNum, 
				gender: gender as any, 
				familyHistory: familyHistory === 'yes',
				lifestyle: { smoking: smoking === 'yes' }
			})
			let riskLevel = 'Low'
			let interpretation = 'You have a low risk profile for cancer based on your current factors.'
			if (ageNum >= 50 || smoking === 'yes' || familyHistory === 'yes') {
				riskLevel = 'Moderate'
				interpretation = 'You have moderate risk factors that warrant regular screening.'
			}
			if (ageNum >= 65 || (smoking === 'yes' && familyHistory === 'yes')) {
				riskLevel = 'High'
				interpretation = 'You have multiple risk factors that require more frequent screening.'
			}
			setResult({ riskLevel, interpretation, screenings })
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.cancerScreening.info.whatItDoes" />,
		howToUse: <T k="tools.cancerScreening.info.howToUse" />,
		inputGuide: <T k="tools.cancerScreening.info.inputGuide" />,
		resultExplanation: <T k="tools.cancerScreening.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.cancerScreening.info.medicalDisclaimer" />
	}

	return (
		<ToolLayout 
			title={<T k="tools.cancerScreening.title" />} 
			description={<T k="tools.cancerScreening.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.cancerScreening.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={100} 
						required 
					/>
					<Select 
						label={<T k="tools.cancerScreening.inputs.gender" /> as any} 
						value={gender} 
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="female"><T k="tools.gender.female" /></option>
						<option value="male"><T k="tools.gender.male" /></option>
					</Select>
					<Select 
						label={<T k="tools.cancerScreening.inputs.smoking" /> as any} 
						value={smoking} 
						onChange={(e) => setSmoking(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					<Select 
						label={<T k="tools.cancerScreening.inputs.familyHistory" /> as any} 
						value={familyHistory} 
						onChange={(e) => setFamilyHistory(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
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
							<div className="text-gray-800"><T k="tools.cancerScreening.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.riskLevel
								if (l === 'Low') return <T k="tools.cancerScreening.risk.low" />
								if (l === 'Moderate') return <T k="tools.cancerScreening.risk.moderate" />
								return <T k="tools.cancerScreening.risk.high" />
							})()}</span></div>
							<div className="text-gray-800"><T k="tools.cancerScreening.results.recommendationsLabel" />: <span className="font-semibold"><T k={`tools.cancerScreening.interpretation.${result.riskLevel.toLowerCase()}`} /></span></div>
							<div className="mt-3">
								<div className="text-gray-800 font-medium mb-2"><T k="tools.cancerScreening.recommendations.title" /></div>
								{result.screenings.map((screening, i) => (
									<div key={i} className="mb-2 p-2 bg-gray-50 rounded">
										<div className="text-sm font-medium text-gray-900">{screening.test}</div>
										<div className="text-sm text-gray-700">{screening.interval}</div>
										{screening.note && <div className="text-xs text-gray-600">{screening.note}</div>}
									</div>
								))}
							</div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.cancerScreening.explain" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.cancerScreening.notes.1" /></li>
									<li><T k="tools.cancerScreening.notes.2" /></li>
									<li><T k="tools.cancerScreening.notes.3" /></li>
									<li><T k="tools.cancerScreening.notes.4" /></li>
									<li><T k="tools.cancerScreening.notes.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.cancerScreening.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



