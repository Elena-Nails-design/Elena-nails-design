import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' ensures it happens immediately without animation
    });
  }, [pathname]);

  return null;
}
