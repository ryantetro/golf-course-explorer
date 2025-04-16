import { useEffect, useState } from 'react';

// Declare the global window object
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// Custom hook for Google Maps
export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  // Effect to load Google Maps
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=console.debug&libraries=maps,marker&v=beta`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setLoadError(new Error('Failed to load Google Maps'));
      };
      
      window.initMap = () => {
        setIsLoaded(true);
      };
      
      script.onload = () => {
        window.initMap();
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        window.initMap = () => {};
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  return { isLoaded, loadError };
}; 