'use client'

import Link from 'next/link'
import { ArrowRight, Stethoscope, Brain, Shield, Users, MessageSquare, Wrench, Heart, Star, CheckCircle, Clock, Globe, Zap, Award, TrendingUp, Smartphone, Camera, FileText, BarChart3, Activity, Target, Lightbulb } from 'lucide-react'
import { useLang } from '../components/LangProvider'
import { T } from '../components/tools/FormControls'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'

export default function HomePage() {
  	const { t } = useLang()

  const features = [
    {
      icon: Brain,
      title: t('home.features.ai.title'),
      description: t('home.features.ai.description'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Stethoscope,
      title: t('home.features.medical.title'),
      description: t('home.features.medical.description'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: t('home.features.arabic.title'),
      description: t('home.features.arabic.description'),
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const quickActions = [
    {
      href: '/chat',
      icon: MessageSquare,
      title: t('home.actions.chat.title'),
      description: t('home.actions.chat.description'),
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      features: [t('home.actions.chat.feature1'), t('home.actions.chat.feature2'), t('home.actions.chat.feature3')]
    },
    {
      href: '/tools',
      icon: Wrench,
      title: t('home.actions.tools.title'),
      description: t('home.actions.tools.description'),
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      features: [t('home.actions.tools.feature1'), t('home.actions.tools.feature2'), t('home.actions.tools.feature3')]
    }
  ]

  const popularTools = [
    { name: t('home.popularTools.bmi'), icon: BarChart3, href: '/tools/bmi' },
    { name: t('home.popularTools.bloodPressure'), icon: Activity, href: '/tools/blood-pressure' },
    { name: t('home.popularTools.diabetes'), icon: Target, href: '/tools/diabetes-risk' },
    { name: t('home.popularTools.heartRate'), icon: Heart, href: '/tools/heart-rate-zones' },
    { name: t('home.popularTools.water'), icon: Globe, href: '/tools/water-intake' },
    { name: t('home.popularTools.sleep'), icon: Clock, href: '/tools/sleep-cycle' }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: t('home.benefits.instant.title'),
      description: t('home.benefits.instant.description')
    },
    {
      icon: Award,
      title: t('home.benefits.accurate.title'),
      description: t('home.benefits.accurate.description')
    },
    {
      icon: Smartphone,
      title: t('home.benefits.mobile.title'),
      description: t('home.benefits.mobile.description')
    },
    {
      icon: Zap,
      title: t('home.benefits.fast.title'),
      description: t('home.benefits.fast.description')
    }
  ]

    return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <AnimatedBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">منصة طبية رائدة بالذكاء الاصطناعي</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <T k="home.hero.title" />
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              <T k="home.hero.subtitle" />
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/chat" 
                className="group inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <T k="home.hero.cta.chat" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                href="/tools" 
                className="group inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/30 backdrop-blur-sm px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                <Wrench className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <T k="home.hero.cta.tools" />
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>معلومات طبية موثوقة</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>آمن وخاص</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>عربي مصري</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <T k="home.features.title" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <T k="home.features.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} whileHover={{ y: -6 }} className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-primary-50 hover:to-white transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:shadow-xl">
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <T k="home.actions.title" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <T k="home.actions.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {quickActions.map((action, index) => (
              <motion.a 
                key={index} 
                href={action.href}
                className="group block p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -8 }}
              >
                <div className="flex items-start gap-8">
                  <div className={`w-20 h-20 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <action.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {action.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {action.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-primary-600 font-bold text-lg group-hover:gap-4 transition-all duration-300">
                      <T k="home.actions.learnMore" />
                      <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <T k="home.popularTools.title" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <T k="home.popularTools.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularTools.map((tool, index) => (
              <motion.a 
                key={index} 
                href={tool.href}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:from-primary-50 hover:to-white transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:shadow-lg text-center"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <tool.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors duration-300">
                  {tool.name}
                </h3>
              </motion.a>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/tools" 
              className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Wrench className="w-5 h-5" />
              <T k="home.popularTools.viewAll" />
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <T k="home.benefits.title" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <T k="home.benefits.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <T k="home.stats.title" />
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              <T k="home.stats.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { v: '23+', k: 'home.stats.tools' },
              { v: '100%', k: 'home.stats.arabic' },
              { v: '24/7', k: 'home.stats.available' },
              { v: '∞', k: 'home.stats.free' },
            ].map((s, i) => (
              <motion.div key={s.k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                <div className="text-5xl md:text-6xl font-bold text-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">{s.v}</div>
                <div className="text-xl text-blue-200 font-semibold"><T k={s.k as any} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <T k="home.cta.title" />
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            <T k="home.cta.subtitle" />
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat" 
              className="group inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
            >
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <T k="home.cta.startChat" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              href="/tools" 
              className="group inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/30 backdrop-blur-sm px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
            >
              <Wrench className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <T k="home.cta.exploreTools" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
} 