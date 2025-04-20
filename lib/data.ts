export type CrimeUpdate = {
  id: string;
  type: string;
  location: string;
  time: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  coordinates: {
    lat: number;
    lng: number;
  };
};

// Mock data for crime updates
export const crimeUpdates: CrimeUpdate[] = [
  {
    id: '1',
    type: 'Theft',
    location: '3rd & Main St',
    time: '2 hours ago',
    description: 'Bicycle theft reported outside the university library. Suspect was wearing a black hoodie.',
    severity: 'medium',
    coordinates: {
      lat: 38.5449,
      lng: -121.7405,
    },
  },
  {
    id: '2',
    type: 'Suspicious Activity',
    location: 'Campus Quad',
    time: '45 minutes ago',
    description: 'Individual reported checking car doors in parking lot B. Security has been notified.',
    severity: 'low',
    coordinates: {
      lat: 38.5382,
      lng: -121.7617,
    },
  },
  {
    id: '3',
    type: 'Assault',
    location: 'Downtown Plaza',
    time: '3 hours ago',
    description: 'Physical altercation reported. Police responded and situation has been resolved.',
    severity: 'high',
    coordinates: {
      lat: 38.5439,
      lng: -121.7429,
    },
  },
  {
    id: '4',
    type: 'Vandalism',
    location: 'West Village',
    time: '12 hours ago',
    description: 'Graffiti reported on building exterior. Campus maintenance has been notified.',
    severity: 'low',
    coordinates: {
      lat: 38.5418,
      lng: -121.7599,
    },
  },
  {
    id: '5',
    type: 'Robbery',
    location: 'University Ave',
    time: '1 day ago',
    description: 'Phone snatching incident reported. Victim is safe but property was not recovered.',
    severity: 'high',
    coordinates: {
      lat: 38.5466,
      lng: -121.7502,
    },
  },
  {
    id: '6',
    type: 'Suspicious Person',
    location: 'South Hall',
    time: '4 hours ago',
    description: 'Unidentified individual attempting to access restricted areas. Security responded.',
    severity: 'medium',
    coordinates: {
      lat: 38.5391,
      lng: -121.7534,
    },
  },
];