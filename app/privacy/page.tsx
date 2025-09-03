import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - CLinIQ',
  description: 'سياسة الخصوصية لموقع CLinIQ. نلتزم بحماية خصوصيتك وضمان أمان بياناتك الشخصية عند استخدام منصتنا الطبية.',
  keywords: 'سياسة الخصوصية, حماية البيانات, خصوصية, أمان البيانات, CLinIQ',
  openGraph: {
    title: 'سياسة الخصوصية - CLinIQ',
    description: 'سياسة الخصوصية لموقع CLinIQ. نلتزم بحماية خصوصيتك وضمان أمان بياناتك الشخصية.',
    type: 'website'
  },
  robots: 'index, follow'
}

'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function PrivacyPage() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <h1 className="text-3xl font-bold mb-6">سياسة الخصوصية</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            نلتزم بحماية خصوصيتك وضمان أمان بياناتك الشخصية. هذه السياسة توضح كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدام منصة CLinIQ.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">البيانات التي نجمعها</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">البيانات الشخصية</h3>
              <p className="text-gray-700">نحتفظ بخصوصية كاملة لبياناتك. لا نجمع أو نخزن أي معلومات شخصية حساسة مثل الأسماء أو أرقام الهوية أو العناوين.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">بيانات الاستخدام</h3>
              <p className="text-gray-700">نجمع بيانات استخدام عامة ومجهولة المصدر لتحسين الخدمة وفهم كيفية استخدام المنصة.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">ملفات تعريف الارتباط</h3>
              <p className="text-gray-700">نستخدم ملفات تعريف الارتباط (Cookies) والتقنيات المشابهة لأغراض التحليل والإعلانات (مثل Google AdSense) بما يتوافق مع القوانين المعمول بها.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">كيف نستخدم بياناتك</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>تحسين جودة الخدمات المقدمة</li>
            <li>تطوير أدوات صحية جديدة ومفيدة</li>
            <li>ضمان أمان المنصة وحمايتها من التهديدات</li>
            <li>تقديم إحصائيات عامة حول استخدام المنصة</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">حماية البيانات</h2>
          <p className="text-gray-700 mb-4">
            نستخدم أحدث تقنيات الأمان لحماية بياناتك. جميع البيانات يتم تشفيرها ونقلها عبر قنوات آمنة.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">مشاركة البيانات</h2>
          <p className="text-gray-700 mb-4">
            لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>عند الحصول على موافقتك الصريحة</li>
            <li>للمطابقة مع القوانين واللوائح المعمول بها</li>
            <li>لحماية حقوقنا أو حقوق المستخدمين الآخرين</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">حقوقك</h2>
          <p className="text-gray-700 mb-4">لديك الحق في:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح أي معلومات غير دقيقة</li>
            <li>حذف بياناتك الشخصية</li>
            <li>إدارة موافقتك على استخدام ملفات تعريف الارتباط</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">التحديثات</h2>
          <p className="text-gray-700 mb-4">
            قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة من خلال المنصة.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">اتصل بنا</h2>
          <p className="text-gray-700">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا من خلال صفحة التعليقات.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}


