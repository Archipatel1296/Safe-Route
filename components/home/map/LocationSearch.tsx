'use client';

import { StandaloneSearchBox } from '@react-google-maps/api';

interface LocationSearchProps {
  onLoad: (ref: any) => void;
  onPlacesChanged: () => void;
  placeholder: string;
}

export default function LocationSearch({ onLoad, onPlacesChanged, placeholder }: LocationSearchProps) {
  return (
    <StandaloneSearchBox
      onLoad={onLoad}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-black/60 border border-[#8e63cf]/40 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#671cd9]/50 placeholder-gray-400"
      />
    </StandaloneSearchBox>
  );
}