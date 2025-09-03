import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة مؤشر كتلة الجسم (BMI) - CLinIQ',
  description: 'احسب مؤشر كتلة الجسم (BMI) بسهولة ودقة. أداة طبية مجانية لتقييم الوزن المثالي والمخاطر الصحية المرتبطة بالوزن.',
  keywords: 'مؤشر كتلة الجسم, BMI, حاسبة الوزن, الوزن المثالي, تقييم الوزن, صحة',
  openGraph: {
    title: 'حاسبة مؤشر كتلة الجسم (BMI) - CLinIQ',
    description: 'احسب مؤشر كتلة الجسم (BMI) بسهولة ودقة. أداة طبية مجانية لتقييم الوزن المثالي والمخاطر الصحية.',
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
import { calculateBmi } from '../../../lib/tools/bmi'

export default function BmiToolPage() {
	const { locale } = useLang()
	const [weight, setWeight] = useState<string>('')
	const [height, setHeight] = useState<string>('')
	const [heightUnit, setHeightUnit] = useState<'cm' | 'm'>('cm')
	const [result, setResult] = useState<null | ReturnType<typeof calculateBmi>>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const w = parseFloat(weight)
		let hRaw = parseFloat(height)
		if (heightUnit === 'm') {
			hRaw = hRaw * 100
		}
		if (!(w > 0) || !(hRaw > 0) || w > 300 || hRaw > 250) {
			setError('tools.bmi.errors.invalidInputs')
			return
		}
		try {
			const r = calculateBmi({ weightKg: w, heightCm: hRaw })
			setResult(r)
		} catch {
			setError('tools.bmi.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.bmi.info.whatItDoes" />,
		howToUse: <T k="tools.bmi.info.howToUse" />,
		inputGuide: <T k="tools.bmi.info.inputGuide" />,
		resultExplanation: <T k="tools.bmi.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.bmi.title" />} 
			description={<T k="tools.bmi.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6 hover:shadow-xl transition-shadow duration-200">
					<div className="text-gray-900 font-semibold text-lg flex items-center">
						<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
							<span className="text-primary-600 text-sm">📝</span>
						</div>
						<T k="tools.inputs" />
					</div>
					<NumberInput 
						label={<T k="tools.inputs.weight" />} 
						value={weight} 
						onChange={(e) => setWeight(e.target.value)} 
						step={0.1} 
						min={1} 
						max={300} 
						required 
					/>
					<div className="grid grid-cols-3 gap-2 items-end">
						<NumberInput 
							label={<T k="tools.inputs.height" />} 
							className="col-span-2" 
							value={height} 
							onChange={(e) => setHeight(e.target.value)} 
							step={0.01} 
							min={0.5} 
							max={250} 
							required 
						/>
						<Select 
							label={<T k="tools.inputs.unit" />} 
							value={heightUnit} 
							onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'm')}
						>
							<option value="cm">cm</option>
							<option value="m">m</option>
						</Select>
					</div>
					<button type="submit" className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg" title={messages[locale]['tools.actions.calculate']}>
						<T k="tools.actions.calculate" />
					</button>
					{error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700"><T k={error} /></div>}
				</form>
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4 hover:shadow-xl transition-shadow duration-200">
					<div className="text-gray-900 font-semibold text-lg flex items-center">
						<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
							<span className="text-primary-600 text-sm">📊</span>
						</div>
						<T k="tools.results.title" />
					</div>
					{result ? (
						<div className="space-y-4">
							{/* BMI Value */}
							<div className="bg-primary-50 rounded-lg p-4 text-center">
								<div className="text-gray-700 text-sm mb-2"><T k="tools.bmi.results.bmiLabel" /></div>
								<div className="text-3xl font-bold text-primary-600">{result.bmi}</div>
							</div>
							
							{/* Category */}
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="text-gray-700 text-sm mb-2"><T k="tools.bmi.results.categoryLabel" /></div>
								<div className="text-lg font-semibold text-gray-900">{(() => {
									const c = result.category
									if (c === 'Underweight') return <T k="tools.bmi.category.underweight" />
									if (c === 'Normal') return <T k="tools.bmi.category.normal" />
									if (c === 'Overweight') return <T k="tools.bmi.category.overweight" />
									return <T k="tools.bmi.category.obese" />
								})()}</div>
							</div>
							
							{/* Explanation */}
							<div className="bg-blue-50 rounded-lg p-4">
								<div className="text-gray-700 text-sm leading-relaxed">{(() => {
									const c = result.category
									if (c === 'Underweight') return <T k="tools.bmi.explain.underweight" />
									if (c === 'Normal') return <T k="tools.bmi.explain.normal" />
									if (c === 'Overweight') return <T k="tools.bmi.explain.overweight" />
									return <T k="tools.bmi.explain.obese" />
								})()}</div>
							</div>
							
							{/* Recommendations */}
							<div className="bg-green-50 rounded-lg p-4">
								<div className="text-gray-700 font-medium text-sm mb-3"><T k="tools.generic.recommendations" />:</div>
								<ul className="space-y-2 text-sm text-gray-700">
									{(() => {
										const c = result.category
										const keys = c === 'Underweight' ? [1,2,3] : c === 'Normal' ? [1,2] : c === 'Overweight' ? [1,2,3] : [1,2,3]
										const prefix = c === 'Underweight' ? 'underweight' : c === 'Normal' ? 'normal' : c === 'Overweight' ? 'overweight' : 'obese'
										return keys.map((i) => (
											<li key={i} className="flex items-start">
												<span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
												<T k={`tools.bmi.recommendations.${prefix}.${i}`} />
											</li>
										))
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="bg-gray-50 rounded-lg p-6 text-center">
							<div className="text-gray-500 text-sm"><T k="tools.bmi.results.placeholder" /></div>
						</div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


