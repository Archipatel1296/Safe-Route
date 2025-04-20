'use client';

import { Navigation, Loader2 } from 'lucide-react';

interface MapControlsProps {
  onCurrentLocation: () => void;
  isLocating: boolean;
}

export default function MapControls({ onCurrentLocation, isLocating }: MapControlsProps) {
  return (
    <button 
      onClick={onCurrentLocation}
      className="p-2 rounded-md hover:bg-[#671cd9]/30 transition-colors disabled:opacity-50"
      title="Use current location"
      disabled={isLocating}
    >
      {isLocating ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Navigation className="w-5 h-5" />
      )}
    </button>
  );
}