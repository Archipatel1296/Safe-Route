'use client';

import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { mapStyles } from './mapStyles';
import { ReactNode } from 'react';
import RouteLegend from './RouteLegend';

interface DirectionWithColor extends google.maps.DirectionsResult {
  color?: string;
  crimeCount?: number;
}

interface GoogleMapComponentProps {
  mapContainerStyle: {
    width: string;
    height: string;
  };
  center: google.maps.LatLngLiteral;
  onLoad: (map: google.maps.Map) => void;
  userLocation: google.maps.LatLngLiteral;
  fromLocation: google.maps.LatLngLiteral | null;
  toLocation: google.maps.LatLngLiteral | null;
  directions: DirectionWithColor[];
  children?: ReactNode;
}

export default function GoogleMapComponent({
  mapContainerStyle,
  center,
  onLoad,
  userLocation,
  fromLocation,
  toLocation,
  directions,
  children,
}: GoogleMapComponentProps) {
  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#671cd9",
              fillOpacity: 1,
              strokeColor: "#671cd9",
              strokeWeight: 0,
            }}
            title="Your location"
          />
        )}
        
        {fromLocation && fromLocation !== userLocation && (
          <Marker
            position={fromLocation}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="#671cd9"/>
                  <circle cx="12" cy="12" r="6" fill="white"/>
                </svg>
              `)}`,
              anchor: new google.maps.Point(12, 36),
              scaledSize: new google.maps.Size(24, 36)
            }}
            title="From location"
          />
        )}
        
        {toLocation && (
          <Marker
            position={toLocation}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="#8e63cf"/>
                  <circle cx="12" cy="12" r="6" fill="white"/>
                </svg>
              `)}`,
              anchor: new google.maps.Point(12, 36),
              scaledSize: new google.maps.Size(24, 36)
            }}
            title="To location"
          />
        )}
        
        {directions.map((direction, index) => (
          <DirectionsRenderer
            key={index}
            directions={direction}
            options={{
              polylineOptions: {
                strokeColor: direction.color || '#671cd9',
                strokeWeight: index === 0 ? 5 : 4,
                strokeOpacity: index === 0 ? 1 : 0.7
              },
              suppressMarkers: true,
            }}
          />
        ))}

        {children}
      </GoogleMap>
      
      <RouteLegend 
        visible={directions.length > 0} 
        routes={directions}
      />
    </div>
  );
}