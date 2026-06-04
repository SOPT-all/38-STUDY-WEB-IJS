import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1024px)');
    const syncState = () => setIsMobile(query.matches);

    syncState();
    query.addEventListener('change', syncState);
    return () => query.removeEventListener('change', syncState);
  }, []);

  return isMobile;
};
