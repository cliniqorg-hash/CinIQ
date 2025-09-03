import { NextResponse } from 'next/server'

const OPENFDA_API_KEY = '486JkdmbODcBAWNvepJiMhZfFAtm8mQJJ6bFqQBz'
const OPENFDA_BASE_URL = 'https://api.fda.gov/drug'

export async function POST(request: Request) {
  try {
    const { drugs } = await request.json()
    
    if (!drugs || !Array.isArray(drugs) || drugs.length < 2) {
      return NextResponse.json({ 
        error: 'يجب إدخال دواءين على الأقل للتحقق من التفاعلات' 
      }, { status: 400 })
    }

    const results = []
    
    // Fetch drug information for each drug
    for (const drugName of drugs) {
      try {
        // Search by generic name first
        const labelResponse = await fetch(
          `${OPENFDA_BASE_URL}/label.json?api_key=${OPENFDA_API_KEY}&search=openfda.generic_name:"${encodeURIComponent(drugName)}"&limit=1`
        )
        
        let drugData = null
        if (labelResponse.ok) {
          const labelData = await labelResponse.json()
          if (labelData.results && labelData.results.length > 0) {
            drugData = labelData.results[0]
          }
        }
        
        // If not found, try searching by brand name
        if (!drugData) {
          const brandResponse = await fetch(
            `${OPENFDA_BASE_URL}/label.json?api_key=${OPENFDA_API_KEY}&search=openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`
          )
          
          if (brandResponse.ok) {
            const brandData = await brandResponse.json()
            if (brandData.results && brandData.results.length > 0) {
              drugData = brandData.results[0]
            }
          }
        }
        
        // If still not found, try NDC search
        if (!drugData && /^\d+$/.test(drugName.trim())) {
          const ndcResponse = await fetch(
            `${OPENFDA_BASE_URL}/ndc.json?api_key=${OPENFDA_API_KEY}&search=product_ndc:"${drugName}"&limit=1`
          )
          
          if (ndcResponse.ok) {
            const ndcData = await ndcResponse.json()
            if (ndcData.results && ndcData.results.length > 0) {
              drugData = ndcData.results[0]
            }
          }
        }
        
        results.push({
          input: drugName,
          found: !!drugData,
          data: drugData
        })
        
      } catch (error) {
        console.error(`Error fetching data for drug ${drugName}:`, error)
        results.push({
          input: drugName,
          found: false,
          error: 'خطأ في جلب البيانات'
        })
      }
    }
    
    return NextResponse.json({ results })
    
  } catch (error) {
    console.error('Drug interaction API error:', error)
    return NextResponse.json({ 
      error: 'حدث خطأ في الخادم' 
    }, { status: 500 })
  }
}

// Helper function to parse OpenFDA data
export function parseOpenFDAData(fdaData: any) {
  if (!fdaData) return null
  
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
    route: openfda.route?.[0],
    manufacturer: openfda.manufacturer_name?.[0],
    activeIngredient: openfda.substance_name?.[0]
  }
}