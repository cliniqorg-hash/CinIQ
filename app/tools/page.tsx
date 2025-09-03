import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الأدوات الطبية - CLinIQ',
  description: 'مجموعة شاملة من الأدوات الطبية والحسابات الصحية. احسب مؤشر كتلة الجسم، ضغط الدم، مخاطر الأمراض والمزيد.',
  keywords: 'أدوات طبية, حاسبات صحية, مؤشر كتلة الجسم, ضغط الدم, مخاطر الأمراض, حاسبة طبية',
  openGraph: {
    title: 'الأدوات الطبية - CLinIQ',
    description: 'مجموعة شاملة من الأدوات الطبية والحسابات الصحية. احسب مؤشر كتلة الجسم، ضغط الدم، مخاطر الأمراض والمزيد.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import Link from 'next/link'
import ToolLayout from '../../components/tools/ToolLayout'
import { T } from '../../components/tools/FormControls'

const tools = [
	{ href: '/tools/bmi', key: 'bmi' },
	{ href: '/tools/bmr', key: 'bmr' },
	{ href: '/tools/tdee', key: 'tdee' },
	{ href: '/tools/body-fat', key: 'bodyFat' },
	{ href: '/tools/water-intake', key: 'waterIntake' },
	{ href: '/tools/sleep-cycle', key: 'sleepCycle' },
	{ href: '/tools/blood-pressure', key: 'bloodPressure' },
	{ href: '/tools/heart-rate-zones', key: 'heartRateZones' },
	{ href: '/tools/diabetes-risk', key: 'diabetesRisk' },
	{ href: '/tools/cholesterol-ratio', key: 'cholesterolRatio' },
	{ href: '/tools/egfr', key: 'egfr' },
	{ href: '/tools/smoking-risk', key: 'smokingRisk' },
	{ href: '/tools/pregnancy-due-date', key: 'pregnancyDueDate' },
	{ href: '/tools/ovulation', key: 'ovulation' },
	{ href: '/tools/pregnancy-weight-gain', key: 'pregnancyWeightGain' },
	{ href: '/tools/stroke-risk', key: 'strokeRisk' },
	{ href: '/tools/copd-risk', key: 'copdCat' },
	{ href: '/tools/cancer-screening', key: 'cancerScreening' },
	{ href: '/tools/thyroid-risk', key: 'thyroidRisk' },
	{ href: '/tools/diabetic-retinopathy', key: 'diabeticRetinopathy' },
	{ href: '/tools/medication-dosage', key: 'medicationDosage' },
	{ href: '/tools/drug-interaction', key: 'drugInteraction' },
	{ href: '/tools/lifestyle-coach', key: 'lifestyleCoach' },
]

export default function ToolsIndexPage() {
	return (
		<ToolLayout title={<T k="tools.index.title" />} description={<T k="tools.index.description" />}>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{tools.map((tool) => (
					<Link key={tool.href} href={tool.href} className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:border-primary-300 transition-all duration-200 transform hover:-translate-y-1">
						<div className="flex items-start space-x-4 space-x-reverse">
							<div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
								<span className="text-primary-600 text-lg">🔧</span>
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-gray-900 font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors duration-200">
									<T k={`tools.${tool.key}.title`} />
								</div>
								<div className="text-gray-600 text-sm leading-relaxed">
									<T k={`tools.${tool.key}.description`} />
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</ToolLayout>
	)
}


