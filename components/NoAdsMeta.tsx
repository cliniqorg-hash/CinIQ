'use client'

interface NoAdsMetaProps {
  reason?: 'navigation' | 'minimal-content' | 'under-construction' | 'behavioral'
}

export default function NoAdsMeta({ reason = 'minimal-content' }: NoAdsMetaProps) {
  const reasons = {
    'navigation': 'صفحة تنقل - لا تحتوي على محتوى كافي للإعلانات',
    'minimal-content': 'محتوى محدود - لا يلبي معايير جوجل للإعلانات',
    'under-construction': 'صفحة قيد الإنشاء - غير مكتملة',
    'behavioral': 'صفحة سلوكية - مخصصة للتفاعل فقط'
  }

  return (
    <>
      <meta name="google-adsense-account" content="" />
      <meta name="google-adsense-platform" content="" />
      <meta name="ads.txt" content="disabled" />
      <meta name="google-adsense-allow" content="false" />
      <meta name="adsense-allow" content="false" />
      <meta name="no-ads" content="true" />
      <meta name="ads-reason" content={reasons[reason]} />
    </>
  )
}
