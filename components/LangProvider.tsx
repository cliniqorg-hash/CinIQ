"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Locale, defaultLocale, messages, getDir } from '../lib/i18n'

type LangContextValue = {
	locale: Locale
	dir: 'rtl' | 'ltr'
	t: (key: string) => string
	setLocale: (l: Locale) => void
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

export function LangProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(defaultLocale)

	useEffect(() => {
		const saved = (typeof window !== 'undefined' && window.localStorage.getItem('cliniq_locale')) as Locale | null
		if (saved === 'ar') {
			setLocaleState(saved)
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('cliniq_locale', locale)
			                  document.documentElement.dir = getDir()
			document.documentElement.lang = locale
		}
	}, [locale])

	const setLocale = (l: Locale) => setLocaleState(l)

	const t = useMemo(() => {
		const dict = messages[locale]
		return (key: string) => dict[key] ?? key
	}, [locale])

	const value = useMemo<LangContextValue>(() => ({
		locale,
		dir: getDir(),
		t,
		setLocale,
	}), [locale, t])

	return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
	const ctx = useContext(LangContext)
	if (!ctx) throw new Error('useLang must be used within LangProvider')
	return ctx
} 