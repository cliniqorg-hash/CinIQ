import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مخاطر مرض الانسداد الرئوي المزمن - CLinIQ',
  description: 'احسب مخاطر الإصابة بمرض الانسداد الرئوي المزمن (COPD). أداة طبية مجانية لتقييم صحة الرئة.',
  keywords: 'الانسداد الرئوي المزمن, COPD, صحة الرئة, أمراض الجهاز التنفسي',
  openGraph: {
    title: 'حاسبة مخاطر مرض الانسداد الرئوي المزمن - CLinIQ',
    description: 'احسب مخاطر الإصابة بمرض الانسداد الرئوي المزمن (COPD). أداة طبية مجانية لتقييم صحة الرئة.',
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
import { calculateCatScore } from '../../../lib/tools/copdRisk'

export default function CopdRiskToolPage() {
	const { locale } = useLang()
	const [catItems, setCatItems] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
	const [result, setResult] = useState<{ total: number; level: string } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			const catResult = calculateCatScore(catItems)
			setResult(catResult)
		} catch (err) {
			setResult(null)
		}
	}

	const catQuestions: string[] = [
		'tools.copdCat.questions.cough',
		'tools.copdCat.questions.phlegm',
		'tools.copdCat.questions.chestTightness',
		'tools.copdCat.questions.breathlessness',
		'tools.copdCat.questions.limitation',
		'tools.copdCat.questions.confidence',
		'tools.copdCat.questions.sleep',
		'tools.copdCat.questions.energy'
	]

	const toolInfo = {
		whatItDoes: <T k="tools.copdCat.info.whatItDoes" />,
		howToUse: <T k="tools.copdCat.info.howToUse" />,
		inputGuide: <T k="tools.copdCat.info.inputGuide" />,
		resultExplanation: <T k="tools.copdCat.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.copdCat.info.medicalDisclaimer" />
	}

	return (
		<ToolLayout 
			title={<T k="tools.copdCat.title" />} 
			description={<T k="tools.copdCat.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					{catQuestions.map((question, index) => (
						<Select 
							key={index} 
							label={<T k={question} /> as any} 
							value={catItems[index].toString()} 
							onChange={(e) => {
								const newItems = [...catItems]
								newItems[index] = parseInt(e.target.value)
								setCatItems(newItems)
							}}
						>
							<option value="0"><T k="tools.copdCat.options.0" /></option>
							<option value="1"><T k="tools.copdCat.options.1" /></option>
							<option value="2"><T k="tools.copdCat.options.2" /></option>
							<option value="3"><T k="tools.copdCat.options.3" /></option>
							<option value="4"><T k="tools.copdCat.options.4" /></option>
							<option value="5"><T k="tools.copdCat.options.5" /></option>
						</Select>
					))}
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
							<div className="text-gray-800"><T k="tools.copdCat.results.scoreLabel" /> <span className="font-semibold">{result.total}/40</span></div>
							<div className="text-gray-800"><T k="tools.copdCat.results.impactLabel" /> <span className="font-semibold">{(() => {
								const l = result.level
								if (l === 'Low') return <T k="tools.copdRisk.risk.low" />
								if (l === 'Moderate') return <T k="tools.copdRisk.risk.moderate" />
								if (l === 'High') return <T k="tools.copdRisk.risk.high" />
								return <T k="tools.copdRisk.risk.veryHigh" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.copdCat.info.resultExplanation" />
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
													<li><T k="tools.copdRisk.recommendations.low.1" /></li>
													<li><T k="tools.copdRisk.recommendations.low.2" /></li>
													<li><T k="tools.copdRisk.recommendations.low.3" /></li>
												</>
											)
										} else if (l === 'Moderate') {
											return (
												<>
													<li><T k="tools.copdRisk.recommendations.moderate.1" /></li>
													<li><T k="tools.copdRisk.recommendations.moderate.2" /></li>
													<li><T k="tools.copdRisk.recommendations.moderate.3" /></li>
												</>
											)
										} else if (l === 'High') {
											return (
												<>
													<li><T k="tools.copdRisk.recommendations.high.1" /></li>
													<li><T k="tools.copdRisk.recommendations.high.2" /></li>
													<li><T k="tools.copdRisk.recommendations.high.3" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.copdRisk.recommendations.veryHigh.1" /></li>
													<li><T k="tools.copdRisk.recommendations.veryHigh.2" /></li>
													<li><T k="tools.copdRisk.recommendations.veryHigh.3" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.copdCat.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


