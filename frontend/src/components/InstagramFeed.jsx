import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function InstagramFeed({ limitToFour = false }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load Elfsight Platform Script
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

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

      if (widget && widget.shadowRoot) {
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
              /* Enforce custom responsive grid layout */
              .eapps-instagram-feed-posts-grid-inner {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
              }
              @media (min-width: 768px) {
                .eapps-instagram-feed-posts-grid-inner {
                  grid-template-columns: repeat(4, 1fr) !important;
                  gap: 1.5rem !important;
                }
              }
              /* Luxury card styles with rounded corners and shadows */
              .eapps-instagram-feed-posts-item {
                border-radius: 1.5rem !important;
                overflow: hidden !important;
                box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3) !important;
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease !important;
              }
              .eapps-instagram-feed-posts-item:hover {
                transform: translateY(-8px) scale(1.02) !important;
                box-shadow: 0 20px 40px -15px rgba(212, 175, 55, 0.25) !important;
              }
              .eapps-instagram-feed-posts-item-link {
                border-radius: 1.5rem !important;
                overflow: hidden !important;
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
    }, 500);

    return () => {
      clearInterval(hideTitleInterval);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [limitToFour]);

  return (
    <div className={`w-full relative flex justify-center min-h-[300px] items-start ${limitToFour ? 'instagram-feed-homepage-limited' : 'instagram-feed-gallery-full'}`}>
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
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid-inner {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          @media (min-width: 768px) {
            .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid-inner {
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 1.5rem !important;
            }
          }
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item {
            border-radius: 1.5rem !important;
            overflow: hidden !important;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3) !important;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease !important;
          }
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item:hover {
            transform: translateY(-8px) scale(1.02) !important;
            box-shadow: 0 20px 40px -15px rgba(212, 175, 55, 0.25) !important;
          }
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-item-link {
            border-radius: 1.5rem !important;
            overflow: hidden !important;
          }
          .instagram-feed-homepage-limited .eapps-instagram-feed-posts-grid {
            padding-bottom: 0 !important;
          }
        `}
      </style>

      <div className="text-center absolute pointer-events-none opacity-50 text-sm z-0 top-20">
        {i18n.language === 'he' ? 'טוען גלריית אינסטגרם...' : 'Loading Instagram Gallery...'}
      </div>

      <div className="elfsight-app-3dd90e71-9dc2-4a31-b149-946ad464c73f w-full z-10 relative" data-elfsight-app-lazy></div>
    </div>
  );
}
