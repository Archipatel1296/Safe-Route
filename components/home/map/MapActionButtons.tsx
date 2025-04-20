'use client';

import { AlertTriangle } from 'lucide-react';

interface MapActionButtonsProps {
  showCrimes: boolean;
  onToggleCrimes: () => void;
}

export default function MapActionButtons({ showCrimes, onToggleCrimes }: MapActionButtonsProps) {
  return (
    <div className="p-3 bg-[#230a4e]/30 border-t border-[#8e63cf]/30 flex justify-center">
      <button 
        className={`text-sm py-1.5 px-4 rounded-md transition-colors flex items-center gap-2 ${
          showCrimes ? 'bg-red-500/40 hover:bg-red-500/60' : 'bg-[#671cd9]/20 hover:bg-[#671cd9]/40'
        }`}
        onClick={onToggleCrimes}
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Toggle Crime Markers</span>
      </button>
    </div>
  );
}