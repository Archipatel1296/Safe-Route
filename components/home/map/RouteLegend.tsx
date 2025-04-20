'use client';

interface DirectionWithColor extends google.maps.DirectionsResult {
  color: string;
}

interface RouteLegendProps {
  visible: boolean;
  routes: DirectionWithColor[];
}

export default function RouteLegend({ visible, routes }: RouteLegendProps) {
  if (!visible || !routes.length) return null;

  return (
    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-[#8e63cf]/30 z-10">
      <h4 className="text-sm font-medium mb-2">Route Safety</h4>
      <div className="space-y-2">
        {routes.map((route, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-1 rounded-full" 
              style={{ backgroundColor: route.color }}
            />
            <span className="text-xs">
              {index === 0 ? 'Safest Route' : `Alternative ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}