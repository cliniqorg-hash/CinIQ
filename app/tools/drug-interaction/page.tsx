import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حاسبة تفاعلات الأدوية - CLinIQ',
  description: 'احسب تفاعلات الأدوية المحتملة. أداة طبية مجانية لضمان سلامة استخدام الأدوية.',
  keywords: 'تفاعلات الأدوية, سلامة الأدوية, صيدلة, الأدوية',
  openGraph: {
    title: 'حاسبة تفاعلات الأدوية - CLinIQ',
    description: 'احسب تفاعلات الأدوية المحتملة. أداة طبية مجانية لضمان سلامة استخدام الأدوية.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState, useEffect, useRef } from 'react'
import ToolLayout from '../../../components/tools/ToolLayout'
import { T } from '../../../components/tools/FormControls'
import { analyzeDrugInteractions, validateDrugList, type DrugInteractionResult } from '../../../lib/tools/drugInteraction'
import { Plus, Trash2, AlertTriangle, Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { markdownToSafeHtml } from '../../../lib/utils'

export default function DrugInteractionPage() {
  const [drugs, setDrugs] = useState<string[]>(['', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DrugInteractionResult | null>(null)
  const [error, setError] = useState<string>('')

  // Autocomplete state
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<Record<number, Array<{ name: string; generic?: string; brand?: string; route?: string }>>>({})
  const [isSuggestLoading, setIsSuggestLoading] = useState<Record<number, boolean>>({})
  const debounceTimers = useRef<Record<number, any>>({})

  const addDrug = () => {
    if (drugs.length < 10) {
      setDrugs([...drugs, ''])
    }
  }

  const removeDrug = (index: number) => {
    if (drugs.length > 2) {
      setDrugs(drugs.filter((_, i) => i !== index))
    }
  }

  const updateDrug = (index: number, value: string) => {
    const newDrugs = [...drugs]
    newDrugs[index] = value
    setDrugs(newDrugs)
  }

  const fetchSuggestions = async (index: number, q: string) => {
    if (!q || q.trim().length < 2) {
      setSuggestions(prev => ({ ...prev, [index]: [] }))
      return
    }
    setIsSuggestLoading(prev => ({ ...prev, [index]: true }))
    try {
      const res = await fetch(`/api/drug-suggest?q=${encodeURIComponent(q.trim())}`)
      const data = await res.json()
      setSuggestions(prev => ({ ...prev, [index]: data.suggestions || [] }))
    } catch {
      setSuggestions(prev => ({ ...prev, [index]: [] }))
    } finally {
      setIsSuggestLoading(prev => ({ ...prev, [index]: false }))
    }
  }

  const onChangeWithSuggest = (index: number, value: string) => {
    updateDrug(index, value)
    clearTimeout(debounceTimers.current[index])
    debounceTimers.current[index] = setTimeout(() => fetchSuggestions(index, value), 300)
  }

  const chooseSuggestion = (index: number, s: { name: string; generic?: string; brand?: string }) => {
    const display = s.generic || s.name
    updateDrug(index, display)
    setSuggestions(prev => ({ ...prev, [index]: [] }))
    setFocusedIndex(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
    setError('')
		setResult(null)

    const validation = validateDrugList(drugs.filter(d => d.trim()))
    if (!validation.isValid) {
      setError(validation.error || 'خطأ في البيانات المدخلة')
			return
		}

    setIsLoading(true)
		try {
      const analysisResult = await analyzeDrugInteractions(drugs.filter(d => d.trim()))
      setResult(analysisResult)
		} catch (err) {
      setError('حدث خطأ أثناء تحليل التفاعلات الدوائية')
      console.error('Drug interaction analysis error:', err)
		} finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'text-green-600 bg-green-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'major': return 'text-orange-600 bg-orange-100'
      case 'contraindicated': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'minor': return <CheckCircle className="w-4 h-4" />
      case 'moderate': return <AlertCircle className="w-4 h-4" />
      case 'major': return <AlertTriangle className="w-4 h-4" />
      case 'contraindicated': return <XCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
	}

	return (
		<ToolLayout 
			title={<T k="tools.drugInteraction.title" />} 
			description={<T k="tools.drugInteraction.description" />}
      toolInfo={{
        whatItDoes: <T k="tools.drugInteraction.info.whatItDoes" />,
        howToUse: <T k="tools.drugInteraction.info.howToUse" />,
        inputGuide: <T k="tools.drugInteraction.info.inputGuide" />,
        resultExplanation: <T k="tools.drugInteraction.info.resultExplanation" />,
        medicalDisclaimer: <T k="tools.drugInteraction.info.medicalDisclaimer" />
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              <T k="tools.drugInteraction.input.title" />
            </h3>
            
            <div className="space-y-4">
              {drugs.map((drug, index) => (
                <div key={index} className="relative flex items-center gap-3">
                  <div className="flex-1">
					<input
						type="text"
                      value={drug}
                      onChange={(e) => onChangeWithSuggest(index, e.target.value)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setTimeout(() => setFocusedIndex(cur => (cur === index ? null : cur)), 150)}
                      placeholder={`${index + 1}. ${index === 0 ? 'الدواء الأول' : index === 1 ? 'الدواء الثاني' : `الدواء ${index + 1}`}`}
                      className="input-field"
                      dir="rtl"
                      aria-autocomplete="list"
                    />

                    {focusedIndex === index && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {isSuggestLoading[index] ? (
                          <div className="px-3 py-2 text-sm text-gray-500"><T k="tools.drugInteraction.suggest.loading" /></div>
                        ) : (suggestions[index]?.length ? (
                          suggestions[index]!.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              className="w-full text-right px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                              onMouseDown={(e) => { e.preventDefault(); chooseSuggestion(index, s) }}
                            >
                              <span className="text-gray-900">{s.generic || s.name}</span>
                              {s.brand && <span className="text-xs text-gray-500 ml-2">{s.brand}</span>}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500"><T k="tools.drugInteraction.suggest.empty" /></div>
                        ))}
                      </div>
                    )}
                  </div>
                  {drugs.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeDrug(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف الدواء"
                      aria-label="حذف الدواء"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {drugs.length < 10 && (
              <button
                type="button"
                onClick={addDrug}
                className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                title="إضافة دواء آخر"
                aria-label="إضافة دواء آخر"
              >
                <Plus className="w-4 h-4" />
                <T k="tools.drugInteraction.input.addDrug" />
              </button>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || drugs.filter(d => d.trim()).length < 2}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <T k="tools.drugInteraction.input.analyzing" />
                  </div>
                ) : (
                  <T k="tools.drugInteraction.input.analyze" />
                )}
					</button>
            </div>
          </div>
				</form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <T k="tools.drugInteraction.results.summary" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{result.summary.totalInteractions}</div>
                  <div className="text-sm text-gray-600"><T k="tools.drugInteraction.results.totalInteractions" /></div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getRiskLevelColor(result.summary.riskLevel)}`}>
                    <T k={`tools.drugInteraction.results.riskLevel.${result.summary.riskLevel}`} />
                  </div>
                  <div className="text-sm text-gray-600 mt-2"><T k="tools.drugInteraction.results.riskLevel" /></div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{result.drugs.length}</div>
                  <div className="text-sm text-gray-600"><T k="tools.drugInteraction.results.drugsAnalyzed" /></div>
                </div>
              </div>

              {/* Severity Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(result.summary.severityCounts).map(([severity, count]) => (
                  <div key={severity} className={`p-3 rounded-lg text-center ${getSeverityColor(severity)}`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {getSeverityIcon(severity)}
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="text-xs">
                      <T k={`tools.drugInteraction.results.severity.${severity}`} />
                    </div>
                  </div>
                ))}
					</div>
											</div>

            {/* Drug Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <T k="tools.drugInteraction.results.drugInfo" />
              </h3>
              
              <div className="space-y-4">
                {result.drugs.map((drug, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{drug.name}</h4>
                    {drug.genericName && drug.genericName !== drug.name && (
                      <p className="text-sm text-gray-600 mb-1">
                        <T k="tools.drugInteraction.results.genericName" />: {drug.genericName}
                      </p>
                    )}
                    {drug.brandNames && drug.brandNames.length > 0 && (
                      <p className="text-sm text-gray-600 mb-1">
                        <T k="tools.drugInteraction.results.brandNames" />: {drug.brandNames.join(', ')}
                      </p>
                    )}
                    {drug.drugClass && (
                      <p className="text-sm text-gray-600 mb-1">
                        <T k="tools.drugInteraction.results.drugClass" />: {drug.drugClass}
                      </p>
                    )}
                    {drug.description && (
                      <p className="text-sm text-gray-700 mt-2">{drug.description}</p>
											)}
										</div>
									))}
								</div>
            </div>

            {/* Interactions */}
            {result.interactions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <T k="tools.drugInteraction.results.interactions" />
                </h3>
                
                <div className="space-y-4">
                  {result.interactions.map((interaction, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {interaction.drug1} + {interaction.drug2}
                          </h4>
                          <p className="text-gray-700 mt-1">{interaction.description}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(interaction.severity)}`}>
                          {getSeverityIcon(interaction.severity)}
                          <T k={`tools.drugInteraction.results.severity.${interaction.severity}`} />
                        </div>
                      </div>
                      
                      {interaction.clinicalEffects && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-900">
                            <T k="tools.drugInteraction.results.clinicalEffects" />:
                          </span>
                          <span className="text-gray-700 mr-2">{interaction.clinicalEffects}</span>
                        </div>
                      )}
                      
                      {interaction.management && (
                        <div>
                          <span className="font-medium text-gray-900">
                            <T k="tools.drugInteraction.results.management" />:
                          </span>
                          <span className="text-gray-700 mr-2">{interaction.management}</span>
                        </div>
                      )}
                    </div>
                  ))}
								</div>
							</div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <T k="tools.generic.recommendations" />
              </h3>
              
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
								</ul>
							</div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🤖</span>
                </div>
                <T k="tools.drugInteraction.results.aiAnalysis" />
              </h3>
              
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                {(() => {
                  const html = markdownToSafeHtml(result.aiAnalysis)
                  return <div dangerouslySetInnerHTML={{ __html: html }} />
                })()}
              </div>
            </div>
						</div>
					)}
			</div>
		</ToolLayout>
	)
}