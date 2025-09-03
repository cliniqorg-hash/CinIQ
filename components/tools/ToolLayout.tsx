'use client'

import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useLang } from '../LangProvider'
import { T } from './FormControls'
import { messages } from '../../lib/i18n'

type ToolLayoutProps = {
	title: React.ReactNode
	description?: React.ReactNode
	children: React.ReactNode
	disclaimer?: React.ReactNode
	// New enhanced properties
	toolInfo?: {
		whatItDoes: React.ReactNode
		howToUse: React.ReactNode
		inputGuide: React.ReactNode
		resultExplanation: React.ReactNode
		medicalDisclaimer?: React.ReactNode
	}
}

export default function ToolLayout({ title, description, children, disclaimer, toolInfo }: ToolLayoutProps) {
	const { locale } = useLang()
	const tabTool = messages[locale]['tools.tabs.tool']
	const tabInfo = messages[locale]['tools.tabs.info']
	const tabHelp = messages[locale]['tools.tabs.help']
	const [activeTab, setActiveTab] = useState<'tool' | 'info' | 'help'>('tool')

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
			<Navbar />
			<section className="text-right py-16" dir="rtl">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Enhanced Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
						{description ? (
							<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
						) : null}
					</div>

					{/* Enhanced Tab Navigation */}
					{toolInfo && (
						<div className="mb-8">
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
								<nav className="flex space-x-1">
									<button
										onClick={() => setActiveTab('tool')}
										className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
											activeTab === 'tool'
												? 'bg-primary-600 text-white shadow-md'
												: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
										}`}
										aria-label={tabTool}
										title={tabTool}
									>
										<T k="tools.tabs.tool" />
									</button>
									<button
										onClick={() => setActiveTab('info')}
										className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
											activeTab === 'info'
												? 'bg-primary-600 text-white shadow-md'
												: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
										}`}
										aria-label={tabInfo}
										title={tabInfo}
									>
										<T k="tools.tabs.info" />
									</button>
									<button
										onClick={() => setActiveTab('help')}
										className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
											activeTab === 'help'
												? 'bg-primary-600 text-white shadow-md'
												: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
										}`}
										aria-label={tabHelp}
										title={tabHelp}
									>
										<T k="tools.tabs.help" />
									</button>
								</nav>
							</div>
						</div>
					)}

					{/* Tab Content */}
					{activeTab === 'tool' && children}
					
					{activeTab === 'info' && toolInfo && (
						<div className="space-y-6">
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
									<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
										<span className="text-primary-600 text-sm">ℹ️</span>
									</div>
									<T k="tools.info.whatItDoes" />
								</h3>
								<p className="text-gray-700 leading-relaxed">{toolInfo.whatItDoes}</p>
							</div>
							
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
									<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
										<span className="text-primary-600 text-sm">📋</span>
									</div>
									<T k="tools.info.howToUse" />
								</h3>
								<p className="text-gray-700 leading-relaxed">{toolInfo.howToUse}</p>
							</div>
							
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
									<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
										<span className="text-primary-600 text-sm">📝</span>
									</div>
									<T k="tools.info.inputGuide" />
								</h3>
								<p className="text-gray-700 leading-relaxed">{toolInfo.inputGuide}</p>
							</div>
							
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
									<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
										<span className="text-primary-600 text-sm">📊</span>
									</div>
									<T k="tools.info.resultExplanation" />
								</h3>
								<p className="text-gray-700 leading-relaxed">{toolInfo.resultExplanation}</p>
							</div>
						</div>
					)}
					
					{activeTab === 'help' && toolInfo && (
						<div className="space-y-6">
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
								<h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
									<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
										<span className="text-primary-600 text-sm">❓</span>
									</div>
									<T k="tools.help.title" />
								</h3>
								<div className="space-y-6">
									<div className="border-l-4 border-primary-200 pl-4">
										<h4 className="font-medium text-gray-900 mb-2 flex items-center">
											<span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
											<T k="tools.help.whenToUse" />
										</h4>
										<p className="text-gray-700 text-sm leading-relaxed">
											<T k="tools.help.whenToUseDesc" />
										</p>
									</div>
									<div className="border-l-4 border-yellow-200 pl-4">
										<h4 className="font-medium text-gray-900 mb-2 flex items-center">
											<span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
											<T k="tools.help.limitations" />
										</h4>
										<p className="text-gray-700 text-sm leading-relaxed">
											<T k="tools.help.limitationsDesc" />
										</p>
									</div>
									<div className="border-l-4 border-red-200 pl-4">
										<h4 className="font-medium text-gray-900 mb-2 flex items-center">
											<span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
											<T k="tools.help.consultDoctor" />
										</h4>
										<p className="text-gray-700 text-sm leading-relaxed">
											<T k="tools.help.consultDoctorDesc" />
										</p>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<span className="text-yellow-600 text-lg">⚠️</span>
							</div>
							<div className="mr-3">
								<p className="text-sm text-yellow-800 font-medium">
									{disclaimer ?? <T k="tools.info.medicalDisclaimer" />}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}


