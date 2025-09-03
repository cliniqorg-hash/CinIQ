import { NextResponse } from 'next/server'

type IncomingBody = {
  message: string
  locale?: 'ar' | 'en'
  model?:
    | 'claude'
    | 'deepseek-reasoning'
    | 'gemini'
    | 'gpt-5-nano'
    | 'openai'
    | 'openai-fast'
    | 'openai-large'
    | 'openai-reasoning'
  file?: {
    type: string
    dataBase64: string
  } | null
}

const OPENAI_COMPAT_BASE = process.env.OPENAI_COMPAT_BASE_URL || 'https://text.pollinations.ai/openai'

function buildSystemPrompt(locale: 'ar' | 'en' = 'en') {
  const core =
    locale === 'ar'
      ? 'أنت مساعد طبي موثوق ولطيف. قدّم معلومات دقيقة وحديثة بلغة بسيطة، واشرح المخاطر ومتى يجب مراجعة الطبيب.'
      : 'You are a careful, helpful medical assistant. Provide accurate, up-to-date information in simple language and explain risks and when to see a doctor.'

  const noTradeNames =
    locale === 'ar'
      ? 'مهم: تجنّب استخدام الأسماء التجارية للأدوية أو الأجهزة. استخدم الأسماء العلمية/العامّة فقط.'
      : 'Important: Avoid brand/trade names for drugs or devices. Use generic/scientific names only.'

  const formatting =
    locale === 'ar'
      ? 'التنسيق: استخدم عناوين قصيرة ونقاط مختصرة عند الحاجة. لا تعرض سلاسل التفكير أو الخطوات الداخلية. تجنّب الخطوط والزخارف مثل --- أو *** أو ### كسطور منفصلة. أعطِ الإجابة النهائية مباشرة.'
      : 'Formatting: Use short section titles and concise bullet points when helpful. Do not reveal chain-of-thought or internal steps. Avoid decorative dividers like --- or *** or ### as standalone lines. Provide the final answer directly.'

  return `${core} ${noTradeNames} ${formatting}`
}

function selectModel(baseModel: IncomingBody['model'], hasImage: boolean): { baseUrl: string; model: string; temperature: number } {
  // Prefer Gemini for vision inputs; otherwise default to OpenAI (gpt-4.1) unless explicitly requested
  if (hasImage || baseModel === 'gemini') {
    return { baseUrl: OPENAI_COMPAT_BASE, model: 'gemini-2.5-flash-lite', temperature: 0.3 }
  }

  switch (baseModel) {
    case 'openai-large':
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-4.1', temperature: 0.3 }
    case 'openai-fast':
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-4.1-nano', temperature: 0.2 }
    case 'openai':
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-4.1-nano', temperature: 0.2 }
    case 'gpt-5-nano':
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-5-nano', temperature: 0.2 }
    case 'openai-reasoning':
      // Try reasoning model first, fallback to large model if not available
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-4.1', temperature: 0.3 }
    case 'claude':
      // If you have Bedrock set up, you can replace this mapping with a Bedrock call.
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'claude-3-5-haiku', temperature: 0.2 }
    case 'deepseek-reasoning':
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'deepseek-r1', temperature: 0.2 }
    default:
      return { baseUrl: OPENAI_COMPAT_BASE, model: 'gpt-4.1', temperature: 0.3 }
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IncomingBody
    const { message, locale = 'en', model, file } = body

    if (!message && !file) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 })
    }

    const sys = buildSystemPrompt(locale)
    const useVision = !!file && !!file?.dataBase64 && !!file?.type && file.type.startsWith('image/')
    const { baseUrl, model: modelId, temperature } = selectModel(model, useVision)

    const messages: Array<
      | { role: 'system'; content: string }
      | { role: 'user'; content: string }
      | {
          role: 'user'
          content: [
            { type: 'text'; text: string },
            { type: 'image_url'; image_url: { url: string; detail: 'high' | 'low' } }
          ]
        }
    > = []
    messages.push({ role: 'system', content: sys })

    if (useVision) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: message || (locale === 'ar' ? 'حلّل الصورة الطبية التالية' : 'Analyze this medical image') },
          { type: 'image_url', image_url: { url: `data:${file!.type};base64,${file!.dataBase64}`, detail: 'high' } },
        ],
      })
    } else {
      messages.push({ role: 'user', content: message })
    }

    // Try the primary model first
    let resp = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelId, messages, temperature, stream: false }),
    })

    // If the reasoning model fails, try fallback to a more stable model
    if (!resp.ok && model === 'openai-reasoning') {
      console.log('Reasoning model failed, trying fallback to gpt-4.1-nano')
      resp = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          model: 'gpt-4.1-nano', 
          messages, 
          temperature: 0.2, 
          stream: false 
        }),
      })
    }

    if (!resp.ok) {
      const text = await resp.text()
      console.error(`API Error: ${resp.status} ${text}`)
      return NextResponse.json({ 
        error: `Service temporarily unavailable. Please try again in a moment.` 
      }, { status: 502 })
    }

    const json = await resp.json()
    const content = json?.choices?.[0]?.message?.content ?? ''
    
    if (!content) {
      return NextResponse.json({ 
        error: 'No response generated. Please try again.' 
      }, { status: 502 })
    }
    
    return NextResponse.json({ content })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


