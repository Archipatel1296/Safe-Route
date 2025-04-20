'use client';

import { MapPin, AlertTriangle, Loader2, Shield } from 'lucide-react';
import { useGoogleMaps } from '@/components/providers/GoogleMapsProvider';
import MapControls from './map/MapControls';
import LocationSearch from './map/LocationSearch';
import MapActionButtons from './map/MapActionButtons';
import GoogleMapComponent from './map/GoogleMapComponent';
import CrimeMarkers from './map/CrimeMarkers';
import SafePlaceMarkers from './map/SafePlaceMarkers';
import { useMapLocation } from '@/hooks/useMapLocation';
import { useCrimeData } from '@/hooks/useCrimeData';
import { useSafePlaces } from '@/hooks/useSafePlaces';
import { useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function MapPlaceholder() {
  const [showCrimes, setShowCrimes] = useState(false);
  const [showSafePlaces, setShowSafePlaces] = useState(false);
  const { crimes, isLoading: crimesLoading, error: crimesError } = useCrimeData();
  const { safePlaces, isLoading: safePlacesLoading, error: safePlacesError } = useSafePlaces();
  const { isLoaded, loadError } = useGoogleMaps();
  
  const {
    userLocation,
    directions,
    fromLocation,
    toLocation,
    isLoading,
    locationError,
    isLocating,
    onMapLoad,
    onFromSearchBoxLoad,
    onToSearchBoxLoad,
    onFromPlacesChanged,
    onToPlacesChanged,
    handleCurrentLocation,
  } = useMapLocation();

  if (!isLoaded || isLoading || crimesLoading || safePlacesLoading) {
    return (
      <div className="rounded-xl overflow-hidden border border-[#8e63cf]/30 bg-black/40 backdrop-blur-sm shadow-lg h-[500px] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#671cd9]" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  if (loadError || crimesError || safePlacesError) {
    return (
      <div className="rounded-xl overflow-hidden border border-[#8e63cf]/30 bg-black/40 backdrop-blur-sm shadow-lg h-[500px] flex items-center justify-center">
        <div className="text-center p-4">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-400">
            {crimesError || safePlacesError || 'Error loading map data. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#8e63cf]/30 bg-black/40 backdrop-blur-sm shadow-lg">
      <div className="p-4 bg-[#671cd9]/20 border-b border-[#8e63cf]/30 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#671cd9]" />
          Fortis Safety Map
        </h2>
        <div className="flex items-center gap-2">
          <MapControls
            onCurrentLocation={handleCurrentLocation}
            isLocating={isLocating}
          />
        </div>
      </div>
      
      {locationError && (
        <div className="p-2 bg-red-500/20 text-red-200 text-sm text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {locationError}
        </div>
      )}
      
      <div className="h-[400px] relative">
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 w-64">
          <LocationSearch
            onLoad={onFromSearchBoxLoad}
            onPlacesChanged={onFromPlacesChanged}
            placeholder="From location"
          />
          <LocationSearch
            onLoad={onToSearchBoxLoad}
            onPlacesChanged={onToPlacesChanged}
            placeholder="To location"
          />
        </div>

        <GoogleMapComponent
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
          onLoad={onMapLoad}
          userLocation={userLocation}
          fromLocation={fromLocation}
          toLocation={toLocation}
          directions={directions}
        >
          <CrimeMarkers crimes={crimes} showCrimes={showCrimes} />
          <SafePlaceMarkers safePlaces={safePlaces} showSafePlaces={showSafePlaces} />
        </GoogleMapComponent>
      </div>
      
      <div className="p-3 bg-[#230a4e]/30 border-t border-[#8e63cf]/30 flex justify-center gap-4">
        <button 
          className={`text-sm py-1.5 px-4 rounded-md transition-colors flex items-center gap-2 ${
            showCrimes ? 'bg-red-500/40 hover:bg-red-500/60' : 'bg-[#671cd9]/20 hover:bg-[#671cd9]/40'
          }`}
          onClick={() => setShowCrimes(!showCrimes)}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Toggle Crime Markers</span>
        </button>
        
        <button 
          className={`text-sm py-1.5 px-4 rounded-md transition-colors flex items-center gap-2 ${
            showSafePlaces ? 'bg-emerald-500/40 hover:bg-emerald-500/60' : 'bg-[#671cd9]/20 hover:bg-[#671cd9]/40'
          }`}
          onClick={() => setShowSafePlaces(!showSafePlaces)}
        >
          <Shield className="w-4 h-4" />
          <span>Show Safe Places</span>
        </button>
      </div>
    </div>
  );
}