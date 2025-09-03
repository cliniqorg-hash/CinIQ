import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر التدخين - CLinIQ',
  description: 'احسب المخاطر الصحية المرتبطة بالتدخين. أداة طبية مجانية لتقييم تأثير التدخين على الصحة.',
  keywords: 'مخاطر التدخين, التدخين, صحة الرئة, الإقلاع عن التدخين',
  openGraph: {
    title: 'حاسبة مخاطر التدخين - CLinIQ',
    description: 'احسب المخاطر الصحية المرتبطة بالتدخين. أداة طبية مجانية لتقييم تأثير التدخين على الصحة.',
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
import { calculateSmokingRisk } from '../../../lib/tools/smokingRisk'

export default function SmokingRiskToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [cigarettesPerDay, setCigarettesPerDay] = useState<string>('')
	const [yearsSmoked, setYearsSmoked] = useState<string>('')
	const [result, setResult] = useState<{ packYears: number; lungAge: number; risk: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const a = parseInt(age)
		const cigs = parseInt(cigarettesPerDay)
		const years = parseInt(yearsSmoked)
		if (!(a >= 18 && a <= 120) || !(cigs >= 0 && cigs <= 100) || !(years >= 0 && years <= 80)) {
			setError('tools.smokingRisk.errors.invalidInputs')
			return
		}
		try {
			const r = calculateSmokingRisk({ age: a, cigarettesPerDay: cigs, yearsSmoked: years })
			setResult(r)
		} catch (err) {
			setError('tools.smokingRisk.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.smokingRisk.info.whatItDoes" />,
		howToUse: <T k="tools.smokingRisk.info.howToUse" />,
		inputGuide: <T k="tools.smokingRisk.info.inputGuide" />,
		resultExplanation: <T k="tools.smokingRisk.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.smokingRisk.title" />} 
			description={<T k="tools.smokingRisk.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.smokingRisk.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={18} 
						max={120} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.smokingRisk.inputs.cigarettesPerDay" /> as any} 
						value={cigarettesPerDay} 
						onChange={(e) => setCigarettesPerDay(e.target.value)} 
						min={0} 
						max={100} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.smokingRisk.inputs.yearsSmoked" /> as any} 
						value={yearsSmoked} 
						onChange={(e) => setYearsSmoked(e.target.value)} 
						min={0} 
						max={80} 
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
							<div className="text-gray-800"><T k="tools.smokingRisk.results.packYears" />: <span className="font-semibold">{result.packYears}</span></div>
							<div className="text-gray-800"><T k="tools.smokingRisk.results.lungAge" />: <span className="font-semibold">{result.lungAge}</span></div>
							<div className="text-gray-800"><T k="tools.smokingRisk.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.risk
								if (l === 'Low') return <T k="tools.smokingRisk.risk.low" />
								if (l === 'Moderate') return <T k="tools.smokingRisk.risk.moderate" />
								if (l === 'High') return <T k="tools.smokingRisk.risk.high" />
								return <T k="tools.smokingRisk.risk.veryHigh" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.smokingRisk.explain" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.smokingRisk.recommendations.1" /></li>
									<li><T k="tools.smokingRisk.recommendations.2" /></li>
									<li><T k="tools.smokingRisk.recommendations.3" /></li>
									<li><T k="tools.smokingRisk.recommendations.4" /></li>
									<li><T k="tools.smokingRisk.recommendations.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.smokingRisk.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



