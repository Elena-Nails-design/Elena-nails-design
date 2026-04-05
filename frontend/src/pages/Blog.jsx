import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const blogImages = {
  healthy: '/assets/blog/healthy_nails.png',
  gel_pros_cons: '/assets/blog/gel_polish_luxio.png',
  manicure_duration: '/assets/blog/longevity.png',
  trends_2026: '/assets/blog/trends_2026.png',
  choose_salon: '/assets/blog/salon_choice.png',
  foot_care: '/assets/blog/foot_care.png'
};

const ArticleModal = ({ isOpen, onClose, article, image }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl ${isRtl ? 'rtl' : 'ltr'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors`}
              aria-label={t('blog.back')}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col">
              <div className="h-64 sm:h-80 md:h-[400px] relative">
                <img
                  src={image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute bottom-8 ${isRtl ? 'right-8' : 'left-8'} text-white`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                    {article.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium mb-8 leading-relaxed italic border-l-4 border-gold pl-4 lg:pl-6">
                    {article.excerpt}
                  </p>
                  <p className="text-zinc-800 dark:text-zinc-200 leading-loose mb-6">
                    {article.content_p1}
                  </p>
                  <p className="text-zinc-800 dark:text-zinc-200 leading-loose">
                    {article.content_p2}
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold hover:opacity-90 transition-opacity"
                  >
                    {t('blog.back')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ArticleCard = ({ id, article, image, onClick }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800"
    >
      <div className="h-64 overflow-hidden relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-gold transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-auto">
          <button
            onClick={() => onClick(id)}
            className="inline-flex items-center text-zinc-900 dark:text-white font-bold group-hover:gap-3 transition-all"
          >
            <span className="border-b-2 border-gold pb-1">{t('blog.read_more')}</span>
            <span className={`ml-2 transform ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`}>
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const isRtl = i18n.dir() === 'rtl';

  const articles = t('blog.articles', { returnObjects: true });
  const articleKeys = Object.keys(articles);

  const openArticle = (id) => setSelectedArticleId(id);
  const closeArticle = () => setSelectedArticleId(null);

  const selectedArticle = selectedArticleId ? articles[selectedArticleId] : null;
  const selectedImage = selectedArticleId ? blogImages[selectedArticleId] : null;

  return (
    <section className={`pt-24 pb-20 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{selectedArticle ? `${selectedArticle.title} | Elena Nails Design` : t('blog.meta_title')}</title>
        <meta name="description" content={selectedArticle ? selectedArticle.meta_description : t('blog.meta_description')} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/blog/hero_bg.png"
            className="w-full h-full object-cover"
            alt="Beauty Secrets Background"
          />
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
              {t('blog.title')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              {t('blog.hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              {t('blog.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {articleKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <ArticleCard
                id={key}
                article={articles[key]}
                image={blogImages[key]}
                onClick={openArticle}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ArticleModal
        isOpen={!!selectedArticleId}
        onClose={closeArticle}
        article={selectedArticle}
        image={selectedImage}
      />
    </section>
  );
};

export default Blog;
