'use client';

import { Shield, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-12">
            <Shield className="w-24 h-24 mx-auto text-[#671cd9] mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              Navigate Safely with Fortis
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Real-time crime data visualization and secure route mapping to ensure 
              you always take the safest path to your destination.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/safe-route"
              className="glass-effect rounded-lg py-4 px-8 flex items-center justify-center gap-3 hover:bg-[#671cd9]/20 purple-glow-hover text-lg"
            >
              <MapPin className="w-6 h-6" />
              Find Safe Routes
            </Link>
            <Link
              href="/crime-heatmap"
              className="glass-effect rounded-lg py-4 px-8 flex items-center justify-center gap-3 hover:bg-black/50 purple-glow-hover text-lg border border-[#8e63cf]/30"
            >
              <Search className="w-6 h-6" />
              View Crime Map
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-8 hover-glass-effect purple-glow-hover">
              <div className="bg-[#671cd9]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-[#671cd9]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Safe Route Mapping</h3>
              <p className="text-gray-300 text-lg">
                Find the safest path to your destination with color-coded routes based on real-time crime data.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 hover-glass-effect purple-glow-hover">
              <div className="bg-[#671cd9]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-[#671cd9]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Crime Heatmap</h3>
              <p className="text-gray-300 text-lg">
                Visualize crime patterns in your area with detailed heatmaps and filter by crime type and time range.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 hover-glass-effect purple-glow-hover">
              <div className="bg-[#671cd9]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#671cd9]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Peer Location Tracking</h3>
              <p className="text-gray-300 text-lg">
                Share your location with trusted friends and family for added safety and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Crime Updates */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Recent Crime Updates</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-6 hover-glass-effect">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Theft</h3>
                  <p className="text-gray-400">Downtown, 5th Avenue</p>
                </div>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
              <p className="text-gray-300">Bicycle theft reported outside the central library.</p>
            </div>

            <div className="glass-effect rounded-xl p-6 hover-glass-effect">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Vandalism</h3>
                  <p className="text-gray-400">West Park</p>
                </div>
                <span className="text-sm text-gray-400">6 hours ago</span>
              </div>
              <p className="text-gray-300">Graffiti on public property near the main entrance.</p>
            </div>

            <div className="glass-effect rounded-xl p-6 hover-glass-effect">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Robbery</h3>
                  <p className="text-gray-400">East Side Mall</p>
                </div>
                <span className="text-sm text-gray-400">1 day ago</span>
              </div>
              <p className="text-gray-300">Robbery at a convenience store at the east entrance.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/crime-heatmap"
              className="glass-effect rounded-lg py-3 px-6 inline-flex items-center justify-center hover:bg-[#671cd9]/20 purple-glow-hover"
            >
              View All Crime Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center bg-black/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Stay Safe with Fortis</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who navigate their city with confidence using real-time safety information.
          </p>
          <Link
            href="/safe-route"
            className="glass-button rounded-lg py-4 px-8 inline-flex items-center justify-center gap-2 hover:bg-[#671cd9]/40 purple-glow-hover text-lg"
          >
            Start Navigating Safely
          </Link>
        </div>
      </section>
    </div>
  );
}