const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Ensure all responses are JSON
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
}

// Calculate weighted crime impact based on severity and distance
function calculateCrimeImpact(crime, point, maxDistance = 200) {
  const distance = calculateDistance(
    crime.location.latitude || crime.location.lat,
    crime.location.longitude || crime.location.lng,
    point.lat,
    point.lng
  );
  
  if (distance > maxDistance) return 0;
  
  const severityWeight = {
    high: 1,
    medium: 0.6,
    low: 0.3
  }[crime.severity] || 0.5;
  
  // Impact decreases exponentially with distance
  const distanceImpact = Math.exp(-distance / maxDistance);
  return severityWeight * distanceImpact;
}

app.post('/analyzeRoute', async (req, res) => {
  try {
    const { routes } = req.body;

    if (!Array.isArray(routes)) {
      return res.status(400).json({
        success: false,
        error: 'Routes must be an array',
        analysis: []
      });
    }

    // Fetch all crimes from Firestore
    const crimesSnapshot = await db.collection('Crimes').get();
    const crimes = crimesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Analyze each route
    const analysis = routes.map(route => {
      let totalImpact = 0;
      let maxImpact = 0;
      
      // Calculate crime impact for each point along the route
      route.forEach(point => {
        const pointImpact = crimes.reduce((sum, crime) => {
          return sum + calculateCrimeImpact(crime, point);
        }, 0);
        
        totalImpact += pointImpact;
        maxImpact = Math.max(maxImpact, pointImpact);
      });
      
      // Normalize impact to calculate safety score (0-100)
      const averageImpact = totalImpact / route.length;
      const safetyScore = Math.max(0, Math.min(100, 100 * (1 - averageImpact)));

      return {
        safetyScore,
        maxImpact,
        crimeHotspots: crimes.filter(crime => 
          route.some(point => calculateCrimeImpact(crime, point) > 0.5)
        ).map(crime => ({
          type: crime.type,
          severity: crime.severity,
          location: crime.location
        }))
      };
    });

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Route analysis error:', error);
    // Ensure we always return a valid JSON response
    res.status(500).json({
      success: false,
      error: 'Failed to analyze routes',
      analysis: []
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});