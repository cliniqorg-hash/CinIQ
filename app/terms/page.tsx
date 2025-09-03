import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الشروط والأحكام - CLinIQ',
  description: 'الشروط والأحكام لاستخدام منصة CLinIQ الطبية. اقرأ شروط الاستخدام والالتزامات قبل استخدام خدماتنا.',
  keywords: 'الشروط والأحكام, شروط الاستخدام, CLinIQ, منصة طبية, شروط الخدمة',
  openGraph: {
    title: 'الشروط والأحكام - CLinIQ',
    description: 'الشروط والأحكام لاستخدام منصة CLinIQ الطبية. اقرأ شروط الاستخدام والالتزامات قبل استخدام خدماتنا.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function TermsPage() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <h1 className="text-3xl font-bold mb-6">الشروط والأحكام</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            مرحباً بك في منصة CLinIQ. باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">قبول الشروط</h2>
          <p className="text-gray-700 mb-4">
            باستخدامك لمنصة CLinIQ، فإنك تؤكد أنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">وصف الخدمة</h2>
          <p className="text-gray-700 mb-4">
            CLinIQ هي منصة صحية ذكية تقدم:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>أدوات حساب طبية تعليمية</li>
            <li>معلومات صحية عامة</li>
            <li>نصائح صحية مبنية على الذكاء الاصطناعي</li>
            <li>حاسبات صحية متنوعة</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">الاستخدام المقبول</h2>
          <p className="text-gray-700 mb-4">يمكنك استخدام المنصة للأغراض التالية فقط:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>الحصول على معلومات صحية عامة</li>
            <li>استخدام الأدوات الحسابية المتاحة</li>
            <li>التعليم والتثقيف الصحي</li>
            <li>الاستشارة الأولية غير الطبية</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">الاستخدام المحظور</h2>
          <p className="text-gray-700 mb-4">يحظر عليك:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>استخدام المنصة للتشخيص الطبي أو العلاج</li>
            <li>مشاركة معلومات طبية خاطئة أو مضللة</li>
            <li>محاولة اختراق أو إلحاق الضرر بالمنصة</li>
            <li>استخدام المنصة لأغراض غير قانونية</li>
            <li>انتهاك حقوق الملكية الفكرية</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">إخلاء المسؤولية الطبية</h2>
          <p className="text-gray-700 mb-4">
            <strong>تنبيه مهم:</strong> جميع المعلومات والأدوات المتاحة على المنصة هي لأغراض تعليمية وتثقيفية فقط. لا تحل هذه المعلومات محل الاستشارة الطبية المهنية أو التشخيص أو العلاج.
          </p>
          <p className="text-gray-700 mb-4">
            يجب عليك دائماً استشارة مقدم الرعاية الصحية المؤهل قبل اتخاذ أي قرارات طبية أو صحية.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">الملكية الفكرية</h2>
          <p className="text-gray-700 mb-4">
            جميع المحتويات الموجودة على المنصة، بما في ذلك النصوص والصور والتصاميم والبرمجيات، محمية بحقوق الطبع والنشر والملكية الفكرية.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">تعديل الشروط</h2>
          <p className="text-gray-700 mb-4">
            نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعارك بأي تغييرات مهمة من خلال المنصة. استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك على الشروط الجديدة.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">إنهاء الخدمة</h2>
          <p className="text-gray-700 mb-4">
            نحتفظ بالحق في إنهاء أو تعليق وصولك إلى المنصة في أي وقت، خاصة في حالة انتهاك هذه الشروط والأحكام.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">القانون المطبق</h2>
          <p className="text-gray-700 mb-4">
            تخضع هذه الشروط والأحكام للقوانين المعمول بها في جمهورية مصر العربية. أي نزاعات ستخضع للاختصاص القضائي للمحاكم المختصة.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">اتصل بنا</h2>
          <p className="text-gray-700">
            إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا من خلال صفحة التعليقات.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}


