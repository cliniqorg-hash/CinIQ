import { NextResponse } from 'next/server'

const OPENFDA_API_KEY = '486JkdmbODcBAWNvepJiMhZfFAtm8mQJJ6bFqQBz'
const OPENFDA_BASE_URL = 'https://api.fda.gov/drug/label.json'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get('q') || '').trim()
    if (!q || q.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    // Search both generic_name and brand_name, limit small for speed
    const encoded = encodeURIComponent(`${q}*`)
    const urlGeneric = `${OPENFDA_BASE_URL}?api_key=${OPENFDA_API_KEY}&search=openfda.generic_name:${encoded}&limit=10`
    const urlBrand = `${OPENFDA_BASE_URL}?api_key=${OPENFDA_API_KEY}&search=openfda.brand_name:${encoded}&limit=10`

    const [resG, resB] = await Promise.allSettled([fetch(urlGeneric), fetch(urlBrand)])

    const results: any[] = []

    const pushFrom = async (res: PromiseSettledResult<Response>) => {
      if (res.status === 'fulfilled' && res.value.ok) {
        const data = await res.value.json()
        if (data?.results) results.push(...data.results)
      }
    }

    await Promise.all([pushFrom(resG), pushFrom(resB)])

    // Normalize and de-duplicate by a key (generic+brand)
    const map = new Map<string, { name: string; generic?: string; brand?: string; route?: string }>()
    for (const r of results) {
      const gen = r?.openfda?.generic_name?.[0]
      const brand = r?.openfda?.brand_name?.[0]
      const route = r?.openfda?.route?.[0]
      const primary = gen || brand
      if (!primary) continue
      const key = `${(gen||'').toLowerCase()}|${(brand||'').toLowerCase()}`
      if (!map.has(key)) {
        map.set(key, { name: primary, generic: gen, brand, route })
      }
    }

    const suggestions = Array.from(map.values()).slice(0, 12)
    return NextResponse.json({ suggestions })
  } catch (e) {
    return NextResponse.json({ suggestions: [] }, { status: 200 })
  }
}
