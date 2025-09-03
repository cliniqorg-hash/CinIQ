import { NextResponse } from 'next/server'

function encode(value: string): string {
	return value.replace(/"/g, '\\"')
}

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const name = String(body?.name || '').trim()
		if (!name) return NextResponse.json({ info: null }, { status: 200 })
		const q = `search=openfda.generic_name:"${encode(name)}"+OR+openfda.brand_name:"${encode(name)}"&limit=1&fields=dosage_and_administration,openfda`;
		const url = `https://api.fda.gov/drug/label.json?${q}`
		const res = await fetch(url)
		if (!res.ok) return NextResponse.json({ info: null }, { status: 200 })
		const data = await res.json()
		const entry = data?.results?.[0]
		const text: string | undefined = Array.isArray(entry?.dosage_and_administration) ? entry.dosage_and_administration.join('\n') : entry?.dosage_and_administration
		return NextResponse.json({ info: text || null, source: url })
	} catch {
		return NextResponse.json({ info: null }, { status: 200 })
	}
}


