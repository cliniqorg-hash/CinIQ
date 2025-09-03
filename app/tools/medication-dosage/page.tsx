import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة جرعات الأدوية - CLinIQ',
  description: 'احسب الجرعات المناسبة للأدوية بناءً على الوزن والعمر. أداة طبية مجانية لحساب جرعات الأدوية للأطفال والبالغين.',
  keywords: 'جرعات الأدوية, حاسبة الجرعات, أدوية الأطفال, جرعات طبية, صيدلة',
  openGraph: {
    title: 'حاسبة جرعات الأدوية - CLinIQ',
    description: 'احسب الجرعات المناسبة للأدوية بناءً على الوزن والعمر. أداة طبية مجانية لحساب جرعات الأدوية للأطفال والبالغين.',
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
import { calculateMedicationDosage } from '../../../lib/tools/medicationDosage'

export default function MedicationDosageToolPage() {
	const { locale } = useLang()
	const [age, setAge] = useState<string>('')
	const [weight, setWeight] = useState<string>('')
	const [frequency, setFrequency] = useState<string>('2')
	const [dosingType, setDosingType] = useState<'weight' | 'adult'>('weight')
	const [mgPerKgPerDay, setMgPerKgPerDay] = useState<string>('')
	const [adultTotalMgPerDay, setAdultTotalMgPerDay] = useState<string>('')
	const [result, setResult] = useState<{ totalDailyMg: number; perDoseMg: number } | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const a = parseInt(age)
		const w = parseFloat(weight)
		const f = parseInt(frequency)
		const mgPerKg = parseFloat(mgPerKgPerDay)
		const adultMg = parseFloat(adultTotalMgPerDay)
		
		if (!(a >= 0 && a <= 120) || !(w > 0 && w <= 250) || !(f > 0 && f <= 12)) {
			setError('tools.medicationDosage.errors.invalidInputs')
			return
		}
		
		if (dosingType === 'weight' && (!mgPerKg || mgPerKg <= 0)) {
			setError('tools.medicationDosage.errors.invalidInputs')
			return
		}
		
		if (dosingType === 'adult' && (!adultMg || adultMg <= 0)) {
			setError('tools.medicationDosage.errors.invalidInputs')
			return
		}
		
		try {
			const input: any = {
				patientAgeYears: a,
				patientWeightKg: w,
				frequencyPerDay: f
			}
			
			if (dosingType === 'weight') {
				input.mgPerKgPerDay = mgPerKg
			} else {
				input.adultTotalMgPerDay = adultMg
			}
			
			const r = calculateMedicationDosage(input)
			setResult(r)
		} catch (err) {
			setError('tools.medicationDosage.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.medicationDosage.info.whatItDoes" />,
		howToUse: <T k="tools.medicationDosage.info.howToUse" />,
		inputGuide: <T k="tools.medicationDosage.info.inputGuide" />,
		resultExplanation: <T k="tools.medicationDosage.info.resultExplanation" />,
		medicalDisclaimer: <T k="tools.medicationDosage.warning.text" />,
	}

	return (
		<ToolLayout 
			title={<T k="tools.medicationDosage.title" />} 
			description={<T k="tools.medicationDosage.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.medicationDosage.inputs.age" /> as any} 
						value={age} 
						onChange={(e) => setAge(e.target.value)} 
						min={0} 
						max={120} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.medicationDosage.inputs.weight" /> as any} 
						value={weight} 
						onChange={(e) => setWeight(e.target.value)} 
						min={1} 
						max={250} 
						step="0.1" 
						required 
					/>
					<NumberInput 
						label={<T k="tools.medicationDosage.inputs.frequency" /> as any} 
						value={frequency} 
						onChange={(e) => setFrequency(e.target.value)} 
						min={1} 
						max={12} 
						required 
					/>
					<Select 
						label={<T k="tools.medicationDosage.inputs.dosingType" /> as any} 
						value={dosingType} 
						onChange={(e) => setDosingType(e.target.value as 'weight' | 'adult')}
					>
						<option value="weight"><T k="tools.medicationDosage.inputs.dosingType.weightBased" /></option>
						<option value="adult"><T k="tools.medicationDosage.inputs.dosingType.adultStandard" /></option>
					</Select>
					{dosingType === 'weight' ? (
						<NumberInput 
							label={<T k="tools.medicationDosage.inputs.mgPerKgPerDay" /> as any} 
							value={mgPerKgPerDay} 
							onChange={(e) => setMgPerKgPerDay(e.target.value)} 
							min={0.1} 
							max={100} 
							step="0.1" 
							required 
						/>
					) : (
						<NumberInput 
							label={<T k="tools.medicationDosage.inputs.totalMgPerDay" /> as any} 
							value={adultTotalMgPerDay} 
							onChange={(e) => setAdultTotalMgPerDay(e.target.value)} 
							min={1} 
							max={5000} 
							required 
						/>
					)}
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
							<div className="text-gray-800"><T k="tools.medicationDosage.results.dosageLabel" />: <span className="font-semibold">{result.totalDailyMg} <T k="tools.medicationDosage.results.mgPerDay" /></span></div>
							<div className="text-gray-800"><T k="tools.medicationDosage.results.frequencyLabel" />: <span className="font-semibold">{result.perDoseMg} <T k="tools.medicationDosage.results.mg" /></span></div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2"><T k="tools.info.resultExplanation" /></div>
								<div className="text-sm text-blue-800">
									<T k="tools.medicationDosage.explain.result" />
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2"><T k="tools.medicationDosage.results.importantNotes" /></div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									<li><T k="tools.medicationDosage.results.note1" /></li>
									<li><T k="tools.medicationDosage.results.note2" /></li>
									<li><T k="tools.medicationDosage.results.note3" /></li>
									<li><T k="tools.medicationDosage.results.note4" /></li>
									<li><T k="tools.medicationDosage.results.note5" /></li>
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.medicationDosage.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}
