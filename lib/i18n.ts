// Internationalization (i18n) configuration
// Arabic-only version

export type Locale = 'ar'

// Default language is Arabic
export const defaultLocale: Locale = 'ar'

// Get text direction (always RTL for Arabic)
export function getDir(): 'rtl' {
	return 'rtl'
}

// Translation messages structure - Arabic only
export const messages: Record<Locale, Record<string, string>> = {
	ar: {
		// Core Navigation
		'nav.home': 'الرئيسية',
		'nav.tools': 'الأدوات',
		'nav.about': 'حولنا',
		'nav.contact': 'تواصل معانا',
		'nav.language': 'اللغة',
		'nav.menu': 'القائمة',
		'nav.close': 'إغلاق',
		
		// Essential UI Components
		'common.loading': 'بيحمل...',
		'common.error': 'حصل غلط',
		'common.success': 'تمام',
		'common.back': 'رجع',
		'common.next': 'التالي',
		'common.submit': 'أرسل',
		'common.cancel': 'إلغاء',
		'common.save': 'احفظ',
		'common.edit': 'عدل',
		'common.delete': 'امسح',
		'common.confirm': 'تأكيد',
		'common.close': 'اقفل',
		'common.yes': 'آه',
		'common.no': 'لأ',
		'common.ok': 'تمام',
		'common.required': 'مطلوب',
		'common.optional': 'اختياري',
		'common.help': 'مساعدة',
		'common.search': 'دور',
		'common.select': 'اختار',
		'common.clear': 'امسح',
		'common.reset': 'اعمل ريست',
		
		// Basic Validation Messages
		'validation.required': 'هذا الحقل لازم يبقى مكتوب',
		'validation.number': 'اكتب رقم صح',
		'validation.positive': 'الرقم لازم يبقى موجب',
		'validation.range': 'الرقم مش في النطاق المطلوب',
		'validation.email': 'اكتب إيميل صح',
		'validation.minLength': 'النص لازم يبقى أطول من {min} حرف',
		'validation.maxLength': 'النص لازم يبقى أقصر من {max} حرف',
		
		// Home Page
		'home.hero.title': 'CLinIQ - رعاية صحية بالذكاء الاصطناعي',
		'home.hero.subtitle': 'منصّة رعاية صحية ذكية تقدّم استشارات طبية ونصائح موثوقة بلُغة مصرية بسيطة',
		'home.hero.cta': 'ابدأ دلوقتي',
		'home.hero.description': 'مجموعة شاملة من الحاسبات الصحية المدعومة بالذكاء الاصطناعي',
		
		// Tools
		'tools.index.title': 'أدوات صحية',
		'tools.index.description': 'اختر من مجموعة شاملة من الأدوات الصحية',
		'tools.index.subtitle': 'حاسبات طبية دقيقة ومفصلة',
		
		// Tools Tabs
		'tools.tabs.tool': 'الأداة',
		'tools.tabs.info': 'المعلومات',
		'tools.tabs.help': 'المساعدة',
		
		// Tools Common
		'tools.inputs': 'المدخلات',
		'tools.results.title': 'النتائج',
		'tools.actions.calculate': 'احسب',
		'tools.units.kcalPerDay': 'سعرة حرارية/يوم',
		'tools.units.kg': 'كيلوجرام',
		'tools.units.cm': 'سنتيمتر',
		'tools.units.years': 'سنة',
		'tools.units.ml': 'ملليلتر',
		'tools.units.liters': 'لتر',
		'tools.units.cups': 'كوب',
		'tools.units.hours': 'ساعة',
		'tools.units.bpm': 'نبضة/دقيقة',
		'tools.units.mmhg': 'ملم زئبق',
		'tools.units.percentage': 'نسبة مئوية',
		
		// Common Inputs
		'tools.inputs.weight': 'الوزن (كيلوجرام)',
		'tools.inputs.height': 'الطول (سنتيمتر)',
		'tools.inputs.age': 'العمر (سنة)',
		'tools.inputs.unit': 'الوحدة',
		
		// Gender
		'tools.gender.male': 'ذكر',
		'tools.gender.female': 'أنثى',
		
		// Common Yes/No
		'tools.common.yes': 'نعم',
		'tools.common.no': 'لا',
		
		// Generic Recommendations
		'tools.generic.recommendations': 'توصيات',
		
		// Tools Info
		'tools.info.whatItDoes': 'ما تفعله هذه الأداة',
		'tools.info.howToUse': 'كيفية الاستخدام',
		'tools.info.inputGuide': 'دليل المدخلات',
		'tools.info.resultExplanation': 'شرح النتائج',
		'tools.info.medicalDisclaimer': 'هذه الأداة للأغراض التعليمية فقط ولا تحل محل الاستشارة الطبية المهنية.',
		
		// Tools Help
		'tools.help.title': 'المساعدة',
		'tools.help.whenToUse': 'متى تستخدم هذه الأداة',
		'tools.help.whenToUseDesc': 'استخدم هذه الأداة للحصول على تقدير عام لصحتك. لا تحل محل الفحص الطبي المهني.',
		'tools.help.limitations': 'القيود',
		'tools.help.limitationsDesc': 'هذه الأداة تعطي تقديرات عامة وقد لا تنطبق على جميع الحالات.',
		'tools.help.consultDoctor': 'استشر طبيبك',
		'tools.help.consultDoctorDesc': 'استشر طبيبك للحصول على تشخيص دقيق وخطة علاج مناسبة.',
		
		// BMI Calculator
		'tools.bmi.title': 'حاسبة مؤشر كتلة الجسم',
		'tools.bmi.description': 'احسب مؤشر كتلة الجسم لمعرفة وزنك المثالي',
		
		// BMI Info
		'tools.bmi.info.whatItDoes': 'تحسب مؤشر كتلة الجسم (BMI) لتقييم وزنك بالنسبة لطولك.',
		'tools.bmi.info.howToUse': 'أدخل وزنك وطولك للحصول على مؤشر كتلة الجسم وتقييم وزنك.',
		'tools.bmi.info.inputGuide': 'استخدم قياسات دقيقة للوزن والطول. يمكنك اختيار الطول بالسنتيمتر أو المتر.',
		'tools.bmi.info.resultExplanation': 'مؤشر كتلة الجسم يساعد في تقييم وزنك. النتائج مقسمة إلى فئات: نقص وزن، طبيعي، وزن زائد، سمنة.',
		
		// BMI Results
		'tools.bmi.results.bmiLabel': 'مؤشر كتلة الجسم',
		'tools.bmi.results.categoryLabel': 'الفئة',
		'tools.bmi.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// BMI Categories
		'tools.bmi.category.underweight': 'نقص وزن',
		'tools.bmi.category.normal': 'وزن طبيعي',
		'tools.bmi.category.overweight': 'وزن زائد',
		'tools.bmi.category.obese': 'سمنة',
		
		// BMI Explanations
		'tools.bmi.explain.underweight': 'مؤشر كتلة الجسم أقل من 18.5. قد تحتاج لزيادة الوزن تحت إشراف طبي.',
		'tools.bmi.explain.normal': 'مؤشر كتلة الجسم بين 18.5-24.9. هذا هو الوزن الصحي المثالي.',
		'tools.bmi.explain.overweight': 'مؤشر كتلة الجسم بين 25-29.9. يُنصح بفقدان بعض الوزن.',
		'tools.bmi.explain.obese': 'مؤشر كتلة الجسم 30 أو أكثر. يُنصح بفقدان الوزن تحت إشراف طبي.',
		
		// BMI Recommendations
		'tools.bmi.recommendations.underweight.1': 'استشر طبيبك لمعرفة سبب نقص الوزن',
		'tools.bmi.recommendations.underweight.2': 'اتبع نظام غذائي صحي لزيادة الوزن',
		'tools.bmi.recommendations.underweight.3': 'مارس تمارين القوة لبناء العضلات',
		'tools.bmi.recommendations.normal.1': 'حافظ على وزنك الحالي بنظام غذائي متوازن',
		'tools.bmi.recommendations.normal.2': 'مارس الرياضة بانتظام للحفاظ على صحتك',
		'tools.bmi.recommendations.overweight.1': 'اتبع نظام غذائي صحي منخفض السعرات',
		'tools.bmi.recommendations.overweight.2': 'مارس الرياضة بانتظام لفقدان الوزن',
		'tools.bmi.recommendations.overweight.3': 'استشر أخصائي تغذية للحصول على خطة مناسبة',
		'tools.bmi.recommendations.obese.1': 'استشر طبيبك لوضع خطة فقدان وزن آمنة',
		'tools.bmi.recommendations.obese.2': 'اتبع نظام غذائي صحي تحت إشراف طبي',
		'tools.bmi.recommendations.obese.3': 'مارس الرياضة تدريجياً وبانتظام',
		
		// BMI Errors
		'tools.bmi.errors.invalidInputs': 'يرجى إدخال قيم صحيحة للوزن والطول',
		'tools.bmi.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// BMR Calculator
		'tools.bmr.title': 'حاسبة معدل الأيض الأساسي',
		'tools.bmr.description': 'احسب معدل الأيض الأساسي لمعرفة احتياجاتك من السعرات الحرارية',
		'tools.bmr.age': 'العمر',
		'tools.bmr.gender': 'الجنس',
		'tools.bmr.male': 'ذكر',
		'tools.bmr.female': 'أنثى',
		'tools.bmr.weight': 'الوزن',
		'tools.bmr.height': 'الطول',
		'tools.bmr.activity': 'مستوى النشاط',
		'tools.bmr.sedentary': 'قليل النشاط',
		'tools.bmr.light': 'نشاط خفيف',
		'tools.bmr.moderate': 'نشاط متوسط',
		'tools.bmr.active': 'نشاط عالي',
		'tools.bmr.veryActive': 'نشاط عالي جداً',
		
		// BMR Inputs
		'tools.bmr.inputs.age': 'العمر',
		'tools.bmr.inputs.gender': 'الجنس',
		'tools.bmr.inputs.activityLevel': 'مستوى النشاط',
		'tools.bmr.inputs.activityLevel.sedentary': 'قليل النشاط (لا تمارين)',
		'tools.bmr.inputs.activityLevel.light': 'نشاط خفيف (تمارين خفيفة 1-3 أيام/أسبوع)',
		'tools.bmr.inputs.activityLevel.moderate': 'نشاط متوسط (تمارين متوسطة 3-5 أيام/أسبوع)',
		'tools.bmr.inputs.activityLevel.active': 'نشط (تمارين شاقة 6-7 أيام/أسبوع)',
		'tools.bmr.inputs.activityLevel.veryActive': 'نشط جداً (تمارين شاقة جداً، عمل بدني)',
		
		// BMR Results
		'tools.bmr.results.bmrLabel': 'معدل الأيض الأساسي',
		'tools.bmr.results.tdeeLabel': 'إجمالي الإنفاق اليومي للطاقة',
		'tools.bmr.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// BMR Errors
		'tools.bmr.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.bmr.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// BMR Info
		'tools.bmr.info.whatItDoes': 'تحسب معدل الأيض الأساسي (BMR) وإجمالي الإنفاق اليومي للطاقة (TDEE) بناءً على بياناتك الشخصية.',
		'tools.bmr.info.howToUse': 'أدخل وزنك، طولك، عمرك، جنسك، ومستوى نشاطك البدني.',
		'tools.bmr.info.inputGuide': 'استخدم مقياس دقيق للوزن والطول. اختر مستوى النشاط الذي يناسب نمط حياتك.',
		'tools.bmr.info.resultExplanation': 'BMR هو عدد السعرات الحرارية التي يحتاجها جسمك للوظائف الأساسية. TDEE هو إجمالي السعرات الحرارية المطلوبة يومياً.',
		
		// Blood Pressure
		'tools.bloodPressure.title': 'حاسبة ضغط الدم',
		'tools.bloodPressure.description': 'احسب مؤشرات ضغط الدم',
		'tools.bloodPressure.systolic': 'الضغط الانقباضي',
		'tools.bloodPressure.diastolic': 'الضغط الانبساطي',
		'tools.bloodPressure.normal': 'طبيعي',
		'tools.bloodPressure.elevated': 'مرتفع',
		'tools.bloodPressure.hypertension1': 'ارتفاع ضغط الدم - المرحلة الأولى',
		'tools.bloodPressure.hypertension2': 'ارتفاع ضغط الدم - المرحلة الثانية',
		'tools.bloodPressure.crisis': 'أزمة ارتفاع ضغط الدم',
		
		// Blood Pressure Inputs
		'tools.bloodPressure.inputs.systolic': 'الضغط الانقباضي (ملم زئبق)',
		'tools.bloodPressure.inputs.diastolic': 'الضغط الانبساطي (ملم زئبق)',
		
		// Blood Pressure Results
		'tools.bloodPressure.results.systolicLabel': 'الضغط الانقباضي',
		'tools.bloodPressure.results.diastolicLabel': 'الضغط الانبساطي',
		'tools.bloodPressure.results.categoryLabel': 'التصنيف',
		'tools.bloodPressure.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Blood Pressure Categories
		'tools.bloodPressure.category.normal': 'طبيعي',
		'tools.bloodPressure.category.elevated': 'مرتفع',
		'tools.bloodPressure.category.hypertension1': 'ارتفاع ضغط الدم - المرحلة الأولى',
		'tools.bloodPressure.category.hypertension2': 'ارتفاع ضغط الدم - المرحلة الثانية',
		'tools.bloodPressure.category.hypertensiveCrisis': 'أزمة ارتفاع ضغط الدم',
		
		// Blood Pressure Explanations
		'tools.bloodPressure.explain.normal': 'ضغط دم طبيعي وصحي.',
		'tools.bloodPressure.explain.elevated': 'ضغط دم مرتفع قليلاً، يحتاج مراقبة.',
		'tools.bloodPressure.explain.hypertension1': 'ارتفاع ضغط دم خفيف، يحتاج تغيير نمط الحياة.',
		'tools.bloodPressure.explain.hypertension2': 'ارتفاع ضغط دم متوسط، يحتاج علاج طبي.',
		'tools.bloodPressure.explain.hypertensiveCrisis': 'ارتفاع ضغط دم خطير، يحتاج رعاية طبية فورية.',
		
		// Blood Pressure Recommendations
		'tools.bloodPressure.recommendations.normal.1': 'حافظ على نمط حياة صحي',
		'tools.bloodPressure.recommendations.normal.2': 'راقب ضغط دمك بانتظام',
		'tools.bloodPressure.recommendations.elevated.1': 'قلل من الملح في الطعام',
		'tools.bloodPressure.recommendations.elevated.2': 'مارس الرياضة بانتظام',
		'tools.bloodPressure.recommendations.elevated.3': 'تجنب التدخين والكحول',
		'tools.bloodPressure.recommendations.hypertension1.1': 'استشر طبيبك فوراً',
		'tools.bloodPressure.recommendations.hypertension1.2': 'اتبع نظام غذائي صحي',
		'tools.bloodPressure.recommendations.hypertension1.3': 'مارس الرياضة بانتظام',
		'tools.bloodPressure.recommendations.hypertension2.1': 'استشر طبيبك فوراً',
		'tools.bloodPressure.recommendations.hypertension2.2': 'اتبع العلاج الموصوف',
		'tools.bloodPressure.recommendations.hypertension2.3': 'غير نمط حياتك',
		'tools.bloodPressure.recommendations.hypertensiveCrisis.1': 'اطلب المساعدة الطبية فوراً',
		'tools.bloodPressure.recommendations.hypertensiveCrisis.2': 'لا تتجاهل هذه الأعراض',
		
		// Blood Pressure Errors
		'tools.bloodPressure.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.bloodPressure.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// Blood Pressure Info
		'tools.bloodPressure.info.whatItDoes': 'تصنف قراءات ضغط الدم وتقدم توصيات صحية مناسبة.',
		'tools.bloodPressure.info.howToUse': 'أدخل قراءة الضغط الانقباضي والانبساطي.',
		'tools.bloodPressure.info.inputGuide': 'استخدم جهاز قياس ضغط الدم المعتمد. قم بالقياس في الصباح قبل الأكل.',
		'tools.bloodPressure.info.resultExplanation': 'التصنيف يعتمد على المعايير الطبية المعتمدة لضغط الدم.',
		
		// Cholesterol
		'tools.cholesterol.title': 'حاسبة الكوليسترول',
		'tools.cholesterol.description': 'احسب مؤشرات الكوليسترول',
		'tools.cholesterol.total': 'إجمالي الكوليسترول',
		'tools.cholesterol.hdl': 'الكوليسترول الجيد (HDL)',
		'tools.cholesterol.ldl': 'الكوليسترول الضار (LDL)',
		'tools.cholesterol.triglycerides': 'الدهون الثلاثية',
		
		// Blood Sugar
		'tools.bloodSugar.title': 'حاسبة سكر الدم',
		'tools.bloodSugar.description': 'احسب مؤشرات سكر الدم',
		'tools.bloodSugar.fasting': 'سكر الدم الصائم',
		'tools.bloodSugar.postprandial': 'سكر الدم بعد الأكل',
		'tools.bloodSugar.hba1c': 'الهيموغلوبين السكري (HbA1c)',
		
		// Footer
		'footer.copyright': 'جميع الحقوق محفوظة © 2024',
		'footer.privacy': 'سياسة الخصوصية',
		'footer.terms': 'الشروط والأحكام',
		'footer.about': 'حول الموقع',
		'footer.tagline': 'أدوات صحية ذكية لصحة أحسن',
		'footer.quickLinks': 'روابط سريعة',
		'footer.tools': 'الأدوات',
		'footer.contact': 'تواصل معانا',
		'footer.privacyLine': 'احنا بنحترم خصوصيتك',
		
		// Navigation
		'nav.chat': 'المحادثة',
		'nav.feedback': 'التعليقات',
		'nav.cta': 'ابدأ دلوقتي',
		'nav.languageLabel': 'اختار اللغة',
		
		// Chat
		'chat.welcome': 'أهلاً! إزاي أقدر أساعدك النهاردة؟',
		'chat.title': 'المساعد الصحي الذكي',
		'chat.aiThinking': 'بفكر...',
		'chat.toLatest': 'روح لآخر رسالة',
		

		

		
		// Water Intake Tool
		'tools.waterIntake.title': 'حاسبة شرب المية',
		'tools.waterIntake.description': 'احسب احتياجاتك اليومية من المية',
		'tools.waterIntake.info.whatItDoes': 'تحسب كمية المية اليومية اللي محتاجها بناءً على وزنك ونشاطك والجو.',
		'tools.waterIntake.info.howToUse': 'اكتب وزنك ومستوى نشاطك والجو عشان تحصل على التوصية اليومية.',
		'tools.waterIntake.info.inputGuide': 'استخدم ميزان دقيق للوزن واختار مستوى النشاط الأقرب لطريقة حياتك.',
		'tools.waterIntake.info.resultExplanation': 'النتيجة هتعطيك كمية المية المطلوبة بالملليلتر واللتر والأكواب.',
		'tools.waterIntake.info.medicalDisclaimer': 'تنبيه طبي: الأداة دي للتعليم بس.',
		'tools.waterIntake.inputs.weight': 'الوزن (كجم)',
		'tools.waterIntake.inputs.activityLevel': 'مستوى النشاط',
		'tools.waterIntake.inputs.activityLevel.sedentary': 'قليل النشاط',
		'tools.waterIntake.inputs.activityLevel.moderate': 'نشاط متوسط',
		'tools.waterIntake.inputs.activityLevel.high': 'نشاط عالي',
		'tools.waterIntake.inputs.climate': 'المناخ',
		'tools.waterIntake.inputs.climate.normal': 'عادي',
		'tools.waterIntake.inputs.climate.hot': 'حار',
		'tools.waterIntake.results.dailyIntake': 'الاستهلاك اليومي:',
		'tools.waterIntake.explain': 'شرح النتائج',
		'tools.waterIntake.recommendations.1': 'اشرب مية بانتظام طول اليوم',
		'tools.waterIntake.recommendations.2': 'زد شرب المية لما تعمل رياضة',
		'tools.waterIntake.recommendations.3': 'راقب لون البول عشان تعرف لو محتاج مية أكتر',
		'tools.waterIntake.recommendations.4': 'روح للدكتور لو عندك مشاكل صحية خاصة',
		'tools.waterIntake.recommendations.5': 'خلي بالك إن الأكل فيه مية كمان',
		'tools.waterIntake.results.placeholder': 'اكتب البيانات واضغط احسب عشان تشوف النتائج',
		
		// Thyroid Risk Tool
		'tools.thyroidRisk.title': 'تقييم مخاطر الغدة الدرقية',
		'tools.thyroidRisk.description': 'تقييم مخاطر اضطرابات الغدة الدرقية',
		'tools.thyroidRisk.info.whatItDoes': 'يقيم مخاطر اضطرابات الغدة الدرقية بناءً على الأعراض.',
		'tools.thyroidRisk.info.howToUse': 'أجب على الأسئلة حول الأعراض التي تعاني منها.',
		'tools.thyroidRisk.info.inputGuide': 'أجب بصدق على جميع الأسئلة للحصول على تقييم دقيق.',
		'tools.thyroidRisk.info.resultExplanation': 'النتيجة تعطي تقييماً للمخاطر ونوع الاضطراب المشتبه به.',
		'tools.thyroidRisk.instructions': 'أجب على الأسئلة التالية لتقييم مخاطر اضطرابات الغدة الدرقية:',
		'tools.thyroidRisk.inputs.fatigue': 'هل تعاني من التعب المستمر؟',
		'tools.thyroidRisk.inputs.weightGain': 'هل لاحظت زيادة في الوزن؟',
		'tools.thyroidRisk.inputs.weightLoss': 'هل لاحظت فقداناً في الوزن؟',
		'tools.thyroidRisk.inputs.coldIntolerance': 'هل تعاني من عدم تحمل البرد؟',
		'tools.thyroidRisk.inputs.heatIntolerance': 'هل تعاني من عدم تحمل الحرارة؟',
		'tools.thyroidRisk.inputs.palpitations': 'هل تعاني من خفقان القلب؟',
		'tools.thyroidRisk.inputs.moodChanges': 'هل لاحظت تغيرات في المزاج؟',
		'tools.thyroidRisk.inputs.hairOrNailChanges': 'هل لاحظت تغيرات في الشعر أو الأظافر؟',
		'tools.thyroidRisk.results.scoreLabel': 'النتيجة',
		'tools.thyroidRisk.results.riskLabel': 'مستوى المخاطر',
		'tools.thyroidRisk.risk.low': 'منخفض',
		'tools.thyroidRisk.risk.moderate': 'متوسط',
		'tools.thyroidRisk.risk.high': 'عالي',
		'tools.thyroidRisk.risk.veryHigh': 'عالي جداً',
		'tools.thyroidRisk.results.suspectedTypeLabel': 'النوع المشتبه به',
		'tools.thyroidRisk.type.hypo': 'قصور الغدة الدرقية',
		'tools.thyroidRisk.type.hyper': 'فرط نشاط الغدة الدرقية',
		'tools.thyroidRisk.type.indeterminate': 'غير محدد',
		'tools.thyroidRisk.explain': 'نقاط الأعراض تشير إلى مستوى مخاطر اضطرابات الغدة الدرقية. النقاط الأعلى تشير إلى احتمالية أكبر لخلل الغدة الدرقية. النوع المشتبه به يشير إلى ما إذا كانت الأعراض تشير إلى قصور الغدة الدرقية أو فرط نشاطها أو غير محدد.',
		'tools.thyroidRisk.recommendations.1': 'استشر مقدم الرعاية الصحية للتقييم المناسب',
		'tools.thyroidRisk.recommendations.2': 'احصل على فحوصات وظائف الغدة الدرقية (TSH, T3, T4) إذا أوصى بها الطبيب',
		'tools.thyroidRisk.recommendations.3': 'راقب الأعراض وأبلغ عن التغييرات',
		'tools.thyroidRisk.recommendations.4': 'لا تشخص أو تعالج نفسك',
		'tools.thyroidRisk.recommendations.5': 'فكر في رؤية أخصائي الغدد الصماء للرعاية المتخصصة',
		'tools.thyroidRisk.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// TDEE Tool
		'tools.tdee.title': 'حاسبة إجمالي الإنفاق اليومي للطاقة',
		'tools.tdee.description': 'احسب إجمالي السعرات الحرارية التي تحرقها يومياً',
		'tools.tdee.inputs.bmr': 'معدل الأيض الأساسي (BMR)',
		'tools.tdee.inputs.activityLevel': 'مستوى النشاط',
		'tools.tdee.inputs.activityLevel.sedentary': 'قليل النشاط (لا تمارين)',
		'tools.tdee.inputs.activityLevel.light': 'نشاط خفيف (تمارين خفيفة 1-3 أيام/أسبوع)',
		'tools.tdee.inputs.activityLevel.moderate': 'نشاط متوسط (تمارين متوسطة 3-5 أيام/أسبوع)',
		'tools.tdee.inputs.activityLevel.active': 'نشط (تمارين شاقة 6-7 أيام/أسبوع)',
		'tools.tdee.inputs.activityLevel.veryActive': 'نشط جداً (تمارين شاقة جداً، عمل بدني)',
		'tools.tdee.results.tdeeLabel': 'إجمالي الإنفاق اليومي للطاقة',
		'tools.tdee.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		'tools.tdee.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.tdee.errors.computeFailed': 'حدث خطأ في الحساب',
		'tools.sleepCycle.description': 'احسب دورة نومك المثالية للحصول على راحة أفضل',
		'tools.diabetesRisk.description': 'تقييم مخاطر الإصابة بمرض السكري بناءً على عوامل الخطر',
		
		// Diabetes Risk Inputs
		'tools.diabetesRisk.inputs.age': 'العمر',
		'tools.diabetesRisk.inputs.gender': 'الجنس',
		'tools.diabetesRisk.inputs.bmi': 'مؤشر كتلة الجسم',
		'tools.diabetesRisk.inputs.waistCircumference': 'محيط الخصر (سنتيمتر)',
		'tools.diabetesRisk.inputs.physicalActivity': 'مستوى النشاط البدني',
		'tools.diabetesRisk.inputs.physicalActivity.lt4': 'أقل من 4 ساعات/أسبوع',
		'tools.diabetesRisk.inputs.physicalActivity._4_7': '4-7 ساعات/أسبوع',
		'tools.diabetesRisk.inputs.physicalActivity.gt7': 'أكثر من 7 ساعات/أسبوع',
		'tools.diabetesRisk.inputs.familyHistory': 'تاريخ عائلي لمرض السكري',
		
		// Diabetes Risk Results
		'tools.diabetesRisk.results.scoreLabel': 'نقاط المخاطر',
		'tools.diabetesRisk.results.riskLabel': 'مستوى المخاطر',
		'tools.diabetesRisk.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Diabetes Risk Levels
		'tools.diabetesRisk.level.low': 'منخفض',
		'tools.diabetesRisk.level.moderate': 'متوسط',
		'tools.diabetesRisk.level.high': 'عالي',
		'tools.diabetesRisk.level.veryHigh': 'عالي جداً',
		'tools.diabetesRisk.risk.low': 'منخفض',
		'tools.diabetesRisk.risk.moderate': 'متوسط',
		'tools.diabetesRisk.risk.high': 'عالي',
		'tools.diabetesRisk.risk.veryHigh': 'عالي جداً',
		
		// Diabetes Risk Errors
		'tools.diabetesRisk.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.diabetesRisk.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// Diabetes Risk Recommendations
		'tools.diabetesRisk.recommendations.moderate.1': 'مارس الرياضة بانتظام',
		'tools.diabetesRisk.recommendations.moderate.2': 'اتبع نظام غذائي صحي',
		'tools.diabetesRisk.recommendations.moderate.3': 'راقب وزنك ومحيط خصرك',
		'tools.diabetesRisk.recommendations.high.1': 'استشر طبيبك للفحص الدوري',
		'tools.diabetesRisk.recommendations.veryHigh.1': 'اطلب استشارة طبية فورية',
		'tools.diabetesRisk.recommendations.low.1': 'حافظ على نمط حياة صحي',
		'tools.diabetesRisk.recommendations.low.2': 'مارس الرياضة بانتظام',
		'tools.diabetesRisk.recommendations.high.2': 'اتبع نظام غذائي صحي',
		'tools.diabetesRisk.recommendations.veryHigh.2': 'راقب مستوى السكر في الدم',
		
		// Diabetes Risk Info
		'tools.diabetesRisk.info.whatItDoes': 'تقييم مخاطر الإصابة بمرض السكري بناءً على عوامل الخطر المختلفة.',
		'tools.diabetesRisk.info.howToUse': 'أدخل بياناتك الشخصية وعوامل الخطر.',
		'tools.diabetesRisk.info.inputGuide': 'استخدم قياسات دقيقة للوزن والطول ومحيط الخصر.',
		'tools.diabetesRisk.info.resultExplanation': 'النقاط تعطي تقدير لمخاطر الإصابة بمرض السكري.',
		'tools.smokingRisk.description': 'تقييم المخاطر الصحية المرتبطة بالتدخين',
		
		// Smoking Risk Inputs
		'tools.smokingRisk.inputs.age': 'العمر',
		'tools.smokingRisk.inputs.cigarettesPerDay': 'عدد السجائر يومياً',
		'tools.smokingRisk.inputs.yearsSmoked': 'عدد سنوات التدخين',
		
		// Smoking Risk Results
		'tools.smokingRisk.results.packYears': 'سنوات العبوات',
		'tools.smokingRisk.results.lungAge': 'عمر الرئتين',
		'tools.smokingRisk.results.riskLabel': 'مستوى المخاطر',
		'tools.smokingRisk.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Smoking Risk Levels
		'tools.smokingRisk.risk.low': 'منخفض',
		'tools.smokingRisk.risk.moderate': 'متوسط',
		'tools.smokingRisk.risk.high': 'عالي',
		'tools.smokingRisk.risk.veryHigh': 'عالي جداً',
		
		// Smoking Risk Recommendations
		'tools.smokingRisk.recommendations.1': 'توقف عن التدخين فوراً',
		'tools.smokingRisk.recommendations.2': 'استشر طبيبك للحصول على مساعدة في الإقلاع',
		'tools.smokingRisk.recommendations.3': 'فكر في استخدام بدائل النيكوتين',
		'tools.smokingRisk.recommendations.4': 'انضم إلى برامج الإقلاع عن التدخين',
		'tools.smokingRisk.recommendations.5': 'مارس الرياضة لتحسين صحة الرئتين',
		
		// Smoking Risk Errors
		'tools.smokingRisk.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.smokingRisk.errors.computeFailed': 'حدث خطأ في الحساب',
		'tools.smokingRisk.explain': 'سنوات التدخين تقيس إجمالي تعرضك للتدخين (سنة تدخين واحدة = 20 سيجارة/يوم لمدة سنة). عمر الرئة يمثل العمر الذي تعمل به رئتاك بسبب أضرار التدخين. سنوات التدخين وعمر الرئة الأعلى يشير إلى مخاطر صحية أكبر.',
		
		// Smoking Risk Info
		'tools.smokingRisk.info.whatItDoes': 'تقييم المخاطر الصحية المرتبطة بالتدخين بناءً على سنوات التدخين وعدد السجائر.',
		'tools.smokingRisk.info.howToUse': 'أدخل عمرك وعدد السجائر التي تدخنها يومياً وعدد سنوات التدخين.',
		'tools.smokingRisk.info.inputGuide': 'استخدم أرقام دقيقة. سنوات العبوات = (عدد السجائر يومياً ÷ 20) × سنوات التدخين.',
		'tools.smokingRisk.info.resultExplanation': 'سنوات العبوات تقيس إجمالي التعرض للتدخين. عمر الرئتين يقدر الضرر الذي لحق بالرئتين.',
		'tools.pregnancyWeightGain.description': 'احسب زيادة الوزن المثالية أثناء الحمل',
		
		// Pregnancy Weight Gain Inputs
		'tools.pregnancyWeightGain.inputs.preWeight': 'الوزن قبل الحمل (كيلوجرام)',
		'tools.pregnancyWeightGain.inputs.currentWeight': 'الوزن الحالي (كيلوجرام)',
		'tools.pregnancyWeightGain.inputs.height': 'الطول (سنتيمتر)',
		'tools.pregnancyWeightGain.inputs.gestationalWeek': 'أسبوع الحمل الحالي',
		
		// Pregnancy Weight Gain Results
		'tools.pregnancyWeightGain.results.preBmi': 'مؤشر كتلة الجسم قبل الحمل',
		'tools.pregnancyWeightGain.results.bmiCategory': 'فئة مؤشر كتلة الجسم',
		'tools.pregnancyWeightGain.results.recommendedTotal': 'الزيادة الموصى بها إجمالاً',
		'tools.pregnancyWeightGain.results.recommendedToDate': 'الزيادة الموصى بها حتى الآن',
		'tools.pregnancyWeightGain.results.currentGain': 'الزيادة الحالية',
		'tools.pregnancyWeightGain.results.status': 'الحالة',
		'tools.pregnancyWeightGain.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Pregnancy Weight Gain Status
		'tools.pregnancyWeightGain.status.below': 'أقل من الموصى به',
		'tools.pregnancyWeightGain.status.within': 'ضمن النطاق الموصى به',
		'tools.pregnancyWeightGain.status.above': 'أكثر من الموصى به',
		
		// Pregnancy Weight Gain Errors
		'tools.pregnancyWeightGain.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.pregnancyWeightGain.errors.computeFailed': 'حدث خطأ في الحساب',
		'tools.pregnancyWeightGain.explain': 'مؤشر كتلة الجسم قبل الحمل يحدد نطاق زيادة الوزن الموصى به. الحاسبة تظهر مقدار الوزن الذي يجب أن تكتسبيه بحلول أسبوع الحمل الحالي وتقارنه بزيادة الوزن الفعلية لتقييم ما إذا كنت على المسار الصحيح.',
		'tools.pregnancyWeightGain.recommendations.1': 'هذه إرشادات عامة - قد تختلف الاحتياجات الفردية',
		'tools.pregnancyWeightGain.recommendations.2': 'استشيري مقدم الرعاية الصحية للحصول على نصيحة شخصية',
		'tools.pregnancyWeightGain.recommendations.3': 'ركزي على الأكل الصحي، وليس فقط زيادة الوزن',
		'tools.pregnancyWeightGain.recommendations.4': 'أنماط زيادة الوزن يمكن أن تختلف بشكل كبير',
		'tools.pregnancyWeightGain.recommendations.5': 'راقبي صحتك ونمو طفلك',
		
		// Pregnancy Weight Gain Info
		'tools.pregnancyWeightGain.info.whatItDoes': 'تحسب زيادة الوزن المثالية أثناء الحمل بناءً على مؤشر كتلة الجسم قبل الحمل وأسبوع الحمل.',
		'tools.pregnancyWeightGain.info.howToUse': 'أدخل وزنك قبل الحمل والوزن الحالي والطول وأسبوع الحمل الحالي.',
		'tools.pregnancyWeightGain.info.inputGuide': 'استخدم قياسات دقيقة. مؤشر كتلة الجسم قبل الحمل يحدد نطاق زيادة الوزن الموصى به.',
		'tools.pregnancyWeightGain.info.resultExplanation': 'زيادة الوزن المثالية تختلف حسب مؤشر كتلة الجسم قبل الحمل. النطاقات الموصى بها تعتمد على إرشادات طبية معتمدة.',
		'tools.heartRateZones.description': 'احسب مناطق معدل ضربات القلب للتمارين الرياضية',
		
		// Heart Rate Zones Inputs
		'tools.heartRateZones.inputs.age': 'العمر',
		'tools.heartRateZones.inputs.restingHeartRate': 'معدل ضربات القلب أثناء الراحة',
		'tools.heartRateZones.inputs.fitnessLevel': 'مستوى اللياقة البدنية',
		
		// Heart Rate Zones Methods
		'tools.heartRateZones.method.mhr': 'طريقة الحد الأقصى لضربات القلب',
		'tools.heartRateZones.method.karvonen': 'طريقة كارفونين',
		'tools.heartRateZones.method.label': 'الطريقة المستخدمة',
		
		// Heart Rate Zones Results
		'tools.heartRateZones.results.maxHeartRateLabel': 'الحد الأقصى لضربات القلب',
		'tools.heartRateZones.results.zonesLabel': 'مناطق ضربات القلب',
		'tools.heartRateZones.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Heart Rate Zones
		'tools.heartRateZones.zone.warmup': 'الإحماء',
		'tools.heartRateZones.zone.fatBurning': 'حرق الدهون',
		'tools.heartRateZones.zone.aerobic': 'الهوائي',
		'tools.heartRateZones.zone.maximum': 'الحد الأقصى',
		'tools.heartRateZones.zone.warmup.desc': 'للإحماء والاستشفاء',
		'tools.heartRateZones.zone.fatBurning.desc': 'لحرق الدهون وتحسين اللياقة',
		'tools.heartRateZones.zone.aerobic.desc': 'لتحسين اللياقة الهوائية',
		'tools.heartRateZones.zone.maximum.desc': 'للتطوير والتدريب عالي الكثافة',
		
		// Heart Rate Zones Tips
		'tools.heartRateZones.tips.title': 'نصائح للتمرين',
		'tools.heartRateZones.tips.z12': 'المنطقتان 1-2: مثالية للإحماء وحرق الدهون',
		'tools.heartRateZones.tips.z3': 'المنطقة 3: تحسين اللياقة القلبية الوعائية',
		'tools.heartRateZones.tips.z4': 'المنطقة 4: تحسين الأداء والقدرة على التحمل',
		'tools.heartRateZones.tips.z5': 'المنطقة 5: التدريب عالي الكثافة',
		'tools.heartRateZones.tips.device': 'استخدم جهاز مراقبة معدل ضربات القلب للدقة',
		
		// Heart Rate Zones Info
		'tools.heartRateZones.info.whatItDoes': 'تحسب مناطق معدل ضربات القلب المختلفة للتمرين بناءً على عمرك ومعدل ضربات القلب أثناء الراحة.',
		'tools.heartRateZones.info.howToUse': 'أدخل عمرك ومعدل ضربات القلب أثناء الراحة واختر طريقة الحساب.',
		'tools.heartRateZones.info.inputGuide': 'استخدم قياس دقيق لمعدل ضربات القلب أثناء الراحة. قم بالقياس في الصباح قبل النهوض من السرير.',
		'tools.heartRateZones.info.resultExplanation': 'كل منطقة لها هدف مختلف: الإحماء، حرق الدهون، التحسين الهوائي، أو التدريب عالي الكثافة.',
		'tools.egfr.description': 'احسب معدل الترشيح الكبيبي لتقييم وظائف الكلى',
		
		// EGFR Inputs
		'tools.egfr.inputs.age': 'العمر',
		'tools.egfr.inputs.gender': 'الجنس',
		'tools.egfr.inputs.creatinine': 'مستوى الكرياتينين في الدم (ملجم/دل)',
		'tools.egfr.inputs.race': 'العرق',
		'tools.egfr.inputs.race.other': 'غير أفريقي',
		'tools.egfr.inputs.race.black': 'أفريقي',
		
		// EGFR Results
		'tools.egfr.results.egfrLabel': 'معدل الترشيح الكبيبي',
		'tools.egfr.results.stageLabel': 'مرحلة وظائف الكلى',
		'tools.egfr.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// EGFR Stages
		'tools.egfr.stage.normal': 'طبيعي (أكبر من 90)',
		'tools.egfr.stage.mild': 'ضعف خفيف (60-89)',
		'tools.egfr.stage.moderate': 'ضعف متوسط (30-59)',
		'tools.egfr.stage.severe': 'ضعف شديد (15-29)',
		'tools.egfr.stage.kidneyFailure': 'فشل كلوي (أقل من 15)',
		
		// EGFR Recommendations
		'tools.egfr.recommendations.normal.1': 'حافظ على صحة الكلى بنمط حياة صحي',
		'tools.egfr.recommendations.normal.2': 'راقب وظائف الكلى بانتظام',
		'tools.egfr.recommendations.mild.1': 'راقب وظائف الكلى بانتظام',
		'tools.egfr.recommendations.mild.2': 'اتبع نظام غذائي صحي للكلى',
		'tools.egfr.recommendations.moderate.1': 'استشر طبيب الكلى للمتابعة',
		'tools.egfr.recommendations.moderate.2': 'اتبع نظام غذائي خاص للكلى',
		'tools.egfr.recommendations.severe.1': 'اطلب استشارة طبية فورية',
		'tools.egfr.recommendations.severe.2': 'اتبع خطة علاجية شاملة',
		'tools.egfr.recommendations.kidneyFailure.1': 'اطلب رعاية طبية عاجلة',
		'tools.egfr.recommendations.kidneyFailure.2': 'استعد لخيارات العلاج المتقدمة',
		
		// EGFR Errors
		'tools.egfr.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.egfr.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// EGFR Info
		'tools.egfr.info.whatItDoes': 'تحسب معدل الترشيح الكبيبي لتقييم وظائف الكلى بناءً على العمر والجنس ومستوى الكرياتينين.',
		'tools.egfr.info.howToUse': 'أدخل عمرك وجنسك ومستوى الكرياتينين في الدم وعرقك.',
		'tools.egfr.info.inputGuide': 'استخدم قيم دقيقة من فحص الدم الحديث. الكرياتينين يقاس بالملجم/دل.',
		'tools.egfr.info.resultExplanation': 'eGFR يقيس كفاءة الكلى في ترشيح الفضلات من الدم. القيم الأقل تشير إلى ضعف وظائف الكلى.',
		'tools.ovulation.description': 'احسب أيام الإباضة لتحسين فرص الحمل',
		
		// Ovulation Inputs
		'tools.ovulation.inputs.lmp': 'تاريخ آخر دورة شهرية',
		'tools.ovulation.inputs.cycleLength': 'طول الدورة الشهرية (أيام)',
		
		// Ovulation Results
		'tools.ovulation.results.ovulationDate': 'تاريخ الإباضة المتوقع',
		'tools.ovulation.results.fertileWindow': 'فترة الخصوبة',
		'tools.ovulation.results.nextPeriod': 'موعد الدورة التالية',
		'tools.ovulation.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Ovulation Notes
		'tools.ovulation.notes.title': 'ملاحظات مهمة',
		'tools.ovulation.notes.1': 'هذه حسابات تقديرية - الدورة الشهرية قد تختلف',
		'tools.ovulation.notes.2': 'فترة الخصوبة تمتد من 5 أيام قبل الإباضة إلى يوم الإباضة',
		'tools.ovulation.notes.3': 'استخدمي طرق أخرى لتتبع الإباضة مثل درجة حرارة الجسم',
		'tools.ovulation.notes.4': 'استشيري طبيبك إذا كانت دورتك غير منتظمة',
		'tools.ovulation.notes.5': 'هذه الأداة لا تحل محل النصيحة الطبية المهنية',
		
		// Ovulation Info
		'tools.ovulation.info.whatItDoes': 'تحسب تاريخ الإباضة المتوقع وفترة الخصوبة بناءً على الدورة الشهرية.',
		'tools.ovulation.info.howToUse': 'أدخل تاريخ آخر دورة شهرية وطول دورتك الشهرية المعتاد.',
		'tools.ovulation.info.inputGuide': 'استخدمي تواريخ دقيقة. طول الدورة العادي 28 يوماً، لكنه قد يتراوح بين 21-35 يوماً.',
		'tools.ovulation.info.resultExplanation': 'الإباضة تحدث عادة قبل 14 يوماً من الدورة التالية. فترة الخصوبة هي الأيام الأكثر احتمالاً للحمل.',
		'tools.bodyFat.description': 'احسب نسبة الدهون في جسمك باستخدام طرق مختلفة',
		'tools.cholesterolRatio.description': 'احسب نسبة الكوليسترول لتقييم صحة القلب',
		
		// Cholesterol Ratio Inputs
		'tools.cholesterolRatio.inputs.totalCholesterol': 'إجمالي الكوليسترول (ملجم/دل)',
		'tools.cholesterolRatio.inputs.hdl': 'الكوليسترول الجيد HDL (ملجم/دل)',
		
		// Cholesterol Ratio Results
		'tools.cholesterolRatio.results.ratioLabel': 'نسبة الكوليسترول',
		'tools.cholesterolRatio.results.categoryLabel': 'التصنيف',
		'tools.cholesterolRatio.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Cholesterol Ratio Categories
		'tools.cholesterolRatio.category.optimal': 'مثالي',
		'tools.cholesterolRatio.category.nearOptimal': 'قريب من المثالي',
		'tools.cholesterolRatio.category.borderline': 'حدودي',
		'tools.cholesterolRatio.category.high': 'عالي',
		'tools.cholesterolRatio.category.veryHigh': 'عالي جداً',
		
		// Cholesterol Ratio Recommendations
		'tools.cholesterolRatio.recommendations.borderline.1': 'اتبع نظام غذائي صحي للقلب',
		'tools.cholesterolRatio.recommendations.borderline.2': 'مارس الرياضة بانتظام',
		'tools.cholesterolRatio.recommendations.borderline.3': 'استشر طبيبك للمتابعة',
		'tools.cholesterolRatio.recommendations.optimal.1': 'حافظ على نمط حياتك الحالي',
		'tools.cholesterolRatio.recommendations.optimal.2': 'استمر في اتباع نظام غذائي صحي',
		'tools.cholesterolRatio.recommendations.nearOptimal.1': 'حسن من نظامك الغذائي',
		'tools.cholesterolRatio.recommendations.nearOptimal.2': 'مارس الرياضة بانتظام',
		'tools.cholesterolRatio.recommendations.high.1': 'استشر طبيبك للمتابعة',
		'tools.cholesterolRatio.recommendations.high.2': 'اتبع نظام غذائي صحي للقلب',
		'tools.cholesterolRatio.recommendations.veryHigh.1': 'اطلب استشارة طبية فورية',
		'tools.cholesterolRatio.recommendations.veryHigh.2': 'اتبع خطة علاجية شاملة',
		
		// Cholesterol Ratio Errors
		'tools.cholesterolRatio.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.cholesterolRatio.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// Cholesterol Ratio Info
		'tools.cholesterolRatio.info.whatItDoes': 'تحسب نسبة الكوليسترول الكلي إلى الكوليسترول الجيد لتقييم مخاطر أمراض القلب.',
		'tools.cholesterolRatio.info.howToUse': 'أدخل قيم إجمالي الكوليسترول والكوليسترول الجيد من فحص الدم.',
		'tools.cholesterolRatio.info.inputGuide': 'استخدم قيم دقيقة من فحص الدم الحديث. النسب المثالية أقل من 3.5.',
		'tools.cholesterolRatio.info.resultExplanation': 'النسبة الأقل تعني مخاطر أقل لأمراض القلب. النسب العالية تتطلب متابعة طبية.',
		'tools.pregnancyDueDate.description': 'احسب موعد الولادة المتوقع بناءً على آخر دورة شهرية',
		
		// Pregnancy Due Date Inputs
		'tools.pregnancyDueDate.inputs.lmp': 'تاريخ آخر دورة شهرية',
		
		// Pregnancy Due Date Results
		'tools.pregnancyDueDate.results.dueDateLabel': 'موعد الولادة المتوقع',
		'tools.pregnancyDueDate.results.gestationalAgeLabel': 'عمر الحمل الحالي',
		'tools.pregnancyDueDate.results.trimesterLabel': 'الثلث الحالي',
		'tools.pregnancyDueDate.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Pregnancy Due Date Info
		'tools.pregnancyDueDate.info.whatItDoes': 'تحسب موعد الولادة المتوقع وعمر الحمل بناءً على تاريخ آخر دورة شهرية.',
		'tools.pregnancyDueDate.info.howToUse': 'أدخل تاريخ آخر دورة شهرية للحصول على موعد الولادة المتوقع.',
		'tools.pregnancyDueDate.info.inputGuide': 'استخدم التاريخ الدقيق لآخر دورة شهرية. الحساب يعتمد على قاعدة نايجيلي (280 يوماً).',
		'tools.pregnancyDueDate.info.resultExplanation': 'موعد الولادة المتوقع هو تقدير. معظم النساء يلدن قبل أو بعد أسبوعين من هذا التاريخ.',

		'tools.pregnancyDueDate.recommendations.1': 'هذا تقدير - غالباً ما يصل الأطفال قبل أو بعد أسبوعين من موعد الولادة',
		'tools.pregnancyDueDate.recommendations.2': 'الرعاية السابقة للولادة المنتظمة ضرورية لمراقبة حملك',
		'tools.pregnancyDueDate.recommendations.3': 'تواصل مع مقدم الرعاية الصحية إذا كان لديك أي مخاوف',
		'tools.pregnancyDueDate.recommendations.4': 'تتبع أعراضك وحركات طفلك',
		'tools.pregnancyDueDate.recommendations.5': 'استعد للولادة والوضع مع اقتراب موعد الولادة',
		'tools.strokeRisk.description': 'تقييم مخاطر الإصابة بالسكتة الدماغية بناءً على عوامل الخطر',
		
		// Stroke Risk Inputs
		'tools.strokeRisk.inputs.age': 'العمر',
		'tools.strokeRisk.inputs.gender': 'الجنس',
		'tools.strokeRisk.inputs.systolic': 'الضغط الانقباضي (ملم زئبق)',
		'tools.strokeRisk.inputs.diastolic': 'الضغط الانبساطي (ملم زئبق)',
		'tools.strokeRisk.inputs.diabetes': 'السكري',
		'tools.strokeRisk.inputs.smoking': 'مدخن حالياً',
		'tools.strokeRisk.inputs.lvh': 'تضخم البطين الأيسر',
		
		// Stroke Risk Results
		'tools.strokeRisk.results.percent10y': 'مخاطر 10 سنوات',
		'tools.strokeRisk.results.riskLabel': 'مستوى المخاطر',
		'tools.strokeRisk.results.scoreLabel': 'نقاط المخاطر',
		'tools.strokeRisk.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Stroke Risk Levels
		'tools.strokeRisk.risk.low': 'منخفض',
		'tools.strokeRisk.risk.moderate': 'متوسط',
		'tools.strokeRisk.risk.high': 'عالي',
		'tools.strokeRisk.risk.veryHigh': 'عالي جداً',
		
		// Stroke Risk Recommendations
		'tools.strokeRisk.recommendations.1': 'تحكم في ضغط الدم',
		'tools.strokeRisk.recommendations.2': 'توقف عن التدخين',
		'tools.strokeRisk.recommendations.3': 'تحكم في السكري',
		'tools.strokeRisk.recommendations.4': 'مارس الرياضة بانتظام',
		'tools.strokeRisk.recommendations.5': 'اتبع نظام غذائي صحي',
		'tools.strokeRisk.recommendations.low.1': 'حافظ على نمط حياة صحي',
		'tools.strokeRisk.recommendations.low.2': 'مارس الرياضة بانتظام',
		'tools.strokeRisk.recommendations.low.3': 'راقب ضغط الدم',
		'tools.strokeRisk.recommendations.moderate.1': 'تحكم في ضغط الدم',
		'tools.strokeRisk.recommendations.moderate.2': 'توقف عن التدخين',
		'tools.strokeRisk.recommendations.moderate.3': 'تحكم في السكري',
		'tools.strokeRisk.recommendations.high.1': 'استشر طبيبك للمتابعة',
		'tools.strokeRisk.recommendations.high.2': 'اتبع خطة علاجية شاملة',
		'tools.strokeRisk.recommendations.high.3': 'راقب صحتك بانتظام',
		'tools.strokeRisk.recommendations.veryHigh.1': 'اطلب رعاية طبية فورية',
		'tools.strokeRisk.recommendations.veryHigh.2': 'اتبع خطة علاجية مكثفة',
		'tools.strokeRisk.recommendations.veryHigh.3': 'راقب صحتك يومياً',
		
		// Stroke Risk Errors
		'tools.strokeRisk.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.strokeRisk.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// Stroke Risk Info
		'tools.strokeRisk.info.whatItDoes': 'تقييم مخاطر الإصابة بالسكتة الدماغية بناءً على عوامل الخطر المختلفة.',
		'tools.strokeRisk.info.howToUse': 'أدخل بياناتك الشخصية وعوامل الخطر للحصول على تقييم المخاطر.',
		'tools.strokeRisk.info.inputGuide': 'استخدم قيم دقيقة من الفحوصات الطبية الحديثة.',
		'tools.strokeRisk.info.resultExplanation': 'النقاط تعطي تقدير لمخاطر الإصابة بالسكتة الدماغية خلال 10 سنوات.',
		'tools.cancerScreening.description': 'تقييم الحاجة لفحوصات الكشف المبكر عن السرطان',
		
		// Cancer Screening Inputs
		'tools.cancerScreening.inputs.age': 'العمر',
		'tools.cancerScreening.inputs.gender': 'الجنس',
		'tools.cancerScreening.inputs.smoking': 'تاريخ التدخين',
		'tools.cancerScreening.inputs.familyHistory': 'تاريخ عائلي للسرطان',
		
		// Cancer Screening Results
		'tools.cancerScreening.results.riskLabel': 'مستوى المخاطر',
		'tools.cancerScreening.results.recommendationsLabel': 'التوصيات',
		'tools.cancerScreening.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Cancer Screening Risk Levels
		'tools.cancerScreening.risk.low': 'منخفض',
		'tools.cancerScreening.risk.moderate': 'متوسط',
		'tools.cancerScreening.risk.high': 'عالي',
		
		// Cancer Screening Recommendations
		'tools.cancerScreening.recommendations.title': 'فحوصات مقترحة',
		
		// Cancer Screening Notes
		'tools.cancerScreening.notes.title': 'ملاحظات مهمة',
		'tools.cancerScreening.notes.1': 'هذه توصيات عامة - استشر طبيبك للحصول على نصائح شخصية',
		'tools.cancerScreening.notes.2': 'قد تحتاج فحوصات إضافية حسب تاريخك الطبي',
		'tools.cancerScreening.notes.3': 'الفحوصات المبكرة تساعد في الكشف المبكر والعلاج',
		'tools.cancerScreening.notes.4': 'اتبع إرشادات طبيبك للفحوصات المنتظمة',
		'tools.cancerScreening.notes.5': 'تجنب عوامل الخطر مثل التدخين والكحول',
		'tools.cancerScreening.explain': 'مستوى المخاطر يتحدد بناءً على عمرك وجنسك وتاريخ التدخين والتاريخ العائلي. الفحوصات الموصى بها مبنية على إرشادات قائمة على الأدلة ومصممة للكشف عن السرطان مبكراً عندما يكون العلاج أكثر فعالية.',
		'tools.cancerScreening.interpretation.low': 'لديك ملف مخاطر منخفض للسرطان بناءً على العوامل الحالية.',
		'tools.cancerScreening.interpretation.moderate': 'لديك عوامل مخاطر متوسطة تستدعي الفحص الدوري.',
		'tools.cancerScreening.interpretation.high': 'لديك عوامل مخاطر متعددة تتطلب فحصاً أكثر تكراراً.',
		
		// Cancer Screening Info
		'tools.cancerScreening.info.whatItDoes': 'تقييم الحاجة لفحوصات الكشف المبكر عن السرطان بناءً على العمر والجنس وعوامل الخطر.',
		'tools.cancerScreening.info.howToUse': 'أدخل عمرك وجنسك وتاريخ التدخين والتاريخ العائلي للسرطان.',
		'tools.cancerScreening.info.inputGuide': 'استخدم معلومات دقيقة. التاريخ العائلي يشمل الأقارب من الدرجة الأولى.',
		'tools.cancerScreening.info.resultExplanation': 'التوصيات تعتمد على إرشادات طبية معتمدة للكشف المبكر عن السرطان.',
		
		// COPD Risk (CAT Score)
		'tools.copdCat.title': 'تقييم أعراض مرض الانسداد الرئوي المزمن',
		'tools.copdCat.description': 'تقييم شدة أعراض مرض الانسداد الرئوي المزمن باستخدام مقياس CAT',
		
		// COPD CAT Questions
		'tools.copdCat.questions.cough': 'السعال',
		'tools.copdCat.questions.phlegm': 'البلغم',
		'tools.copdCat.questions.chestTightness': 'ضيق الصدر',
		'tools.copdCat.questions.breathlessness': 'ضيق التنفس',
		'tools.copdCat.questions.limitation': 'الحد من الأنشطة',
		'tools.copdCat.questions.confidence': 'الثقة في الخروج',
		'tools.copdCat.questions.sleep': 'النوم',
		'tools.copdCat.questions.energy': 'الطاقة',
		
		// COPD CAT Options
		'tools.copdCat.options.0': 'لا أتأثر على الإطلاق',
		'tools.copdCat.options.1': 'أشعر بتأثير قليل جداً',
		'tools.copdCat.options.2': 'أشعر بتأثير قليل',
		'tools.copdCat.options.3': 'أشعر بتأثير متوسط',
		'tools.copdCat.options.4': 'أشعر بتأثير كبير',
		'tools.copdCat.options.5': 'أشعر بتأثير شديد جداً',
		
		// COPD CAT Results
		'tools.copdCat.results.scoreLabel': 'نقاط CAT',
		'tools.copdCat.results.impactLabel': 'تأثير الأعراض',
		'tools.copdCat.results.placeholder': 'أجب على جميع الأسئلة واضغط احسب للحصول على النتائج',
		
		// COPD Risk Levels
		'tools.copdRisk.risk.low': 'منخفض',
		'tools.copdRisk.risk.moderate': 'متوسط',
		'tools.copdRisk.risk.high': 'عالي',
		'tools.copdRisk.risk.veryHigh': 'عالي جداً',
		
		// COPD Risk Recommendations
		'tools.copdRisk.recommendations.low.1': 'حافظ على نمط حياة صحي',
		'tools.copdRisk.recommendations.low.2': 'تجنب التدخين والملوثات',
		'tools.copdRisk.recommendations.moderate.1': 'استشر طبيبك للمتابعة',
		'tools.copdRisk.recommendations.moderate.3': 'مارس الرياضة بانتظام',
		'tools.copdRisk.recommendations.veryHigh.3': 'احصل على رعاية طبية فورية',
		'tools.copdRisk.recommendations.low.3': 'مارس الرياضة بانتظام',
		'tools.copdRisk.recommendations.moderate.2': 'استخدم الأدوية الموصوفة',
		'tools.copdRisk.recommendations.high.1': 'استشر طبيب الرئة',
		'tools.copdRisk.recommendations.high.2': 'اتبع خطة علاجية شاملة',
		'tools.copdRisk.recommendations.high.3': 'راقب الأعراض يومياً',
		'tools.copdRisk.recommendations.veryHigh.1': 'اطلب رعاية طبية عاجلة',
		'tools.copdRisk.recommendations.veryHigh.2': 'اتبع خطة علاجية مكثفة',
		
		// COPD CAT Info
		'tools.copdCat.info.whatItDoes': 'تقييم شدة أعراض مرض الانسداد الرئوي المزمن باستخدام مقياس CAT.',
		'tools.copdCat.info.howToUse': 'أجب على جميع الأسئلة بصدق للحصول على تقييم دقيق.',
		'tools.copdCat.info.inputGuide': 'اختر الإجابة التي تعكس حالتك الحقيقية. كل سؤال يقيس جانباً مختلفاً من تأثير المرض.',
		'tools.copdCat.info.resultExplanation': 'نقاط CAT تعطي مؤشراً على شدة الأعراض وتأثيرها على حياتك اليومية.',
		'tools.copdCat.info.medicalDisclaimer': 'هذا التقييم للأغراض التعليمية فقط ولا يحل محل التشخيص الطبي المهني.',

		

		'tools.diabeticRetinopathy.description': 'تقييم مخاطر اعتلال الشبكية السكري',
		
		// Diabetic Retinopathy Inputs
		'tools.diabeticRetinopathy.inputs.age': 'العمر',
		'tools.diabeticRetinopathy.inputs.diabetesDuration': 'مدة الإصابة بالسكري (سنوات)',
		'tools.diabeticRetinopathy.inputs.hba1c': 'مستوى HbA1c (%)',
		'tools.diabeticRetinopathy.inputs.bloodPressure': 'الضغط الانقباضي (ملم زئبق)',
		'tools.diabeticRetinopathy.inputs.cholesterol': 'إجمالي الكوليسترول (ملجم/دل)',
		
		// Diabetic Retinopathy Results
		'tools.diabeticRetinopathy.results.scoreLabel': 'نقاط المخاطر',
		'tools.diabeticRetinopathy.results.riskLabel': 'مستوى المخاطر',
		'tools.diabeticRetinopathy.results.percentRiskLabel': 'نسبة المخاطر',
		'tools.diabeticRetinopathy.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Diabetic Retinopathy Risk Levels
		'tools.diabeticRetinopathy.risk.low': 'منخفض',
		'tools.diabeticRetinopathy.risk.moderate': 'متوسط',
		'tools.diabeticRetinopathy.risk.high': 'عالي',
		'tools.diabeticRetinopathy.risk.veryHigh': 'عالي جداً',
		
		// Diabetic Retinopathy Recommendations
		'tools.diabeticRetinopathy.recommendations.low.1': 'حافظ على التحكم الجيد في السكري',
		'tools.diabeticRetinopathy.recommendations.moderate.1': 'استشر طبيب العيون بانتظام',
		'tools.diabeticRetinopathy.recommendations.high.1': 'احصل على فحص عيون سنوي',
		'tools.diabeticRetinopathy.recommendations.veryHigh.2': 'تحكم في ضغط الدم والكوليسترول',
		'tools.diabeticRetinopathy.recommendations.veryHigh.3': 'اتبع نظام غذائي صحي',
		'tools.diabeticRetinopathy.recommendations.low.2': 'راقب ضغط الدم والكوليسترول',
		'tools.diabeticRetinopathy.recommendations.low.3': 'احصل على فحص العين السنوي',
		'tools.diabeticRetinopathy.recommendations.moderate.2': 'حسن من التحكم في السكري',
		'tools.diabeticRetinopathy.recommendations.moderate.3': 'راقب الأعراض بانتظام',
		'tools.diabeticRetinopathy.recommendations.high.2': 'اتبع خطة علاجية شاملة',
		'tools.diabeticRetinopathy.recommendations.high.3': 'راقب الأعراض يومياً',
		'tools.diabeticRetinopathy.recommendations.veryHigh.1': 'اطلب رعاية طبية عاجلة',
		
		// Diabetic Retinopathy Info
		'tools.diabeticRetinopathy.info.whatItDoes': 'تقييم مخاطر اعتلال الشبكية السكري بناءً على عوامل الخطر المختلفة.',
		'tools.diabeticRetinopathy.info.howToUse': 'أدخل عمرك ومدة الإصابة بالسكري ومستوى HbA1c وضغط الدم والكوليسترول.',
		'tools.diabeticRetinopathy.info.inputGuide': 'استخدم قيم دقيقة من الفحوصات الطبية الحديثة.',
		'tools.diabeticRetinopathy.info.resultExplanation': 'النقاط تعطي تقدير لمخاطر الإصابة باعتلال الشبكية السكري.',
		'tools.medicationDosage.description': 'حساب الجرعات الدوائية المناسبة بناءً على الوزن والعمر',
		'tools.medicationDosage.info.whatItDoes': 'حاسبة الجرعات الدوائية تحسب الجرعات المناسبة بناءً على وزن المريض وعمره ونوع الدواء.',
		'tools.medicationDosage.info.howToUse': 'أدخل عمر المريض ووزنه ونوع الجرعة المطلوبة للحصول على الجرعة المناسبة.',
		'tools.medicationDosage.info.inputGuide': 'استخدم قياسات دقيقة للوزن والعمر. اختر نوع الجرعة المناسب للدواء.',
		'tools.medicationDosage.info.resultExplanation': 'النتيجة تقدم الجرعة اليومية الإجمالية والجرعة لكل مرة بناءً على التكرار المحدد.',
		'tools.medicationDosage.warning.text': 'هذه الحاسبة توفر تقديرات عامة فقط. استشر دائماً مقدم الرعاية الصحية للحصول على الجرعات الدقيقة.',
		'tools.medicationDosage.inputs.age': 'العمر',
		'tools.medicationDosage.inputs.weight': 'الوزن',
		'tools.medicationDosage.inputs.frequency': 'التكرار اليومي',
		'tools.medicationDosage.inputs.dosingType': 'نوع الجرعة',
		'tools.medicationDosage.inputs.dosingType.weightBased': 'بناءً على الوزن',
		'tools.medicationDosage.inputs.dosingType.adultStandard': 'الجرعة القياسية للبالغين',
		'tools.medicationDosage.inputs.mgPerKgPerDay': 'ملجم/كجم/يوم',
		'tools.medicationDosage.inputs.totalMgPerDay': 'إجمالي ملجم/يوم',
		'tools.medicationDosage.results.dosageLabel': 'الجرعة اليومية',
		'tools.medicationDosage.results.mgPerDay': 'ملجم/يوم',
		'tools.medicationDosage.results.frequencyLabel': 'الجرعة لكل مرة',
		'tools.medicationDosage.results.mg': 'ملجم',
		'tools.medicationDosage.results.importantNotes': 'ملاحظات مهمة',
		'tools.medicationDosage.results.note1': 'هذه حسابات عامة - استشر دائماً مقدمي الرعاية الصحية',
		'tools.medicationDosage.results.note2': 'قد تتطلب العوامل الفردية للمريض تعديلات في الجرعة',
		'tools.medicationDosage.results.note3': 'ضع في اعتبارك وظائف الكلى والكبد لتعديلات الجرعة',
		'tools.medicationDosage.results.note4': 'راقب الآثار الجانبية والاستجابة العلاجية',
		'tools.medicationDosage.results.note5': 'اتبع إرشادات الجرعة المحددة لكل دواء',
		'tools.medicationDosage.explain.result': 'هذا الحساب يوفر الجرعة الدوائية اليومية الإجمالية ومقدار كل جرعة فردية بناءً على التكرار المحدد. تحقق دائماً من هذه الحسابات مع مقدم الرعاية الصحية واتبع تعليمات الجرعة الموصوفة.',
		
		// Medication Dosage Results
		'tools.medicationDosage.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Medication Dosage Errors
		'tools.medicationDosage.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.medicationDosage.errors.computeFailed': 'حدث خطأ في الحساب',
		'tools.lifestyleCoach.description': 'احصل على نصائح شخصية لتحسين نمط حياتك الصحي',
		'tools.lifestyleCoach.info.whatItDoes': 'مدرب نمط الحياة يوفر خططاً شخصية للصحة واللياقة البدنية بناءً على بياناتك الفردية وأهدافك.',
		'tools.lifestyleCoach.info.howToUse': 'أدخل معلوماتك الأساسية ومستوى نشاطك وأهدافك الصحية للحصول على خطة مخصصة.',
		'tools.lifestyleCoach.info.inputGuide': 'استخدم قياسات دقيقة للوزن والطول. اختر مستوى النشاط الذي يعكس روتينك اليومي الحقيقي.',
		'tools.lifestyleCoach.info.resultExplanation': 'النتيجة تقدم خطة شاملة تتضمن السعرات الحرارية اليومية وتوزيع المغذيات الكبيرة وتوصيات التمرين والنوم.',
		'tools.lifestyleCoach.info.medicalDisclaimer': 'هذه التوصيات عامة ولا تحل محل النصيحة الطبية المهنية. استشر مقدم الرعاية الصحية قبل بدء أي برنامج تمرين جديد.',
		'tools.lifestyleCoach.inputs.age': 'العمر',
		'tools.lifestyleCoach.inputs.weight': 'الوزن',
		'tools.lifestyleCoach.inputs.height': 'الطول',
		'tools.lifestyleCoach.inputs.gender': 'الجنس',
		'tools.lifestyleCoach.inputs.gender.male': 'ذكر',
		'tools.lifestyleCoach.inputs.gender.female': 'أنثى',
		'tools.lifestyleCoach.inputs.activity': 'مستوى النشاط',
		'tools.lifestyleCoach.inputs.activity.sedentary': 'قليل النشاط',
		'tools.lifestyleCoach.inputs.activity.light': 'نشاط خفيف',
		'tools.lifestyleCoach.inputs.activity.moderate': 'نشاط متوسط',
		'tools.lifestyleCoach.inputs.activity.active': 'نشاط عالي',
		'tools.lifestyleCoach.inputs.goal': 'الهدف',
		'tools.lifestyleCoach.inputs.goal.weightLoss': 'فقدان الوزن',
		'tools.lifestyleCoach.inputs.goal.maintenance': 'الحفاظ على الوزن',
		'tools.lifestyleCoach.inputs.goal.weightGain': 'زيادة الوزن',
		'tools.lifestyleCoach.results.dailyCalories': 'السعرات الحرارية اليومية',
		'tools.lifestyleCoach.results.caloriesPerDay': 'سعرة حرارية/يوم',
		'tools.lifestyleCoach.results.workoutsPerWeek': 'تمارين في الأسبوع',
		'tools.lifestyleCoach.results.sleep': 'ساعات النوم',
		'tools.lifestyleCoach.results.hours': 'ساعات',
		'tools.lifestyleCoach.results.macros': 'المغذيات الكبيرة',
		'tools.lifestyleCoach.results.protein': 'بروتين',
		'tools.lifestyleCoach.results.carbs': 'كربوهيدرات',
		'tools.lifestyleCoach.results.fat': 'دهون',
		'tools.lifestyleCoach.results.recommendations': 'التوصيات',
		'tools.lifestyleCoach.results.importantNotes': 'ملاحظات مهمة',
		'tools.lifestyleCoach.results.note1': 'استشر المتخصصين في الرعاية الصحية قبل إجراء تغييرات كبيرة',
		'tools.lifestyleCoach.results.note2': 'قم بتعديلات تدريجية ومستدامة في نمط الحياة',
		'tools.lifestyleCoach.results.note3': 'راقب تقدمك واضبط حسب الحاجة',
		'tools.lifestyleCoach.results.note4': 'ركز على الصحة طويلة المدى وليس الحلول السريعة',
		'tools.lifestyleCoach.results.note5': 'هذه إرشادات عامة - قد تختلف الاحتياجات الفردية',
		
		// Lifestyle Coach Results
		'tools.lifestyleCoach.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Lifestyle Coach Actions
		'tools.lifestyleCoach.actions.getPlan': 'احصل على الخطة',
		
		// Lifestyle Coach Explain
		'tools.lifestyleCoach.explain.result': 'هذه الخطة مخصصة بناءً على بياناتك الشخصية وأهدافك. اتبع التوصيات تدريجياً واستشر طبيبك قبل إجراء تغييرات كبيرة.',
		
		// Drug Interaction Tool
		'tools.drugInteraction.title': 'تحليل التفاعلات الدوائية',
		'tools.drugInteraction.description': 'تحليل شامل للتفاعلات الدوائية باستخدام قاعدة بيانات FDA والذكاء الاصطناعي',
		
		'tools.drugInteraction.info.whatItDoes': 'يستخدم هذا الأداة قاعدة بيانات FDA المفتوحة والذكاء الاصطناعي لتحليل التفاعلات بين الأدوية المختلفة وتقديم توصيات طبية دقيقة.',
		'tools.drugInteraction.info.howToUse': 'أدخل أسماء الأدوية التي تريد تحليل تفاعلاتها. يمكنك إضافة عدة أدوية لتحليل التفاعلات بينها جميعاً.',
		'tools.drugInteraction.info.inputGuide': 'أدخل الأسماء العلمية أو التجارية للأدوية. يمكنك استخدام الأسماء باللغة العربية أو الإنجليزية.',
		'tools.drugInteraction.info.resultExplanation': 'ستحصل على تحليل شامل للتفاعلات الدوائية مع تقييم مستوى الخطورة والتوصيات الطبية المناسبة.',
		'tools.drugInteraction.info.medicalDisclaimer': 'هذا التحليل للأغراض التعليمية فقط. استشر طبيبك دائماً قبل اتخاذ أي قرارات طبية.',
		
		'tools.drugInteraction.input.title': 'الأدوية المراد تحليلها',
		'tools.drugInteraction.input.addDrug': 'إضافة دواء آخر',
		'tools.drugInteraction.input.analyze': 'تحليل التفاعلات',
		'tools.drugInteraction.input.analyzing': 'جاري التحليل...',
		
		'tools.drugInteraction.results.summary': 'ملخص النتائج',
		'tools.drugInteraction.results.totalInteractions': 'إجمالي التفاعلات',
		'tools.drugInteraction.results.riskLevel': 'مستوى الخطورة',
		'tools.drugInteraction.results.riskLevel.low': 'منخفض',
		'tools.drugInteraction.results.riskLevel.moderate': 'متوسط',
		'tools.drugInteraction.results.riskLevel.high': 'عالي',
		'tools.drugInteraction.results.riskLevel.critical': 'حرج',
		'tools.drugInteraction.results.drugsAnalyzed': 'الأدوية المحللة',
		'tools.drugInteraction.results.severity.minor': 'بسيط',
		'tools.drugInteraction.results.severity.moderate': 'متوسط',
		'tools.drugInteraction.results.severity.major': 'خطير',
		'tools.drugInteraction.results.severity.contraindicated': 'ممنوع',
		
		'tools.drugInteraction.results.drugInfo': 'معلومات الأدوية',
		'tools.drugInteraction.results.genericName': 'الاسم العلمي',
		'tools.drugInteraction.results.brandNames': 'الأسماء التجارية',
		'tools.drugInteraction.results.drugClass': 'الفئة الدوائية',
		'tools.drugInteraction.results.interactions': 'التفاعلات الدوائية',
		'tools.drugInteraction.results.clinicalEffects': 'الآثار السريرية',
		'tools.drugInteraction.results.management': 'الإدارة',
		'tools.drugInteraction.results.aiAnalysis': 'تحليل الذكاء الاصطناعي',
		'tools.drugInteraction.suggest.loading': 'جاري جلب الاقتراحات...',
		'tools.drugInteraction.suggest.empty': 'لا توجد اقتراحات — اكتب اسم الدواء بشكل أوضح',
		'tools.copdRisk.description': 'تقييم مخاطر مرض الانسداد الرئوي المزمن باستخدام اختبار CAT',
		'tools.copdRisk.title': 'تقييم أعراض مرض الانسداد الرئوي المزمن',
		
		'home.hero.cta.chat': 'ابدأ المحادثة',
		'home.hero.cta.tools': 'استكشف الأدوات',
		
		'home.features.title': 'لماذا CLinIQ؟',
		'home.features.subtitle': 'نقدم لك أفضل تجربة رعاية صحية ذكية',
		'home.features.ai.title': 'ذكاء اصطناعي متقدم',
		'home.features.ai.description': 'تقنية AI متطورة لتقديم استشارات طبية دقيقة وموثوقة',
		'home.features.medical.title': 'معلومات طبية موثوقة',
		'home.features.medical.description': 'جميع المعلومات مبنية على أحدث الأبحاث الطبية والمعايير الدولية',
		'home.features.secure.title': 'آمن وخاص',
		'home.features.secure.description': 'نحافظ على خصوصية بياناتك ونقدم تجربة آمنة ومحمية',
		'home.features.arabic.title': 'بالعربي المصري',
		'home.features.arabic.description': 'واجهة سهلة ومفهومة باللغة العربية المصرية البسيطة',
		
		'home.actions.title': 'ابدأ رحلتك الصحية',
		'home.actions.subtitle': 'اختر الطريقة التي تناسبك للبدء',
		'home.actions.chat.title': 'محادثة ذكية',
		'home.actions.chat.description': 'تحدث مع الذكاء الاصطناعي الطبي واحصل على إجابات فورية لأسئلتك الصحية',
		'home.actions.tools.title': 'أدوات صحية',
		'home.actions.tools.description': 'استخدم 23+ أداة طبية متخصصة لحساب وتقييم صحتك',
		'home.actions.learnMore': 'اعرف المزيد',
		'home.actions.chat.feature1': 'إجابات فورية لأسئلتك الصحية',
		'home.actions.chat.feature2': 'تحليل الصور والملفات الطبية',
		'home.actions.chat.feature3': 'نصائح مخصصة لصحتك',
		'home.actions.tools.feature1': '23+ أداة طبية متخصصة',
		'home.actions.tools.feature2': 'حسابات دقيقة ومعايير دولية',
		'home.actions.tools.feature3': 'توصيات مبنية على أحدث الأبحاث',
		
		'home.popularTools.title': 'الأدوات الأكثر استخداماً',
		'home.popularTools.subtitle': 'اكتشف أشهر الأدوات الصحية التي يستخدمها آلاف المستخدمين',
		'home.popularTools.bmi': 'مؤشر كتلة الجسم',
		'home.popularTools.bloodPressure': 'ضغط الدم',
		'home.popularTools.diabetes': 'مخاطر السكري',
		'home.popularTools.heartRate': 'مناطق ضربات القلب',
		'home.popularTools.water': 'شرب الماء',
		'home.popularTools.sleep': 'دورة النوم',
		'home.popularTools.viewAll': 'عرض جميع الأدوات',
		
		'home.benefits.title': 'لماذا تختار CLinIQ؟',
		'home.benefits.subtitle': 'نقدم لك أفضل تجربة رعاية صحية ذكية ومتطورة',
		'home.benefits.instant.title': 'نتائج فورية',
		'home.benefits.instant.description': 'احصل على النتائج والتوصيات فوراً دون انتظار',
		'home.benefits.accurate.title': 'دقة عالية',
		'home.benefits.accurate.description': 'حسابات مبنية على أحدث المعايير الطبية الدولية',
		'home.benefits.mobile.title': 'متاح على الهاتف',
		'home.benefits.mobile.description': 'استخدم المنصة من أي مكان وفي أي وقت',
		'home.benefits.fast.title': 'سريع وسهل',
		'home.benefits.fast.description': 'واجهة بسيطة ومفهومة بالعربي المصري',
		
		'home.stats.title': 'أرقام تتحدث عن نفسها',
		'home.stats.subtitle': 'انضم إلى آلاف المستخدمين الذين يثقون في CLinIQ',
		'home.stats.tools': 'أداة طبية',
		'home.stats.arabic': 'عربي مصري',
		'home.stats.available': 'متاح دائماً',
		'home.stats.free': 'مجاني تماماً',
		
		'home.cta.title': 'ابدأ رحلتك الصحية اليوم',
		'home.cta.subtitle': 'انضم إلى آلاف المستخدمين الذين يثقون في CLinIQ لصحتهم',
		'home.cta.startChat': 'ابدأ المحادثة',
		'home.cta.exploreTools': 'استكشف الأدوات',
		
		// About Page
		'about.hero.title': 'عن CLinIQ — الرعاية الذكية ببساطة وبالعربي المصري',
		'about.hero.text': 'CLinIQ بيخلّي المعلومة الطبية أوضح وأسهل وبالعربي المصري: سؤال وجواب فوري، صوت وكتابة، شروحات بصرية، وواجهة مريحة للمصريين.',
		'about.mission.title': 'مهمتنا',
		'about.mission.text': 'نهدف لجعل المعلومات الطبية متاحة ومفهومة للجميع باللغة العربية، مع التركيز على خصوصية المستخدم وسهولة الاستخدام.',
		'about.offer.title': 'ما نقدمه',
		'about.offer.1': 'شات ذكي مع دكتور افتراضي يجيب على أسئلتك الصحية',
		'about.offer.2': 'أدوات حساب طبية دقيقة وسهلة الاستخدام',
		'about.offer.3': 'معلومات طبية موثوقة ومحدثة باللغة العربية',
		'about.offer.4': 'خصوصية كاملة وحماية لبياناتك الشخصية',
		'about.why.title': 'لماذا CLinIQ مختلف؟',
		'about.why.text': 'نركز على تجربة المستخدم المصري، مع واجهة بسيطة ومعلومات واضحة باللغة العربية المصرية.',
		'about.vision.title': 'رؤيتنا',
		'about.vision.text': 'نطمح لأن نكون المنصة الأولى للرعاية الصحية الذكية في الوطن العربي، مع التركيز على سهولة الاستخدام والموثوقية.',
		'about.cta.title': 'انضم إلينا',
		'about.cta.subtitle': 'ابدأ رحلتك الصحية مع CLinIQ اليوم',
		'about.cta.primary': 'ابدأ المحادثة',
		'about.cta.secondary': 'العودة للرئيسية',
		'tools.tdee.info.whatItDoes': 'تحسب إجمالي السعرات الحرارية التي تحرقها يومياً بناءً على نشاطك.',
		'tools.tdee.info.howToUse': 'أدخل بياناتك الأساسية ومستوى نشاطك.',
		'tools.tdee.info.inputGuide': 'استخدم مقياس دقيق للوزن والطول.',
		'tools.tdee.info.resultExplanation': 'النتيجة تعطي إجمالي السعرات الحرارية المطلوبة يومياً.',
		
		// All Tool Titles
		'tools.bodyFat.title': 'حاسبة نسبة الدهون في الجسم',
		
		// Body Fat Inputs
		'tools.bodyFat.inputs.gender': 'الجنس',
		'tools.bodyFat.inputs.height': 'الطول (سنتيمتر)',
		'tools.bodyFat.inputs.neck': 'محيط الرقبة (سنتيمتر)',
		'tools.bodyFat.inputs.waist': 'محيط الخصر (سنتيمتر)',
		'tools.bodyFat.inputs.hip': 'محيط الورك (سنتيمتر)',
		
		// Body Fat Results
		'tools.bodyFat.results.bodyFatLabel': 'نسبة الدهون في الجسم',
		'tools.bodyFat.results.categoryLabel': 'الفئة',
		'tools.bodyFat.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Body Fat Categories
		'tools.bodyFat.category.essential': 'دهون أساسية',
		'tools.bodyFat.category.fitness': 'لياقة بدنية',
		'tools.bodyFat.category.average': 'متوسط',
		'tools.bodyFat.category.obese': 'سمنة',
		
		// Body Fat Explanations
		'tools.bodyFat.explain.essential': 'نسبة الدهون الأساسية المطلوبة للوظائف الحيوية.',
		'tools.bodyFat.explain.fitness': 'نسبة دهون مناسبة للرياضيين والأشخاص النشطين.',
		'tools.bodyFat.explain.average': 'نسبة دهون متوسطة، قد تحتاج لتحسين.',
		'tools.bodyFat.explain.obese': 'نسبة دهون عالية، تحتاج لخطة إنقاص وزن.',
		
		// Body Fat Recommendations
		'tools.bodyFat.recommendations.essential.1': 'حافظ على نظام غذائي متوازن',
		'tools.bodyFat.recommendations.essential.2': 'مارس الرياضة بانتظام',
		'tools.bodyFat.recommendations.fitness.1': 'استمر في نظامك الحالي',
		'tools.bodyFat.recommendations.fitness.2': 'ركز على بناء العضلات',
		'tools.bodyFat.recommendations.average.1': 'قلل من السعرات الحرارية',
		'tools.bodyFat.recommendations.average.2': 'زد من النشاط البدني',
		'tools.bodyFat.recommendations.average.3': 'اتبع نظام غذائي صحي',
		'tools.bodyFat.recommendations.obese.1': 'استشر طبيب أو أخصائي تغذية',
		'tools.bodyFat.recommendations.obese.2': 'ابدأ برنامج إنقاص وزن تدريجي',
		'tools.bodyFat.recommendations.obese.3': 'مارس الرياضة بانتظام',
		
		// Body Fat Errors
		'tools.bodyFat.errors.invalidInputs': 'يرجى إدخال قيم صحيحة',
		'tools.bodyFat.errors.computeFailed': 'حدث خطأ في الحساب',
		
		// Body Fat Info
		'tools.bodyFat.info.whatItDoes': 'تحسب نسبة الدهون في الجسم باستخدام قياسات محيط الجسم.',
		'tools.bodyFat.info.howToUse': 'أدخل جنسك، طولك، محيط رقبتك، خصرك، ومحيط وركك (للنساء فقط).',
		'tools.bodyFat.info.inputGuide': 'استخدم شريط قياس مرن لقياس المحيطات بدقة. قم بالقياس في الصباح قبل الأكل.',
		'tools.bodyFat.info.resultExplanation': 'النسبة تعطي تقدير لنسبة الدهون في جسمك مقارنة بالوزن الكلي.',
		'tools.cancerScreening.title': 'حاسبة فحص السرطان',
		'tools.medicationDosage.title': 'حاسبة جرعة الدواء',
		'tools.sleepCycle.title': 'حاسبة دورة النوم',
		
		// Sleep Cycle Inputs
		'tools.sleepCycle.inputs.mode': 'الوضع',
		'tools.sleepCycle.inputs.mode.wake': 'بناءً على وقت الاستيقاظ',
		'tools.sleepCycle.inputs.mode.bed': 'بناءً على وقت النوم',
		'tools.sleepCycle.inputs.wakeTime': 'وقت الاستيقاظ (ساعة)',
		'tools.sleepCycle.inputs.bedtime': 'وقت النوم (ساعة)',
		
		// Sleep Cycle Results
		'tools.sleepCycle.results.bedtimes': 'أوقات النوم المقترحة:',
		'tools.sleepCycle.results.wakeTimes': 'أوقات الاستيقاظ المقترحة:',
		'tools.sleepCycle.results.placeholder': 'أدخل البيانات واضغط احسب للحصول على النتائج',
		
		// Sleep Cycle Tips
		'tools.sleepCycle.tips.title': 'نصائح للنوم الأفضل:',
		'tools.sleepCycle.tips.chooseTime': 'اختر الوقت الذي يناسبك من الأوقات المقترحة',
		'tools.sleepCycle.tips.fallAsleep': 'يستغرق النوم عادة 15-20 دقيقة',
		'tools.sleepCycle.tips.consistent': 'حافظ على نفس وقت النوم والاستيقاظ يومياً',
		'tools.sleepCycle.tips.routine': 'اتبع روتين نوم مريح قبل النوم',
		'tools.sleepCycle.tips.noScreens': 'تجنب الشاشات قبل النوم بساعة',
		
		// Sleep Cycle Info
		'tools.sleepCycle.info.whatItDoes': 'تحسب أوقات النوم والاستيقاظ المثالية بناءً على دورات النوم الطبيعية.',
		'tools.sleepCycle.info.howToUse': 'اختر الوضع المناسب وأدخل وقت الاستيقاظ أو النوم المطلوب.',
		'tools.sleepCycle.info.inputGuide': 'استخدم التوقيت العشري (مثل 7.5 لـ 7:30 صباحاً).',
		'tools.sleepCycle.info.resultExplanation': 'الأوقات المقترحة تعتمد على دورات النوم الطبيعية (90 دقيقة لكل دورة).',
		'tools.sleepCycle.info.medicalDisclaimer': 'هذه الأداة للأغراض التعليمية فقط ولا تحل محل الاستشارة الطبية.',
		'tools.sleepCycle.explain': 'النتائج تعتمد على دورات النوم الطبيعية (90 دقيقة لكل دورة) لضمان الاستيقاظ في نهاية دورة نوم كاملة.',
		'tools.lifestyleCoach.title': 'مدرب نمط الحياة',
		'tools.strokeRisk.title': 'تقييم مخاطر السكتة الدماغية',
		'tools.egfr.title': 'حاسبة معدل الترشيح الكبيبي',
		'tools.pregnancyWeightGain.title': 'حاسبة زيادة الوزن أثناء الحمل',
		'tools.pregnancyDueDate.title': 'حاسبة موعد الولادة',
		'tools.ovulation.title': 'حاسبة الإباضة',
		'tools.heartRateZones.title': 'حاسبة مناطق معدل ضربات القلب',
		'tools.smokingRisk.title': 'تقييم مخاطر التدخين',
		'tools.diabetesRisk.title': 'تقييم مخاطر السكري',

		'tools.cholesterolRatio.title': 'حاسبة نسبة الكوليسترول',
		'tools.diabeticRetinopathy.title': 'تقييم اعتلال الشبكية السكري',

		
		// Chat Upload
		'chat.upload.title': 'رفع ملف',
		
		// Feedback
		'feedback.title': 'نموذج التعليقات',
		
		// Social Media
		'social.facebook': 'فيسبوك',
		'social.instagram': 'إنستغرام',
		'social.linkedin': 'لينكد إن',
		
		// Chat Status
		'chat.status.thinking': 'بفحص...',
		'chat.status.available': 'متاح دلوقتي',
		
		// Chat UI Elements
		'chat.ui.aiFeatures': 'ميزات الذكاء الاصطناعي',
		'chat.ui.streamingResponses': 'الردود المباشرة',
		'chat.ui.visionAnalysis': 'تحليل الصور',
		'chat.ui.functionCalling': 'استدعاء الوظائف',
		'chat.ui.creativity': 'الإبداع',
		'chat.ui.focused': 'مركز',
		'chat.ui.creative': 'إبداعي',
		'chat.input.placeholder': 'اكتب رسالتك هنا...',
		'chat.error.tryAgain': 'جرّب تاني',
		'chat.systemPrompt.reasoning': '**وضع التفكير:** اشرح خطوات تفكيرك بوضوح وقدم المنطق وراء توصياتك مع ذكر المصادر العلمية إن أمكن.',
		'chat.systemPrompt.advanced': '**الوضع المتقدم:** استخدم تحليل متعمق وتوصيات مفصلة بناءً على أحدث الأبحاث الطبية.',
		'chat.imageAnalysis': 'حلّل الصورة الطبية التالية',
		'chat.systemPrompt.core': 'أنت مساعد طبي موثوق ولطيف. قدّم معلومات دقيقة وحديثة بشكل مبسّط، واشرح المخاطر ومتى لازم تروح للدكتور.',
		'chat.systemPrompt.noTradeNames': 'مهم: متستخدمش الأسماء التجارية للدوا أو الأجهزة. استخدم الأسماء العلمية بس.',
		
		// AI Model Descriptions
		'chat.models.gpt4.description': 'أكثر النماذج قدرة على التفكير الطبي المعقد',
		'chat.models.gemini.description': 'سريع وفعال للردود السريعة',
		'chat.models.claude.description': 'ممتاز للتحليل المفصل والشروحات',
		'chat.models.deepseek.description': 'متخصص في التفكير وحل المشاكل',
		

		

	}
}

// Get translation function
export function getTranslation(key: string, locale: Locale = defaultLocale): string {
	return messages[locale][key] || key
}

// Get text direction function
export function getTextDirection(): 'rtl' | 'ltr' {
	return getDir()
}

// Validate i18n system
export function validateI18nSystem(): {
	isValid: boolean
	coverage: Record<Locale, number>
	missingKeys: string[]
	issues: string[]
} {
	const arabicKeys = Object.keys(messages.ar)
	
	// Check for empty translations
	const emptyKeys = arabicKeys.filter(key => !messages.ar[key] || messages.ar[key].trim() === '')
	
	// Check for placeholder translations
	const placeholderKeys = arabicKeys.filter(key => 
		messages.ar[key].includes('TODO') || 
		messages.ar[key].includes('FIXME') || 
		messages.ar[key].includes('PLACEHOLDER')
	)
	
	const issues: string[] = []
	if (emptyKeys.length > 0) {
		issues.push(`${emptyKeys.length} empty translations found`)
	}
	if (placeholderKeys.length > 0) {
		issues.push(`${placeholderKeys.length} placeholder translations found`)
	}
	
	return {
		isValid: issues.length === 0,
		coverage: { ar: 100 },
		missingKeys: [],
		issues
	}
}

// Get system status
export function getSystemStatus(): {
	status: 'ready' | 'needs-attention' | 'error'
	message: string
	details: Record<string, unknown>
} {
	const validation = validateI18nSystem()
	
	if (validation.isValid) {
		return {
			status: 'ready',
			message: 'نظام الترجمة جاهز للاستخدام',
			details: {
				totalKeys: Object.keys(messages.ar).length,
				coverage: validation.coverage
			}
		}
	} else {
		return {
			status: 'needs-attention',
			message: 'نظام الترجمة يحتاج إلى اهتمام',
			details: {
				issues: validation.issues,
				totalKeys: Object.keys(messages.ar).length
			}
		}
	}
}
