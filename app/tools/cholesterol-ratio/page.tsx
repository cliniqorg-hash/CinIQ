import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة نسبة الكوليسترول - CLinIQ',
  description: 'احسب نسبة الكوليسترول الكلي إلى الكوليسترول الجيد. أداة طبية مجانية لتقييم صحة القلب.',
  keywords: 'الكوليسترول, نسبة الكوليسترول, صحة القلب, الدهون',
  openGraph: {
    title: 'حاسبة نسبة الكوليسترول - CLinIQ',
    description: 'احسب نسبة الكوليسترول الكلي إلى الكوليسترول الجيد. أداة طبية مجانية لتقييم صحة القلب.',
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
import { calculateCholesterolRatio } from '../../../lib/tools/cholesterolRatio'

export default function CholesterolRatioToolPage() {
	const { locale } = useLang()
	const [total, setTotal] = useState<string>('')
	const [hdl, setHdl] = useState<string>('')
	const [result, setResult] = useState<{ ratio: number; category: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const totalNum = parseFloat(total)
		const hdlNum = parseFloat(hdl)
		if (!(totalNum > 0 && totalNum <= 1000) || !(hdlNum > 0 && hdlNum <= 200)) {
			setError('tools.cholesterolRatio.errors.invalidInputs')
			return
		}
		if (totalNum <= hdlNum) {
			setError('tools.cholesterolRatio.errors.invalidInputs')
			return
		}
		try {
			const r = calculateCholesterolRatio({ total: totalNum, hdl: hdlNum })
			setResult(r)
		} catch (err) {
			setError('tools.cholesterolRatio.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.cholesterolRatio.info.whatItDoes" />,
		howToUse: <T k="tools.cholesterolRatio.info.howToUse" />,
		inputGuide: <T k="tools.cholesterolRatio.info.inputGuide" />,
		resultExplanation: <T k="tools.cholesterolRatio.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.cholesterolRatio.title" />} 
			description={<T k="tools.cholesterolRatio.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.cholesterolRatio.inputs.totalCholesterol" /> as any} 
						value={total} 
						onChange={(e) => setTotal(e.target.value)} 
						min={100} 
						max={1000} 
						step="1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.cholesterolRatio.inputs.hdl" /> as any} 
						value={hdl} 
						onChange={(e) => setHdl(e.target.value)} 
						min={20} 
						max={200} 
						step="1" 
						required 
					/>
					<button type="submit" className="btn-primary" title={messages[locale]['tools.actions.calculate'] ?? 'Calculate'}>
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
							<div className="text-gray-800"><T k="tools.cholesterolRatio.results.ratioLabel" />: <span className="font-semibold">{result.ratio}</span></div>
							<div className="text-gray-800"><T k="tools.cholesterolRatio.results.categoryLabel" />: <span className="font-semibold">{(() => {
								const c = result.category
								if (c === 'Optimal') return <T k="tools.cholesterolRatio.category.optimal" />
								if (c === 'NearOptimal') return <T k="tools.cholesterolRatio.category.nearOptimal" />
								if (c === 'Borderline') return <T k="tools.cholesterolRatio.category.borderline" />
								if (c === 'High') return <T k="tools.cholesterolRatio.category.high" />
								return <T k="tools.cholesterolRatio.category.veryHigh" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.cholesterolRatio.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{(() => {
										const c = result.category
										if (c === 'Optimal') {
											return (
												<>
													<li><T k="tools.cholesterolRatio.recommendations.optimal.1" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.optimal.2" /></li>
												</>
											)
										} else if (c === 'NearOptimal') {
											return (
												<>
													<li><T k="tools.cholesterolRatio.recommendations.nearOptimal.1" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.nearOptimal.2" /></li>
												</>
											)
										} else if (c === 'Borderline') {
											return (
												<>
													<li><T k="tools.cholesterolRatio.recommendations.borderline.1" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.borderline.2" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.borderline.3" /></li>
												</>
											)
										} else if (c === 'High') {
											return (
												<>
													<li><T k="tools.cholesterolRatio.recommendations.high.1" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.high.2" /></li>
												</>
											)
										} else {
											return (
												<>
													<li><T k="tools.cholesterolRatio.recommendations.veryHigh.1" /></li>
													<li><T k="tools.cholesterolRatio.recommendations.veryHigh.2" /></li>
												</>
											)
										}
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.cholesterolRatio.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



