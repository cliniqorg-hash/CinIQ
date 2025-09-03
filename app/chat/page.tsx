import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'محادثة طبية ذكية - CLinIQ',
  description: 'تحدث مع مساعد طبي ذكي باللغة العربية. احصل على استشارات طبية فورية ونصائح صحية موثوقة من CLinIQ.',
  keywords: 'استشارة طبية, محادثة طبية, مساعد طبي, ذكاء اصطناعي طبي, نصائح صحية',
  openGraph: {
    title: 'محادثة طبية ذكية - CLinIQ',
    description: 'تحدث مع مساعد طبي ذكي باللغة العربية. احصل على استشارات طبية فورية ونصائح صحية موثوقة.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Navbar from '@/components/Navbar'

import { 
  FileText, Send, Bot, Upload, 
  MessageSquare, Copy, ThumbsUp, 
  Paperclip, Image as ImageIcon, User, Sparkles, Camera
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
  metadata?: {
    fileName?: string
    fileType?: string
    fileSize?: number
    imageUrl?: string
    sources?: string[]
    confidence?: number
    reasoning?: string
    modelUsed?: string
    tokensUsed?: number
    processingTime?: number
  }
  userFeedback?: 'helpful' | 'not-helpful' | null
  isRegenerated?: boolean
  originalMessageId?: string
}





export default function ChatPage() {
  const isRtl = true

  // Chat state management
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Dynamic greeting state
  const [greetingMessage, setGreetingMessage] = useState<string>('')
  
  // UI state
  const [showScrollToLatest, setShowScrollToLatest] = useState(false)
  const [showFileOptions, setShowFileOptions] = useState(false)
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Medical-focused suggested prompts
  const suggestedPrompts = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "ما هي أعراض ارتفاع ضغط الدم؟",
      prompt: "ما هي أعراض ارتفاع ضغط الدم وكيف يمكنني التعرف عليها؟"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "نصائح للوقاية من مرض السكري",
      prompt: "أريد نصائح طبية للوقاية من مرض السكري والحفاظ على صحة جيدة"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "متى يجب مراجعة الطبيب؟",
      prompt: "متى يجب علي مراجعة الطبيب فوراً وما هي العلامات التحذيرية؟"
    }
  ]

  // Note: No chat persistence - always starts fresh

  // Generate dynamic greeting message (silent background process)
  const generateGreetingMessage = useCallback(async () => {
    try {
      const greetingPrompts = [
        "أنشئ رسالة ترحيب ودية ومهنية لمساعد طبي ذكي متخصص في التشخيص والاستشارات الطبية. يجب أن تكون باللغة العربية وتشجع المستخدم على طرح الأسئلة الطبية والصحية.",
        "اكتب رسالة ترحيب إبداعية لموقع طبي متخصص يقدم خدمات الذكاء الاصطناعي للاستشارات الطبية. اجعلها دافئة ومهنية وتركز على الصحة.",
        "أنشئ رسالة ترحيب قصيرة ومؤثرة لمساعد طبي رقمي متخصص في الطب والعلاج. يجب أن تظهر الخبرة والثقة في تقديم المساعدة الطبية الدقيقة.",
        "اكتب رسالة ترحيب مبتكرة لخدمة استشارات طبية ذكية متخصصة في التشخيص والعلاج. اجعلها تشجع على التفاعل والثقة في المجال الطبي.",
        "أنشئ رسالة ترحيب احترافية لمساعد طبي متقدم متخصص في الطب والعلوم الصحية. يجب أن تبرز القدرة على تقديم معلومات طبية دقيقة ومفيدة."
      ]
      
      const randomPrompt = greetingPrompts[Math.floor(Math.random() * greetingPrompts.length)]
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: randomPrompt,
          locale: 'ar',
          model: 'openai-reasoning'
        })
      })

      if (response.ok) {
        const data = await response.json()
        const cleanGreeting = data.content || 'مرحباً بك في CLinIQ! مساعدك الطبي الذكي جاهز لمساعدتك في جميع استفساراتك الصحية.'
        setGreetingMessage(cleanGreeting)
      } else {
        setGreetingMessage('مرحباً بك في CLinIQ! مساعدك الطبي الذكي جاهز لمساعدتك في جميع استفساراتك الصحية.')
      }
    } catch (error) {
      console.error('Error generating greeting:', error)
      setGreetingMessage('مرحباً بك في CLinIQ! مساعدك الطبي الذكي جاهز لمساعدتك في جميع استفساراتك الصحية.')
    }
  }, [])
  
  const createNewChat = useCallback(() => {
    setMessages([])
    setInputMessage('')
    setUploadedFile(null)
    setShowFileOptions(false)
    
    // Clear any existing data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentChatSession')
      localStorage.removeItem('chatHistory')
      localStorage.removeItem('currentSession')
    }
    
    // Generate a fresh greeting for the new chat
    generateGreetingMessage()
  }, [generateGreetingMessage])

  // Initialize component - Always start with new chat
  useEffect(() => {
    setIsClient(true)
    
    // Always start with a completely new chat
    setMessages([])
    setInputMessage('')
    setUploadedFile(null)
    setShowFileOptions(false)
    
    // Clear any existing chat data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentChatSession')
      localStorage.removeItem('chatHistory')
      localStorage.removeItem('currentSession')
    }
    
    // Generate fresh greeting message for new chat
    generateGreetingMessage()
  }, [generateGreetingMessage])

  // Note: Chat history is not saved - always starts fresh

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFileOptions(false)
      }
    }

    if (showFileOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFileOptions])



  // File handling functions
  const removeFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
    setShowFileOptions(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
    setShowFileOptions(false)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInputMessage(prompt)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: uploadedFile ? 'file' : 'text',
      metadata: uploadedFile ? {
        fileName: uploadedFile.name,
        fileType: uploadedFile.type,
        fileSize: uploadedFile.size,
        imageUrl: uploadedFile.type.startsWith('image/') ? URL.createObjectURL(uploadedFile) : undefined
      } : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setUploadedFile(null)
    setIsLoading(true)

    try {
      const response = await generateAIResponse(inputMessage, uploadedFile)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'text',
        metadata: {
          sources: ['CLinIQ AI Medical Assistant'],
          confidence: 0.95,
          modelUsed: 'GPT-4.1 (Latest)',
          reasoning: 'Response generated using the latest AI model with comprehensive medical knowledge base and evidence-based recommendations'
        }
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      // The generateAIResponse function now returns user-friendly error messages
      const errorContent = error instanceof Error ? error.message : 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (message: string, file: File | null): Promise<string> => {
    try {
      // Prepare API request
      const requestBody = {
        message,
        locale: 'ar' as const,
        model: 'openai-reasoning' as const, // Use reasoning model for thinking mode
        file: file ? {
          type: file.type,
          dataBase64: await fileToBase64(file)
        } : null
      }

      const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.error || `API request failed: ${response.status}`
          throw new Error(errorMessage)
        }

        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        const cleanContent = data.content || 'عذراً، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.'
        return cleanContent
    } catch (error) {
      console.error('Error generating AI response:', error)
      // Return a user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('502') || error.message.includes('Service temporarily unavailable')) {
          return 'الخدمة غير متاحة مؤقتاً. يرجى المحاولة مرة أخرى خلال دقائق قليلة.'
        }
        if (error.message.includes('timeout') || error.message.includes('network')) {
          return 'مشكلة في الاتصال. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.'
        }
        return `عذراً، حدث خطأ: ${error.message}`
      }
      return 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1] ?? '')
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const scrollToLatest = () => {
    scrollToBottom()
    setShowScrollToLatest(false)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col">
      {/* Standard Header */}
      <Navbar onNewChat={createNewChat} />
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="bg-white flex flex-col flex-1 h-full">
          {/* Messages Container - Scrollable */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 pb-20"
            onScroll={(e) => {
              const target = e.target as HTMLDivElement
              const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100
              setShowScrollToLatest(!isNearBottom)
            }}
          >
            {messages.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-medical-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-in shadow-lg">
                  <Bot className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-slide-up">مرحباً بك في CLinIQ</h2>
                <div className="mb-8 animate-fade-in-delay">
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    {greetingMessage || 'مرحباً بك في CLinIQ! مساعدك الطبي الذكي جاهز لمساعدتك.'}
                  </p>
                </div>
                
                <div className="text-sm text-gray-500 mb-8 animate-fade-in-delay-2">
                  استخدم أحد الاستفسارات الطبية الشائعة أدناه أو اسأل عن أي موضوع صحي
                </div>
                
                {/* Suggested Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt.prompt)}
                      className={`p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg hover:scale-105 transition-all duration-300 text-right group animate-card-in ${
                        index === 0 ? 'card-delay-0' : index === 1 ? 'card-delay-1' : 'card-delay-2'
                      }`}
                    >
                      <div className="text-primary-600 mb-3 group-hover:scale-110 transition-transform duration-200">{prompt.icon}</div>
                      <p className="text-sm text-gray-700 group-hover:text-primary-700 transition-colors duration-200">{prompt.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary-600' 
                        : 'bg-gradient-to-br from-primary-500 to-medical-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.type === 'file' && message.metadata?.fileName && (
                        <div className="mb-2 text-sm opacity-80 flex items-center space-x-2">
                          <Paperclip className="h-4 w-4" />
                          <span>{message.metadata.fileName}</span>
                          {message.metadata.fileSize && (
                            <span className="text-xs">({formatFileSize(message.metadata.fileSize)})</span>
                          )}
                      </div>
                      )}
                      
                      {message.metadata?.imageUrl && (
                        <div className="mb-3">
                          <Image 
                            src={message.metadata.imageUrl} 
                            alt="Uploaded image" 
                            width={400}
                            height={300}
                            className="max-w-full h-auto rounded-lg"
                          />
                      </div>
                      )}
                      
                      {message.role === 'assistant' ? (
                        <div className="max-w-none text-right">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                            components={{
                              h1: ({ node, ...props }) => (
                                <h2 className="mt-2 mb-2 text-lg font-semibold text-gray-900" {...props} />
                              ),
                              h2: ({ node, ...props }) => (
                                <h3 className="mt-2 mb-2 text-base font-semibold text-gray-900" {...props} />
                              ),
                              h3: ({ node, ...props }) => (
                                <h4 className="mt-2 mb-2 text-sm font-semibold text-gray-900" {...props} />
                              ),
                              p: ({ node, ...props }) => (
                                <p className="my-2 text-sm leading-relaxed text-gray-900" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="my-2 list-disc pr-5 space-y-1" {...props} />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol className="my-2 list-decimal pr-5 space-y-1" {...props} />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="text-sm leading-relaxed" {...props} />
                              ),
                              a: ({ node, ...props }) => (
                                <a className="text-primary-700 hover:underline break-words" target="_blank" rel="noreferrer" {...props} />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote className="border-r-4 border-primary-200 pr-3 my-3 text-gray-700" {...props} />
                              ),
                              hr: () => (
                                <div className="my-3 border-t border-gray-200" />
                              ),
                              table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-3"><table className="w-full text-sm" {...props} /></div>
                              ),
                              th: ({ node, ...props }) => (
                                <th className="text-right font-semibold p-2 bg-gray-50 border border-gray-200" {...props} />
                              ),
                              td: ({ node, ...props }) => (
                                <td className="p-2 border border-gray-200 align-top" {...props} />
                              ),
                              code({ inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                if (!inline) {
                                  return (
                                    <SyntaxHighlighter
                                      style={oneDark}
                                      language={match ? match[1] : 'tsx'}
                                      PreTag="div"
                                      customStyle={{
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                        direction: 'ltr',
                                        textAlign: 'left',
                                        borderRadius: '10px'
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  )
                                }
                                return (
                                  <code className="bg-gray-100 rounded px-1 py-0.5 text-[0.85em]" {...props}>
                                    {children}
                                  </code>
                                )
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString('ar-EG', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="hover:opacity-100 transition-opacity"
                              title="نسخ"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => {/* Handle feedback */}}
                              className="hover:opacity-100 transition-opacity"
                              title="مفيد"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                    </div>
                  )}
                </div>
              </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-medical-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span className="text-gray-600 text-sm">جاري التفكير...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Input Area - Static at Bottom */}
          <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0 flex justify-center animate-slide-up sticky bottom-0 z-10 shadow-lg">
            <div className="w-full max-w-2xl">
              {/* File Preview */}
              {uploadedFile && (
                <div className="mb-3 flex items-center space-x-3 bg-white rounded-lg p-3 border border-gray-200 animate-fade-in shadow-sm">
                  {uploadedFile.type.startsWith('image/') ? (
                    <ImageIcon className="h-5 w-5 text-primary-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary-600" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {/* Modern Input Box */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 flex items-center px-4 py-3 hover:shadow-md transition-all duration-200 focus-within:border-primary-300 focus-within:shadow-lg">
                {/* Attachment Button with Dropdown */}
                <div className="flex-shrink-0 mr-3 relative" ref={dropdownRef}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                    className="hidden"
                    aria-label="رفع ملف"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    onChange={handleCameraCapture}
                    accept="image/*"
                    className="hidden"
                    aria-label="التقاط صورة"
                  />
                  <button
                    onClick={() => setShowFileOptions(!showFileOptions)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-all duration-200 hover:scale-110"
                    title="إرفاق ملف أو التقاط صورة"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showFileOptions && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                      <button
                        onClick={() => {
                          fileInputRef.current?.click()
                          setShowFileOptions(false)
                        }}
                        className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center space-x-3 space-x-reverse"
                      >
                        <Upload className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">رفع ملف</span>
                      </button>
                      <button
                        onClick={() => {
                          cameraInputRef.current?.click()
                          setShowFileOptions(false)
                        }}
                        className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center space-x-3 space-x-reverse"
                      >
                        <Camera className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">التقاط صورة</span>
                      </button>
                    </div>
                  )}
                </div>
                  
                  {/* Text Input */}
                <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                    placeholder="اسأل عن أي استفسار طبي أو صحي..."
                    className="w-full resize-none border-none outline-none bg-transparent text-gray-900 placeholder-gray-400 chat-input"
                    rows={1}
                />
                </div>
                  
                  {/* Send Button */}
                <div className="flex-shrink-0 ml-3">
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!inputMessage.trim() && !uploadedFile)}
                    className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
                    title="إرسال"
                >
                    <Send className="h-5 w-5" />
                </button>
              </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Scroll to Latest Button */}
      {showScrollToLatest && (
        <button
          onClick={scrollToLatest}
          className="fixed bottom-24 right-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors z-20"
          title="الانتقال للأحدث"
        >
          <Send className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
