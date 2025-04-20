'use client';

import React, { createContext, useContext } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

const libraries: ("places" | "visualization")[] = ["places", "visualization"];

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBkrlJF8g4mFAJLeZeVFFbpIkyKMLY3M3w",
    libraries,
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#671cd9]" />
          <span>Loading Google Maps...</span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading Google Maps</p>
          <p className="text-sm">{loadError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}