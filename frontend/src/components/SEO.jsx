import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, schemaData }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  
  // Localized Site Titles
  const titleMap = {
    he: "ELENA EPSHTEIN - סטודיו לציפורניים יוקרתי | מניקור, לק ג'ל ופדיקור רפואי באשדוד",
    ru: "ELENA EPSHTEIN - Премиум Студия Маникюра и Педикюра | Ашдод",
    en: "ELENA EPSHTEIN - Premium Nail Art & Pedicure Studio | Ashdod"
  };
  const siteTitle = titleMap[lang] || titleMap.he;

  // Localized Default Descriptions (highly optimized for Google search CTR)
  const descMap = {
    he: "סטודיו בוטיק יוקרתי לעיצוב ציפורניים באשדוד של אלנה (ילנה) אפשטיין. מציעה מניקור מכשירי, לק ג'ל, בניית ציפורניים בג'ל ופוליג'ל, פדיקור רפואי וטיפוח מקצועי לנשים באשדוד, אשקלון, גן יבנה והסביבה. סטריליזציה ברמה רפואית, חומרים ברמת פרימיום ויחס אישי.",
    ru: "Эксклюзивная студия маникюра и педикюра Елены Эпштейн в Ашдоде. Профессиональный аппаратный маникюр, покрытие гель-лаком, наращивание ногтей гелем и акригелем, медицинский педикюр для клиентов из Ашдода, Ашкелона, Ган-Явне и окрестностей. Клиническая стерилизация, премиум материалы.",
    en: "Elena Epshtein's luxury nail studio in Ashdod. Professional hardware manicure, gel polish, builder gel nail extensions, medical pedicure, and elite nail art for clients in Ashdod, Ashkelon, Gan Yavne, and surrounding areas. Medical-grade sterilization, premium materials, and custom designs."
  };
  const defaultDescription = descMap[lang] || descMap.he;

  // Highly optimized multilingual localized keyword array covering manicure, pedicure, gel, etc. for Ashdod and surrounding regions
  const keywordsMap = {
    he: "מניקור אשדוד, פדיקור אשדוד, לק ג'ל אשדוד, ציפורניים אשדוד, בניית ציפורניים אשדוד, פדיקור רפואי אשדוד, אלנה אפשטיין, ילנה אפשטיין, סטודיו ציפורניים יוקרתי, מניקור אשקלון, לק ג'ל גן יבנה, מניקור רוסי אשדוד, מניקור מכשירי, פדיקור רפואי אשקלון, בניית ציפורניים בג'ל, לק ג'ל אשקלון, סטודיו מניקור אשדוד, מניקור פדיקור אשדוד, אפשטיין ציפורניים, סטודיו פרמיום ציפורניים, לק ג'ל מומלץ אשדוד, טיפוח ציפורניים אשדוד, טיפול בציפורן חודרנית באשדוד, פטרת ציפורניים אשדוד, פדיקור רפואי לחולי סוכרת אשדוד, פדיקורסטית רפואית באשדוד, מניקוריסטית מומלצת באשדוד, פדיקוריסטית מומלצת באשדוד, מניקור באשדוד הסיטי, מניקור פדיקור פתוח בשישי אשדוד, ציפורניים אשדוד העצמאות, סטודיו ציפורניים בוטיק אשדוד, מניקור סטרילי באשדוד, לק ג'ל לוקסיו אשדוד, לק ג'ל קודי אשדוד",
    ru: "маникюр Ашдод, педикюр Ашдод, гель лак Ашдод, ногти Ашдод, наращивание ногтей Ашдод, медицинский педикюр Ашдод, Елена Эпштейн, Епштейн ногти, салон красоты Ашдод, маникюр Ашкелон, гель лак Ган Явне, аппаратный маникюр Ашдод, педикюр Ашкелон, дизайн ногтей Ашдод, премиум студия ногтей, дизайн ногтей в Ашдоде, русский маникюр Ашдод, вросший ноготь лечение Ашдод, грибок ногтей Ашдод, медицинский педикюр для диабетиков Ашдод, хороший мастер маникюра Ашдод, медицинский педикюр Хаацмаут, стерильный маникюр Ашдод, гель-лак Люксио Ашдод, коди гель лак Ашдод",
    en: "manicure Ashdod, pedicure Ashdod, gel polish Ashdod, nails Ashdod, nail extension Ashdod, medical pedicure Ashdod, Elena Epshtein, Ephtein nails, luxury nail salon Ashdod, manicure Ashkelon, gel nails Gan Yavne, hardware manicure Ashdod, pedicure Ashkelon, nail art Ashdod, premium nail studio Israel, nail art in Ashdod, Russian manicure Ashdod, ingrown nail treatment Ashdod, nail fungus treatment Ashdod, medical pedicure for diabetics Ashdod, recommended manicurist Ashdod, recommended pedicurist Ashdod, manicure Ashdod City, sterile manicure Ashdod, Luxio gel polish Ashdod, Kodi gel polish Ashdod"
  };
  const defaultKeywords = keywordsMap[lang] || keywordsMap.he;

  // Fallback rich local business schema targetting served regions, exact services and pricing
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "name": lang === 'ru' ? "Студия маникюра Елены Эпштейн" : lang === 'en' ? "Elena Epshtein Nail Studio" : "ELENA EPSHTEIN - סטודיו לציפורניים יוקרתי באשדוד",
    "image": "https://elenanails.beauty/assets/logo.png",
    "@id": "https://elenanails.beauty",
    "url": "https://elenanails.beauty",
    "telephone": "+972534611370",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "העצמאות 93",
      "addressLocality": "אשדוד",
      "postalCode": "77452",
      "addressCountry": "IL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.8044,
      "longitude": 34.6553
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/nails_epshtein",
      "https://www.facebook.com/share/18afmCSD26/"
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Ashdod" },
      { "@type": "AdministrativeArea", "name": "Ashkelon" },
      { "@type": "AdministrativeArea", "name": "Gan Yavne" },
      { "@type": "AdministrativeArea", "name": "אשדוד" },
      { "@type": "AdministrativeArea", "name": "אשקלון" },
      { "@type": "AdministrativeArea", "name": "גן יבנה" }
    ],
    "knowsAbout": [
      "Manicure", "Pedicure", "Medical Pedicure", "Gel Polish", "Nail Extension", "Nail Art",
      "מניקור מכשירי", "פדיקור רפואי", "לק ג'ל", "בניית ציפורניים בג'ל", "עיצוב ציפורניים",
      "Аппаратный маникюр", "Медицинский педикюр", "Наращивание ногтей", "Дизайн ногтей"
    ]
  };

  // Canonical URL for avoiding duplicate content penalties
  const currentUrl = `https://elenanails.beauty${location.pathname}`;

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.dir()} />
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang Tags for International SEO */}
      <link rel="alternate" hrefLang="he" href={`https://elenanails.beauty${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`https://elenanails.beauty/en${location.pathname}`} />
      <link rel="alternate" hrefLang="ru" href={`https://elenanails.beauty/ru${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://elenanails.beauty${location.pathname}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === 'he' ? 'he_IL' : i18n.language === 'ru' ? 'ru_RU' : 'en_US'} />

      {/* Schema.org Markup for Google & LLMs */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
}
