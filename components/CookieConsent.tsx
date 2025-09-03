'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Initialize Consent Mode defaults (denied by default)
    const init = () => {
      window.dataLayer = window.dataLayer || []
      const gtag = (...args: unknown[]) => { window.dataLayer!.push(args as unknown as Record<string, unknown>) }
      window.gtag = window.gtag || (gtag as unknown as typeof window.gtag)
      window.gtag?.('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted'
      })
      setReady(true)
      const stored = localStorage.getItem('cookie_consent')
      setVisible(stored !== 'accepted' && stored !== 'rejected')
    }
    init()
  }, [])

  const accept = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    })
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    })
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible || !ready) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-3xl mb-4 rounded-xl border bg-white/95 backdrop-blur shadow-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-sm text-gray-800">
            We use cookies for analytics and to show personalized ads (Google AdSense). Manage your choice below.
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={reject} className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Reject</button>
            <button onClick={accept} className="px-3 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700">Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}


