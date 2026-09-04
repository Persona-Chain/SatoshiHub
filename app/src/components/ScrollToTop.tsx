import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const isPageRefresh = isFirstRender.current && navigation?.type === 'reload';
    isFirstRender.current = false;

    if (isPageRefresh) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 0);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
