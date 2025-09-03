import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة إجمالي استهلاك الطاقة اليومي (TDEE) - CLinIQ',
  description: 'احسب إجمالي استهلاك الطاقة اليومي (TDEE) لتحديد السعرات الحرارية المطلوبة للحفاظ على الوزن.',
  keywords: 'TDEE, إجمالي استهلاك الطاقة, السعرات الحرارية اليومية, حاسبة السعرات',
  openGraph: {
    title: 'حاسبة إجمالي استهلاك الطاقة اليومي (TDEE) - CLinIQ',
    description: 'احسب إجمالي استهلاك الطاقة اليومي (TDEE) لتحديد السعرات الحرارية المطلوبة للحفاظ على الوزن.',
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
import { calculateTdee } from '../../../lib/tools/tdee'
import type { ActivityLevel } from '../../../lib/tools/bmr'

export default function TdeeToolPage() {
	const { locale } = useLang()
	const [bmr, setBmr] = useState('')
	const [activity, setActivity] = useState<ActivityLevel>('sedentary')
	const [result, setResult] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setResult(null)
		const b = parseFloat(bmr)
		if (!(b > 0)) {
			setError('tools.tdee.errors.invalidInputs')
			return
		}
		try {
			setResult(calculateTdee(b, activity))
		} catch {
			setError('tools.tdee.errors.computeFailed')
		}
	}

	const toolInfo = {
		whatItDoes: <T k="tools.tdee.info.whatItDoes" />,
		howToUse: <T k="tools.tdee.info.howToUse" />,
		inputGuide: <T k="tools.tdee.info.inputGuide" />,
		resultExplanation: <T k="tools.tdee.info.resultExplanation" />,
		medicalDisclaimer: undefined,
	}

	return (
		<ToolLayout 
			title={<T k="tools.tdee.title" />} 
			description={<T k="tools.tdee.description" />}
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
						label={<T k="tools.tdee.inputs.bmr" />}
						value={bmr} 
						onChange={(e) => setBmr(e.target.value)} 
						min={500} 
						max={4000} 
						required 
					/>
					<Select 
						label={<T k="tools.tdee.inputs.activityLevel" />}
						value={activity} 
						onChange={(e) => setActivity(e.target.value as ActivityLevel)}
					>
						<option value="sedentary"><T k="tools.tdee.inputs.activityLevel.sedentary" /></option>
						<option value="light"><T k="tools.tdee.inputs.activityLevel.light" /></option>
						<option value="moderate"><T k="tools.tdee.inputs.activityLevel.moderate" /></option>
						<option value="active"><T k="tools.tdee.inputs.activityLevel.active" /></option>
						<option value="very_active"><T k="tools.tdee.inputs.activityLevel.veryActive" /></option>
					</Select>
					<button type="submit" className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg" title={messages[locale]['tools.actions.calculate']}>
						<T k="tools.actions.calculate" />
					</button>
					{error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700"><T k={error} /></div>}
				</form>
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
					<div className="text-gray-900 font-semibold text-lg mb-4 flex items-center">
						<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
							<span className="text-primary-600 text-sm">📊</span>
						</div>
						<T k="tools.results.title" />
					</div>
					{result ? (
						<div className="bg-primary-50 rounded-lg p-4 text-center">
							<div className="text-gray-700 text-sm mb-2"><T k="tools.tdee.results.tdeeLabel" /></div>
							<div className="text-3xl font-bold text-primary-600">{result}</div>
							<div className="text-gray-600 text-sm"><T k="tools.units.kcalPerDay" /></div>
						</div>
					) : (
						<div className="bg-gray-50 rounded-lg p-6 text-center">
							<div className="text-gray-500 text-sm"><T k="tools.tdee.results.placeholder" /></div>
						</div>
					)}
				</div>
			</div>
		</ToolLayout>
	)
}


