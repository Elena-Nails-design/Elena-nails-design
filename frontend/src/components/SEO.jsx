import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, schemaData }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const siteTitle = "ELENA EPSHTEIN - סטודיו לציפורניים יוקרתי | אשדוד";
  const defaultDescription = "סטודיו יוקרתי לעיצוב ציפורניים באשדוד. מניקור, פדיקור, ג'ל ובניית ציפורניים ברמה הגבוהה ביותר עם סטריליזציה קלינית.";
  const defaultKeywords = "ציפורניים אשדוד, מניקור אשדוד, פדיקור אשדוד, עיצוב ציפורניים, ג'ל ציפורניים, בניית ציפורניים, אלנה אפשטיין";

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
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
