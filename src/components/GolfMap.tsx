import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

interface GolfMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

const GolfMap: React.FC<GolfMapProps> = ({ latitude, longitude, className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        mapId: 'golf_course_map',
        styles: [
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#c5e8c5' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#a8d9a8' }]
          },
          {
            featureType: 'poi.sports_complex',
            elementType: 'geometry',
            stylers: [{ color: '#90ee90' }]
          }
        ]
      });

      const markerView = new window.google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: latitude, lng: longitude },
        title: 'Golf Course Location'
      });

      markerView.addListener('click', () => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0; color: #2f855a; font-weight: bold;">Golf Course</h3>
              <p style="margin: 4px 0;">Lat: ${latitude}</p>
              <p style="margin: 4px 0;">Lng: ${longitude}</p>
            </div>
          `
        });
        infoWindow.open(map, markerView);
      });
    }
  }, [isLoaded, latitude, longitude]);

  if (loadError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <p className="text-red-500">Failed to load map</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="golf-spinner"></div>
      </div>
    );
  }

  return <div ref={mapRef} className={`rounded-lg ${className}`} />;
};

export default GolfMap; 