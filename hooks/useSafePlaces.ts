'use client';

import { useState, useEffect } from 'react';

export interface SafePlace {
  id: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
}

const SAFE_PLACE_TYPES = [
  'Police Station',
  'Fire Station',
  'Hospital',
  'School',
  'Library',
  'Community Center',
  'Government Building',
  'Public Transportation Hub',
  'Shopping Mall',
  'Pharmacy',
];

// Mock safe places around UC Davis area
const mockSafePlaces: SafePlace[] = [
  {
    id: 'police-1',
    name: 'UC Davis Police Department',
    type: 'Police Station',
    location: { lat: 38.5377, lng: -121.7494 }
  },
  {
    id: 'hospital-1',
    name: 'UC Davis Medical Center',
    type: 'Hospital',
    location: { lat: 38.5419, lng: -121.7502 }
  },
  {
    id: 'library-1',
    name: 'Peter J. Shields Library',
    type: 'Library',
    location: { lat: 38.5395, lng: -121.7489 }
  },
  {
    id: 'fire-1',
    name: 'Davis Fire Station',
    type: 'Fire Station',
    location: { lat: 38.5445, lng: -121.7405 }
  },
  {
    id: 'school-1',
    name: 'UC Davis Campus',
    type: 'School',
    location: { lat: 38.5382, lng: -121.7617 }
  },
  {
    id: 'community-1',
    name: 'Davis Community Center',
    type: 'Community Center',
    location: { lat: 38.5465, lng: -121.7445 }
  },
  {
    id: 'govt-1',
    name: 'Davis City Hall',
    type: 'Government Building',
    location: { lat: 38.5449, lng: -121.7405 }
  },
  {
    id: 'transport-1',
    name: 'Davis Transit Center',
    type: 'Public Transportation Hub',
    location: { lat: 38.5421, lng: -121.7389 }
  },
  {
    id: 'mall-1',
    name: 'Davis Commons',
    type: 'Shopping Mall',
    location: { lat: 38.5437, lng: -121.7405 }
  },
  {
    id: 'pharmacy-1',
    name: 'Campus Pharmacy',
    type: 'Pharmacy',
    location: { lat: 38.5392, lng: -121.7534 }
  }
];

export function useSafePlaces() {
  const [safePlaces, setSafePlaces] = useState<SafePlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchSafePlaces = async () => {
      try {
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSafePlaces(mockSafePlaces);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch safe places');
        setIsLoading(false);
      }
    };

    fetchSafePlaces();
  }, []);

  return { safePlaces, isLoading, error };
}