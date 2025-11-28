export const haptics = {
  light: () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  },
  
  medium: () => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  },
  
  heavy: () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  },
  
  success: () => {
    if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  },
  
  error: () => {
    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50]);
    }
  },
  
  selection: () => {
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  },
};
