import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ASSET_FILES = [
  "556455388_18061812473616810_1155595810853411427_n.jpg",
  "558541792_18062109455616810_306256479289218587_n.jpg",
  "558698237_18061812464616810_6222784228286618641_n.jpg",
  "559015668_18062046983616810_3576035534021462350_n.jpg",
  "559146789_18062046059616810_7344566568235597674_n.jpg",
  "560055750_18062046065616810_932821717540010631_n.jpg",
  "562995890_18063039698616810_3356393283377808759_n.jpg",
  "563403783_18063217850616810_941351035023998339_n.jpg",
  "584520699_18069986426616810_8081856047837976224_n.jpg",
  "584960315_18068153558616810_6068048603065179209_n.jpg",
  "586685411_18070598063616810_1738139733143951263_n.jpg",
  "586687116_18069964268616810_7036942470180442110_n.jpg",
  "586707127_18070052825616810_8256010962648411316_n.jpg",
  "586709405_18068153549616810_774998090838186494_n.jpg",
  "586712531_18068201747616810_1472697683414785999_n.jpg",
  "586800677_18068512172616810_6025728430800034434_n.jpg",
  "586995636_18068154887616810_4320477303192182839_n.jpg",
  "587268081_18069964262616810_2703453669418647449_n.jpg",
  "587284153_18068201762616810_7162009895631000978_n.jpg",
  "587284358_18069964250616810_5446805096395774335_n.jpg",
  "587303262_18069986417616810_3260988139436728763_n.jpg",
  "587508995_18070598045616810_3508884709686415820_n.jpg",
  "587536233_18069986435616810_5984762818391812220_n.jpg",
  "587755265_18070598081616810_3324644407943789291_n.jpg",
  "588539191_18070598036616810_4789309286436072184_n.jpg",
  "588726432_18070598072616810_2869545543496347363_n.jpg",
  "588946295_18068512163616810_5686746955114028649_n.jpg",
  "589901782_18070598054616810_8879069558975245072_n.jpg",
  "600828589_18071109692616810_4795736437764810081_n.jpg",
  "604051738_18071109680616810_8030488143914811210_n.jpg",
  "604213875_18071109707616810_6645688780815338946_n.jpg",
  "604368197_18071109710616810_760462456953587968_n.jpg",
  "624252387_18075911423616810_421472561164537486_n.jpg",
  "624361448_18075893492616810_7424546104696132483_n.jpg",
  "625054168_18076007300616810_8108893397343201806_n.jpg",
  "625293001_18075893483616810_7302218817396580383_n.jpg",
  "625551669_18076320683616810_2664619712328729322_n.jpg",
  "625846677_18076320665616810_6827415120374019382_n.jpg",
  "625904222_18076320674616810_861639485517224710_n.jpg",
  "626001077_18076007309616810_7990402207365777733_n.jpg",
  "626137487_18076119128616810_922427265669637663_n.jpg",
  "626223601_18075893471616810_447087653324295305_n.jpg",
  "626263387_18076514744616810_2059512870264787523_n.jpg",
  "626295418_18076514747616810_7167713800782786002_n.jpg",
  "626298667_18076320656616810_2811709185432411094_n.jpg"
];

const CATEGORIES = ["gel", "design", "french", "pedicure"];

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Generate deterministic categories for the images
  const galleryImages = ASSET_FILES.map((filename, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    // Map the category to correct translation title dynamically
    let titleKey = 'img_nude_gel';
    if (category === 'design') titleKey = 'img_abstract';
    if (category === 'french') titleKey = 'img_french';
    if (category === 'pedicure') titleKey = 'img_spa';

    return {
      id: i,
      category,
      src: `/assets/nails_epshtein/${filename}`,
      title: t(`gallery.${titleKey}`)
    };
  });

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Lightbox Navigation
  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const isFirst = selectedIndex === 0;
    const newIndex = isFirst ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const isLast = selectedIndex === filteredImages.length - 1;
    const newIndex = isLast ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') isRtl ? handleNext(e) : handlePrev(e);
      if (e.key === 'ArrowRight') isRtl ? handlePrev(e) : handleNext(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, isRtl, filteredImages.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  return (
    <div className="pt-10 pb-20 bg-white dark:bg-gray-900 min-h-[80vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{t('gallery.title')}</h1>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-10"></div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'gel', 'design', 'french', 'pedicure'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setSelectedIndex(null); // Reset index on filter change
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all focus:outline-none ${
                  filter === cat 
                    ? 'bg-primary dark:bg-primary-dark text-white shadow-md transform scale-105' 
                    : 'bg-nude dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-nude-dark dark:hover:bg-gray-700'
                }`}
              >
                {t(`gallery.filter_${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow aspect-[4/5] bg-nude dark:bg-gray-800"
                onClick={() => setSelectedIndex(idx)}
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <span className="text-white font-medium text-xl drop-shadow-md text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ fontFamily: 'var(--font-heading)' }}>
                    {img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 end-6 text-white hover:text-primary transition-colors p-2 z-50"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
            >
              <X className="w-10 h-10 drop-shadow-lg" />
            </button>

            {/* Previous Button */}
            <button 
              className="absolute start-4 md:start-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
              onClick={handlePrev}
            >
              {isRtl ? <ChevronRight className="w-12 h-12" /> : <ChevronLeft className="w-12 h-12" />}
            </button>

            {/* Next Button */}
            <button 
              className="absolute end-4 md:end-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
              onClick={handleNext}
            >
              {isRtl ? <ChevronLeft className="w-12 h-12" /> : <ChevronRight className="w-12 h-12" />}
            </button>

            {/* Main Modal Image Area */}
            <div 
              className="relative w-full h-full max-w-5xl flex items-center justify-center p-4 md:p-12 select-none"
              onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking image */
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={filteredImages[selectedIndex].src} 
                  alt={filteredImages[selectedIndex].title}
                  className="max-w-full max-h-full rounded-lg shadow-2xl object-contain drop-shadow-2xl"
                />
              </AnimatePresence>
            </div>
            
            {/* Image Counter Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-widest text-sm">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
