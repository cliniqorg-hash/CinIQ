import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة أيام التبويض - CLinIQ',
  description: 'احسب أيام التبويض وأيام الخصوبة. أداة طبية مجانية لمراقبة الدورة الشهرية.',
  keywords: 'أيام التبويض, الخصوبة, الدورة الشهرية, الحمل',
  openGraph: {
    title: 'حاسبة أيام التبويض - CLinIQ',
    description: 'احسب أيام التبويض وأيام الخصوبة. أداة طبية مجانية لمراقبة الدورة الشهرية.',
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
import { calculateOvulation, fertileWindow, nextPeriod } from '../../../lib/tools/ovulation'

export default function OvulationToolPage() {
	const { locale } = useLang()
	const [lmp, setLmp] = useState<string>('')
	const [cycleLength, setCycleLength] = useState<string>('28')
	const [result, setResult] = useState<{ ovulationDate: string; fertileWindow: string; nextPeriod: string } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!lmp || !cycleLength) return
		try {
			const lmpDate = new Date(lmp)
			const cycle = parseInt(cycleLength)
			const ovulationDate = calculateOvulation(lmpDate, cycle)
			const fertileWindowDates = fertileWindow(lmpDate, cycle)
			const nextPeriodDate = nextPeriod(lmpDate, cycle)
			setResult({ 
				ovulationDate: ovulationDate.toLocaleDateString(), 
				fertileWindow: `${fertileWindowDates.start.toLocaleDateString()} - ${fertileWindowDates.end.toLocaleDateString()}`,
				nextPeriod: nextPeriodDate.toLocaleDateString()
			})
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.ovulation.info.whatItDoes" />,
		howToUse: <T k="tools.ovulation.info.howToUse" />,
		inputGuide: <T k="tools.ovulation.info.inputGuide" />,
		resultExplanation: <T k="tools.ovulation.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.ovulation.title" />} 
			description={<T k="tools.ovulation.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.ovulation.inputs.lmp" /> as any} 
						value={lmp} 
						onChange={(e) => setLmp(e.target.value)} 
						type="date" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.ovulation.inputs.cycleLength" /> as any} 
						value={cycleLength} 
						onChange={(e) => setCycleLength(e.target.value)} 
						min={21} 
						max={35} 
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
							<div className="text-gray-800"><T k="tools.ovulation.results.ovulationDate" /> <span className="font-semibold">{result.ovulationDate}</span></div>
							<div className="text-gray-800"><T k="tools.ovulation.results.fertileWindow" /> <span className="font-semibold">{result.fertileWindow}</span></div>
							<div className="text-gray-800"><T k="tools.ovulation.results.nextPeriod" /> <span className="font-semibold">{result.nextPeriod}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.ovulation.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.ovulation.notes.1" /></li>
									<li><T k="tools.ovulation.notes.2" /></li>
									<li><T k="tools.ovulation.notes.3" /></li>
									<li><T k="tools.ovulation.notes.4" /></li>
									<li><T k="tools.ovulation.notes.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.ovulation.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



