import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مناطق معدل ضربات القلب - CLinIQ',
  description: 'احسب مناطق معدل ضربات القلب المختلفة للتمارين الرياضية. أداة طبية مجانية لتحسين الأداء الرياضي.',
  keywords: 'معدل ضربات القلب, مناطق القلب, التمارين الرياضية, اللياقة البدنية',
  openGraph: {
    title: 'حاسبة مناطق معدل ضربات القلب - CLinIQ',
    description: 'احسب مناطق معدل ضربات القلب المختلفة للتمارين الرياضية. أداة طبية مجانية لتحسين الأداء الرياضي.',
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
import { maxHeartRate, zonesByMhr, zonesByKarvonen } from '../../../lib/tools/heartRateZones'

export default function HeartRateZonesToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [restingHr, setRestingHr] = useState<string>('')
	const [method, setMethod] = useState<'mhr' | 'karvonen'>('mhr')
	const [result, setResult] = useState<{ maxHr: number; zones: any[]; method: string } | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const ageNum = parseInt(age)
		const restingHrNum = parseInt(restingHr)
		if (!(ageNum > 0 && ageNum <= 120) || !(restingHrNum > 0 && restingHrNum <= 200)) return
		try {
			const maxHr = maxHeartRate(ageNum)
			let zones
			if (method === 'mhr') {
				zones = zonesByMhr(maxHr)
			} else {
				zones = zonesByKarvonen(ageNum, restingHrNum)
			}
			setResult({ maxHr, zones, method })
		} catch (err) {
			setResult(null)
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.heartRateZones.info.whatItDoes" />,
		howToUse: <T k="tools.heartRateZones.info.howToUse" />,
		inputGuide: <T k="tools.heartRateZones.info.inputGuide" />,
		resultExplanation: <T k="tools.heartRateZones.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.heartRateZones.title" />} 
			description={<T k="tools.heartRateZones.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.heartRateZones.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={10} 
						max={120} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.heartRateZones.inputs.restingHeartRate" /> as any} 
						value={restingHr} 
						onChange={(e) => setRestingHr(e.target.value)} 
						min={40} 
						max={200} 
						required 
					/>
					<Select 
						label={<T k="tools.heartRateZones.inputs.fitnessLevel" /> as any} 
						value={method} 
						onChange={(e) => setMethod(e.target.value as 'mhr' | 'karvonen')}
					>
						<option value="mhr"><T k="tools.heartRateZones.method.mhr" /></option>
						<option value="karvonen"><T k="tools.heartRateZones.method.karvonen" /></option>
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
							<div className="text-gray-800">
								<T k="tools.heartRateZones.results.maxHeartRateLabel" />: <span className="font-semibold">{result.maxHr} <T k="tools.units.bpm" /></span>
							</div>
							<div className="text-gray-800"><T k="tools.heartRateZones.method.label" />: <span className="font-semibold">{result.method === 'mhr' ? <T k="tools.heartRateZones.method.mhr" /> : <T k="tools.heartRateZones.method.karvonen" />}</span></div>
							<div className="mt-3">
								<div className="text-gray-800 font-medium mb-2">
									<T k="tools.heartRateZones.results.zonesLabel" />:
								</div>
								{result.zones.map((zone, i) => (
									<div key={i} className="mb-2 p-2 bg-gray-50 rounded">
										<div className="text-sm font-medium text-gray-900"><T k={`tools.heartRateZones.zone.${zone.zone === 'Rest' ? 'warmup' : zone.zone === 'Fat Burn' ? 'fatBurning' : zone.zone === 'Cardio' ? 'aerobic' : 'maximum'}`} /></div>
										<div className="text-sm text-gray-700">{zone.min} - {zone.max} <T k="tools.units.bpm" /></div>
										<div className="text-xs text-gray-600"><T k={`tools.heartRateZones.zone.${zone.zone === 'Rest' ? 'warmup' : zone.zone === 'Fat Burn' ? 'fatBurning' : zone.zone === 'Cardio' ? 'aerobic' : 'maximum'}.desc`} /></div>
									</div>
								))}
							</div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2">
									<T k="tools.info.resultExplanation" />:
								</div>
								<div className="text-sm text-blue-800">
									<T k="tools.heartRateZones.info.resultExplanation" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.heartRateZones.tips.title" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.heartRateZones.tips.z12" /></li>
									<li><T k="tools.heartRateZones.tips.z3" /></li>
									<li><T k="tools.heartRateZones.tips.z4" /></li>
									<li><T k="tools.heartRateZones.tips.z5" /></li>
									<li><T k="tools.heartRateZones.tips.device" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.heartRateZones.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



