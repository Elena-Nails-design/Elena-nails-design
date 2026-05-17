import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function InstagramFeed({ limitToFour = false }) {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Hack to hide Elfsight title, branding, and limit posts inside its Shadow DOM
    const hideTitleInterval = setInterval(() => {
      const widget = document.querySelector('.elfsight-app-3dd90e71-9dc2-4a31-b149-946ad464c73f');
      
      // Force stealth hide any elements globally just in case
      document.querySelectorAll('a[href*="elfsight.com"], .eapps-widget-toolbar').forEach(el => {
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        el.style.setProperty('width', '0', 'important');
        el.style.setProperty('height', '0', 'important');
        el.style.setProperty('position', 'absolute', 'important');
        el.style.setProperty('z-index', '-9999', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
      });

      if (widget) {
        // Check if the actual feed content has loaded in either Light DOM or Shadow DOM
        const hasLoadedContainer = widget.querySelector('.eapps-instagram-feed-container') || 
                                   widget.querySelector('.eapps-instagram-feed-posts-item') ||
                                   (widget.shadowRoot && (
                                     widget.shadowRoot.querySelector('.eapps-instagram-feed-container') ||
                                     widget.shadowRoot.querySelector('.eapps-instagram-feed-posts-item')
                                   ));
        if (hasLoadedContainer) {
          setIsLoading(false);
        }

        if (widget.shadowRoot) {
          // 1. Inject CSS for structural elements
          const styleId = limitToFour ? 'hide-elfsight-title-limit-4' : 'hide-elfsight-title';
          if (!widget.shadowRoot.querySelector(`#${styleId}`)) {
            // Remove opposite style if it exists to allow switching modes cleanly
            const oppositeStyleId = limitToFour ? 'hide-elfsight-title' : 'hide-elfsight-title-limit-4';
            const oldStyle = widget.shadowRoot.querySelector(`#${oppositeStyleId}`);
            if (oldStyle) oldStyle.remove();

            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
              .eui-widget-title,
              .es-widget-title,
              .eapps-instagram-feed-title,
              .eapps-instagram-feed-header,
              .eapps-widget-toolbar {
                display: none !important;
              }
              ${limitToFour ? `
                /* Hide all posts from 5th child onwards */
                .eapps-instagram-feed-posts-item:nth-child(n+5) {
                  display: none !important;
                }
                /* Hide load more button */
                .eapps-instagram-feed-posts-grid-load-more,
                .es-load-more-button {
                  display: none !important;
                }
                
                /* Reset Elfsight item absolute positioning and widths to allow modern CSS Grid */
                .eapps-instagram-feed-posts-item {
                  position: relative !important;
                  left: auto !important;
                  top: auto !important;
                  width: 100% !important; /* Stretch card to fill grid column cell! */
                  max-width: none !important;
                  min-width: 0 !important;
                  flex: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  transform: none !important;
                  float: none !important;
                  aspect-ratio: 1 / 1 !important; /* Perfect square shape! */
                  background: transparent !important; /* Eradicate white corners */
                  background-color: transparent !important;
                }

                /* Reset wrapper layouts to standard CSS grids */
                .eapps-instagram-feed-posts-inner,
                .eapps-instagram-feed-posts-grid-inner,
                .eapps-instagram-feed-posts-view {
                  display: grid !important;
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 16px !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: auto !important;
                  min-height: 0 !important;
                  margin: 0 auto !important;
                  float: none !important;
                }
                @media (min-width: 768px) {
                  .eapps-instagram-feed-posts-inner,
                  .eapps-instagram-feed-posts-grid-inner,
                  .eapps-instagram-feed-posts-view {
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 24px !important;
                  }
                }
                
                /* Premium cards design with rounded corners and shadows */
                a.eapps-instagram-feed-posts-item-link,
                .eapps-instagram-feed-posts-item-link {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                  border-radius: 16px !important;
                  overflow: hidden !important;
                  -webkit-mask-image: -webkit-radial-gradient(white, black);
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
                  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
                  background: transparent !important;
                  background-color: transparent !important;
                }
                a.eapps-instagram-feed-posts-item-link:hover,
                .eapps-instagram-feed-posts-item-link:hover {
                  transform: translateY(-8px) !important;
                  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.25) !important;
                }
                /* Size inner image to fill its card beautifully */
                .eapps-instagram-feed-posts-item-image,
                .eapps-instagram-feed-posts-item-image-wrapper {
                  width: 100% !important;
                  height: 100% !important;
                  border-radius: 16px !important;
                  background-size: cover !important;
                  background-position: center !important;
                  background-color: transparent !important;
                }
                /* Hide post type icons ('boarding') to keep the layout clean */
                .eapps-instagram-feed-posts-item-type,
                .es-post-type-icon {
                  display: none !important;
                }
                .eapps-instagram-feed-posts-grid {
                  padding-bottom: 0 !important;
                }
              ` : ''}
            `;
            widget.shadowRoot.appendChild(style);
          }

          // 2. Stealth hide badges with inline !important styles (Ninja mode)
          const badElements = widget.shadowRoot.querySelectorAll('a[href*="elfsight.com"], .eapps-widget-toolbar');
          badElements.forEach(el => {
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
            el.style.setProperty('width', '0', 'important');
            el.style.setProperty('height', '0', 'important');
            el.style.setProperty('position', 'absolute', 'important');
            el.style.setProperty('z-index', '-9999', 'important');
            el.style.setProperty('overflow', 'hidden', 'important');
          });
        }
      }
    }, 500);

    return () => {
      clearInterval(hideTitleInterval);
    };
  }, [limitToFour]);

  return (
    <div className={`w-full relative flex justify-center min-h-[300px] items-center ${limitToFour ? 'instagram-feed-homepage-limited' : 'instagram-feed-gallery-full'}`}>
      {/* Inject CSS to hide the Elfsight watermark, title, and optionally limit posts in Light DOM */}
      <style>
        {`
          a[href*="elfsight.com"], 
          .eapps-link,
          .eui-widget-title,
          .eapps-instagram-feed-title,
          .eapps-instagram-feed-header {
            display: none !important;
          }
          
          /* If widget renders in Light DOM on homepage, apply limits and luxury layout spacing */
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item:nth-child(n+5) {
            display: none !important;
          }
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid-load-more,
          .instagram-feed-homepage-limited .es-load-more-button {
            display: none !important;
          }
          
          /* Reset Elfsight item absolute positioning and widths in Light DOM */
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important; /* Stretch card to fill grid column cell! */
            max-width: none !important;
            min-width: 0 !important;
            flex: none !important;
            padding: 0 !important;
            margin: 0 !important;
            transform: none !important;
            float: none !important;
            aspect-ratio: 1 / 1 !important; /* Perfect square shape! */
            background: transparent !important; /* Eradicate white corners */
            background-color: transparent !important;
          }

          /* Reset wrapper layouts to standard CSS grids in Light DOM */
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-inner,
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid-inner,
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-view {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 0 auto !important;
            float: none !important;
          }
          @media (min-width: 768px) {
            body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-inner,
            body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid-inner,
            body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-view {
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 24px !important;
            }
          }

          /* Premium cards design with rounded corners and shadows in Light DOM */
          body .instagram-feed-homepage-limited a.eapps-instagram-feed-posts-item-link,
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-link {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 16px !important;
            overflow: hidden !important;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
            background: transparent !important;
            background-color: transparent !important;
          }
          body .instagram-feed-homepage-limited a.eapps-instagram-feed-posts-item-link:hover,
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-link:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.25) !important;
          }
          /* Size inner image to fill its card beautifully in Light DOM */
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-image,
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-image-wrapper {
            width: 100% !important;
            height: 100% !important;
            border-radius: 16px !important;
            background-size: cover !important;
            background-position: center !important;
            background-color: transparent !important;
          }
          /* Hide post type icons ('boarding') in Light DOM */
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-type,
          body .instagram-feed-homepage-limited .es-post-type-icon {
            display: none !important;
          }
          body .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid {
            padding-bottom: 0 !important;
          }
        `}
      </style>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 z-20 pointer-events-none transition-opacity duration-500 min-h-[300px]">
          <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="text-primary text-sm font-bold tracking-widest uppercase">
            {i18n.language === 'he' ? 'טוען גלריית אינסטגרם...' : 'Loading Instagram Gallery...'}
          </span>
        </div>
      )}

      <div className="elfsight-app-3dd90e71-9dc2-4a31-b149-946ad464c73f w-full z-10 relative" data-elfsight-app-lazy></div>
    </div>
  );
}
