import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة نسبة الدهون في الجسم - CLinIQ',
  description: 'احسب نسبة الدهون في الجسم باستخدام مقاييس مختلفة. أداة طبية مجانية لتقييم تكوين الجسم.',
  keywords: 'نسبة الدهون, تكوين الجسم, حاسبة الدهون, اللياقة البدنية',
  openGraph: {
    title: 'حاسبة نسبة الدهون في الجسم - CLinIQ',
    description: 'احسب نسبة الدهون في الجسم باستخدام مقاييس مختلفة. أداة طبية مجانية لتقييم تكوين الجسم.',
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
import { calculateBodyFat } from '../../../lib/tools/bodyFat'

export default function BodyFatToolPage() {
	const { locale } = useLang()
	const [gender, setGender] = useState<'male' | 'female'>('male')
	const [height, setHeight] = useState<string>('')
	const [neck, setNeck] = useState<string>('')
	const [waist, setWaist] = useState<string>('')
	const [hip, setHip] = useState<string>('')
	const [result, setResult] = useState<null | ReturnType<typeof calculateBodyFat>>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const h = parseFloat(height)
		const n = parseFloat(neck)
		const w = parseFloat(waist)
		const hp = hip ? parseFloat(hip) : undefined
		
		if (!(h > 0 && n > 0 && w > 0) || (gender === 'female' && !(hp && hp > 0))) {
			setError('tools.bodyFat.errors.invalidInputs')
			return
		}
		
		try {
			const r = calculateBodyFat({ gender, heightCm: h, neckCm: n, waistCm: w, hipCm: hp })
			setResult(r)
		} catch (err) {
			setError('tools.bodyFat.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.bodyFat.info.whatItDoes" />,
		howToUse: <T k="tools.bodyFat.info.howToUse" />,
		inputGuide: <T k="tools.bodyFat.info.inputGuide" />,
		resultExplanation: <T k="tools.bodyFat.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.bodyFat.title" />} 
			description={<T k="tools.bodyFat.description" />}
			toolInfo={toolInfo}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<form onSubmit={onSubmit} className="card space-y-4">
					<div className="text-gray-900 font-semibold">
						<T k="tools.inputs" />
					</div>
					<Select 
						label={<T k="tools.bodyFat.inputs.gender" />} 
						value={gender} 
						onChange={(e) => setGender(e.target.value as 'male' | 'female')}
					>
						<option value="male"><T k="tools.gender.male" /></option>
						<option value="female"><T k="tools.gender.female" /></option>
					</Select>
					<NumberInput 
						label={<T k="tools.bodyFat.inputs.height" />} 
						value={height} 
						onChange={(e) => setHeight(e.target.value)} 
						step={0.1} 
						min={100} 
						max={250} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.bodyFat.inputs.neck" />} 
						value={neck} 
						onChange={(e) => setNeck(e.target.value)} 
						step={0.1} 
						min={20} 
						max={60} 
						required 
					/>
					<NumberInput 
						label={<T k="tools.bodyFat.inputs.waist" />} 
						value={waist} 
						onChange={(e) => setWaist(e.target.value)} 
						step={0.1} 
						min={40} 
						max={200} 
						required 
					/>
					{gender === 'female' && (
						<NumberInput 
							label={<T k="tools.bodyFat.inputs.hip" />} 
							value={hip} 
							onChange={(e) => setHip(e.target.value)} 
							step={0.1} 
							min={50} 
							max={200} 
							required 
						/>
					)}
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
							<div className="text-gray-800">
								<T k="tools.bodyFat.results.bodyFatLabel" />: <span className="font-semibold">{result.percent}%</span>
							</div>
							<div className="text-gray-800">
								<T k="tools.bodyFat.results.categoryLabel" />: <span className="font-semibold">{
									(() => {
										const c = result.category
										if (c === 'Essential') return <T k="tools.bodyFat.category.essential" />
										if (c === 'Fitness') return <T k="tools.bodyFat.category.fitness" />
										if (c === 'Average') return <T k="tools.bodyFat.category.average" />
										return <T k="tools.bodyFat.category.obese" />
									})()
								}</span>
							</div>
							<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="text-sm font-medium text-blue-900 mb-2">
									<T k="tools.info.resultExplanation" />:
								</div>
								<div className="text-sm text-blue-800">
									{(() => {
										const c = result.category
										if (c === 'Essential') return <T k="tools.bodyFat.explain.essential" />
										if (c === 'Fitness') return <T k="tools.bodyFat.explain.fitness" />
										if (c === 'Average') return <T k="tools.bodyFat.explain.average" />
										return <T k="tools.bodyFat.explain.obese" />
									})()}
								</div>
							</div>
							<div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
								<div className="text-sm font-medium text-gray-900 mb-2">
									<T k="tools.info.howToUse" />:
								</div>
								<ul className="list-disc pl-5 text-sm text-gray-700">
									{(() => {
										const c = result.category
										const keys = c === 'Essential' ? [1,2] 
											: c === 'Fitness' ? [1,2] 
											: c === 'Average' ? [1,2,3] 
											: [1,2,3]
										const prefix = c === 'Essential' ? 'essential' 
											: c === 'Fitness' ? 'fitness' 
											: c === 'Average' ? 'average' 
											: 'obese'
										return keys.map((i) => (
											<li key={i}><T k={`tools.bodyFat.recommendations.${prefix}.${i}`} /></li>
										))
									})()}
								</ul>
							</div>
						</div>
					) : (
						<div className="text-gray-600 text-sm"><T k="tools.bodyFat.results.placeholder" /></div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


