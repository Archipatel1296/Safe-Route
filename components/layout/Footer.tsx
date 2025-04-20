import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-[#8e63cf]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-[#671cd9]" />
              <span className="text-xl font-bold">Fortis</span>
            </div>
            <p className="text-gray-300 text-sm">
              Navigate safely with real-time crime data and secure route mapping. Always know the safest path to your destination.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/safe-route" className="text-gray-300 hover:text-white transition-colors">
                    Safe Route Mapping
                  </Link>
                </li>
                <li>
                  <Link href="/crime-heatmap" className="text-gray-300 hover:text-white transition-colors">
                    Crime Data Visualization
                  </Link>
                </li>
                <li>
                  <Link href="/peer-tracking" className="text-gray-300 hover:text-white transition-colors">
                    Friend Location Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="text-gray-300 hover:text-white transition-colors">
                    Safety Alerts
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#8e63cf]/30 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fortis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}