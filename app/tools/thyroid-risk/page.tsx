import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر أمراض الغدة الدرقية - CLinIQ',
  description: 'احسب مخاطر الإصابة بأمراض الغدة الدرقية. أداة طبية مجانية لتقييم صحة الغدة الدرقية.',
  keywords: 'الغدة الدرقية, أمراض الغدة الدرقية, هرمونات, صحة الغدد',
  openGraph: {
    title: 'حاسبة مخاطر أمراض الغدة الدرقية - CLinIQ',
    description: 'احسب مخاطر الإصابة بأمراض الغدة الدرقية. أداة طبية مجانية لتقييم صحة الغدة الدرقية.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState } from 'react'
import ToolLayout from '../../../components/tools/ToolLayout'
import { Select, T } from '../../../components/tools/FormControls'
import { useLang } from '../../../components/LangProvider'
import { messages } from '../../../lib/i18n'
import { calculateThyroidRisk } from '../../../lib/tools/thyroidRisk'

export default function ThyroidRiskToolPage() {
	const { locale } = useLang()
	const [fatigue, setFatigue] = useState<string>('no')
	const [weightGain, setWeightGain] = useState<string>('no')
	const [weightLoss, setWeightLoss] = useState<string>('no')
	const [coldIntolerance, setColdIntolerance] = useState<string>('no')
	const [heatIntolerance, setHeatIntolerance] = useState<string>('no')
	const [palpitations, setPalpitations] = useState<string>('no')
	const [moodChanges, setMoodChanges] = useState<string>('no')
	const [hairOrNailChanges, setHairOrNailChanges] = useState<string>('no')
	const [result, setResult] = useState<{ score: number; level: string; suspectedType: string } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			const r = calculateThyroidRisk({
				symptoms: {
					fatigue: fatigue === 'yes',
					weightGain: weightGain === 'yes',
					weightLoss: weightLoss === 'yes',
					coldIntolerance: coldIntolerance === 'yes',
					heatIntolerance: heatIntolerance === 'yes',
					palpitations: palpitations === 'yes',
					moodChanges: moodChanges === 'yes',
					hairOrNailChanges: hairOrNailChanges === 'yes'
				}
			})
			setResult(r)
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.thyroidRisk.info.whatItDoes" />,
		howToUse: <T k="tools.thyroidRisk.info.howToUse" />,
		inputGuide: <T k="tools.thyroidRisk.info.inputGuide" />,
		resultExplanation: <T k="tools.thyroidRisk.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.thyroidRisk.title" />} 
			description={<T k="tools.thyroidRisk.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<p className="text-sm text-gray-600"><T k="tools.thyroidRisk.instructions" /></p>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.fatigue" /> as any} 
						value={fatigue} 
						onChange={(e) => setFatigue(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.weightGain" /> as any} 
						value={weightGain} 
						onChange={(e) => setWeightGain(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.weightLoss" /> as any} 
						value={weightLoss} 
						onChange={(e) => setWeightLoss(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.coldIntolerance" /> as any} 
						value={coldIntolerance} 
						onChange={(e) => setColdIntolerance(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.heatIntolerance" /> as any} 
						value={heatIntolerance} 
						onChange={(e) => setHeatIntolerance(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.palpitations" /> as any} 
						value={palpitations} 
						onChange={(e) => setPalpitations(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.moodChanges" /> as any} 
						value={moodChanges} 
						onChange={(e) => setMoodChanges(e.target.value)}
					>
						<option value="no"><T k="tools.common.no" /></option>
						<option value="yes"><T k="tools.common.yes" /></option>
					</Select>
					
					<Select 
						label={<T k="tools.thyroidRisk.inputs.hairOrNailChanges" /> as any} 
						value={hairOrNailChanges} 
						onChange={(e) => setHairOrNailChanges(e.target.value)}
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
							<div className="text-gray-800"><T k="tools.thyroidRisk.results.scoreLabel" />: <span className="font-semibold">{result.score}</span></div>
							<div className="text-gray-800"><T k="tools.thyroidRisk.results.riskLabel" />: <span className="font-semibold">{(() => {
								const l = result.level
								if (l === 'Low') return <T k="tools.thyroidRisk.risk.low" />
								if (l === 'Moderate') return <T k="tools.thyroidRisk.risk.moderate" />
								if (l === 'High') return <T k="tools.thyroidRisk.risk.high" />
								return <T k="tools.thyroidRisk.risk.veryHigh" />
							})()}</span></div>
							<div className="text-gray-800"><T k="tools.thyroidRisk.results.suspectedTypeLabel" />: <span className="font-semibold">{(() => {
								const t = result.suspectedType
								if (t === 'Hypothyroid') return <T k="tools.thyroidRisk.type.hypo" />
								if (t === 'Hyperthyroid') return <T k="tools.thyroidRisk.type.hyper" />
								return <T k="tools.thyroidRisk.type.indeterminate" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.thyroidRisk.explain" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.thyroidRisk.recommendations.1" /></li>
									<li><T k="tools.thyroidRisk.recommendations.2" /></li>
									<li><T k="tools.thyroidRisk.recommendations.3" /></li>
									<li><T k="tools.thyroidRisk.recommendations.4" /></li>
									<li><T k="tools.thyroidRisk.recommendations.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.thyroidRisk.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



