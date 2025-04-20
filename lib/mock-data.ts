export interface CrimeUpdate {
  id: string;
  type: string;
  location: string;
  time: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  details?: string;
}

export const mockCrimeUpdates: CrimeUpdate[] = [
  {
    id: '1',
    type: 'Theft',
    location: 'Downtown, 5th Avenue',
    time: '2 hours ago',
    description: 'Bicycle theft reported outside the central library.',
    severity: 'medium',
    details: 'Suspect was wearing a black hoodie and was last seen heading north.'
  },
  {
    id: '2',
    type: 'Vandalism',
    location: 'West Park',
    time: '6 hours ago',
    description: 'Graffiti on public property near the main entrance.',
    severity: 'low',
    details: 'Park maintenance has been notified and will clean up within 24 hours.'
  },
  {
    id: '3',
    type: 'Robbery',
    location: 'East Side Mall',
    time: '1 day ago',
    description: 'Robbery at a convenience store at the east entrance.',
    severity: 'high',
    details: 'Police responded within minutes. No injuries reported.'
  }
];