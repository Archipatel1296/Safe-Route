import { NextResponse } from 'next/server';

// More comprehensive crime data around UC Davis campus
const crimes = [
  // Academic Core
  {
    id: 'h1',
    location: { lat: 38.5382, lng: -121.7617 }, // Sciences Lab Building
    severity: 'high',
    type: 'assault',
    date: '2024-01-15'
  },
  {
    id: 'h2',
    location: { lat: 38.5375, lng: -121.7505 }, // Shields Library
    severity: 'high',
    type: 'robbery',
    date: '2024-01-14'
  },
  {
    id: 'h3',
    location: { lat: 38.5368, lng: -121.7489 }, // Wellman Hall
    severity: 'high',
    type: 'assault',
    date: '2024-01-13'
  },
  
  // Student Housing Areas
  {
    id: 'h4',
    location: { lat: 38.5425, lng: -121.7582 }, // Tercero Housing
    severity: 'high',
    type: 'burglary',
    date: '2024-01-12'
  },
  {
    id: 'h5',
    location: { lat: 38.5445, lng: -121.7525 }, // Segundo Housing
    severity: 'high',
    type: 'assault',
    date: '2024-01-11'
  },
  
  // West Village Area
  {
    id: 'h6',
    location: { lat: 38.5418, lng: -121.7689 }, // West Village Apartments
    severity: 'high',
    type: 'robbery',
    date: '2024-01-10'
  },
  
  // Medium severity crimes - Academic Areas
  {
    id: 'm1',
    location: { lat: 38.5384, lng: -121.7494 }, // Memorial Union
    severity: 'medium',
    type: 'theft',
    date: '2024-01-13'
  },
  {
    id: 'm2',
    location: { lat: 38.5379, lng: -121.7512 }, // Olson Hall
    severity: 'medium',
    type: 'vandalism',
    date: '2024-01-12'
  },
  {
    id: 'm3',
    location: { lat: 38.5373, lng: -121.7528 }, // Chemistry Building
    severity: 'medium',
    type: 'theft',
    date: '2024-01-11'
  },
  {
    id: 'm4',
    location: { lat: 38.5391, lng: -121.7534 }, // ARC Pavilion
    severity: 'medium',
    type: 'vandalism',
    date: '2024-01-10'
  },
  {
    id: 'm5',
    location: { lat: 38.5398, lng: -121.7521 }, // Bike Barn
    severity: 'medium',
    type: 'theft',
    date: '2024-01-09'
  },
  
  // Medium severity - Residential Areas
  {
    id: 'm6',
    location: { lat: 38.5432, lng: -121.7562 }, // Tercero Dining Commons
    severity: 'medium',
    type: 'harassment',
    date: '2024-01-08'
  },
  {
    id: 'm7',
    location: { lat: 38.5452, lng: -121.7535 }, // Segundo Market
    severity: 'medium',
    type: 'suspicious_activity',
    date: '2024-01-07'
  },
  
  // Low severity incidents - Various Locations
  {
    id: 'l1',
    location: { lat: 38.5387, lng: -121.7478 }, // Arboretum
    severity: 'low',
    type: 'suspicious_activity',
    date: '2024-01-11'
  },
  {
    id: 'l2',
    location: { lat: 38.5376, lng: -121.7465 }, // East Quad
    severity: 'low',
    type: 'noise_complaint',
    date: '2024-01-10'
  },
  {
    id: 'l3',
    location: { lat: 38.5395, lng: -121.7502 }, // Silo
    severity: 'low',
    type: 'suspicious_activity',
    date: '2024-01-09'
  },
  
  // Additional locations around campus
  {
    id: 'h7',
    location: { lat: 38.5405, lng: -121.7515 }, // Sciences Lecture Hall
    severity: 'high',
    type: 'assault',
    date: '2024-01-08'
  },
  {
    id: 'h8',
    location: { lat: 38.5415, lng: -121.7535 }, // Parking Lot 25
    severity: 'high',
    type: 'vehicle_theft',
    date: '2024-01-07'
  },
  {
    id: 'm8',
    location: { lat: 38.5362, lng: -121.7495 }, // Art Building
    severity: 'medium',
    type: 'vandalism',
    date: '2024-01-06'
  },
  {
    id: 'm9',
    location: { lat: 38.5372, lng: -121.7515 }, // Social Sciences Building
    severity: 'medium',
    type: 'theft',
    date: '2024-01-05'
  },
  {
    id: 'l4',
    location: { lat: 38.5382, lng: -121.7535 }, // Hutchison Field
    severity: 'low',
    type: 'suspicious_activity',
    date: '2024-01-04'
  },
  
  // North and South Campus
  {
    id: 'h9',
    location: { lat: 38.5465, lng: -121.7515 }, // North Campus
    severity: 'high',
    type: 'robbery',
    date: '2024-01-03'
  },
  {
    id: 'm10',
    location: { lat: 38.5355, lng: -121.7525 }, // South Campus
    severity: 'medium',
    type: 'vandalism',
    date: '2024-01-02'
  },
  
  // Additional residential areas
  {
    id: 'h10',
    location: { lat: 38.5435, lng: -121.7595 }, // Student Housing
    severity: 'high',
    type: 'burglary',
    date: '2024-01-01'
  },
  {
    id: 'm11',
    location: { lat: 38.5445, lng: -121.7575 }, // Dining Commons
    severity: 'medium',
    type: 'theft',
    date: '2024-01-01'
  },
  
  // Bike paths and walkways
  {
    id: 'l5',
    location: { lat: 38.5395, lng: -121.7545 }, // Main Bike Path
    severity: 'low',
    type: 'suspicious_activity',
    date: '2024-01-01'
  },
  {
    id: 'l6',
    location: { lat: 38.5385, lng: -121.7555 }, // Campus Walk
    severity: 'low',
    type: 'harassment',
    date: '2024-01-01'
  },
  
  // Recreation areas
  {
    id: 'm12',
    location: { lat: 38.5405, lng: -121.7565 }, // Recreation Pool
    severity: 'medium',
    type: 'theft',
    date: '2024-01-01'
  },
  {
    id: 'l7',
    location: { lat: 38.5415, lng: -121.7575 }, // Tennis Courts
    severity: 'low',
    type: 'vandalism',
    date: '2024-01-01'
  },
  
  // Additional academic buildings
  {
    id: 'm13',
    location: { lat: 38.5375, lng: -121.7585 }, // Engineering Building
    severity: 'medium',
    type: 'theft',
    date: '2024-01-01'
  },
  {
    id: 'l8',
    location: { lat: 38.5365, lng: -121.7595 }, // Physics Building
    severity: 'low',
    type: 'suspicious_activity',
    date: '2024-01-01'
  },
  
  // Parking lots
  {
    id: 'h11',
    location: { lat: 38.5425, lng: -121.7605 }, // Parking Structure
    severity: 'high',
    type: 'vehicle_theft',
    date: '2024-01-01'
  },
  {
    id: 'm14',
    location: { lat: 38.5435, lng: -121.7615 }, // Visitor Parking
    severity: 'medium',
    type: 'vandalism',
    date: '2024-01-01'
  }
];

export async function GET() {
  try {
    return NextResponse.json(crimes, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching crime data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crime data' },
      { status: 500 }
    );
  }
}