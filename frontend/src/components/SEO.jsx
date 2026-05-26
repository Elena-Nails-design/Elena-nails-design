import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, schemaData }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  
  // Localized Site Titles with dense high-value keywords
  const titleMap = {
    he: "אלנה אפשטיין | לק ג'ל באשדוד, מניקור מכשירי, בניית ציפורניים ופדיקור רפואי מומלץ",
    ru: "Елена Эпштейн | Маникюр Ашдод, гель-лак, наращивание ногтей и медицинский педикюр Ашдод",
    en: "Elena Epshtein | Manicure Ashdod, Gel Polish, Nail Extensions & Medical Pedicure Ashdod"
  };
  const siteTitle = titleMap[lang] || titleMap.he;

  // Localized Default Descriptions (optimized for Google search CTR with rich key-phrases)
  const descMap = {
    he: "מחפשת לק ג'ל מומלץ באשדוד? סטודיו בוטיק יוקרתי של אלנה (ילנה) אפשטיין מציע מניקור מכשירי (רוסי) מדויק, בניית ציפורניים בג'ל ופוליג'ל, פדיקור רפואי משקם, פדיקור לחולי סוכרת וטיפול בציפורן חודרנית ויבלות באשדוד, אשקלון, גן יבנה והסביבה. סטריליזציה רפואית באוטוקלאב, חומרים מובילים (Luxio) ויחס אישי.",
    ru: "Ищете лучший маникюр и педикюр в Ашдоде? Салон Елены Эпштейн предлагает чистый аппаратный маникюр, покрытие гель-лаком Luxio, анатомическое выравнивание, наращивание ногтей гелем/полигелем, и профессиональный медицинский педикюр (вросший ноготь, мозоли) Ашдод, Ашкелон, Ган Явне. 100% стерильно.",
    en: "Looking for the best nail salon in Ashdod? Elena Epshtein's boutique studio offers precise hardware (Russian) manicure, premium gel polish, anatomical leveling, builder gel/polygel extensions, medical pedicure, ingrown nail & callus treatments in Ashdod, Ashkelon, and Gan Yavne. Clinic-grade autoclave sterilization."
  };
  const defaultDescription = descMap[lang] || descMap.he;

  // Expanded Hebrew, Russian, and English local search keywords covering all possible terminologies and geographic areas
  const keywordsMap = {
    he: "לק ג'ל אשדוד, מניקור אשדוד, פדיקור אשדוד, ציפורניים אשדוד, בניית ציפורניים באשדוד, פדיקור רפואי אשדוד, מניקוריסטית באשדוד, פדיקוריסטית באשדוד, מניקור מכשירי אשדוד, מניקור רוסי אשדוד, אלנה אפשטיין, ילנה אפשטיין, לק ג'ל מומלצת אשדוד, מניקוריסטית מומלצת אשדוד, פדיקוריסטית רפואית באשדוד, לק ג'ל אשדוד הסיטי, ציפורניים אשדוד העצמאות, סטודיו ציפורניים אשדוד, לק ג'ל רגליים אשדוד, לק ג'ל ידיים אשדוד, בניית ציפורניים בג'ל אשדוד, בניית ציפורניים בפוליג'ל אשדוד, מבנה אנטומי ציפורניים אשדוד, מריחת ג'ל לקוטיקולה אשדוד, לק ג'ל לוקסיו אשדוד, לק ג'ל קודי אשדוד, טיפול ציפורן חודרנית באשדוד, טיפול יבלות ברגל אשדוד, פדיקור רפואי לסוכרתיים אשדוד, פטרת ציפורניים אשדוד טיפול, קישוטים לציפורניים אשדוד, פרנץ' לק ג'ל אשדוד, מניקור פדיקור אשדוד מחיר, לק ג'ל אשדוד זול, מניקור פתוח בשישי אשדוד, מניקור אשקלון, לק ג'ל אשקלון, פדיקור אשקלון, לק ג'ל גן יבנה, מניקור גן יבנה, פדיקור גן יבנה, בניית ציפורניים אשקלון, בניית ציפורניים גן יבנה, טיפוח ציפורניים אשדוד, מכון יופי באשדוד, קוסמטיקאית אשדוד",
    ru: "маникюр Ашдод, педикюр Ашдод, гель лак Ашдод, ногти Ашдод, наращивание ногтей Ашдод, медицинский педикюр Ашдод, аппаратный маникюр Ашдод, русский маникюр Ашдод, мастер маникюра Ашдод, салон красоты Ашдод, ногтевой салон Ашдод, Елена Эпштейн, выравнивание ногтевой пластины Ашдод, укрепление ногтей Ашдод, покрытие под кутикулу Ашдод, дизайн ногтей Ашдод, французский маникюр Ашдод, вросший ноготь Ашдод, лечение вросшего ногтя Ашдод, грибок ногтей Ашдод, удаление мозолей Ашдод, медицинский педикюр для диабетиков Ашдод, хороший мастер маникюра Ашдод, рекомендованная маникюрша Ашдод, педикюр Хаацмаут Ашдод, маникюр Ашкелон, педикюр Ашкелон, гель лак Ашкелон, маникюр Ган Явне, гель лак Ган Явне, педикюр Ган Явне, стерильный маникюр Ашдод, гель лак люксио Ашдод",
    en: "manicure Ashdod, pedicure Ashdod, gel polish Ashdod, nails Ashdod, nail salon Ashdod, medical pedicure Ashdod, hardware manicure Ashdod, Russian manicure Ashdod, nail extension Ashdod, nail art Ashdod, beauty salon Ashdod, Elena Epshtein, recommended manicurist Ashdod, recommended pedicurist Ashdod, best nail salon Ashdod, gel polish Ashdod price, builder gel Ashdod, polygel nails Ashdod, anatomical nail leveling Ashdod, ingrown nail treatment Ashdod, nail fungus treatment Ashdod, diabetic pedicure Ashdod, callus removal Ashdod, manicure Ashkelon, pedicure Ashkelon, manicure Gan Yavne, gel polish Gan Yavne, Luxio gel Ashdod, Kodi gel Ashdod, sterile manicure Ashdod, nails HaAtzmaut Ashdod"
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
    "founder": {
      "@type": "Person",
      "name": "Elena Epshtein"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "העצמאות 93",
      "addressLocality": "אשדוד",
      "addressRegion": "South District",
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
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nail & Pedicure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gel Manicure + Anatomical Structure / מניקור ג'ל ומבנה אנטומי",
            "description": "Precise e-file manicure and nail strengthening structure using elite materials."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medical Pedicure / פדיקור רפואי משקם",
            "description": "Clinical treatment for foot health, including ingrown nails and calluses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nail Extensions (Polygel) / בניית ציפורניים בג'ל",
            "description": "Full set extension with a natural, premium finish."
          }
        }
      ]
    }
  };

  // Canonical URL for avoiding duplicate content penalties
  const currentUrl = `https://elenanails.beauty${location.pathname}`;

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.dir()} />
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Local SEO Geographic Tags */}
      <meta name="geo.region" content="IL-D" />
      <meta name="geo.placename" content="Ashdod" />
      <meta name="geo.position" content="31.8044;34.6553" />
      <meta name="ICBM" content="31.8044, 34.6553" />
      
      {/* General Search Engine Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang Tags for International SEO */}
      <link rel="alternate" hrefLang="he" href={`https://elenanails.beauty${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`https://elenanails.beauty/en${location.pathname}`} />
      <link rel="alternate" hrefLang="ru" href={`https://elenanails.beauty/ru${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://elenanails.beauty${location.pathname}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === 'he' ? 'he_IL' : i18n.language === 'ru' ? 'ru_RU' : 'en_US'} />
      <meta property="og:site_name" content="Elena Nails Design" />

      {/* Schema.org Markup for Google & AI Search Crawlers */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
}
