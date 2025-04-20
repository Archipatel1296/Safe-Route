'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface DirectionWithColor extends google.maps.DirectionsResult {
  color?: string;
  crimeCount?: number;
}

const defaultLocation = { lat: 38.5382, lng: -121.7617 }; // UC Davis

const calculateCrimesAlongRoute = (route: google.maps.DirectionsRoute, crimes: any[]) => {
  const crimesFound = new Set(); // Use Set to avoid counting the same crime twice
  const routePoints = route.overview_path;
  
  routePoints.forEach(point => {
    const pointLatLng = new google.maps.LatLng(point.lat(), point.lng());
    
    crimes.forEach(crime => {
      const crimeLatLng = new google.maps.LatLng(
        crime.location.lat,
        crime.location.lng
      );
      
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        pointLatLng,
        crimeLatLng
      );
      
      // Count crimes within 100 meters of the route
      if (distance <= 100) {
        crimesFound.add(crime.id);
      }
    });
  });

  return crimesFound.size;
};

export function useMapLocation() {
  const [userLocation, setUserLocation] = useState(defaultLocation);
  const [directions, setDirections] = useState<DirectionWithColor[]>([]);
  const [fromLocation, setFromLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [toLocation, setToLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [fromSearchBox, setFromSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [toSearchBox, setToSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map>();

  const calculateRoutes = useCallback(async (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => {
    if (!window.google) {
      console.error('Google Maps not loaded');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    
    try {
      // Get multiple route alternatives
      const result = await directionsService.route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      });

      // Fetch crime data
      const response = await fetch('/api/crimes');
      const crimes = await response.json();

      // Calculate crime counts for each route
      const routesWithCrimes = result.routes.map(route => {
        const crimeCount = calculateCrimesAlongRoute(route, crimes);
        return { route, crimeCount };
      });

      // Sort routes by crime count (lowest first = safest)
      routesWithCrimes.sort((a, b) => a.crimeCount - b.crimeCount);

      // Create colored routes - green for safest, yellow for least safe
      const coloredRoutes = routesWithCrimes.map((routeData, index) => {
        let color;
        if (index === 0) {
          color = '#4ade80'; // Safest route (green)
        } else if (index === routesWithCrimes.length - 1) {
          color = '#fbbf24'; // Least safe route (yellow)
        } else {
          color = '#60a5fa'; // Alternative routes (blue)
        }

        return {
          ...result,
          routes: [routeData.route],
          crimeCount: routeData.crimeCount,
          color
        } as DirectionWithColor;
      });

      setDirections(coloredRoutes);

    } catch (error) {
      console.error("Error calculating routes:", error);
      setLocationError('Unable to calculate route. Please try different locations.');
    }
  }, []);

  const getLocationWithRetry = useCallback((maxRetries = 3) => {
    let retryCount = 0;
    let retryTimeout = 1000;

    const fallbackToIpLocation = () => {
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          const ipLocation = {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude)
          };
          setUserLocation(ipLocation);
          setFromLocation(ipLocation);
          setLocationError('Using approximate location based on IP address.');
          if (mapRef.current) {
            mapRef.current.panTo(ipLocation);
            mapRef.current.setZoom(15);
          }
        })
        .catch(() => {
          setUserLocation(defaultLocation);
          setFromLocation(defaultLocation);
          setLocationError('Unable to determine location. Using default location.');
          if (mapRef.current) {
            mapRef.current.panTo(defaultLocation);
            mapRef.current.setZoom(15);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setIsLocating(false);
        });
    };

    const attemptLocation = () => {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setFromLocation(location);
          setLocationError('');
          setIsLoading(false);
          setIsLocating(false);
          
          if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          retryCount++;
          
          if (retryCount < maxRetries) {
            retryTimeout *= 2;
            setTimeout(attemptLocation, retryTimeout);
          } else {
            let errorMessage = 'Unable to get your location.';
            if (error.code === 1) {
              errorMessage = 'Please enable location access in your browser settings to use your current location.';
            } else if (error.code === 2) {
              errorMessage = 'Location service is not available. Please check your device settings and try again.';
            } else if (error.code === 3) {
              errorMessage = 'Location request timed out. Falling back to IP-based location.';
            }
            setLocationError(errorMessage);
            fallbackToIpLocation();
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 120000,
          maximumAge: 0
        }
      );
    };

    attemptLocation();
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onFromSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setFromSearchBox(ref);
  }, []);

  const onToSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setToSearchBox(ref);
  }, []);

  const onFromPlacesChanged = useCallback(() => {
    if (fromSearchBox) {
      const places = fromSearchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setFromLocation(location);
          
          if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(15);
          }

          if (toLocation) {
            calculateRoutes(location, toLocation);
          }
        }
      }
    }
  }, [fromSearchBox, toLocation, calculateRoutes]);

  const onToPlacesChanged = useCallback(() => {
    if (toSearchBox) {
      const places = toSearchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setToLocation(location);
          
          if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(15);
          }

          if (fromLocation) {
            calculateRoutes(fromLocation, location);
          }
        }
      }
    }
  }, [toSearchBox, fromLocation, calculateRoutes]);

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      getLocationWithRetry();
      
      if (toLocation) {
        calculateRoutes(userLocation, toLocation);
      }
    }
  }, [getLocationWithRetry, toLocation, userLocation, calculateRoutes]);

  useEffect(() => {
    if (navigator.geolocation) {
      getLocationWithRetry();
    } else {
      setLocationError('Location services are not supported by your browser. Using default location.');
      setIsLoading(false);
    }
  }, [getLocationWithRetry]);

  return {
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
  };
}