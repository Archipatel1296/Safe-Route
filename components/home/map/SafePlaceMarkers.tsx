'use client';

import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo } from 'react';
import type { SafePlace } from '@/hooks/useSafePlaces';

interface SafePlaceMarkersProps {
  safePlaces: SafePlace[];
  showSafePlaces: boolean;
  directions?: google.maps.DirectionsResult[];
}

export default function SafePlaceMarkers({ safePlaces, showSafePlaces, directions }: SafePlaceMarkersProps) {
  const [selectedPlace, setSelectedPlace] = useState<SafePlace | null>(null);

  const nearbyPlaces = useMemo(() => {
    if (!showSafePlaces) return [];

    // If there are directions, show places near the routes
    if (directions && directions.length > 0) {
      const routePoints = directions.flatMap(direction => 
        direction.routes[0].overview_path.map(point => ({
          lat: point.lat(),
          lng: point.lng()
        }))
      );

      return safePlaces.filter(place => {
        return routePoints.some(point => {
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(place.location.lat, place.location.lng),
            new google.maps.LatLng(point.lat, point.lng)
          );
          return distance < 750; // Increased radius to 750 meters
        });
      });
    }

    // If no directions, show all safe places
    return safePlaces;
  }, [safePlaces, showSafePlaces, directions]);

  if (!showSafePlaces) return null;

  return (
    <>
      {nearbyPlaces.map((place) => (
        <Marker
          key={place.id}
          position={place.location}
          onClick={() => setSelectedPlace(place)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#ffffff',
            fillOpacity: 0.9,
            strokeColor: '#4ade80',
            strokeWeight: 2,
          }}
        />
      ))}

      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.location}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div className="p-2">
            <h3 className="font-semibold text-gray-900">{selectedPlace.name}</h3>
            <p className="text-sm text-gray-600">{selectedPlace.type}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}