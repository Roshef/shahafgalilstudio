// =====================================================================
// Shahaf Galil Studio, site data (single source of truth)
// כל תוכן האתר. עריכה כאן, build.js מייצר את הדפים.
// =====================================================================

const CONFIG = {
  siteName: { he: "שחף גליל", ar: "شهاف چليل", en: "Shahaf Galil" },
  tagline: { he: "אני בונה עולמות.", ar: "أبني عوالم.", en: "I build worlds." },
  email: "shahafgalil@gmail.com",
  instagram: "https://www.instagram.com/shahafgalilstudio",
  substackUrl: "",            // כשיהיה סאבסטאק, להדביק כאן את הכתובת המלאה
  clarityId: "xknwer6lgs",    // Microsoft Clarity
  ga4Id: "",                  // מזהה GA4 (G-XXXXXXX)
  baseUrl: "https://shahafgalilstudio.vercel.app",
};

// תערוכה פעילה, למלא כשמגיעים הפרטים. confirmed:false = בלוק "פרטים בקרוב"
const EXHIBITION = {
  confirmed: false,
  title: { he: "", en: "" },
  venue: "",
  city: { he: "", en: "" },
  dates: "",          // "12.9 – 30.10.2026"
  hours: "",
  rsvpUrl: "",        // Partiful / אירוע פייסבוק
  note: { he: "", en: "" },
};

// ---------------------------------------------------------------------
// טקסט ממשק (כרום), תלת-לשוני
// ---------------------------------------------------------------------
const CHROME = {
  he: {
    dir: "rtl", works: "עבודות", about: "אודות", exhibitions: "תערוכות",
    journal: "יומן", contact: "פנייה", statement: "הצהרת אמן",
    back: "→ חזרה", backHome: "→ כל העבודות", enter: "כניסה",
    selectedWorks: "נבחרות", body: "גוף עבודה", worksIn: "עבודות",
    railTitle: "כותרת", railImage: "דימוי", railLayers: "רבדים",
    railConstruction: "בנייה", railActions: "פעולות",
    layersLabel: "רבדים", constructionLabel: "בנייה",
    objectsLabel: "דמויות ועצמים", contextLabel: "רקע", processLabel: "תהליך",
    wallLabel: "דף קיר", nextWork: "העבודה הבאה",
    ctaInquire: "פנייה", ctaInquireEn: "Inquire",
    ctaInquireDesc: "רכישה, תערוכה, ייצוג, כתיבה, בחר את הפרופיל המתאים.",
    ctaAsk: "שאלה לאמן", ctaAskEn: "Ask",
    ctaAskDesc: "על הבנייה, על השכבות, על ההחלטות. אני עונה בעצמי, לא תמיד מיד.",
    ctaAskAction: "כתוב לי ←",
    ctaJoin: "יומן הפרויקט", ctaJoinEn: "Journal",
    ctaJoinDesc: "תיעוד התהליך, התלבטויות והחלטות שעוד מתהוות.",
    ctaJoinAction: "לעדכונים ←",
    share: "שיתוף", copyLink: "העתק קישור", copied: "הועתק ✓",
    followIg: "אינסטגרם", journalSoon: "היומן נפתח בקרוב",
    exhibitionCurrent: "תערוכה", exhibitionUpcoming: "תערוכה קרובה",
    exhibitionSoon: "פרטים בקרוב", exhibitionNotify: "ספרו לי כשזה מגיע לעיר שלי",
    exhibitionsPast: "ארכיון", exhibitionsNone: "אין תערוכה פעילה כרגע.",
    rsvp: "אישור הגעה", details: "פרטים",
    translationSoon: "תרגום מלא בקרוב", heOnly: "הטקסט המלא בעברית",
    cookieText: "האתר משתמש ב-cookies לניתוח אנונימי של חוויית הצפייה, כדי לשפר את האתר. לא נאסף מידע אישי מזהה.",
    cookieOk: "הבנתי", cookieNo: "דחה",
    profileCollector: "אספן · רכישה", profileCollectorEn: "Collector",
    profileCurator: "אוצר · תערוכה", profileCuratorEn: "Curator",
    profileGallery: "גלריה · ייצוג", profileGalleryEn: "Gallery",
    profilePress: "עיתונות · כתיבה", profilePressEn: "Press",
    profileCurious: "סקרן · שיחה", profileCuriousEn: "Curious",
    contactLede: "בחר את הפרופיל המתאים, כל פנייה מגיעה ישירות אליי.",
    aboutTitle: "אודות", cvTitle: "קורות חיים",
    playStatement: "הצהרת אמן, קריאה מוקצבת ←",
  },
  ar: {
    dir: "rtl", works: "أعمال", about: "نبذة", exhibitions: "معارض",
    journal: "يوميات", contact: "تواصل", statement: "بيان الفنان",
    back: "→ عودة", backHome: "→ كل الأعمال", enter: "دخول",
    selectedWorks: "مختارات", body: "مجموعة", worksIn: "أعمال",
    railTitle: "العنوان", railImage: "الصورة", railLayers: "طبقات",
    railConstruction: "البناء", railActions: "إجراءات",
    layersLabel: "طبقات", constructionLabel: "البناء",
    objectsLabel: "شخصيات وأشياء", contextLabel: "خلفية", processLabel: "العملية",
    wallLabel: "لوحة الجدار", nextWork: "العمل التالي",
    ctaInquire: "تواصل", ctaInquireEn: "Inquire",
    ctaInquireDesc: "اقتناء، معرض، تمثيل، كتابة, اختر الملف المناسب.",
    ctaAsk: "سؤال للفنان", ctaAskEn: "Ask",
    ctaAskDesc: "عن البناء، عن الطبقات، عن القرارات. أجيب بنفسي.",
    ctaAskAction: "اكتب لي ←",
    ctaJoin: "يوميات المشروع", ctaJoinEn: "Journal",
    ctaJoinDesc: "توثيق العملية، تردّدات وقرارات ما زالت تتشكّل.",
    ctaJoinAction: "للتحديثات ←",
    share: "مشاركة", copyLink: "انسخ الرابط", copied: "نُسخ ✓",
    followIg: "إنستغرام", journalSoon: "اليوميات تُفتح قريباً",
    exhibitionCurrent: "معرض", exhibitionUpcoming: "معرض قادم",
    exhibitionSoon: "التفاصيل قريباً", exhibitionNotify: "أخبروني عندما يصل إلى مدينتي",
    exhibitionsPast: "أرشيف", exhibitionsNone: "لا يوجد معرض حالياً.",
    rsvp: "تأكيد الحضور", details: "تفاصيل",
    translationSoon: "الترجمة الكاملة قريباً", heOnly: "النص الكامل بالعبرية",
    cookieText: "يستخدم الموقع ملفات cookies لتحليل مجهول لتجربة المشاهدة. لا تُجمع معلومات شخصية.",
    cookieOk: "فهمت", cookieNo: "رفض",
    profileCollector: "مقتنٍ · اقتناء", profileCollectorEn: "Collector",
    profileCurator: "قيّم · معرض", profileCuratorEn: "Curator",
    profileGallery: "غاليري · تمثيل", profileGalleryEn: "Gallery",
    profilePress: "صحافة · كتابة", profilePressEn: "Press",
    profileCurious: "فضولي · حديث", profileCuriousEn: "Curious",
    contactLede: "اختر الملف المناسب, كل رسالة تصلني مباشرة.",
    aboutTitle: "نبذة", cvTitle: "سيرة",
    playStatement: "بيان الفنان, قراءة موقوتة ←",
  },
  en: {
    dir: "ltr", works: "Works", about: "About", exhibitions: "Exhibitions",
    journal: "Journal", contact: "Contact", statement: "Artist Statement",
    back: "← Back", backHome: "← All works", enter: "Enter",
    selectedWorks: "Selected", body: "Body of work", worksIn: "works",
    railTitle: "Title", railImage: "Image", railLayers: "Layers",
    railConstruction: "Construction", railActions: "Actions",
    layersLabel: "Layers", constructionLabel: "Construction",
    objectsLabel: "Figures & Objects", contextLabel: "Context", processLabel: "Process",
    wallLabel: "Wall Label", nextWork: "Next work",
    ctaInquire: "Inquire", ctaInquireEn: "פנייה",
    ctaInquireDesc: "Acquisition, exhibition, representation, press, choose your profile.",
    ctaAsk: "Ask the artist", ctaAskEn: "שאלה",
    ctaAskDesc: "About the construction, the layers, the decisions. I answer personally.",
    ctaAskAction: "Write to me →",
    ctaJoin: "Project Journal", ctaJoinEn: "יומן",
    ctaJoinDesc: "Process notes, doubts and decisions still taking shape.",
    ctaJoinAction: "Get updates →",
    share: "Share", copyLink: "Copy link", copied: "Copied ✓",
    followIg: "Instagram", journalSoon: "The journal opens soon",
    exhibitionCurrent: "Exhibition", exhibitionUpcoming: "Upcoming exhibition",
    exhibitionSoon: "Details soon", exhibitionNotify: "Tell me when it reaches my city",
    exhibitionsPast: "Archive", exhibitionsNone: "No active exhibition right now.",
    rsvp: "RSVP", details: "Details",
    translationSoon: "Full translation coming soon", heOnly: "Full text in Hebrew",
    cookieText: "This site uses cookies for anonymous viewing analytics, to improve the site. No personally identifying data is collected.",
    cookieOk: "Got it", cookieNo: "Decline",
    profileCollector: "Collector · Acquisition", profileCollectorEn: "אספן",
    profileCurator: "Curator · Exhibition", profileCuratorEn: "אוצר",
    profileGallery: "Gallery · Representation", profileGalleryEn: "גלריה",
    profilePress: "Press · Editorial", profilePressEn: "עיתונות",
    profileCurious: "Curious · Conversation", profileCuriousEn: "סקרן",
    contactLede: "Choose the profile that fits, every message reaches me directly.",
    aboutTitle: "About", cvTitle: "CV",
    playStatement: "Artist statement, timed reading →",
  },
};

// ---------------------------------------------------------------------
// הצהרת אמן, 6 שקופיות (קאנון עברי מלא; תרגום קיים ל-1–4)
// ---------------------------------------------------------------------
const STATEMENT = [
  { he: "אני בונה עולמות.", ar: "أبني عوالم.", en: "I build worlds." },
  {
    he: "במבט ראשון רואים סיטואציה אחת נסבלת, כמעט יפה. במבט שני חפץ קטן, מנח גוף, דינמיקה בין שני אנשים, מערערים על ההבנה הראשונה. במעט, ואז במעט יותר.\n\nכל רובד נוסף משנה את היחסים בדימוי, עד כדי הסתה או סתירה של הרובד שקדם לו.",
    ar: "في النظرة الأولى نرى موقفًا محتملاً، يكاد يكون جميلاً. في النظرة الثانية يزعزع غرض صغير أو وضعية جسد أو علاقة بين شخصين الفهم الأول.\n\nكل طبقة جديدة تغيّر العلاقات داخل الصورة، حتى تناقض ما سبقها.",
    en: "At first glance, the scene appears bearable, almost beautiful. At second glance a small object, a body position, a dynamic between two people unsettles that first reading. A little, then a little more.\n\nEach added layer changes the relationships in the image, to the point of contradicting the one before it.",
  },
  {
    he: "בכל רובד יש מטען רגשי. ככל שמשתהים בתוך העולם, ככל שמתגלים יותר רבדים, המטען מצטבר, אפילו אם משמעות הרובד מוסטת או נסתרת על ידי רובד עוקב.\n\nלבסוף, כאשר לא מתגלים יותר רבדים, העולם מתרוקן ממשמעות. וברגע הזה כל מטעני הרגש מתחברים זה לזה דווקא בשל אובדן המשמעות, ונשאר רק מה שאי אפשר לבטא במילים, אלא בהרגשה.",
    ar: "في كل طبقة شحنة عاطفية. كلما طال البقاء داخل العالم وانكشفت طبقات أكثر، تتراكم الشحنة، حتى لو حجبت طبقةٌ لاحقة معنى ما سبقها.\n\nوأخيراً، عندما لا تنكشف طبقات جديدة، يفرغ العالم من المعنى. وفي تلك اللحظة تتصل الشحنات العاطفية ببعضها بسبب فقدان المعنى تحديداً، ويبقى ما لا يُقال بالكلمات، بل بالإحساس.",
    en: "Each layer carries an emotional charge. The longer you stay inside the world, the more layers are revealed, the more the charge accumulates, even when a later layer displaces the meaning of an earlier one.\n\nFinally, when no more layers reveal themselves, the world empties of meaning. And in that moment all the accumulated charges connect precisely because meaning is lost, and what remains cannot be said in words, only felt.",
  },
  {
    he: "מעניינים אותי יחסים בין אנשים: תקשורת, יחסי קרבה וכוח, מבנים חברתיים, בעיקר קבוצתיים.\n\nבכל עולם שלי אני מנסה לבטא ולחקור אותם, בכמה שכבות.",
    ar: "تهمّني العلاقات بين الناس: التواصل، علاقات القرب والقوة، البنى الاجتماعية، الجماعية خصوصاً.\n\nفي كل عالم من عوالمي أحاول التعبير عنها واستكشافها، في عدة طبقات.",
    en: "I am drawn to relationships between people: communication, intimacy and power, social structures, especially group ones.\n\nIn every world I build I try to express and examine them, in several layers.",
  },
  {
    he: "מרתקים אותי מרחבים לימינליים, מקומות שחלף זמנם, או שאינם ממלאים עוד את ייעודם.\n\nאני מבקר בהם שוב ושוב. כותב, יושב, מקשיב, מדמיין את מי שהיו בהם. הם כר מושלם ליצירת העולמות שלי.",
    ar: "", en: "",
  },
  {
    he: "אני מתחיל ממקום. חוזר אליו, מדמיין מה יש בתוכו, על מי שחיים בו, החלומות שלהם, הפחדים שלהם, היחסים ביניהם, הכוחות הפועלים עליהם. רק כשאני מבין את העולם, אני בונה את הדימוי.",
    ar: "", en: "",
  },
];

// ---------------------------------------------------------------------
// גופי עבודה
// ---------------------------------------------------------------------
const BODIES = [
  {
    key: "forged-trees",
    menuLabel: { he: "עצים מעוקמים", ar: "أشجار معوجّة", en: "Forged Trees" },
    title: { he: "עצים מעוקמים", ar: "أشجار معوجّة", en: "Forged Trees" },
    oneLiner: {
      he: "שישה דימויים מבוימים בגבעה הצרפתית, ירושלים. כל אחד משחזר רגע שבו מעשה יומיומי הופך לבלתי הפיך.",
      ar: "صور مُخرجة في التلة الفرنسية، القدس. كل صورة تستعيد لحظة يتحول فيها فعل يومي إلى ما لا رجعة عنه.",
      en: "Staged images in French Hill, Jerusalem. Each restages a moment in which an everyday act becomes irreversible.",
    },
    meta: "220×160 ס״מ · פיגמנט / פלטינה־פלדיום על נייר קוזו־מיצומטה · 2025–2026",
    wall: {
      he: "בגבעה הצרפתית בירושלים גדלים עצים שהרוח עיצבה. הם לא נשברו. הם גדלו בתוך כוח שפעל עליהם לאורך זמן, עד שקיבלו צורה שהיא גם תוצאה של לחץ וגם יופי שאי אפשר לייצר אחרת.\n\nהצורה שלהם היא רישום של מה שעבר דרכם.\n\nגדלתי בשכונה הזאת, שכונת תפר שהוקמה בשנות השבעים. הכרתי את העצים האלה עוד לפני שהבנתי למה אני מזהה בהם משהו.\n\nזה גם האופן שבו טראומה פועלת: לא דרך שבר מיידי אלא דרך עיכוב, מבט שמתעקש לקרוא את המציאות כרגילה גם כשהיא כבר מזמן לא.",
    },
    context: [
      "הגבעה הייתה נקודת תצפית וגבול עוד לפני שהיה לה שם. על ראשה מיצד מתקופת מלכי יהודה, שנבנה לפני כשלושת אלפים שנה לשמור על הדרך לירושלים מצפון.",
      "עד 1967 עבר כאן הגבול: הר הצופים היה מובלעת ישראלית בתוך השטח הירדני, ועל הגבעה ישב מוצב ששלט על דרך שכם. ביוני 1967 נכבשה הגבעה בקרבות על צפון ירושלים.",
      "השכונה הוקמה ב־1971 על השטח שנכבש, כאחת מ׳שכונות הבריח׳ שנועדו לנעול רצף בין ירושלים המערבית להר הצופים. הבנייה המהירה הייתה מהלך פוליטי בתגובה ללחץ בינלאומי.",
      "שכונת תפר: גובלת בשועפאט ובעיסאוויה. סטודנטים, משפחות חילוניות, חרדיות וערביות. מהנקודות הגבוהות בירושלים, על קו הגבול בין הרי יהודה למדבר.",
      "היום השכונה עומדת בפני תמ״א מקיף. המרקם שבו צילמתי יפונה וייבנה מחדש. אחד העצים שצילמתי כבר סומן לעקירה. במקומו ייבנו מגדלים.",
    ],
    process: [
      "התחלתי מהשכונה עצמה. הסתובבתי בה בלילות, שוב ושוב, וזיהיתי עשרה דימויים, עשרה מקומות שבהם משהו עמד באוויר.",
      "חזרתי אליהם. ישבתי, כתבתי, צילמתי אותם ריקים. לאט נבנו הדינמיקות והאירועים: מי היה שם, מה קרה, מה אי אפשר להחזיר.",
      "בתהליך התגלו לי דברים על עצמי. מצאתי בתוך הדימויים דברים מהעבר.",
      "מעשרת הדימויים נבחרו שישה. כל אחד בוים במלואו, שחקנים, אור מפוסל, גשם, והודפס בפלטינה־פלדיום על נייר בעבודת יד.",
    ],
  },
  {
    key: "library",
    menuLabel: { he: "ספרייה", ar: "مكتبة", en: "Library" },
    title: { he: "ספרייה לאומית ישנה", ar: "المكتبة الوطنية القديمة", en: "The Old National Library" },
    oneLiner: {
      he: "שתי עבודות שנולדו מחודשים בספרייה הלאומית הישנה, חלל עצום שנועד לידע, ועומד ריק.",
      ar: "عملان وُلدا من شهور في المكتبة الوطنية القديمة, فضاء هائل خُصص للمعرفة ويقف فارغاً.",
      en: "Two works born of months inside the old National Library, a vast space built for knowledge, standing empty.",
    },
    meta: "165×110 ס״מ · הדפסת פיגמנט · 2025",
    wall: {
      he: "ביליתי חודשים בספרייה הלאומית הישנה. חלל עצום שנועד לידע, וכיום ריק מספרים. ארכיון וספרייה אנלוגית שאין בה אפילו שקעים חשמליים.\n\nמקום שחלף זמנו אך עדיין נוכח. הזמן ממשיך בחוץ; בפנים הוא נתקע. גיליתי שם בדידות, נתק וחוסר כיוון.\n\nכך נולד סיפור של יציאה: ניסיון לעזוב מבנה חברתי ורגשי שאינו מאפשר תנועה.",
    },
    context: [],
    process: [],
  },
  {
    key: "hakimi",
    menuLabel: { he: "חכמי", ar: "حكيمي", en: "Hakimi" },
    title: { he: "יוסי חכמי", ar: "يوسي حكيمي", en: "Yossi Hakimi" },
    oneLiner: {
      he: "המפעל הנטוש בבית שאן, שלושים שנה ריק כמו ההבטחה לעיר, מסופר כמחזור חיים של סטארטאפ.",
      ar: "المصنع المهجور في بيت شان، فارغ منذ ثلاثين عاماً كالوعد للمدينة, يُروى كدورة حياة شركة ناشئة.",
      en: "The abandoned factory in Beit She'an, empty for thirty years like the promise to the town, told as a startup life cycle.",
    },
    meta: "שש עבודות · 146×110 ס״מ · הדפסת פיגמנט · 2024",
    wall: {
      he: "סיפורו של המפעל הנטוש בבית שאן, מפעל שהיה אמור להביא מאות מקומות עבודה לעיר ולהזניק את כלכלתה.\n\nמסופר דרך סיפורו של יוסי חכמי, שהורשע בהונאת ענק של מדינת ישראל תוך כדי בניית המפעל, שכבר שלושים שנה עומד ריק, כמו ההבטחה לעיר.",
    },
    context: [
      "בית שאן. מפעל שהיה אמור להביא מאות מקומות עבודה לעיר ולהזניק את כלכלתה.",
      "יוסי חכמי הורשע בהונאת ענק של מדינת ישראל תוך כדי בניית המפעל. המפעל מעולם לא נפתח.",
      "שלושים שנה הוא עומד ריק, כמו ההבטחה לעיר.",
      "הסדרה מצולמת בתוך המפעל הנטוש, ומספרת את הסיפור כמחזור חיים של סטארטאפ: פיטש · מיטאפ · דיל · בילד · אקזיט · קלוזינג.",
    ],
    process: [
      "הסדרה כולה צולמה בתוך המפעל הנטוש: האולמות, המדרגות, הכלוב, המסדרונות.",
      "קבוצה אחת של דמויות חוזרת מדימוי לדימוי, בלבוש עסקי. מקור אור בודד ועשן מפסלים את החללים הריקים.",
    ],
  },
  {
    key: "twelve",
    menuLabel: { he: "12", ar: "12", en: "12" },
    title: { he: "12", ar: "اثنا عشر", en: "Twelve" },
    oneLiner: {
      he: "לילה אחד בתל אביב, מ־19:00 עד 07:00. שתי סדרות מקבילות, אותו סיפור משני צדדים של הפרעת זהות דיסוציאטיבית, המתכנסות לדימוי סיום אחד.",
      ar: "ليلة واحدة في تل أبيب، من 19:00 حتى 07:00. سلسلتان متوازيتان، القصة نفسها من جانبَي اضطراب الهوية الانفصامي، تلتقيان في صورة نهاية واحدة.",
      en: "One night in Tel Aviv, 19:00 to 07:00. Two parallel series, the same story from two sides of a dissociative identity, converging into a single final image.",
    },
    meta: "עשרים עבודות · 90×60 ס״מ · הדפסת פיגמנט · 2024",
    wall: {
      he: "שתי סדרות של 11 דימויים המתכנסות לדימוי אחד שמהווה סוף.\n\nהסדרות מספרות את אותו סיפור מנקודת מבט של שני צדדים של הפרעת זהות דיסוציאטיבית, דימוי לכל שעה בלילה, בין שקיעה לזריחה, התרחשות אפלה תל־אביבית בגשם.",
    },
    context: [
      "לילה אחד בתל אביב, מ־19:00 עד 07:00. דימוי לכל שעה.",
      "גבר ואישה עוברים באותם מקומות, באותן שעות, באותן תנוחות. שתי הסדרות מתכנסות לדימוי סיום אחד.",
      "מאחורי העלילה, עיר במצב ביניים: תל אביב העוברת מעיר שטוחה לעיר של גורדי שחקים. מנופים, שלדים, מרפסות.",
      "הגשם, הרכב הלבן, החלון, חוזרים משעה לשעה כעדים.",
    ],
    process: [
      "כל שעה צולמה פעמיים: פעם עם הדמות הגברית, פעם עם הנשית. אותו מקום, אותה תנוחה, אותה תאורה.",
      "הלוקיישנים נעים עם הלילה: חלון הדירה, הכביש, החניון, הגראז', המכולות, המרפסת. תל אביב בין שקיעה לזריחה, בגשם.",
    ],
  },
];

// ---------------------------------------------------------------------
// עבודות
// hotspot positions are ESTIMATES on placeholder art, לכוונן עם ה-editor
// כשהצילומים האמיתיים נכנסים.
// ---------------------------------------------------------------------
const WORKS = [
  // ===== עצים מעוקמים =====
  {
    key: "shutters", body: "forged-trees", num: "01",
    title: { he: "תריסים", ar: "مصاريع", en: "Shutters" },
    year: "2025–2026", dimensions: "220×160 ס״מ", medium: "פיגמנט / פלטינה־פלדיום",
    summary: {
      he: "משחק שכונתי על מדרגות הופך לדימוי של השתייכות, אומץ שהגיע מאוחר, והמתנה לקבוצה שכבר איננה.",
      ar: "تتحول لعبة حي على الدرج إلى صورة عن الانتماء والشجاعة التي جاءت متأخرة وانتظار مجموعة لم تعد موجودة.",
      en: "A neighborhood game on a staircase becomes an image of belonging, courage that arrived too late, and waiting for a group that is no longer there.",
    },
    layers: [
      { he: "רובד ראשון: מדרגות אבן ירושלמיות, קרשי עץ מונחים עליהן. משחק שכונתי: מחליקים על התריסים במורד המדרגות. משחק מסוכן, וזה חלק ממנו.",
        ar: "الطبقة الأولى: درج حجري مقدسي وألواح خشبية موضوعة عليه. لعبة حيّ: الانزلاق على المصاريع إلى أسفل الدرج. لعبة خطرة، وهذا جزء منها.",
        en: "Layer one: Jerusalem stone steps with wooden boards laid across them. A neighborhood game, sliding down the stairs on shutters. The danger is part of the game." },
      { he: "רובד שני: הילד למטה, לבד, על התריסים. הקבוצה למעלה, בראש המדרגות, לא מסתכלת. הוא אזר אומץ בשביל התור שלו. כשהגיע, כולם כבר הלכו.",
        ar: "الطبقة الثانية: الطفل في الأسفل، وحده على المصاريع. المجموعة في أعلى الدرج لا تنظر. جمع شجاعته من أجل دوره. عندما وصل، كان الجميع قد غادروا.",
        en: "Layer two: the child is below, alone on the shutters. The group is at the top of the stairs, not looking. He gathered courage for his turn. By the time it came, everyone had left." },
      { he: "רובד שלישי: לילה, גשם. היושבת על התריסים כבר לא ילדה. היא עדיין שם, ראש כלפי מעלה, מחפשת אותם במעלה המדרגות.",
        ar: "الطبقة الثالثة: ليل ومطر. الجالسة على المصاريع لم تعد طفلة. ما زالت هناك، رأسها مرفوع، تبحث عنهم أعلى الدرج.",
        en: "Layer three: night and rain. The figure sitting on the shutters is no longer a child. She remains there, looking upward, searching for them at the top of the stairs." },
      { he: "מה שנשאר: התור שהגיע כשלא נשאר אף אחד לראות.",
        ar: "ما يبقى: الدور الذي وصل حين لم يبق أحد ليراه.",
        en: "What remains: the turn that arrived when no one was left to see it." },
    ],
    hotspots: [
      { id: "figure", x: 40, y: 62, name: { he: "הדמות", ar: "الشخصية", en: "The figure" } },
      { id: "shutters", x: 48, y: 72, name: { he: "התריסים", ar: "المصاريع", en: "The shutters" } },
      { id: "group", x: 70, y: 22, name: { he: "הקבוצה", ar: "المجموعة", en: "The group" } },
      { id: "stairs", x: 55, y: 44, name: { he: "המדרגות", ar: "الدرج", en: "The stairs" } },
    ],
    construction: [
      { title: { he: "מקום", ar: "المكان", en: "Place" }, text: { he: "מדרגות אבן בשכונת הגבעה הצרפתית בירושלים.", ar: "درج حجري في حي التلة الفرنسية في القدس.", en: "Stone stairs in French Hill, Jerusalem." } },
      { title: { he: "אור", ar: "الضوء", en: "Light" }, text: { he: "אור מפוסל בלילה, גשם וצללים שמפרידים בין הדמות לקבוצה.", ar: "ضوء مشكّل ليلاً، مطر وظلال تفصل الشخصية عن المجموعة.", en: "Sculpted night light, rain, and shadows separating the figure from the group." } },
      { title: { he: "חומר", ar: "المادة", en: "Material" }, text: { he: "הדפס פיגמנט או פלטינה־פלדיום על נייר, בקנה מידה גדול.", ar: "طباعة صبغية أو بلاتين-بلاديوم على ورق، بحجم كبير.", en: "Pigment or platinum-palladium print on paper at large scale." } },
    ],
  },
  {
    key: "peppers", body: "forged-trees", num: "02", peppersFull: true,
    title: { he: "פלפלים", ar: "فلفل", en: "Peppers" },
    year: "2025–2026", dimensions: "220×160 ס״מ", medium: "פיגמנט / פלטינה־פלדיום",
    summary: {
      he: "רגע ביתי שגרתי בגבעה הצרפתית. אם מושיטה פרי לילדה. בשכבה השביעית מתברר שהיא לא האם, ושכל הסכימה הביתית שנבנתה מהפריים הראשון הייתה כוזבת.",
      ar: "لحظة منزلية عادية في التلة الفرنسية. أم تمدّ فاكهة لطفلة. في الطبقة السابعة يتضح أنها ليست الأم، وأن المخطط المنزلي كله كان زائفاً.",
      en: "An ordinary domestic moment in French Hill. A mother offers fruit to a girl. In the seventh layer it turns out she is not the mother, and the whole domestic schema built from the first frame was false.",
    },
    layers: [], // מוזרק מ-peppers.json בזמן build (7 רבדים + 5 קטגוריות מלאות)
    hotspots: [], // מוזרק מ-peppers.json, 6 אובייקטים תלת-לשוניים
    construction: [
      { title: { he: "מקום", ar: "المكان", en: "Place" }, text: { he: "פנים ביתי בגבעה הצרפתית, ירושלים.", ar: "داخل منزل في التلة الفرنسية، القدس.", en: "A domestic interior in French Hill, Jerusalem." } },
      { title: { he: "אור", ar: "الضوء", en: "Light" }, text: { he: "מקור אור אחד מצד שמאל. החותך, לא העוטף.", ar: "مصدر ضوء واحد من اليسار. القاطع، لا المحتضن.", en: "A single light source from the left. Cutting, not enveloping." } },
      { title: { he: "חומר", ar: "المادة", en: "Material" }, text: { he: "הדפס פיגמנט או פלטינה־פלדיום על נייר, בקנה מידה גדול.", ar: "طباعة صبغية أو بلاتين-بلاديوم على ورق، بحجم كبير.", en: "Pigment or platinum-palladium print on paper at large scale." } },
    ],
  },
  {
    key: "trails", body: "forged-trees", num: "03",
    title: { he: "שבילים", ar: "دروب", en: "Trails" },
    year: "2025–2026", dimensions: "220×160 ס״מ", medium: "פיגמנט / פלטינה־פלדיום",
    summary: { he: "שביל עפר בלילה. דמות בודדת חצי נבלעת בין הענפים, קבוצה מוארת על הרכס. השביל מוביל אליו, ואף אחד לא יורד לקחת אותו." },
    layers: [
      { he: "רובד ראשון: שביל עפר בלילה. קרקע לחה, עשב יבש, שקט. נוף לילי, כמעט יפה. הצופה נכנס בלי התנגדות." },
      { he: "רובד שני: העץ הגדול מימין מואר חזק מדי, כמעט מתפוצץ מלבן על שמיים שחורים. מישהו בחר להאיר את זה. הקריאה של נוף מתחילה להתערער." },
      { he: "רובד שלישי: דמות בודדת במרכז, חצי נבלעת בין הענפים החשופים. לא מסתתרת אבל גם לא גלויה. למה הוא שם, לבד, בלילה." },
      { he: "רובד רביעי: על הרכס משמאל, שלוש ארבע צלליות מוארות מאחור. קבוצה. הוא למטה, הם למעלה. המרחק ביניהם אינו רק פיזי. הוא חברתי." },
      { he: "מה שנשאר: השביל מוביל אליו, או עובר לידו. אף אחד לא יורד לקחת אותו." },
    ],
    hotspots: [
      { id: "trail", x: 50, y: 78, name: { he: "השביל", ar: "الدرب", en: "The trail" } },
      { id: "tree", x: 78, y: 32, name: { he: "העץ המואר", ar: "الشجرة المضاءة", en: "The lit tree" } },
      { id: "figure", x: 47, y: 55, name: { he: "הדמות", ar: "الشخصية", en: "The figure" } },
      { id: "ridge", x: 18, y: 28, name: { he: "הקבוצה על הרכס", ar: "المجموعة على السفح", en: "The group on the ridge" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שביל עפר בשולי הגבעה הצרפתית, ירושלים.", en: "A dirt trail at the edge of French Hill, Jerusalem." } },
      { title: { he: "אור", en: "Light" }, text: { he: "עץ מואר בעוצמה על שמיים שחורים; הקבוצה מוארת מאחור.", en: "A tree lit to bursting against black sky; the group backlit on the ridge." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפס פיגמנט או פלטינה־פלדיום על נייר, בקנה מידה גדול.", en: "Pigment or platinum-palladium print on paper at large scale." } },
    ],
  },
  {
    key: "suit", body: "forged-trees", num: "04",
    title: { he: "חליפה", ar: "بدلة", en: "Suit" },
    year: "2025–2026", dimensions: "220×160 ס״מ", medium: "פיגמנט / פלטינה־פלדיום",
    summary: { he: "קבוצה בקפוצ'ונים כהים מול דמות בודדת, חשופת חזה, בגשם. על הקרקע, בסדר הפוך לזמן, מה שהוסר שכבה אחרי שכבה." },
    layers: [
      { he: "רובד ראשון: קבוצה בקפוצ'ונים כהים, פנים בלתי נראים, גוף אחד אחיד. מולם דמות בודדת, חשופת חזה, בגשם, ידיים אסופות פנימה." },
      { he: "רובד שני: על הקרקע, בסדר הפוך לזמן, מה שהוסר שכבה אחרי שכבה: ז'קט, קפוצ'ון, חולצה, נעליים. וכדור אחד." },
      { he: "רובד שלישי: במרכז, נרתיק ניילון ריק. מיכל בצורת מה שחסר. משהו היה בו, ואיננו." },
      { he: "מה שנשאר: החליפה היא של הקבוצה. מי שהופשט ממנה עומד לבד בגשם." },
    ],
    hotspots: [
      { id: "group", x: 28, y: 45, name: { he: "הקבוצה", ar: "المجموعة", en: "The group" } },
      { id: "figure", x: 66, y: 48, name: { he: "הדמות", ar: "الشخصية", en: "The figure" } },
      { id: "clothes", x: 52, y: 76, name: { he: "הבגדים על הקרקע", ar: "الملابس على الأرض", en: "The clothes on the ground" } },
      { id: "sheath", x: 47, y: 68, name: { he: "הנרתיק הריק", ar: "الغمد الفارغ", en: "The empty sheath" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שטח פתוח בגבעה הצרפתית, ירושלים.", en: "Open ground in French Hill, Jerusalem." } },
      { title: { he: "אור", en: "Light" }, text: { he: "לילה וגשם; הדמות הבודדת מוארת, הקבוצה גוף כהה אחד.", en: "Night and rain; the lone figure lit, the group one dark mass." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפס פיגמנט או פלטינה־פלדיום על נייר, בקנה מידה גדול.", en: "Pigment or platinum-palladium print on paper at large scale." } },
    ],
  },
  {
    key: "bicycles", body: "forged-trees", num: "05",
    title: { he: "אופניים", ar: "دراجات", en: "Bicycles" },
    year: "2025–2026", dimensions: "220×160 ס״מ", medium: "פיגמנט / פלטינה־פלדיום",
    summary: { he: "כביש רחב בלילה, גשם שוטף. כולם מסתכלים ימינה, וברכב אין נהג. הדורס? הנדרס? שלוש קריאות על אותו גוף, ואף אחת לא נסגרת." },
    layers: [
      { he: "רובד ראשון: כביש רחב בלילה, גשם שוטף. רכב עם פנסים דולקים חודרים את הגשם, ואן לבן חתוך בקצה הפריים. בתחנת האוטובוס קבוצה מצטופפת מתחת לגגון." },
      { he: "רובד שני: כולם מסתכלים ימינה. גם היושב על שפת המדרכה מסתכל ימינה. אישה רצה, באותו זמן. וברכב אין נהג." },
      { he: "רובד שלישי: החיפוש. כפכף אחד על הכביש. השני ליד הרכב. מישהו נדרס כאן. והמבט חוזר אל היושב: אין לו רגליים." },
      { he: "מה שנשאר: הדורס? הנדרס? הנדרס בעבר? שלוש קריאות על אותו גוף, ואף אחת לא נסגרת." },
    ],
    hotspots: [
      { id: "station", x: 20, y: 45, name: { he: "תחנת האוטובוס", ar: "محطة الحافلات", en: "The bus stop" } },
      { id: "car", x: 62, y: 50, name: { he: "הרכב", ar: "السيارة", en: "The car" } },
      { id: "sitting", x: 40, y: 66, name: { he: "היושב על המדרכה", ar: "الجالس على الرصيف", en: "The one sitting on the curb" } },
      { id: "sandal", x: 52, y: 78, name: { he: "הכפכף", ar: "الشبشب", en: "The sandal" } },
      { id: "runner", x: 78, y: 52, name: { he: "האישה הרצה", ar: "المرأة الراكضة", en: "The running woman" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "כביש רחב בשולי הגבעה הצרפתית, ירושלים.", en: "A wide road at the edge of French Hill, Jerusalem." } },
      { title: { he: "אור", en: "Light" }, text: { he: "פנסי רכב חודרים גשם שוטף; גגון תחנה כמקלט אור.", en: "Headlights cutting through pouring rain; the bus-stop canopy as a shelter of light." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפס פיגמנט או פלטינה־פלדיום על נייר, בקנה מידה גדול.", en: "Pigment or platinum-palladium print on paper at large scale." } },
    ],
  },

  // ===== ספרייה לאומית ישנה =====
  {
    key: "broken-circle", body: "library", num: "01",
    title: { he: "מעגל שבור", ar: "دائرة مكسورة", en: "Broken Circle" },
    year: "2025", dimensions: "165×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מעגל הקוראים: דמויות נעות בקרני האור, ספר פתוח ביד כל אחת, ואחת בלי. המעגל שלם רק כל עוד כולם קוראים. יציאה אחת שוברת את הצורה כולה." },
    layers: [
      { he: "רובד ראשון: מעגל אנשים סביב נקודת אור, מלמעלה. סדר, שייכות, טקס." },
      { he: "רובד שני: אחד כורע בפתח המעגל. הוא לא בפנים ולא בחוץ. המעגל שלם רק כל עוד איש אינו יוצא." },
      { he: "מה שנשאר: יציאה אחת ששוברת את הצורה כולה." },
    ],
    hotspots: [
      { id: "circle", x: 50, y: 48, name: { he: "המעגל", ar: "الدائرة", en: "The circle" } },
      { id: "light", x: 50, y: 55, name: { he: "נקודת האור", ar: "نقطة الضوء", en: "The point of light" } },
      { id: "kneeling", x: 35, y: 66, name: { he: "הכורע בפתח", ar: "الراكع عند الفتحة", en: "The one kneeling at the opening" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "אולם הקריאה של הספרייה הלאומית הישנה, ירושלים.", en: "The reading hall of the old National Library, Jerusalem." } },
      { title: { he: "אור", en: "Light" }, text: { he: "נקודת אור אחת במרכז המעגל, מלמעלה.", en: "A single point of light at the circle's center, from above." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 165×110 ס״מ.", en: "Pigment print, 165×110 cm." } },
    ],
  },
  {
    key: "forbidden-apple", body: "library", num: "02",
    title: { he: "תפוח אסור", ar: "تفاحة محرّمة", en: "Forbidden Apple" },
    year: "2025", dimensions: "165×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "הארכיון האנלוגי, שתי דמויות, משהו מושט בין יד ליד. הפיתוי הראשון, והידיעה שאחריו. מה שנודע אינו נשכח." },
    layers: [
      { he: "רובד ראשון: חניון תת קרקעי, שתי דמויות, משהו מושט בין יד ליד." },
      { he: "רובד שני: מה שמושט מאיר. הידיעה הראשונה, שאי אפשר להחזיר אחרי שנלקחה." },
      { he: "מה שנשאר: מה שנודע אינו נשכח." },
    ],
    hotspots: [
      { id: "figures", x: 48, y: 52, name: { he: "שתי הדמויות", ar: "الشخصيتان", en: "The two figures" } },
      { id: "offered", x: 50, y: 60, name: { he: "מה שמושט", ar: "الممدود", en: "What is offered" } },
      { id: "garage", x: 50, y: 25, name: { he: "החניון", ar: "المرآب", en: "The garage" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "הארכיון האנלוגי של הספרייה הלאומית הישנה.", en: "The analog archive of the old National Library." } },
      { title: { he: "אור", en: "Light" }, text: { he: "מה שמושט הוא מקור האור.", en: "What is offered is itself the light source." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 165×110 ס״מ.", en: "Pigment print, 165×110 cm." } },
    ],
  },

  // ===== יוסי חכמי =====
  {
    key: "pitch", body: "hakimi", num: "01",
    title: { he: "פיטש", en: "Pitch" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מעגל סגור, מלמעלה. אחד כורע במרכז ומציג, לתוך אדמה חשופה, בשולי מבנה נטוש. הפיטש שכולם רצו להאמין לו." },
    layers: [
      { he: "רובד ראשון: מעגל סגור, מלמעלה. אחד כורע במרכז ומציג. כולם מקשיבים." },
      { he: "רובד שני: הוא מציג לתוך אדמה חשופה, בשולי מבנה נטוש. ההבטחה גדולה מהמקום." },
      { he: "מה שנשאר: הפיטש שכולם רצו להאמין לו." },
    ],
    hotspots: [
      { id: "circle", x: 50, y: 50, name: { he: "המעגל", en: "The circle" } },
      { id: "presenter", x: 50, y: 56, name: { he: "המציג", en: "The presenter" } },
      { id: "ground", x: 50, y: 80, name: { he: "האדמה החשופה", en: "The bare ground" } },
      { id: "building", x: 80, y: 22, name: { he: "המבנה", en: "The structure" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שולי המפעל הנטוש, בית שאן.", en: "The edge of the abandoned factory, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "מקור אור בודד ועשן מפסלים את החלל.", en: "A single light source and smoke sculpt the space." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },
  {
    key: "meetup", body: "hakimi", num: "02",
    title: { he: "מיטאפ", en: "Meetup" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "דמות במרכז מערבולת של עשן ואור. המערבולת יפה מדי, היא מסתירה את החלל הריק שסביבה. ההילה, לפני שהתפזר העשן." },
    layers: [
      { he: "רובד ראשון: דמות במרכז מערבולת של עשן ואור. אחרים נגלים מאחוריה." },
      { he: "רובד שני: המערבולת יפה מדי. היא מסתירה את החלל הריק שסביבה." },
      { he: "מה שנשאר: ההילה, לפני שהתפזר העשן." },
    ],
    hotspots: [
      { id: "figure", x: 50, y: 50, name: { he: "הדמות", en: "The figure" } },
      { id: "vortex", x: 50, y: 40, name: { he: "מערבולת העשן", en: "The smoke vortex" } },
      { id: "others", x: 70, y: 60, name: { he: "האחרים", en: "The others" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "אולם במפעל הנטוש, בית שאן.", en: "A hall in the abandoned factory, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "מקור אור בודד ועשן.", en: "A single light source and smoke." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },
  {
    key: "deal", body: "hakimi", num: "03",
    title: { he: "דיל", en: "Deal" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "לחיצת יד בתוך ענן זהוב, שתי שורות של עדים. האור בא מאחור, ואיש לא רואה מה בדיוק נחתם." },
    layers: [
      { he: "רובד ראשון: לחיצת יד בתוך ענן זהוב. שתי שורות של עדים משני הצדדים." },
      { he: "רובד שני: העדים לא מסתכלים זה על זה. האור בא מאחור, ואיש לא רואה מה בדיוק נחתם." },
      { he: "מה שנשאר: היד שנלחצה, והמפעל שלא נפתח." },
    ],
    hotspots: [
      { id: "handshake", x: 50, y: 52, name: { he: "לחיצת היד", en: "The handshake" } },
      { id: "witnesses", x: 28, y: 56, name: { he: "שורות העדים", en: "The rows of witnesses" } },
      { id: "cloud", x: 50, y: 33, name: { he: "הענן הזהוב", en: "The golden cloud" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "מסדרון במפעל הנטוש, בית שאן.", en: "A corridor in the abandoned factory, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור אחורי דרך עשן זהוב.", en: "Backlight through golden smoke." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },
  {
    key: "build", body: "hakimi", num: "04",
    title: { he: "בילד", en: "Build" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "גרם מדרגות חשוף, אור חותך את הבטון. המדרגות לא מובילות לקומה, הבנייה עצרה באמצע תנועה. שלד שנשאר שלד." },
    layers: [
      { he: "רובד ראשון: גרם מדרגות חשוף, אור חותך את הבטון. שתי דמויות משני צידי הבנייה." },
      { he: "רובד שני: המדרגות לא מובילות לקומה. הבנייה עצרה באמצע תנועה." },
      { he: "מה שנשאר: שלד שנשאר שלד." },
    ],
    hotspots: [
      { id: "stairs", x: 46, y: 55, name: { he: "המדרגות", en: "The staircase" } },
      { id: "light", x: 62, y: 28, name: { he: "האור", en: "The light" } },
      { id: "figures", x: 28, y: 66, name: { he: "שתי הדמויות", en: "The two figures" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "גרם המדרגות של המפעל הנטוש, בית שאן.", en: "The staircase of the abandoned factory, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור חותך את הבטון החשוף.", en: "Light cutting across bare concrete." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },
  {
    key: "exit", body: "hakimi", num: "05",
    title: { he: "אקזיט", en: "Exit" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "אחד הולך קדימה, מואר. מאחוריו קבוצה, ושער סורגים שהאור פורץ ממנו. האקזיט של אחד הוא הנעילה של כולם." },
    layers: [
      { he: "רובד ראשון: אחד הולך קדימה, מואר. מאחוריו קבוצה, ושער סורגים שהאור פורץ ממנו." },
      { he: "רובד שני: הוא יוצא. הם נשארים בין הסורגים לקיר." },
      { he: "מה שנשאר: האקזיט של אחד הוא הנעילה של כולם." },
    ],
    hotspots: [
      { id: "walker", x: 44, y: 56, name: { he: "ההולך", en: "The one walking" } },
      { id: "group", x: 66, y: 60, name: { he: "הקבוצה", en: "The group" } },
      { id: "gate", x: 52, y: 28, name: { he: "שער הסורגים", en: "The barred gate" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שער המפעל הנטוש, בית שאן.", en: "The gate of the abandoned factory, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור פורץ דרך הסורגים מאחור.", en: "Light breaking through the bars from behind." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },
  {
    key: "closing", body: "hakimi", num: "06",
    title: { he: "קלוזינג", en: "Closing" },
    year: "2024", dimensions: "146×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "כלוב ברזל בתוך האולם, קבוצה מצטופפת סביב אור קטן. מי שסגר את העסקה סגר גם אותם. שלושים שנה של דלת סגורה." },
    layers: [
      { he: "רובד ראשון: כלוב ברזל בתוך האולם. בפנים, קבוצה מצטופפת סביב אור קטן." },
      { he: "רובד שני: הדלת סגורה. מי שסגר את העסקה סגר גם אותם." },
      { he: "מה שנשאר: שלושים שנה של דלת סגורה." },
    ],
    hotspots: [
      { id: "cage", x: 50, y: 48, name: { he: "הכלוב", en: "The cage" } },
      { id: "group", x: 50, y: 60, name: { he: "הקבוצה", en: "The group" } },
      { id: "light", x: 50, y: 64, name: { he: "האור הקטן", en: "The small light" } },
      { id: "door", x: 66, y: 45, name: { he: "הדלת", en: "The door" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "הכלוב שבאולם המפעל הנטוש, בית שאן.", en: "The cage inside the abandoned factory hall, Beit She'an." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור קטן אחד בתוך הכלוב.", en: "One small light inside the cage." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 146×110 ס״מ.", en: "Pigment print, 146×110 cm." } },
    ],
  },

  // ===== 12, עבודה לכל שעה; sideA=צד ראשון, sideB=צד שני =====
  {
    key: "h1900", body: "twelve", num: "19:00",
    title: { he: "19:00", en: "19:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "חלון הדירה, שקיעה. דמות מביטה על העיר, המיטה מאחוריה לא מסודרת. משהו בדירה כבר עזוב." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: חלון הדירה, שקיעה. דמות מביטה על העיר, המיטה מאחוריה לא מסודרת." },
      { he: "רובד שני: יש גשם בחוץ, הלילה עוד שנייה מגיע, זמן לצאת. משהו בדירה כבר עזוב." },
    ],
    layersB: [
      { he: "רובד ראשון: אותו חלון, אותה שקיעה. הצד השני מביט על אותה עיר." },
      { he: "רובד שני: יש גשם בחוץ, הלילה עוד שנייה מגיע, זמן לצאת. משהו בדירה כבר עזוב." },
    ],
    hotspots: [
      { id: "window", x: 60, y: 32, name: { he: "החלון", en: "The window" } },
      { id: "figure", x: 44, y: 55, name: { he: "הדמות", en: "The figure" } },
      { id: "bed", x: 24, y: 72, name: { he: "המיטה", en: "The bed" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "דירה בתל אביב, מול החלון.", en: "A Tel Aviv apartment, facing the window." } },
      { title: { he: "אור", en: "Light" }, text: { he: "שקיעה דרך גשם.", en: "Sunset through rain." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h2000", body: "twelve", num: "20:00",
    title: { he: "20:00", en: "20:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "בתוך הרכב. מבט הצידה, מלא רגש, אל מי שנמצא לידה. היד על ההגה, מוכנה לתנועה." },
    layers: [
      { he: "רובד ראשון: בתוך הרכב. מבט הצידה, מלא רגש, אל מי שנמצא לידה." },
      { he: "רובד שני: היד על ההגה, מוכנה לתנועה, לפעולה." },
    ],
    hotspots: [
      { id: "gaze", x: 45, y: 40, name: { he: "המבט", en: "The gaze" } },
      { id: "hand", x: 56, y: 66, name: { he: "היד על ההגה", en: "The hand on the wheel" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "בתוך הרכב הלבן.", en: "Inside the white car." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור עיר דרך שמשה רטובה.", en: "City light through a wet windshield." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ.", en: "Pigment print, 90×60 cm." } },
    ],
  },
  {
    key: "h2100", body: "twelve", num: "21:00",
    title: { he: "21:00", en: "21:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "שולי כביש מהיר. דלת רכב פתוחה, מישהו יוצא מכיסא הנוסע, שניים עומדים ממול. עצירה שלא מופיעה בשום תוכנית." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: שולי כביש מהיר. דלת רכב פתוחה, מישהו יוצא מכיסא הנוסע, שניים עומדים ממול." },
      { he: "רובד שני: עצירה שלא מופיעה בשום תוכנית. פגישה?" },
      { he: "רובד שלישי: פגישה חטופה?" },
    ],
    layersB: [
      { he: "רובד ראשון: אותם שוליים, אותה דלת פתוחה. הצד השני יוצא מדלת הנוסע באותה נקודה." },
      { he: "רובד שני: עצירה שלא מופיעה בשום תוכנית. פגישה?" },
      { he: "רובד שלישי: פגישה חטופה?" },
    ],
    hotspots: [
      { id: "door", x: 40, y: 55, name: { he: "דלת הרכב", en: "The car door" } },
      { id: "two", x: 70, y: 46, name: { he: "השניים ממול", en: "The two facing" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שולי כביש מהיר, תל אביב.", en: "The shoulder of a highway, Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "פנסי הרכב בגשם.", en: "The car's headlights in rain." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h2200", body: "twelve", num: "22:00",
    title: { he: "22:00", en: "22:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מתחת לגשר, גשם. הרכב הלבן מאיר את ההליכה. למה הוא הולך בצד של הנוסע? מי היה הנהג?" },
    sides: true,
    layersA: [
      { he: "רובד ראשון: מתחת לגשר, אנשים, גשם. הרכב הלבן מאיר את ההליכה." },
      { he: "רובד שני: מי שהולך לא מסתכל על מי שמחכים בצד." },
      { he: "רובד שלישי: הדרך למטה עוברת מתחת לעיר. לאן הוא הולך? מפגש מהיר, הרכב עדיין מותנע." },
      { he: "רובד רביעי: למה הוא הולך בצד של הנוסע? מי היה הנהג?" },
    ],
    layersB: [
      { he: "רובד ראשון: אותו גשר, אותו גשם. הצד השני הולך את אותם צעדים." },
      { he: "רובד שני: הפנסים מאירים את אותו מסלול, פעמיים." },
      { he: "רובד שלישי: הדרך למטה עוברת מתחת לעיר. לאן הוא הולך? מפגש מהיר, הרכב עדיין מותנע." },
      { he: "רובד רביעי: למה הוא הולך בצד של הנוסע? מי היה הנהג?" },
    ],
    hotspots: [
      { id: "bridge", x: 50, y: 22, name: { he: "הגשר", en: "The bridge" } },
      { id: "car", x: 28, y: 60, name: { he: "הרכב הלבן", en: "The white car" } },
      { id: "walker", x: 56, y: 55, name: { he: "ההולך", en: "The one walking" } },
      { id: "waiting", x: 76, y: 62, name: { he: "המחכים בצד", en: "Those waiting aside" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "מתחת לגשר, תל אביב.", en: "Under a bridge, Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "פנסי הרכב הלבן, מותנע.", en: "The white car's headlights, engine running." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h2300", body: "twelve", num: "23:00",
    title: { he: "23:00", en: "23:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "גג חניון. דמות מול קיר מואר, גורדי השחקים מאחור. השעה שבה עומדים הכי קרוב לקצה ולא רואים אותו." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: גג חניון. דמות עומדת מול קיר מואר, גורדי השחקים מאחור." },
      { he: "רובד שני: הפנים אל הקיר, לא אל העיר. ההמתנה." },
      { he: "רובד שלישי: השעה שבה עומדים הכי קרוב לקצה ולא רואים אותו." },
    ],
    layersB: [
      { he: "רובד ראשון: אותו גג, אותו קיר מואר. הצד השני עומד באותה נקודה." },
      { he: "רובד שני: אותה המתנה, גוף אחר." },
      { he: "רובד שלישי: השעה שבה עומדים הכי קרוב לקצה ולא רואים אותו." },
    ],
    hotspots: [
      { id: "wall", x: 55, y: 40, name: { he: "הקיר המואר", en: "The lit wall" } },
      { id: "figure", x: 45, y: 60, name: { he: "הדמות", en: "The figure" } },
      { id: "towers", x: 78, y: 18, name: { he: "גורדי השחקים", en: "The towers" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "גג חניון, תל אביב.", en: "A parking-garage roof, Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "קיר מואר; העיר מאחור.", en: "A lit wall; the city behind." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0000", body: "twelve", num: "00:00",
    title: { he: "00:00", en: "00:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מכולות בקצה העיר. שניים נפגשים, מזוודה עוברת מיד ליד. כאן אין עדים. חצות, ההסכם נסגר בשקט." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: מכולות בקצה העיר. שניים נפגשים, יד לוחצת יד." },
      { he: "רובד שני: נראה שהם מכירים. האור היחיד בא מהעיר הרחוקה. כאן אין עדים." },
      { he: "רובד שלישי: חצות. ההסכם נסגר בשקט." },
    ],
    layersB: [
      { he: "רובד ראשון: אותן מכולות, אותה פגישה. מזוודה עוברת מיד ליד." },
      { he: "רובד שני: מה שבפנים כבד יותר ממה שנראה." },
      { he: "רובד שלישי: חצות. ההסכם נסגר בשקט." },
    ],
    hotspots: [
      { id: "containers", x: 62, y: 32, name: { he: "המכולות", en: "The containers" } },
      { id: "meeting", x: 45, y: 58, name: { he: "הפגישה", en: "The meeting" } },
      { id: "suitcase", x: 50, y: 66, name: { he: "המזוודה", en: "The suitcase" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "שטח מכולות בקצה העיר.", en: "A container yard at the city's edge." } },
      { title: { he: "אור", en: "Light" }, text: { he: "האור היחיד מהעיר הרחוקה.", en: "The only light comes from the distant city." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0100", body: "twelve", num: "01:00",
    title: { he: "01:00", en: "01:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מרתף מלוכלך, עמוס. דמות עומדת עם מזוודה, מוארת מלמעלה. בקדמת התמונה, נקודת המבט של מי שיושב מול הדמות." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: מרתף מלוכלך, עמוס. דמות עומדת עם מזוודה, מוארת מלמעלה." },
      { he: "רובד שני: בקדמת התמונה תיק. מישהו יושב בנקודת המבט של הצופה, רואים את הנעליים שלו. לידו עוד מישהו, פונה אל הדמות." },
    ],
    layersB: [
      { he: "רובד ראשון: אותו מרתף, אותו אור. הצד השני עומד באותו מקום, המזוודה ביד." },
      { he: "רובד שני: בקדמת התמונה תיק. מישהו יושב בנקודת המבט של הצופה, רואים את הנעליים שלו. לידו עוד מישהו, פונה אל הדמות." },
    ],
    hotspots: [
      { id: "figure", x: 50, y: 44, name: { he: "הדמות עם המזוודה", en: "The figure with the suitcase" } },
      { id: "bag", x: 44, y: 80, name: { he: "התיק בקדמה", en: "The bag in the foreground" } },
      { id: "shoes", x: 56, y: 83, name: { he: "הנעליים", en: "The shoes" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "מרתף, תל אביב.", en: "A basement, Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור מלמעלה, ישר על הדמות.", en: "Light from above, straight onto the figure." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0200", body: "twelve", num: "02:00",
    title: { he: "02:00", en: "02:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "יציאה מהמרתף עם שתי מזוודות. הגוף מוביל קדימה, העיניים לא. מאחור, הם לא קמים. אף אחד לא מסתכל אחורה." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: יציאה מהמרתף עם שתי מזוודות. הגוף מוביל קדימה, העיניים לא." },
      { he: "רובד שני: מאחור, על הרצפה, על הספה, הם לא קמים." },
    ],
    layersB: [
      { he: "רובד ראשון: אותה יציאה, אותן שתי מזוודות. הצד השני." },
      { he: "רובד שני: אותו מישהו על הרצפה. אף אחד לא מסתכל אחורה." },
    ],
    hotspots: [
      { id: "suitcases", x: 50, y: 62, name: { he: "שתי המזוודות", en: "The two suitcases" } },
      { id: "behind", x: 72, y: 76, name: { he: "מי שמאחור", en: "Those left behind" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "פתח המרתף.", en: "The basement's exit." } },
      { title: { he: "אור", en: "Light" }, text: { he: "האור נשאר מאחור, בפנים.", en: "The light stays behind, inside." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0300", body: "twelve", num: "03:00",
    title: { he: "03:00", en: "03:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "חזרה לעיר, ליד הרכב הלבן. רחוב ריק ואורות רחוקים. השעה שבה הרחובות שייכים רק למי שלא ישן." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: חזרה לעיר. ליד הרכב הלבן, רחוב ריק ואורות רחוקים." },
      { he: "רובד שני: העיר ממשיכה כרגיל, כאילו לא קרה דבר." },
      { he: "רובד שלישי: השעה שבה הרחובות שייכים רק למי שלא ישן. נראה שאפשר סוף סוף לנוח, אין רודפים." },
    ],
    layersB: [
      { he: "רובד ראשון: אותו רחוב, אותו רכב לבן. הצד השני עומד באותה פינה." },
      { he: "רובד שני: אותם אורות רחוקים, אותו שקט." },
      { he: "רובד שלישי: השעה שבה הרחובות שייכים רק למי שלא ישן. נראה שאפשר סוף סוף לנוח, אין רודפים." },
    ],
    hotspots: [
      { id: "car", x: 38, y: 56, name: { he: "הרכב הלבן", en: "The white car" } },
      { id: "lights", x: 72, y: 28, name: { he: "האורות הרחוקים", en: "The distant lights" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "רחוב ריק, תל אביב.", en: "An empty street, Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אורות עיר רחוקים.", en: "Distant city lights." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0500", body: "twelve", num: "05:00",
    title: { he: "05:00", en: "05:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מרפסת מעל העיר, לפנות בוקר. המזוודות בצד, המבט על גורדי השחקים שנבנים. שתי הסדרות כמעט נפגשות. כמעט אור. כמעט סוף." },
    sides: true,
    layersA: [
      { he: "רובד ראשון: מרפסת מעל העיר, לפנות בוקר. המזוודות מונחות בצד." },
      { he: "רובד שני: המבט על גורדי השחקים שנבנים. עיר שמחליפה את עצמה." },
      { he: "רובד שלישי: כמעט אור. כמעט סוף." },
    ],
    layersB: [
      { he: "רובד ראשון: אותה מרפסת, אותן מזוודות. הצד השני אוחז במעקה." },
      { he: "רובד שני: שתי הסדרות כמעט נפגשות." },
      { he: "רובד שלישי: כמעט אור. כמעט סוף." },
    ],
    hotspots: [
      { id: "balcony", x: 50, y: 62, name: { he: "המרפסת", en: "The balcony" } },
      { id: "suitcases", x: 28, y: 70, name: { he: "המזוודות", en: "The suitcases" } },
      { id: "towers", x: 68, y: 22, name: { he: "גורדי השחקים", en: "The rising towers" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "מרפסת מעל תל אביב.", en: "A balcony above Tel Aviv." } },
      { title: { he: "אור", en: "Light" }, text: { he: "לפנות בוקר, לפני האור הראשון.", en: "Pre-dawn, before first light." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. צולם פעמיים, שני הצדדים.", en: "Pigment print, 90×60 cm. Shot twice, both sides." } },
    ],
  },
  {
    key: "h0700", body: "twelve", num: "07:00",
    title: { he: "07:00", en: "07:00" },
    year: "2024", dimensions: "90×60 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "זריחה. אור ראשון על מרפסת ריקה, המזוודות עדיין שם. אין יותר שני צדדים. הדימוי שאליו התכנסו שתי הסדרות. הסוף." },
    layers: [
      { he: "רובד ראשון: זריחה. אור ראשון מאיר על מרפסת ריקה. המזוודות עדיין שם." },
      { he: "רובד שני: אין יותר שני צדדים. אין זכר." },
      { he: "רובד שלישי: הדימוי שאליו התכנסו שתי הסדרות. הסוף." },
    ],
    hotspots: [
      { id: "balcony", x: 50, y: 58, name: { he: "המרפסת הריקה", en: "The empty balcony" } },
      { id: "suitcases", x: 34, y: 68, name: { he: "המזוודות", en: "The suitcases" } },
      { id: "light", x: 70, y: 24, name: { he: "האור הראשון", en: "The first light" } },
    ],
    construction: [
      { title: { he: "מקום", en: "Place" }, text: { he: "אותה מרפסת. ריקה.", en: "The same balcony. Empty." } },
      { title: { he: "אור", en: "Light" }, text: { he: "אור זריחה ראשון.", en: "First sunrise light." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 90×60 ס״מ. הדימוי היחיד שצולם פעם אחת.", en: "Pigment print, 90×60 cm. The only image shot once." } },
    ],
  },

  // ===== נבחרות בלבד =====
  {
    key: "swan-lake", body: "selected", num: "·",
    title: { he: "אגם הברבורים", ar: "بحيرة البجع", en: "Swan Lake" },
    year: "2025", dimensions: "280×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "היפוך המיתוס: הברבור אינו קורבן. הוא כוח טבע, קדום, יפהפה ומסוכן. במבט ראשון סצנת חמלה; במבט נוסף ההשתקפות אינה תואמת, האדום מחליף את הלבן, והקריאה מתהפכת." },
    layers: [
      { he: "רובד ראשון: חמלה. דמות לבנה וזוהרת מתכופפת אל דמות אנושית ברגע של חולשה. הצלה, הגנה, נחמה." },
      { he: "רובד שני: סביב האגם מתגלים גופים נוספים. ההשתקפות במים אינה תואמת את מה שנראה. האדום מחליף את הלבן." },
      { he: "רובד שלישי: הדמות הלבנה יכולה להיקרא כמושיעה, כעדה, כשורדת, או כמקור האירוע עצמו." },
      { he: "מה שנשאר: כוח שאינו מבקש סליחה על קיומו." },
    ],
    context: [
      "אגם הברבורים האפל נולד מתוך רצון להפוך את המיתוס המוכר. הברבור אינו הקורבן ואינו הנרדף. הוא כוח טבע, קדום, יפהפה ומסוכן. הוא אינו מבקש סליחה על קיומו.",
      "העבודה היא חלק מסדרה המבקשת לפרק סיפורים קלאסיים שבהם ערכיות שאינה מקובלת עליי. אני בוחר לבנות אותם מחדש, מנקודת מבט הפוכה.",
    ],
    hotspots: [
      { id: "white", x: 44, y: 44, name: { he: "הדמות הלבנה", ar: "الشخصية البيضاء", en: "The white figure" } },
      { id: "human", x: 56, y: 60, name: { he: "הדמות האנושית", ar: "الشخصية البشرية", en: "The human figure" } },
      { id: "reflection", x: 50, y: 82, name: { he: "ההשתקפות", ar: "الانعكاس", en: "The reflection" } },
      { id: "bodies", x: 22, y: 55, name: { he: "הגופים סביב האגם", ar: "الأجساد حول البحيرة", en: "The bodies around the lake" } },
    ],
    construction: [
      { title: { he: "אור", en: "Light" }, text: { he: "הדמות הלבנה זוהרת; האדום מחליף את הלבן בהשתקפות.", en: "The white figure glows; red replaces white in the reflection." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 280×110 ס״מ, 2025.", en: "Pigment print, 280×110 cm, 2025." } },
    ],
  },
  {
    key: "necklace", body: "selected", num: "·",
    title: { he: "ענק", ar: "قلادة", en: "Necklace" },
    year: "", dimensions: "240×110 ס״מ", medium: "הדפסת פיגמנט",
    summary: { he: "מרחב יוקרתי, אור יפהפה, שפע, דמות שנדמה שיש לה הכל. מראה ענקית משקפת את האמת: התכשיט דוקר את בשרה, וצילו הפרחוני מטיל פרחים אפלים על עורה." },
    layers: [
      { he: "רובד ראשון: שפע. מרחב יוקרתי, אור יפהפה, דמות שנדמה שיש לה הכל." },
      { he: "רובד שני: המראה הענקית משקפת את האמת. התכשיט דוקר את בשרה, וצילו הפרחוני מטיל פרחים אפלים על עורה." },
      { he: "רובד שלישי: מאחוריה בגדים ונעליים זרוקים על הרצפה. רק חלקם שלה. אולי סימן למאבק." },
      { he: "מה שנשאר: מי שיש לה הכל, כואבת." },
    ],
    hotspots: [
      { id: "figure", x: 44, y: 50, name: { he: "הדמות", ar: "الشخصية", en: "The figure" } },
      { id: "mirror", x: 72, y: 32, name: { he: "המראה", ar: "المرآة", en: "The mirror" } },
      { id: "necklace", x: 46, y: 58, name: { he: "התכשיט", ar: "القلادة", en: "The necklace" } },
      { id: "shadow", x: 58, y: 66, name: { he: "הצל הפרחוני", ar: "الظل الزهري", en: "The floral shadow" } },
      { id: "clothes", x: 24, y: 76, name: { he: "הבגדים מאחור", ar: "الملابس في الخلف", en: "The clothes behind" } },
    ],
    construction: [
      { title: { he: "אור", en: "Light" }, text: { he: "אור יפהפה; הצל של התכשיט פרחוני ומיוחד.", en: "Beautiful light; the necklace casts a floral, particular shadow." } },
      { title: { he: "חומר", en: "Material" }, text: { he: "הדפסת פיגמנט, 240×110 ס״מ.", en: "Pigment print, 240×110 cm." } },
    ],
  },
];

// נבחרות, סדר תצוגה
const SELECTED = ["shutters", "peppers", "swan-lake", "necklace", "pitch", "broken-circle", "h0700"];

// אודות, מהטקסטים הקיימים בלבד. קו"ח: להשלים.
const ABOUT = {
  bio: {
    he: "אני בונה עולמות מבוימים בצילום. גדלתי בגבעה הצרפתית בירושלים, שכונת תפר שהוקמה בשנות השבעים, המקום שממנו נולד הפרויקט עצים מעוקמים.\n\nהעבודות מתחילות ממקומות לימינליים, מקומות שהתרוקנו מייעודם, מהכוח שהיה בהם, שחלף זמנם: שכונת ילדות לפני פינוי, מפעל נטוש שמעולם לא מילא את ייעודו בבית שאן, הספרייה הלאומית הישנה, האנלוגית, הנטושה.\n\nכל דימוי מבוים במלואו, אנשים, חפצים, אור מפוסל, גשם. כל דימוי עשיר בטקסטורות על מנת לייצר הזדהות וקרבה, כל דימוי הוא גם מבוך ופרדוקס באותו זמן, ומודפס בקנה מידה גדול, בהדפסת פיגמנט ובפלטינה־פלדיום על נייר בעבודת יד.\n\nאני מזמין לחוויה ויסרלית, מאתגרת אינטלקטואלית, אשר דרך רפלקציה מנגישה רגש אשר אי אפשר להביא במילים.",
    en: "I build staged worlds in photography. I grew up in French Hill, Jerusalem, a seam neighborhood established in the 1970s, and the birthplace of the Forged Trees project.\n\nThe works begin in liminal places, places emptied of their purpose, of the force they once held, places past their time: a childhood neighborhood before demolition, an abandoned factory in Beit She'an that never fulfilled its purpose, the old National Library, analog, deserted.\n\nEach image is fully staged, people, objects, sculpted light, rain. Each image is rich in texture to create identification and closeness; each image is at once a maze and a paradox, printed at large scale in pigment and platinum-palladium on handmade paper.\n\nI invite you into a visceral, intellectually challenging experience that, through reflection, opens access to a feeling that words cannot carry.",
  },
  cv: [
    { h: { he: "השכלה", en: "Education" }, items: [
      { he: "2022–2026 · תואר ראשון באמנות (B.F.A.) בהצטיינות, המחלקה לצילום, בצלאל אקדמיה לאמנות ועיצוב, ירושלים",
        en: "2022–26 · B.F.A. with Honors, Department of Photography, Bezalel Academy of Arts and Design, Jerusalem" },
    ]},
    { h: { he: "תערוכות קבוצתיות נבחרות", en: "Selected Group Exhibitions" }, items: [
      { he: "2026 · \"מרחבים זמניים\", בפנוכו, תל אביב. אוצרות: ורה גייליס וורה קוניאשוב",
        en: "2026 · Temporary Spaces, Bifnocho, Tel Aviv. Curators: Vera Geilis and Vera Koniashov" },
      { he: "2026 · \"בצלאל בעם\", פסטיבל בכורות, בניין בית העם, ירושלים. אוצרות: רונה יפמן, שרון בלבן, טליה ישראלי ואילנית קונופני",
        en: "2026 · Bezalel Initiative, First Born Festival, Beit Ha'am Building, Jerusalem. Curators: Rona Yefman, Sharon Balaban, Talia Israeli and Ilanit Konopny" },
      { he: "2025 · \"צילום וזהויות\", אגף עידן ובתיה עופר לאמנות, בצלאל, ירושלים. אוצרת: רונה יפמן",
        en: "2025 · Photography and Identities, Idan and Batia Ofer Arts Wing, Bezalel, Jerusalem. Curator: Rona Yefman" },
    ]},
    { h: { he: "פרסים ומלגות", en: "Awards" }, items: [
      { he: "2026 · פרס הצילום ע\"ש מיכה קירשנר", en: "2026 · Micha Kirshner Photography Prize" },
      { he: "2026 · פרס הצטיינות, המחלקה לצילום, בצלאל", en: "2026 · Excellence Award, Department of Photography, Bezalel" },
      { he: "2025 · פרס הצטיינות, המחלקה לצילום, בצלאל", en: "2025 · Excellence Award, Department of Photography, Bezalel" },
    ]},
  ]
};

const EXHIBITIONS_LIST = [
  { title: { he: "מרחבים זמניים", en: "Temporary Spaces" }, venue: { he: "בפנוכו", en: "Bifnocho" },
    city: { he: "תל אביב", en: "Tel Aviv" }, dates: "9.7–13.8.2026",
    start: "2026-07-09", end: "2026-08-13",
    url: "https://www.prtfl.co.il/archives/255669",
    cal: { title: "מרחבים זמניים · בפנוכו", dates: "20260709/20260814", location: "בפנוכו, איתמר בן אב\"י 9, תל אביב" },
    note: { he: "אוצרות: ורה גייליס וורה קוניאשוב · ערב וידאו: 28.7", en: "Curators: Vera Geilis and Vera Koniashov · Video evening: 28.7" } },
  { title: { he: "תערוכת הבוגרים", en: "Graduate Exhibition" }, venue: { he: "בצלאל, קמפוס מנדל", en: "Bezalel, Mandel Campus" },
    city: { he: "ירושלים", en: "Jerusalem" }, dates: "24.7–6.8.2026",
    start: "2026-07-24", end: "2026-08-06",
    url: "https://www.bezalel.ac.il/events/664929",
    cal: { title: "תערוכת הבוגרים של בצלאל — פתיחה", dates: "20260724T120000/20260724T170000", ctz: "Asia/Jerusalem", location: "בצלאל, קמפוס מנדל, רח' זמורה 1, ירושלים" },
    note: { he: "פתיחה: שישי 24.7, לקהל הרחב מ-12:00 · רח' זמורה 1", en: "Opening: Friday 24.7, public from 12:00 · 1 Zmora St." } },
];

const EXHIBITIONS_PAST = [
  { title: "בצלאל בעם", dates: "2026", venue: "פסטיבל בכורות, בניין בית העם, ירושלים",
    note: "אוצרות: רונה יפמן, שרון בלבן, טליה ישראלי ואילנית קונופני",
    url: "https://www.bezalel.ac.il/events/664841" },
  { title: "צילום וזהויות", dates: "2025", venue: "אגף עידן ובתיה עופר לאמנות, בצלאל, ירושלים",
    note: "אוצרת: רונה יפמן",
    url: "https://www.bezalel.ac.il/events/662430" },
];

module.exports = { CONFIG, EXHIBITION, EXHIBITIONS_LIST, EXHIBITIONS_PAST, CHROME, STATEMENT, BODIES, WORKS, SELECTED, ABOUT };
