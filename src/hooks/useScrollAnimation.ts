import { useEffect } from 'react';
import { SCROLL_CONFIG } from '@/lib/constants';

export const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animation-container');
      
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - SCROLL_CONFIG.ELEMENT_VISIBLE_OFFSET) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load for elements already in viewport
    const timeoutId = setTimeout(handleScroll, SCROLL_CONFIG.INITIAL_DELAY);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
};
