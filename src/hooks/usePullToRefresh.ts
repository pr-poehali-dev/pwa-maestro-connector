import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshProps {
  onRefresh: () => Promise<void>;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
}: UsePullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;

    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (scrollable.scrollTop === 0 && !isRefreshing) {
        startY.current = e.touches[0].clientY;
        isDragging = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;

      if (diff > 0) {
        e.preventDefault();
        const distance = Math.min(diff / resistance, threshold * 1.5);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;
      isDragging = false;

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        setPullDistance(threshold);
        
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    scrollable.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollable.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollable.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollable.removeEventListener('touchstart', handleTouchStart);
      scrollable.removeEventListener('touchmove', handleTouchMove);
      scrollable.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, threshold, resistance, onRefresh, isRefreshing]);

  return {
    scrollableRef,
    pullDistance,
    isRefreshing,
    threshold,
  };
};
