import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, keywords }) {
  const { t } = useTranslation();
  
  const siteTitle = "ELENA EPSHTEIN - סטודיו לציפורניים יוקרתי | אשדוד";
  const defaultDescription = "סטודיו יוקרתי לעיצוב ציפורניים באשדוד. מניקור, פדיקור, ג'ל ובניית ציפורניים ברמה הגבוהה ביותר עם סטריליזציה קלינית.";
  const defaultKeywords = "ציפורניים אשדוד, מניקור אשדוד, פדיקור אשדוד, עיצוב ציפורניים, ג'ל ציפורניים, בניית ציפורניים, אלנה אפשטיין";

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
    </Helmet>
  );
}
