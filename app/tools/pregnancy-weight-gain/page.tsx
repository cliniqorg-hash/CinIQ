import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة زيادة الوزن أثناء الحمل - CLinIQ',
  description: 'احسب زيادة الوزن المثالية أثناء الحمل. أداة طبية مجانية لمراقبة صحة الحامل.',
  keywords: 'زيادة الوزن, الحمل, صحة الحامل, التغذية أثناء الحمل',
  openGraph: {
    title: 'حاسبة زيادة الوزن أثناء الحمل - CLinIQ',
    description: 'احسب زيادة الوزن المثالية أثناء الحمل. أداة طبية مجانية لمراقبة صحة الحامل.',
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
import { calculatePregnancyWeightGain } from '../../../lib/tools/pregnancyWeightGain'

export default function PregnancyWeightGainToolPage() {
	const { locale } = useLang()
	const [prePregnancyWeight, setPrePregnancyWeight] = useState<string>('')
	const [currentWeight, setCurrentWeight] = useState<string>('')
	const [height, setHeight] = useState<string>('')
	const [heightUnit, setHeightUnit] = useState<string>('cm')
	const [gestationalWeek, setGestationalWeek] = useState<string>('')
	const [result, setResult] = useState<{ prePregnancyBmi: number; bmiCategory: string; recommendedTotalGainKg: any; recommendedGainToDateKg: any; currentGainKg: number; status: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const weight = parseFloat(prePregnancyWeight)
		const current = parseFloat(currentWeight)
		let hRaw = parseFloat(height)
		const week = parseInt(gestationalWeek)
		
		if (heightUnit === 'ft') {
			hRaw = hRaw * 30.48 // Convert feet to cm
		} else if (heightUnit === 'in') {
			hRaw = hRaw * 2.54 // Convert inches to cm
		}
		
		if (!(weight > 0 && weight <= 300) || !(current > 0 && current <= 300) || !(hRaw > 0 && hRaw <= 250) || !(week >= 0 && week <= 42)) {
			setError('tools.pregnancyWeightGain.errors.invalidInputs')
			return
		}
		try {
			const r = calculatePregnancyWeightGain({ 
				prePregnancyWeightKg: weight, 
				currentWeightKg: current,
				heightCm: hRaw,
				gestationalWeek: week
			})
			setResult(r)
		} catch (err) {
			setError('tools.pregnancyWeightGain.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.pregnancyWeightGain.info.whatItDoes" />,
		howToUse: <T k="tools.pregnancyWeightGain.info.howToUse" />,
		inputGuide: <T k="tools.pregnancyWeightGain.info.inputGuide" />,
		resultExplanation: <T k="tools.pregnancyWeightGain.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.info.medicalDisclaimer" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.pregnancyWeightGain.title" />} 
			description={<T k="tools.pregnancyWeightGain.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.pregnancyWeightGain.inputs.preWeight" /> as any} 
						value={prePregnancyWeight} 
						onChange={(e) => setPrePregnancyWeight(e.target.value)} 
						min={30} 
						max={300} 
						step="0.1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.pregnancyWeightGain.inputs.currentWeight" /> as any} 
						value={currentWeight} 
						onChange={(e) => setCurrentWeight(e.target.value)} 
						min={30} 
						max={300} 
						step="0.1" 
						required 
					/>
					<div className="flex gap-2">
						<NumberInput 
							label={<T k="tools.pregnancyWeightGain.inputs.height" /> as any} 
							value={height} 
							onChange={(e) => setHeight(e.target.value)} 
							min={100} 
							max={250} 
							step="0.1" 
							required 
						/>
						<Select 
							label={<T k="tools.inputs.unit" /> as any} 
							value={heightUnit} 
							onChange={(e) => setHeightUnit(e.target.value)}
						>
							<option value="cm">cm</option>
							<option value="ft">ft</option>
							<option value="in">in</option>
						</Select>
					</div>
					<NumberInput 
						label={<T k="tools.pregnancyWeightGain.inputs.gestationalWeek" /> as any} 
						value={gestationalWeek} 
						onChange={(e) => setGestationalWeek(e.target.value)} 
						min={0} 
						max={42} 
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
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.preBmi" /> <span className="font-semibold">{result.prePregnancyBmi}</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.bmiCategory" /> <span className="font-semibold">{(() => {
								const c = result.bmiCategory
								if (c === 'Underweight') return <T k="tools.bmi.category.underweight" />
								if (c === 'Normal') return <T k="tools.bmi.category.normal" />
								if (c === 'Overweight') return <T k="tools.bmi.category.overweight" />
								return <T k="tools.bmi.category.obese" />
							})()}</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.recommendedTotal" /> <span className="font-semibold">{result.recommendedTotalGainKg.min}-{result.recommendedTotalGainKg.max} kg</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.recommendedToDate" /> <span className="font-semibold">{result.recommendedGainToDateKg.min}-{result.recommendedGainToDateKg.max} kg</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.currentGain" /> <span className="font-semibold">{result.currentGainKg} kg</span></div>
							<div className="text-gray-800"><T k="tools.pregnancyWeightGain.results.status" /> <span className="font-semibold">{(() => {
								const s = result.status
								if (s === 'Below') return <T k="tools.pregnancyWeightGain.status.below" />
								if (s === 'Within') return <T k="tools.pregnancyWeightGain.status.within" />
								return <T k="tools.pregnancyWeightGain.status.above" />
							})()}</span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.pregnancyWeightGain.explain" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.generic.recommendations" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.pregnancyWeightGain.recommendations.1" /></li>
									<li><T k="tools.pregnancyWeightGain.recommendations.2" /></li>
									<li><T k="tools.pregnancyWeightGain.recommendations.3" /></li>
									<li><T k="tools.pregnancyWeightGain.recommendations.4" /></li>
									<li><T k="tools.pregnancyWeightGain.recommendations.5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.pregnancyWeightGain.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}



