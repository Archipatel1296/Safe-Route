"use client";

import { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useJsApiLoader } from "@react-google-maps/api";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@react-google-maps/api").then(mod => mod.GoogleMap), { ssr: false });
const DirectionsRenderer = dynamic(() => import("@react-google-maps/api").then(mod => mod.DirectionsRenderer), { ssr: false });

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    { featureType: "all", elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }, { lightness: -80 }] },
    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  ],
};

export default function MapComponent() {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const [originAutocomplete, setOriginAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const calculateRoute = useCallback((origin: string, destination: string) => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true, // ✅ important for multiple routes
      },
      (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (isLoaded && !loadError && map) {
      const originInput = document.getElementById("origin-input") as HTMLInputElement;
      const destinationInput = document.getElementById("destination-input") as HTMLInputElement;

      if (originInput && destinationInput) {
        const originAuto = new window.google.maps.places.Autocomplete(originInput);
        const destinationAuto = new window.google.maps.places.Autocomplete(destinationInput);

        setOriginAutocomplete(originAuto);
        setDestinationAutocomplete(destinationAuto);

        originAuto.addListener('place_changed', () => {
          const place = originAuto.getPlace();
          if (place.geometry && place.geometry.location) {
            const location = place.geometry.location;
            setOrigin(`${location.lat()},${location.lng()}`);
          }
        });

        destinationAuto.addListener('place_changed', () => {
          const place = destinationAuto.getPlace();
          if (place.geometry && place.geometry.location) {
            const location = place.geometry.location;
            setDestination(`${location.lat()},${location.lng()}`);
          }
        });
      }
    }
  }, [isLoaded, loadError, map]);

  useEffect(() => {
    if (origin && destination) {
      calculateRoute(origin, destination);
    }
  }, [origin, destination, calculateRoute]);

  if (loadError) {
    return (
      <Box sx={{ position: "relative", width: "100%", borderRadius: "12px", padding: "2px", background: "linear-gradient(135deg, #671cd9, #8e63cf)", boxShadow: "0 8px 32px rgba(103, 28, 217, 0.15)" }}>
        <Paper id="map" elevation={0} sx={{ width: "100%", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 20, 0.9)", borderRadius: "10px", flexDirection: "column" }}>
          <Typography color="error" sx={{ mb: 2 }}>Error loading Google Maps</Typography>
          <Typography variant="caption" sx={{ color: "#cccccc" }}>Please check your API key and internet connection</Typography>
        </Paper>
      </Box>
    )
  }

  if (!isLoaded) {
    return (
      <Box sx={{ position: "relative", width: "100%", borderRadius: "12px", padding: "2px", background: "linear-gradient(135deg, #671cd9, #8e63cf)", boxShadow: "0 8px 32px rgba(103, 28, 217, 0.15)" }}>
        <Paper id="map" elevation={0} sx={{ width: "100%", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(20, 20, 20, 0.9)", borderRadius: "10px", flexDirection: "column" }}>
          <CircularProgress size={40} sx={{ color: "#8e63cf", mb: 2 }} />
          <Typography variant="body1" sx={{ color: "#cccccc" }}>Loading map...</Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ position: "relative", width: "100%", borderRadius: "12px", padding: "2px", background: "linear-gradient(135deg, #671cd9, #8e63cf)", boxShadow: "0 8px 32px rgba(103, 28, 217, 0.15)" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <input id="origin-input" type="text" placeholder="From Location" style={{ width: "250px", marginRight: "10px", padding: "8px" }} />
        <input id="destination-input" type="text" placeholder="To Location" style={{ width: "250px", padding: "8px" }} />
      </Box>

      <Box sx={{ width: "100%", height: "400px", borderRadius: "10px", overflow: "hidden" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {directions?.routes?.slice(0, 3).map((route, idx) => (
            <DirectionsRenderer
              key={idx}
              directions={{
                ...directions,
                routes: [route], // render one route at a time
              }}
              options={{
                polylineOptions: {
                  strokeColor: idx === 0 ? "#00FF00" : "#FFA500", // Green main, Orange alternates
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                },
                suppressMarkers: false,
              }}
            />
          ))}
        </GoogleMap>
      </Box>
    </Box>
  );
}