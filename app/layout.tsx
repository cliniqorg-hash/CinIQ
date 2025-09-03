import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Cairo } from 'next/font/google'
import AnalyticsInit from '../components/AnalyticsInit'
import Script from 'next/script'
import { LangProvider } from '../components/LangProvider'
import CookieConsent from '../components/CookieConsent'

export const metadata: Metadata = {
  title: 'CLinIQ - رعاية صحية بالذكاء الاصطناعي',
  description: 'منصّة رعاية صحية ذكية تقدّم استشارات طبية ونصائح موثوقة بلُغة مصرية بسيطة.',
  keywords: 'صحة, ذكاء اصطناعي, استشارة طبية, دكتور ذكي',
  authors: [{ name: 'CLinIQ Team' }],
  icons: { icon: '/favicon.svg' },
  alternates: {
    canonical: 'https://cliniq-org.web.app'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7132810662636910" />
        <meta name="google-adsense-platform" content="ca-host-pub-7132810662636910" />
        
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FWQXB27JWS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWQXB27JWS');
          `}
        </Script>
        
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7132810662636910"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script id="lang-init" strategy="beforeInteractive">
          {`
            try {
              const saved = localStorage.getItem('cliniq_locale');
              if (saved === 'en') {
                document.documentElement.lang = 'en';
                document.documentElement.dir = 'ltr';
              }
              // Default is already set to 'ar' and 'rtl' in HTML
            } catch {}
          `}
        </Script>
        
                                                                                                                                                                       
      </head>
      <body className={`${cairo.className} antialiased`}>
        <LangProvider>
          <AnalyticsInit />
          <CookieConsent />
          {children}
        </LangProvider>
      </body>
    </html>
  )
} 