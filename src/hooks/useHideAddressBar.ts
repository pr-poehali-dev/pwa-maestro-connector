import { useEffect } from 'react';

export const useHideAddressBar = () => {
  useEffect(() => {
    const hideAddressBar = () => {
      // Scroll to hide address bar on mobile browsers
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    };

    // Hide on mount
    setTimeout(hideAddressBar, 100);

    // Hide on orientation change
    window.addEventListener('orientationchange', hideAddressBar);
    
    return () => {
      window.removeEventListener('orientationchange', hideAddressBar);
    };
  }, []);
};
