import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

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
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isRtl = i18n.dir() === 'rtl';

  const galleryImages = ASSET_FILES.map((filename, i) => ({
    id: i,
    category: CATEGORIES[i % CATEGORIES.length],
    src: `${import.meta.env.BASE_URL}assets/nails_epshtein/${filename}`,
    title: t(`gallery.img_${CATEGORIES[i % CATEGORIES.length]}`) || t('gallery.img_nude_gel')
  }));

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="py-24 bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-24"
        >
          <span className="text-primary dark:text-primary-dark tracking-widest uppercase text-xs font-bold mb-4 block">
            {t('gallery.subtitle') || "Style Showcase"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark dark:text-white mb-16 tracking-luxury">
            {t('gallery.title')}
          </h1>
          
          {/* High-End Filter Toggles */}
          <div className="flex flex-wrap justify-center gap-6">
            {['all', 'gel', 'design', 'french', 'pedicure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-8 py-3 text-xs tracking-widest uppercase font-bold transition-all duration-500 overflow-hidden ${
                  filter === cat 
                    ? 'text-white' 
                    : 'text-dark/40 dark:text-white/40 hover:text-dark dark:hover:text-white'
                }`}
              >
                {filter === cat && (
                  <motion.div 
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-dark dark:bg-primary-dark rounded-full -z-10 shadow-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {t(`gallery.filter_${cat}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: idx % 10 * 0.05 }}
                className="group relative cursor-crosshair overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-1000 aspect-[4/5] bg-[#FAF7F2] dark:bg-[#1A1A1A]"
                onClick={() => setSelectedIndex(idx)}
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 backdrop-blur-[2px]">
                  <Maximize2 className="w-8 h-8 text-primary mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100" />
                  <span className="text-white font-playfair text-xl tracking-wide text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-200">
                    {img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox / Modal Redesign */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors p-4 z-50">
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              className="relative max-w-6xl max-h-full aspect-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredImages[selectedIndex].src} 
                alt={filteredImages[selectedIndex].title}
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-cover border border-white/5"
              />
              
              <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center text-white/50 font-bold tracking-widest text-[10px] uppercase">
                <button onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1)); }} className="hover:text-primary transition-colors flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span>{selectedIndex + 1} // {filteredImages.length}</span>
                <button onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0)); }} className="hover:text-primary transition-colors flex items-center gap-2">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
