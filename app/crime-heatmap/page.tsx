'use client';

import { GoogleMap, Circle, HeatmapLayer } from '@react-google-maps/api';
import { AlertTriangle, Calendar, Filter, Loader2 } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { useCrimeData } from '@/hooks/useCrimeData';
import { mapStyles } from '@/components/home/map/mapStyles';
import { useGoogleMaps } from '@/components/providers/GoogleMapsProvider';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 38.5382,
  lng: -121.7617
};

export default function CrimeHeatmapPage() {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [crimeTypeFilter, setCrimeTypeFilter] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const { crimes, isLoading, error } = useCrimeData();
  const { isLoaded, loadError } = useGoogleMaps();

  const heatmapData = useMemo(() => {
    return crimes.map(crime => ({
      location: new google.maps.LatLng(crime.location.lat, crime.location.lng),
      weight: crime.severity === 'high' ? 3 : crime.severity === 'medium' ? 2 : 1
    }));
  }, [crimes]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ff0000';
      case 'medium':
        return '#ff6b6b';
      case 'low':
        return '#ffa07a';
      default:
        return '#ff0000';
    }
  };

  const getCircleOptions = useCallback((severity: string) => ({
    strokeColor: getSeverityColor(severity),
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: getSeverityColor(severity),
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 250,
    zIndex: 1
  }), []);

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[500px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#671cd9]" />
          <span>Loading map data...</span>
        </div>
      </div>
    );
  }

  if (loadError || error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#671cd9] to-[#8e63cf]">
          Crime Heatmap
        </h1>
        
        <div className="mb-8 text-center text-gray-300">
          <p>
            Visualize crime patterns in your area with our interactive heatmap. 
            Identify hotspots and make informed decisions about where and when to travel.
          </p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-sm border border-[#8e63cf]/30 p-4 rounded-xl shadow-lg mb-8">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative group">
                <button className="bg-[#230a4e]/40 border border-[#8e63cf]/20 rounded-md py-2 px-4 flex items-center gap-2 hover:bg-[#671cd9]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#671cd9]/50">
                  <Calendar className="w-4 h-4 text-[#671cd9]" />
                  <span>
                    {timeFilter === '24h' ? 'Last 24 Hours' :
                     timeFilter === '7days' ? 'Last 7 Days' :
                     timeFilter === '30days' ? 'Last 30 Days' : 'Last 90 Days'}
                  </span>
                </button>
                <div className="hidden group-hover:block absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#230a4e] border border-[#8e63cf]/30 z-10">
                  <div className="py-1">
                    {[
                      { id: '24h', label: 'Last 24 Hours' },
                      { id: '7days', label: 'Last 7 Days' },
                      { id: '30days', label: 'Last 30 Days' },
                      { id: '90days', label: 'Last 90 Days' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTimeFilter(option.id)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#671cd9]/20 ${
                          timeFilter === option.id ? 'bg-[#671cd9]/30' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="bg-[#230a4e]/40 border border-[#8e63cf]/20 rounded-md py-2 px-4 flex items-center gap-2 hover:bg-[#671cd9]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#671cd9]/50">
                  <Filter className="w-4 h-4 text-[#671cd9]" />
                  <span>{crimeTypeFilter === 'all' ? 'All Crime Types' : crimeTypeFilter}</span>
                </button>
                <div className="hidden group-hover:block absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#230a4e] border border-[#8e63cf]/30 z-10">
                  <div className="py-1">
                    {['all', 'Theft', 'Assault', 'Vandalism', 'Suspicious Activity'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setCrimeTypeFilter(option)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#671cd9]/20 ${
                          crimeTypeFilter === option ? 'bg-[#671cd9]/30' : ''
                        }`}
                      >
                        {option === 'all' ? 'All Crime Types' : option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`bg-[#230a4e]/40 border border-[#8e63cf]/20 rounded-md py-2 px-4 hover:bg-[#671cd9]/20 transition-colors ${
                showHeatmap ? 'text-[#671cd9]' : 'text-gray-400'
              }`}
            >
              Toggle Heatmap
            </button>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden bg-[#230a4e]/30 border border-[#8e63cf]/30 mb-8">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
            options={{
              styles: mapStyles,
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            {showHeatmap && (
              <HeatmapLayer
                data={heatmapData}
                options={{
                  radius: 30,
                  opacity: 0.7,
                  gradient: [
                    'rgba(0, 255, 255, 0)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(0, 127, 255, 1)',
                    'rgba(0, 63, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 0, 223, 1)',
                    'rgba(0, 0, 191, 1)',
                    'rgba(0, 0, 159, 1)',
                    'rgba(0, 0, 127, 1)',
                    'rgba(63, 0, 91, 1)',
                    'rgba(127, 0, 63, 1)',
                    'rgba(191, 0, 31, 1)',
                    'rgba(255, 0, 0, 1)'
                  ]
                }}
              />
            )}
            
            {crimes.map((crime) => (
              <Circle
                key={crime.id}
                center={crime.location}
                options={getCircleOptions(crime.severity || 'low')}
              />
            ))}
          </GoogleMap>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-sm border border-[#8e63cf]/30 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">High Risk Areas</h3>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ff0000' }}></div>
            </div>
            <p className="text-sm text-gray-300">Areas with significant crime clusters in the last 7 days</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm border border-[#8e63cf]/30 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Moderate Risk Areas</h3>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ff6b6b' }}></div>
            </div>
            <p className="text-sm text-gray-300">Areas with occasional criminal activity or suspicious reports</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm border border-[#8e63cf]/30 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Low Risk Areas</h3>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ffa07a' }}></div>
            </div>
            <p className="text-sm text-gray-300">Areas with minimal reports and generally considered safe</p>
          </div>
        </div>
      </div>
    </div>
  );
}