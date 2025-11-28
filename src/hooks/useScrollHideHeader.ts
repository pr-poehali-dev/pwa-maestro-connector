import { useEffect, useState, RefObject } from 'react';

interface UseScrollHideHeaderProps {
  threshold?: number;
  scrollRef?: RefObject<HTMLElement>;
}

export const useScrollHideHeader = ({
  threshold = 50,
  scrollRef,
}: UseScrollHideHeaderProps = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const element = scrollRef?.current || window;
    
    const handleScroll = () => {
      const currentScrollY = scrollRef?.current?.scrollTop || window.scrollY;
      
      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    if (scrollRef?.current) {
      scrollRef.current.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollRef?.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY, threshold, scrollRef]);

  return { isVisible };
};
