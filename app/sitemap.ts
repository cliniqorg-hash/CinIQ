import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cliniq-org.web.app'
  const currentDate = new Date()
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Tools detail pages
    { url: `${baseUrl}/tools/bmi`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/bmr`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/tdee`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/body-fat`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/water-intake`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/sleep-cycle`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/blood-pressure`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/heart-rate-zones`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/diabetes-risk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/cholesterol-ratio`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/egfr`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/smoking-risk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/tools/pregnancy-due-date`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/ovulation`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/pregnancy-weight-gain`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/stroke-risk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/copd-risk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/tools/cancer-screening`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/thyroid-risk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/tools/diabetic-retinopathy`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/tools/medication-dosage`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/tools/drug-interaction`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tools/lifestyle-coach`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    // Feedback page excluded - behavioral page with no-ads directive
    // Empty directories (cliniq, lab-analysis, puter-test) excluded - no content
  ]
}
