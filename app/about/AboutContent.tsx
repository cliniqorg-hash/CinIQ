'use client'

import { useLang } from '../../components/LangProvider'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, HeartPulse, LineChart, Users, Brain, Stethoscope, Sparkles, Cpu, Microscope, Bot } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutContent() {
	const { t } = useLang()

	const highlights = [
		{ icon: Brain, label: 'ذكاء اصطناعي طبي', color: 'from-purple-500 to-indigo-500' },
		{ icon: Shield, label: 'خصوصية وأمان', color: 'from-emerald-500 to-teal-500' },
		{ icon: LineChart, label: 'نتائج دقيقة', color: 'from-amber-500 to-orange-500' },
	]

	const values = [
		{ icon: HeartPulse, title: 'الإنسان أولاً', text: 'نصمّم كل تجربة بعين المريض والطبيب لضمان فاعلية وسهولة' },
		{ icon: Shield, title: 'ثقة وشفافية', text: 'مصادر موثوقة، سياسات خصوصية واضحة، وسلامة في كل خطوة' },
		{ icon: Users, title: 'للمصريين', text: 'واجهة محلية بالعربي المصري تناسب الثقافة والسياق' },
	]

	const stats = [
		{ value: '23+', label: 'أداة طبية' },
		{ value: '100%', label: 'عربي مصري' },
		{ value: '24/7', label: 'متاح دائماً' },
	]

	const aiTiles = [
		{ icon: Brain, title: 'ذكاء تشخيصي', color: 'from-purple-500 to-indigo-500' },
		{ icon: Cpu, title: 'نماذج متقدمة', color: 'from-blue-500 to-cyan-500' },
		{ icon: Microscope, title: 'تحليل طبي', color: 'from-emerald-500 to-teal-500' },
		{ icon: Bot, title: 'مساعد تفاعلي', color: 'from-amber-500 to-orange-500' },
	]

	return (
		<div className="text-right" dir="rtl">
			{/* Hero */}
			<section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white">
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<div>
							<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
								<Sparkles className="w-5 h-5 text-yellow-300" />
								<span className="text-sm">CLinIQ • AI Health</span>
							</motion.div>
							<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
								{t('about.hero.title')}
							</motion.h1>
							<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
								{t('about.hero.text')}
							</motion.p>
							<div className="flex flex-wrap gap-3 mb-10">
								{highlights.map((h, i) => (
									<motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 * i }} whileHover={{ scale: 1.05 }} className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${h.color} text-white shadow-md`}>
										<h.icon className="inline w-4 h-4 ml-2" />{h.label}
									</motion.div>
								))}
							</div>
			<div className="flex flex-col sm:flex-row gap-4">
				<Link href="/" className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2">
					<span>العودة للصفحة الرئيسية</span>
				</Link>
				<Link href="/chat" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
					{t('about.cta.primary')}
					<ArrowRight className="w-5 h-5" style={{ transform: 'scaleX(-1)' }} />
				</Link>
			</div>
						</div>
						<div className="relative hidden lg:block">
							<div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
							<div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
							<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
								<div className="grid grid-cols-2 gap-4">
									{aiTiles.map((tile) => (
										<motion.div key={tile.title} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }} className="group aspect-video rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
											<div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${tile.color}`} />
											<div className="relative h-full w-full flex flex-col items-center justify-center text-white">
												<tile.icon className="w-10 h-10 mb-2" />
												<span className="text-sm font-semibold">{tile.title}</span>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Why */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.mission.title')}</h2>
						<p className="text-gray-700 text-lg leading-relaxed">{t('about.mission.text')}</p>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.why.title')}</h2>
						<p className="text-gray-700 text-lg leading-relaxed">{t('about.why.text')}</p>
					</motion.div>
				</div>
			</section>

			{/* What we offer */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">{t('about.offer.title')}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{['about.offer.1','about.offer.2','about.offer.3','about.offer.4'].map((k) => (
						<motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.4 }} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:from-primary-50 hover:to-white border border-gray-100 hover:border-primary-200 shadow-md hover:shadow-xl transition-all duration-300">
							<div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Stethoscope className="w-6 h-6" /></div>
							<p className="text-gray-800 leading-relaxed text-lg">{t(k)}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Vision + Stats + Values */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.vision.title')}</h2>
						<p className="text-gray-700 text-lg leading-relaxed mb-6">{t('about.vision.text')}</p>
						<div className="grid grid-cols-3 gap-4 text-center">
							{stats.map((s) => (
								<motion.div key={s.label} initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }} className="p-4 rounded-xl bg-gray-50">
									<div className="text-3xl font-extrabold text-primary-600 mb-1">{s.value}</div>
									<div className="text-sm text-gray-600">{s.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{values.map((v) => (
							<motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -3 }} className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
								<div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-3"><v.icon className="w-6 h-6" /></div>
								<h4 className="font-bold text-gray-900 mb-1">{v.title}</h4>
								<p className="text-gray-700 text-sm leading-relaxed">{v.text}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
					<h3 className="text-3xl md:text-4xl font-extrabold mb-4">{t('about.cta.title')}</h3>
					<p className="text-blue-100 text-lg mb-8">{t('about.cta.subtitle')}</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/chat" className="group inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl">
							{t('about.cta.primary')}
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ transform: 'scaleX(-1)' }} />
						</Link>
						<Link href="/tools" className="group inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300">
					{t('about.cta.secondary')}
				</Link>
			</div>
				</div>
			</section>
		</div>
	)
} 