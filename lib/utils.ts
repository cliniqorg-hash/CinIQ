// Utility functions for the chat system

export const sanitizeAIText = (text: string): string => {
  if (!text) return text
  
  // Remove any potential HTML tags
  let sanitized = text.replace(/<[^>]*>/g, '')
  
  // Remove any potential script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Remove any potential model names or provider mentions
  sanitized = sanitized.replace(/\b(?:gpt|claude|bard|llama|anthropic|openai|google|meta|microsoft)\b/gi, 'AI model')
  
  return sanitized.trim()
}

export const validateMedicalResponse = (text: string): boolean => {
  if (!text || text.length < 10) return false
  
  // Check for medical-related keywords that indicate a proper response
  const medicalKeywords = [
    'علاج', 'دواء', 'أعراض', 'تشخيص', 'فحص', 'طبيب', 'مستشفى', 'صحة', 'مرض',
    'treatment', 'medicine', 'symptoms', 'diagnosis', 'examination', 'doctor', 'hospital', 'health', 'disease'
  ]
  
  const hasMedicalContent = medicalKeywords.some(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  )
  
  // Check for reasonable length and structure
  const hasReasonableLength = text.length >= 50
  const hasStructure = text.includes('\n') || text.includes('.') || text.includes('،')
  
  return hasMedicalContent && hasReasonableLength && hasStructure
}

// Convert a very small subset of Markdown to safe HTML (bold/italic/lists/linebreaks)
export const markdownToSafeHtml = (raw: string): string => {
  if (!raw) return ''

  // Escape HTML
  let text = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Normalize newlines
  text = text.replace(/\r\n|\r/g, '\n')

  // Handle lists (simple): lines starting with - or *
  const lines = text.split('\n')
  let html = ''
  let inUl = false
  let inOl = false

  const flushLists = () => {
    if (inUl) { html += '</ul>'; inUl = false }
    if (inOl) { html += '</ol>'; inOl = false }
  }

  const renderInline = (s: string) => {
    // Bold: **text** or __text__
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    s = s.replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic: *text* or _text_
    s = s.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    s = s.replace(/_(.+?)_/g, '<em>$1</em>')
    return s
  }

  for (const line of lines) {
    const trimmed = line.trim()
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/)
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inUl) { flushLists(); html += '<ul>'; inUl = true }
      html += `<li>${renderInline(trimmed.replace(/^[-*]\s+/, ''))}</li>`
    } else if (olMatch) {
      if (!inOl) { flushLists(); html += '<ol>'; inOl = true }
      html += `<li>${renderInline(olMatch[1])}</li>`
    } else if (trimmed.length === 0) {
      flushLists()
      html += '<br/>'
    } else {
      flushLists()
      html += `<p>${renderInline(trimmed)}</p>`
    }
  }

  flushLists()
  return html
}