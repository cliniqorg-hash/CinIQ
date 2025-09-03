import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة موعد الولادة المتوقع - CLinIQ',
  description: 'احسب موعد الولادة المتوقع بناءً على آخر دورة شهرية. أداة طبية مجانية للحوامل.',
  keywords: 'موعد الولادة, الحمل, حاسبة الحمل, الدورة الشهرية',
  openGraph: {
    title: 'حاسبة موعد الولادة المتوقع - CLinIQ',
    description: 'احسب موعد الولادة المتوقع بناءً على آخر دورة شهرية. أداة طبية مجانية للحوامل.',
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
import { calculateDueDate, gestationalAgeWeeks, trimesterFromWeeks } from '../../../lib/tools/pregnancyDueDate'

export default function PregnancyDueDateToolPage() {
	const { locale } = useLang()
	const [lmp, setLmp] = useState<string>('')
	const [result, setResult] = useState<{ dueDate: string; gestationalAge: string; trimester: string } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!lmp) return
		try {
			const lmpDate = new Date(lmp)
			const dueDate = calculateDueDate(lmpDate)
			const weeks = gestationalAgeWeeks(lmpDate)
			const gestationalAge = `${weeks} weeks, ${Math.floor((Date.now() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)) % 7} days`
			const trimester = trimesterFromWeeks(weeks)
			setResult({ 
				dueDate: dueDate.toLocaleDateString(), 
				gestationalAge, 
				trimester: `${trimester} Trimester` 
			})
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.pregnancyDueDate.info.whatItDoes" />,
		howToUse: <T k="tools.pregnancyDueDate.info.howToUse" />,
		inputGuide: <T k="tools.pregnancyDueDate.info.inputGuide" />,
		resultExplanation: <T k="tools.pregnancyDueDate.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.pregnancyDueDate.title" />} 
			description={<T k="tools.pregnancyDueDate.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.pregnancyDueDate.inputs.lmp" /> as any} 
						value={lmp} 
						onChange={(e) => setLmp(e.target.value)} 
						type="date" 
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
							<div className="text-gray-800"><T k="tools.pregnancyDueDate.results.dueDateLabel" /> <span className="font-semibold">{result.dueDate}</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyDueDate.results.gestationalAgeLabel" /> <span className="font-semibold">{result.gestationalAge}</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyDueDate.results.trimesterLabel" /> <span className="font-semibold">{result.trimester}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.pregnancyDueDate.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.pregnancyDueDate.recommendations.1" /></li>
									<li><T k="tools.pregnancyDueDate.recommendations.2" /></li>
									<li><T k="tools.pregnancyDueDate.recommendations.3" /></li>
									<li><T k="tools.pregnancyDueDate.recommendations.4" /></li>
									<li><T k="tools.pregnancyDueDate.recommendations.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.pregnancyDueDate.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



