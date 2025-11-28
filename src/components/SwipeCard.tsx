import { ReactNode, useRef, useState, TouchEvent, MouseEvent } from 'react';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface SwipeCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: string;
    label: string;
    color: string;
  };
  rightAction?: {
    icon: string;
    label: string;
    color: string;
  };
  className?: string;
}

const SwipeCard = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className = '',
}: SwipeCardProps) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleStart = (clientX: number) => {
    // Отключаем свайп на десктопе (>= 1024px)
    if (window.innerWidth >= 1024) return;
    
    setIsDragging(true);
    startX.current = clientX;
    currentX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    currentX.current = clientX;
    const diff = clientX - startX.current;
    
    if ((diff < 0 && onSwipeLeft) || (diff > 0 && onSwipeRight)) {
      setOffset(diff);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    const diff = currentX.current - startX.current;
    const threshold = 100;

    if (Math.abs(diff) > threshold) {
      if (diff < 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (diff > 0 && onSwipeRight) {
        onSwipeRight();
      }
    }

    setOffset(0);
  };

  const handleTouchStart = (e: TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {leftAction && offset < -20 && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center px-4" style={{ backgroundColor: leftAction.color }}>
          <div className="flex flex-col items-center gap-1">
            <Icon name={leftAction.icon as any} size={20} className="text-white" />
            <span className="text-xs text-white font-medium">{leftAction.label}</span>
          </div>
        </div>
      )}
      
      {rightAction && offset > 20 && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center px-4" style={{ backgroundColor: rightAction.color }}>
          <div className="flex flex-col items-center gap-1">
            <Icon name={rightAction.icon as any} size={20} className="text-white" />
            <span className="text-xs text-white font-medium">{rightAction.label}</span>
          </div>
        </div>
      )}
      
      <div
        className="transition-transform touch-pan-y"
        style={{
          transform: `translateX(${offset}px)`,
          transitionDuration: isDragging ? '0ms' : '300ms',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeCard;