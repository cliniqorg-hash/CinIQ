'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useLang } from './LangProvider'

const Footer = () => {
	const { t } = useLang()
	const dir = 'rtl'
	return (
		<footer className="bg-gray-900 text-white" dir={dir}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Main Footer Content */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					{/* Logo and Tagline */}
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
							<Image src="/logo.png" alt="ClinIQ logo" width={24} height={24} className="object-contain" unoptimized />
						</div>
						<div>
							<span className="text-xl font-bold">CLinIQ</span>
							<p className="text-gray-300 text-sm">{t('footer.tagline')}</p>
						</div>
					</div>

					{/* Social Links */}
					<div className="flex gap-4">
						<a 
							href="https://www.facebook.com/profile.php?id=61579092314313" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors" 
							aria-label="Facebook" 
							title={t('social.facebook')}
						>
							<Facebook className="w-5 h-5" />
						</a>
						<a 
							href="https://www.instagram.com/cliniq_org/" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors" 
							aria-label="Instagram" 
							title={t('social.instagram')}
						>
							<Instagram className="w-5 h-5" />
						</a>
						<a 
							href="https://www.linkedin.com/company/cliniq-platform" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors" 
							aria-label="LinkedIn" 
							title={t('social.linkedin')}
						>
							<Linkedin className="w-5 h-5" />
						</a>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-800 mt-6 pt-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
						<p>{t('footer.copyright')}</p>
						<div className="flex gap-6">
							<Link href="/privacy" className="hover:text-white transition-colors">
								{t('footer.privacy')}
							</Link>
							<Link href="/terms" className="hover:text-white transition-colors">
								{t('footer.terms')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer 