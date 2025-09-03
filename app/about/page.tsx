import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'عن CLinIQ — الرعاية الذكية ببساطة وبالعربي المصري',
  description: 'CLinIQ بيخلّي المعلومة الطبية أوضح وأسهل وبالعربي المصري: سؤال وجواب فوري، صوت وكتابة، شروحات بصرية، وواجهة مريحة للمصريين.',
  openGraph: {
    title: 'عن CLinIQ — الرعاية الذكية ببساطة وبالعربي المصري',
    description: 'مش ترجمة وخلاص—تجربة متصمّمة للمصريين. خصوصيتك دايمًا محفوظة.',
    type: 'website'
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  )
} 