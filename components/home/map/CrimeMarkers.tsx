'use client';

import { Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import type { CrimeData } from '@/hooks/useCrimeData';

interface CrimeMarkersProps {
  crimes: CrimeData[];
  showCrimes: boolean;
}

export default function CrimeMarkers({ crimes, showCrimes }: CrimeMarkersProps) {
  const [selectedCrime, setSelectedCrime] = useState<CrimeData | null>(null);

  if (!showCrimes) return null;

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffa726';
      case 'low':
        return '#66bb6a';
      default:
        return '#ff4444';
    }
  };

  return (
    <>
      {crimes.map((crime) => (
        <Marker
          key={crime.id}
          position={crime.location}
          onClick={() => setSelectedCrime(crime)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12, // Increased from 8 to 12
            fillColor: getSeverityColor(crime.severity),
            fillOpacity: 0.7,
            strokeColor: getSeverityColor(crime.severity),
            strokeWeight: 2, // Increased from 1 to 2
          }}
        />
      ))}

      {selectedCrime && (
        <InfoWindow
          position={selectedCrime.location}
          onCloseClick={() => setSelectedCrime(null)}
        >
          <div className="p-2">
            <h3 className="font-semibold text-gray-900">{selectedCrime.type}</h3>
            <p className="text-sm text-gray-600">{selectedCrime.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(selectedCrime.timestamp).toLocaleDateString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}