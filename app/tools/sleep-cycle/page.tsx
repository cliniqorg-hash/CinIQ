import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة دورة النوم - CLinIQ',
  description: 'احسب أفضل أوقات النوم والاستيقاظ للحصول على نوم صحي ومريح. أداة طبية مجانية لتحسين جودة النوم.',
  keywords: 'دورة النوم, جودة النوم, أوقات النوم, صحة النوم',
  openGraph: {
    title: 'حاسبة دورة النوم - CLinIQ',
    description: 'احسب أفضل أوقات النوم والاستيقاظ للحصول على نوم صحي ومريح. أداة طبية مجانية لتحسين جودة النوم.',
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
import { bedtimesFromWakeTime, wakeTimesFromBedtime } from '../../../lib/tools/sleepCycle'

export default function SleepCycleToolPage() {
	const { locale } = useLang()
	const [wakeTime, setWakeTime] = useState<string>('')
	const [bedtime, setBedtime] = useState<string>('')
	const [mode, setMode] = useState<'wake' | 'bed'>('wake')
	const [result, setResult] = useState<{ bedtimes: string[]; wakeTimes: string[] } | null>(null)

	function decimalToHHMM(val: string): string {
		const num = parseFloat(val)
		if (Number.isNaN(num)) return ''
		const hours = Math.floor(num)
		const minutes = Math.round((num - hours) * 60)
		const hh = hours.toString().padStart(2, '0')
		const mm = minutes.toString().padStart(2, '0')
		return `${hh}:${mm}`
	}
	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		try {
			if (mode === 'wake' && wakeTime) {
				const hhmm = decimalToHHMM(wakeTime)
				if (!hhmm) return
				const bedtimes = bedtimesFromWakeTime(hhmm)
				setResult({ bedtimes, wakeTimes: [] })
			} else if (mode === 'bed' && bedtime) {
				const hhmm = decimalToHHMM(bedtime)
				if (!hhmm) return
				const wakeTimes = wakeTimesFromBedtime(hhmm)
				setResult({ bedtimes: [], wakeTimes })
			}
		} catch {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.sleepCycle.info.whatItDoes" />,
		howToUse: <T k="tools.sleepCycle.info.howToUse" />,
		inputGuide: <T k="tools.sleepCycle.info.inputGuide" />,
		resultExplanation: <T k="tools.sleepCycle.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.sleepCycle.info.medicalDisclaimer" />
	}

	return (
		<ToolLayout 
			title={<T k="tools.sleepCycle.title" />} 
			description={<T k="tools.sleepCycle.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<Select 
						label={<T k="tools.sleepCycle.inputs.mode" /> as any} 
						value={mode} 
						onChange={(e) => setMode(e.target.value as 'wake' | 'bed')}
					>
						<option value="wake"><T k="tools.sleepCycle.inputs.mode.wake" /></option>
						<option value="bed"><T k="tools.sleepCycle.inputs.mode.bed" /></option>
					</Select>
					{mode === 'wake' ? (
						<NumberInput 
							label={<T k="tools.sleepCycle.inputs.wakeTime" /> as any} 
							value={wakeTime} 
							onChange={(e) => setWakeTime(e.target.value)} 
							min={0} 
							max={23} 
							step="0.5" 
							required 
						/>
					) : (
						<NumberInput 
							label={<T k="tools.sleepCycle.inputs.bedtime" /> as any} 
							value={bedtime} 
							onChange={(e) => setBedtime(e.target.value)} 
							min={0} 
							max={23} 
							step="0.5" 
							required 
						/>
					)}
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
							{result.bedtimes.length > 0 && (
								<div>
									<div className="text-gray-800 font-medium mb-2"><T k="tools.sleepCycle.results.bedtimes" /></div>
									{result.bedtimes.map((time, i) => (
										<div key={i} className="text-gray-700">{time}</div>
									))}
								</div>
							)}
							{result.wakeTimes.length > 0 && (
								<div>
									<div className="text-gray-800 font-medium mb-2"><T k="tools.sleepCycle.results.wakeTimes" /></div>
									{result.wakeTimes.map((time, i) => (
										<div key={i} className="text-gray-700">{time}</div>
									))}
								</div>
							)}
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.sleepCycle.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.sleepCycle.explain" />
								</div>
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.sleepCycle.tips.title" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.sleepCycle.tips.chooseTime" /></li>
									<li><T k="tools.sleepCycle.tips.fallAsleep" /></li>
									<li><T k="tools.sleepCycle.tips.consistent" /></li>
									<li><T k="tools.sleepCycle.tips.routine" /></li>
									<li><T k="tools.sleepCycle.tips.noScreens" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.sleepCycle.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



