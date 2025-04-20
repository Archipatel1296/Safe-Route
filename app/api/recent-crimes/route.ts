import { NextResponse } from 'next/server';

// Helper function to generate a date string for n days ago
function getDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

// More detailed mock crime data with realistic scenarios
const recentCrimes = [
  {
    id: '1',
    type: 'Assault',
    location: 'Downtown Davis, 3rd & G Street',
    time: '2 hours ago',
    date: getDaysAgo(0),
    description: 'A verbal altercation escalated into a physical confrontation outside The Davis Beer Shoppe. Two individuals involved.',
    severity: 'high',
    details: 'One suspect wearing a red jacket fled south on G Street. Victim sustained minor injuries and refused medical treatment. Multiple witnesses present.',
    summary: 'Law enforcement responded to a physical altercation at The Davis Beer Shoppe. One suspect fled the scene. The victim sustained minor injuries but declined medical attention. Officers are reviewing security footage and interviewing witnesses. The public is advised to exercise caution in the area.'
  },
  {
    id: '2',
    type: 'Bicycle Theft',
    location: 'UC Davis Memorial Union',
    time: '1 day ago',
    date: getDaysAgo(1),
    description: 'Three high-end bicycles reported stolen from the bike racks near the Memorial Union entrance.',
    severity: 'medium',
    details: 'Security cameras captured suspect using bolt cutters at approximately 2:15 PM. Suspect described as male, early 20s, wearing dark clothing and a backpack.',
    summary: 'Multiple bicycle thefts reported at UC Davis Memorial Union. Suspect was captured on security footage using bolt cutters. Campus police are investigating and have increased patrols in the area. Students are advised to use U-locks and register their bicycles with campus security.'
  },
  {
    id: '3',
    type: 'Suspicious Activity',
    location: 'West Village Apartments',
    time: '2 days ago',
    date: getDaysAgo(2),
    description: 'Multiple residents reported an unknown individual attempting to enter apartments by claiming to be maintenance staff.',
    severity: 'medium',
    details: 'Suspect described as male, mid-30s, wearing fake maintenance uniform. No successful entries reported. Property management notified all residents.',
    summary: 'Reports of an individual impersonating maintenance staff at West Village Apartments. No successful unauthorized entries occurred. Property management has alerted all residents and increased security measures. Residents are reminded to verify staff credentials before allowing entry.'
  },
  {
    id: '4',
    type: 'Armed Robbery',
    location: 'East Davis 7-Eleven',
    time: '3 days ago',
    date: getDaysAgo(3),
    description: 'Armed robbery occurred at 7-Eleven on East Covell Boulevard. Suspect demanded cash while displaying a weapon.',
    severity: 'high',
    details: 'Suspect fled in a dark-colored sedan heading east on Covell. No injuries reported. Police recovered security footage and are investigating.',
    summary: 'Armed robbery at East Davis 7-Eleven. Suspect fled in a dark sedan. No injuries reported. Police have obtained security footage and are conducting an active investigation. The public is advised to remain vigilant and report any suspicious activity.'
  },
  {
    id: '5',
    type: 'Harassment',
    location: 'North Davis Greenbelt',
    time: '4 days ago',
    date: getDaysAgo(4),
    description: 'Multiple reports of an individual harassing joggers and cyclists along the North Davis Greenbelt path.',
    severity: 'medium',
    details: 'Suspect described as male, late 20s, riding a blue mountain bike. Police have increased patrols in the area during peak exercise hours.',
    summary: 'Multiple harassment incidents reported along North Davis Greenbelt. Police have increased patrols during peak hours. The suspect is described as a male in his late 20s on a blue mountain bike. Residents are advised to exercise with companions when possible.'
  }
];

export async function GET() {
  return NextResponse.json(recentCrimes);
}