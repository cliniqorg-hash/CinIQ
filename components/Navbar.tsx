'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Stethoscope, User, Home, MessageSquare, Wrench } from 'lucide-react'
import Image from 'next/image'
import { useLang } from './LangProvider'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  onNewChat?: () => void
}

const Navbar = ({ onNewChat }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLang()
  const pathname = usePathname()
  
  // Determine button text based on current page
  const isChatPage = pathname === '/chat'
  const buttonText = isChatPage ? 'ابدأ دلوقتي' : t('nav.cta')

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.chat'), href: '/chat', icon: User },
    { name: t('nav.tools'), href: '/tools', icon: Wrench },
    { name: t('nav.feedback'), href: '/feedback', icon: MessageSquare },
    { name: t('nav.about'), href: '/about', icon: Stethoscope },
  ]

  const toolLinks: Array<{ key: string; href: string }> = [
    { key: 'bmi', href: '/tools/bmi' },
    { key: 'bmr', href: '/tools/bmr' },
    { key: 'tdee', href: '/tools/tdee' },
    { key: 'bodyFat', href: '/tools/body-fat' },
    { key: 'waterIntake', href: '/tools/water-intake' },
    { key: 'sleepCycle', href: '/tools/sleep-cycle' },
    { key: 'bloodPressure', href: '/tools/blood-pressure' },
    { key: 'heartRateZones', href: '/tools/heart-rate-zones' },
    { key: 'diabetesRisk', href: '/tools/diabetes-risk' },
    { key: 'cholesterolRatio', href: '/tools/cholesterol-ratio' },
    { key: 'egfr', href: '/tools/egfr' },
    { key: 'smokingRisk', href: '/tools/smoking-risk' },
    { key: 'pregnancyDueDate', href: '/tools/pregnancy-due-date' },
    { key: 'ovulation', href: '/tools/ovulation' },
    { key: 'pregnancyWeightGain', href: '/tools/pregnancy-weight-gain' },
    { key: 'strokeRisk', href: '/tools/stroke-risk' },
    { key: 'copdCat', href: '/tools/copd-risk' },
    { key: 'cancerScreening', href: '/tools/cancer-screening' },
    { key: 'thyroidRisk', href: '/tools/thyroid-risk' },
    { key: 'diabeticRetinopathy', href: '/tools/diabetic-retinopathy' },
    { key: 'medicationDosage', href: '/tools/medication-dosage' },
    { key: 'drugInteraction', href: '/tools/drug-interaction' },
    { key: 'lifestyleCoach', href: '/tools/lifestyle-coach' },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                <Image src="/logo.png" alt="ClinIQ logo" width={32} height={32} className="object-contain" unoptimized priority />
              </div>
              <span className="text-2xl font-bold text-gray-900">CLinIQ</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Left static links except Tools */}
            {navigation.filter(n => n.href !== '/tools').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Tools dropdown */}
            <div className="relative group">
              <Link href="/tools" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                <Wrench className="w-4 h-4" />
                <span>{t('nav.tools')}</span>
              </Link>
              <div className="absolute left-0 mt-2 w-[840px] hidden group-hover:block">
                <div className="grid grid-cols-3 gap-2 bg-white border border-gray-100 shadow-xl rounded-xl p-3">
                  {toolLinks.map(link => (
                    <Link key={link.href} href={link.href} className="px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                      {t(`tools.${link.key}.title`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* CTA - Always functions as New Chat */}
            {isChatPage ? (
              <button onClick={onNewChat} className="btn-primary">
                {buttonText}
              </button>
            ) : (
              <button 
                onClick={() => {
                  // Navigate to chat and trigger new chat
                  window.location.href = '/chat'
                  // The chat page will automatically start new chat on load
                }} 
                className="btn-primary"
              >
                {buttonText}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            

            
            <div className="pt-4">
              {isChatPage ? (
                <button
                  onClick={() => {
                    onNewChat?.()
                    setIsOpen(false)
                  }}
                  className="btn-primary w-full text-center"
                >
                  {buttonText}
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Navigate to chat and trigger new chat
                    window.location.href = '/chat'
                    setIsOpen(false)
                    // The chat page will automatically start new chat on load
                  }}
                  className="btn-primary w-full text-center"
                >
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 