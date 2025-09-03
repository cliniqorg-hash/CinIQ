export interface DrugInfo {
  name: string
  genericName?: string
  brandNames?: string[]
  drugClass?: string
  description?: string
  warnings?: string[]
  interactions?: DrugInteraction[]
  adverseReactions?: string[]
  contraindications?: string[]
  dosage?: string
  route?: string
}

export interface DrugInteraction {
  drug1: string
  drug2: string
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated'
	description: string
  clinicalEffects?: string
  management?: string
  evidence?: string
}

export interface DrugInteractionResult {
  drugs: DrugInfo[]
  interactions: DrugInteraction[]
  summary: {
    totalInteractions: number
    severityCounts: {
      minor: number
      moderate: number
      major: number
      contraindicated: number
    }
    riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  }
  recommendations: string[]
  aiAnalysis: string
}

const OPENFDA_API_KEY = '486JkdmbODcBAWNvepJiMhZfFAtm8mQJJ6bFqQBz'
const OPENFDA_BASE_URL = 'https://api.fda.gov/drug'

// OpenFDA API functions using our API route
async function searchDrugs(drugNames: string[]): Promise<any[]> {
  try {
    const response = await fetch('/api/drug-interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drugs: drugNames })
    })
    
    if (!response.ok) throw new Error('Drug API error')
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching drug data:', error)
    return []
  }
}

// Parse OpenFDA data to our format
function parseOpenFDAData(fdaData: any): DrugInfo | null {
  if (!fdaData) {
    return null
  }

  const openfda = fdaData.openfda || {}

  return {
    name: openfda.generic_name?.[0] || fdaData.generic_name || 'Unknown',
    genericName: openfda.generic_name?.[0],
    brandNames: openfda.brand_name || [],
    drugClass: openfda.pharm_class_epc?.[0] || openfda.pharm_class_cs?.[0],
    description: fdaData.description?.[0],
    warnings: fdaData.warnings || [],
    adverseReactions: fdaData.adverse_reactions || [],
    contraindications: fdaData.contraindications || [],
    dosage: fdaData.dosage_and_administration?.[0],
    route: openfda.route?.[0]
  }
}

// AI Analysis function
async function getAIAnalysis(drugs: DrugInfo[], interactions: DrugInteraction[]): Promise<string> {
  try {
    const drugNames = drugs.map(d => d.name).join(', ')
    const interactionSummary = interactions.map(i => 
      `${i.drug1} + ${i.drug2}: ${i.severity} - ${i.description}`
    ).join('\n')

    const prompt = `Analyze these drug interactions and provide comprehensive medical advice:

Drugs: ${drugNames}

Interactions found:
${interactionSummary}

Please provide:
1. Overall risk assessment
2. Clinical significance of each interaction
3. Management recommendations
4. When to consult a healthcare provider
5. Alternative treatment options if applicable

Respond in Arabic with medical accuracy.`

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: prompt,
        locale: 'ar',
        model: 'openai-reasoning'
      })
    })

    if (!response.ok) throw new Error('AI API error')
    const data = await response.json()
    const raw: string = data.content || ''
    const clean = raw
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
    return clean || 'Unable to generate AI analysis'
  } catch (error) {
    console.error('Error getting AI analysis:', error)
    return 'تحليل الذكاء الاصطناعي غير متوفر حالياً'
  }
}

// Main drug interaction analysis function
export async function analyzeDrugInteractions(drugInputs: string[]): Promise<DrugInteractionResult> {
  const drugs: DrugInfo[] = []
  const interactions: DrugInteraction[] = []
  const recommendations: string[] = []

  // Fetch drug information for all inputs at once
  const drugResults = await searchDrugs(drugInputs)
  
  for (let i = 0; i < drugInputs.length; i++) {
    const input = drugInputs[i].trim()
    const result = drugResults[i]
    
    if (result && result.found && result.data) {
      const drugData = parseOpenFDAData(result.data)
      if (drugData) {
        drugs.push(drugData)
      } else {
        // Create a basic drug entry if parsing failed
        drugs.push({
          name: input,
          description: 'معلومات الدواء غير متوفرة في قاعدة البيانات'
        })
      }
    } else {
      // Create a basic drug entry if not found in OpenFDA
      drugs.push({
        name: input,
        description: 'معلومات الدواء غير متوفرة في قاعدة البيانات'
      })
    }
  }

  // Generate interactions based on known drug combinations
  if (drugs.length >= 2) {
    interactions.push(...generateKnownInteractions(drugs))
  }

  // Calculate risk level
  const severityCounts = {
    minor: interactions.filter(i => i.severity === 'minor').length,
    moderate: interactions.filter(i => i.severity === 'moderate').length,
    major: interactions.filter(i => i.severity === 'major').length,
    contraindicated: interactions.filter(i => i.severity === 'contraindicated').length
  }

  let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low'
  if (severityCounts.contraindicated > 0) {
    riskLevel = 'critical'
  } else if (severityCounts.major > 0) {
    riskLevel = 'high'
  } else if (severityCounts.moderate > 0) {
    riskLevel = 'moderate'
  }

  // Generate basic recommendations
  if (riskLevel === 'critical') {
    recommendations.push('تجنب هذا التركيب الدوائي تماماً - استشر الطبيب فوراً')
  } else if (riskLevel === 'high') {
    recommendations.push('هذا التركيب الدوائي خطير - استشر الطبيب قبل الاستخدام')
  } else if (riskLevel === 'moderate') {
    recommendations.push('يحتاج مراقبة طبية - استشر الطبيب')
  } else {
    recommendations.push('تفاعل بسيط - يمكن الاستخدام مع الحذر')
  }

  // Get AI analysis
  const aiAnalysis = await getAIAnalysis(drugs, interactions)

  return {
    drugs,
    interactions,
    summary: {
      totalInteractions: interactions.length,
      severityCounts,
      riskLevel
    },
    recommendations,
    aiAnalysis
  }
}

// Known drug interactions database
function generateKnownInteractions(drugs: DrugInfo[]): DrugInteraction[] {
  const interactions: DrugInteraction[] = []
  const drugNames = drugs.map(d => d.name.toLowerCase())

  // Common drug interactions
  const knownInteractions = [
    {
      drugs: ['warfarin', 'aspirin'],
      severity: 'major' as const,
      description: 'زيادة خطر النزيف',
      clinicalEffects: 'نزيف معوي، نزيف دماغي',
      management: 'مراقبة INR، تجنب الجرعات العالية'
    },
    {
      drugs: ['digoxin', 'furosemide'],
      severity: 'moderate' as const,
      description: 'زيادة سمية الديجوكسين',
      clinicalEffects: 'عدم انتظام ضربات القلب',
      management: 'مراقبة مستويات الديجوكسين'
    },
    {
      drugs: ['metformin', 'contrast media'],
      severity: 'major' as const,
      description: 'خطر الحماض اللبني',
      clinicalEffects: 'حماض لبني، فشل كلوي',
      management: 'إيقاف الميتفورمين قبل التصوير'
    },
    {
      drugs: ['simvastatin', 'clarithromycin'],
      severity: 'major' as const,
      description: 'زيادة خطر اعتلال العضلات',
      clinicalEffects: 'ألم عضلي، انحلال الربيدات',
      management: 'تجنب الاستخدام المتزامن'
    }
  ]

  // Check for known interactions
  for (const interaction of knownInteractions) {
    const hasDrug1 = drugNames.some(name => 
      interaction.drugs[0].toLowerCase().includes(name) || 
      name.includes(interaction.drugs[0].toLowerCase())
    )
    const hasDrug2 = drugNames.some(name => 
      interaction.drugs[1].toLowerCase().includes(name) || 
      name.includes(interaction.drugs[1].toLowerCase())
    )

    if (hasDrug1 && hasDrug2) {
      interactions.push({
        drug1: interaction.drugs[0],
        drug2: interaction.drugs[1],
        severity: interaction.severity,
        description: interaction.description,
        clinicalEffects: interaction.clinicalEffects,
        management: interaction.management
      })
    }
  }

  return interactions
}

// Validation functions
export function validateDrugInput(input: string): { isValid: boolean; error?: string } {
  const trimmed = input.trim()
  
  if (!trimmed) {
    return { isValid: false, error: 'يرجى إدخال اسم الدواء' }
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'اسم الدواء قصير جداً' }
  }
  
  if (trimmed.length > 100) {
    return { isValid: false, error: 'اسم الدواء طويل جداً' }
  }
  
  return { isValid: true }
}

export function validateDrugList(drugs: string[]): { isValid: boolean; error?: string } {
  if (drugs.length < 2) {
    return { isValid: false, error: 'يجب إدخال دواءين على الأقل للتحقق من التفاعلات' }
  }
  
  if (drugs.length > 10) {
    return { isValid: false, error: 'لا يمكن تحليل أكثر من 10 أدوية في نفس الوقت' }
  }
  
  for (const drug of drugs) {
    const validation = validateDrugInput(drug)
    if (!validation.isValid) {
      return validation
    }
  }
  
  return { isValid: true }
}