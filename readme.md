# Fortis: Be Fearless

**Fortis** is a real-time, safety-first navigation web app designed to help users make informed travel decisions by mapping crime-aware walking routes and visualizing nearby incident data.

---

## 🚀 Inspiration

Traditional navigation apps prioritize speed—not safety. In cities like San Jose, pedestrians (like us) often pass through high-crime areas unknowingly. We built **Fortis** to bridge that gap: providing smarter, safer routes, especially during late hours or in unfamiliar areas.

---

## 🔍 What It Does

Fortis empowers users by providing:

- 📍 Crime-aware walking routes between two points
- 🧭 Color-coded paths based on safety (Green = Safe, Red = Risky)
- 🔥 Crime heatmap overlays using real-time data
- 🧑‍🤝‍ Peer location sharing (mocked for demo)
- 🔎 Filtering options by crime type and time range
- 🌙 A sleek, night-mode UI optimized for dark environments

---

## 🛠️ How We Built It

**Tech Stack:**

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore (GeoFire for geolocation indexing)
- **Maps & APIs:**
  - Google Maps via `@react-google-maps/api`
  - Directions API for routing
  - Places API for autocomplete
- **Algorithm:**
  - Route scoring using the Haversine formula and crime severity weights
- **Mock Features:**
  - Peer tracking with toggle states
- **Tools:**
  - Vercel V0 and Bolt.new for low-code frontend scaffolding

---

## ⚠️ Challenges

- 🗺️ Navigating and customizing the Google Maps API
- 🧠 Designing an efficient and accurate route analysis algorithm
- 🌐 Handling geolocation permissions and fallbacks
- 📱 Ensuring performance and responsiveness across devices

---

## 🏆 Accomplishments

- Built a fully-functional crime-aware route planner
- Developed a clean, dark-themed UI with Tailwind and shadcn/ui
- Implemented crime heatmaps with intuitive filtering
- Created modular and scalable TypeScript components
- Mocked a real-time peer tracking system

---

## 📚 What We Learned

- Mastery of Google Maps and Google Cloud tools
- Firebase Firestore for storing and querying geospatial data
- Prioritizing UX in safety-critical apps
- Structuring codebases for modularity and scalability
- Robust error handling for real-time services

---

## 📈 What's Next

- 🔔 Real-time push crime alerts
- 🤖 Gemini integration for AI-generated incident summaries
- 👥 Firebase Realtime Database for live peer tracking
- 🗃️ Expand crime data coverage to other cities
- 🛠️ Admin dashboard for verified incident reporting
- 🧪 A/B testing on safety algorithm improvements
- 🔐 Firebase Auth for saved user preferences

---

## 💡 Final Thoughts

**Fortis** isn't just a map—it's peace of mind.  
We're building a world where safety is a standard, not an option.

> Be Fearless. Choose Fortis.
