import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NoAdsMeta from '../../components/NoAdsMeta';
import { getTranslation } from '../../lib/i18n';

export const metadata = {
  title: 'التعليقات والاقتراحات - CLinIQ',
  description: 'شاركنا آراءك واقتراحاتك لتحسين منصة CLinIQ الطبية. نقدّر تعليقاتك ونعمل على تطوير الخدمة باستمرار.',
  robots: 'noindex, nofollow'
}

export default function FeedbackPage() {
  return (
    <>
      <NoAdsMeta reason="behavioral" />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">التعليقات والاقتراحات</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              نقدّر آراءك واقتراحاتك لتحسين منصة CLinIQ الطبية
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">شاركنا تجربتك</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحن نعمل باستمرار على تحسين منصة CLinIQ لتقديم أفضل تجربة طبية ممكنة. 
                  تعليقاتك واقتراحاتك تساعدنا في تطوير الخدمة وتقديم محتوى أكثر فائدة.
                </p>
              </div>
              
              <div className="w-full max-w-4xl mx-auto">
                <div className="w-full h-[70vh] sm:h-[75vh] lg:h-[80vh] min-h-[480px]">
                  <iframe
                    src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__56fn45UMjdDNDZCTFRVS04yMjVBUVZBQzlVMVEzTC4u&embed=true"
                    title="نموذج التعليقات والاقتراحات"
                    className="w-full h-full rounded-lg border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  جميع التعليقات محمية بسياسة الخصوصية الخاصة بنا
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
