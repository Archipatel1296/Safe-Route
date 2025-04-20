'use client';

import { useState, useEffect } from 'react';
import { safeFetch } from '@/lib/safe-fetch';

export interface CrimeData {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
  timestamp: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

// Pre-defined locations around UC Davis campus
const davisLocations = [
  { lat: 38.5382, lng: -121.7617 }, // UC Davis Main Campus
  { lat: 38.5449, lng: -121.7405 }, // Downtown Davis
  { lat: 38.5439, lng: -121.7429 }, // Central Davis
  { lat: 38.5382, lng: -121.7499 }, // West Davis
  { lat: 38.5372, lng: -121.7497 }, // South Davis
  { lat: 38.5418, lng: -121.7599 }, // North Davis
  { lat: 38.5466, lng: -121.7502 }, // East Davis
  { lat: 38.5391, lng: -121.7534 }, // UC Davis Arboretum
  { lat: 38.5384, lng: -121.7494 }, // UC Davis Quad
  { lat: 38.5376, lng: -121.7485 }  // UC Davis Memorial Union
];

const crimeTypes = [
  'Theft',
  'Assault',
  'Suspicious Activity',
  'Vandalism',
  'Burglary',
  'Public Disturbance',
  'Trespassing',
  'Vehicle Break-in',
  'Drug Activity',
  'Harassment'
];

const descriptions = [
  'Suspect seen fleeing the scene',
  'Multiple witnesses reported the incident',
  'Security camera footage available',
  'Police responded to the scene',
  'Victim filed a report',
  'Ongoing investigation',
  'Suspect apprehended',
  'Property damage reported',
  'No injuries reported',
  'Community alert issued'
];

// Generate 30 mock entries with realistic Davis locations
const mockCrimeData: CrimeData[] = Array.from({ length: 30 }, (_, i) => {
  // Get a base location from our predefined list
  const baseLocation = davisLocations[i % davisLocations.length];
  
  // Add some random variation to the location (within ~500m)
  const location = {
    lat: baseLocation.lat + (Math.random() - 0.5) * 0.005,
    lng: baseLocation.lng + (Math.random() - 0.5) * 0.005
  };

  // Generate random timestamp within the last 7 days
  const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();

  // Assign severity with weighted distribution (30% high, 40% medium, 30% low)
  const severityRoll = Math.random();
  const severity = severityRoll < 0.3 ? 'high' : severityRoll < 0.7 ? 'medium' : 'low';

  return {
    id: `davis-${i + 1}`,
    type: crimeTypes[Math.floor(Math.random() * crimeTypes.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    timestamp,
    location,
    severity
  };
});

export function useCrimeData() {
  const [crimes, setCrimes] = useState<CrimeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCrimes() {
      try {
        const data = await safeFetch<CrimeData[]>('/api/crimes', {
          fallback: mockCrimeData,
          showToast: false
        });
        
        setCrimes(data || mockCrimeData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching crimes:', err);
        setCrimes(mockCrimeData);
        setError('Failed to fetch live crime data, showing sample data');
        setIsLoading(false);
      }
    }

    fetchCrimes();
  }, []);

  return { crimes, isLoading, error };
}