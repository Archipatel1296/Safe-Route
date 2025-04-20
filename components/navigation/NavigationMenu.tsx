'use client';

import { MapPin, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const navItems = [
  {
    name: 'Safe Route Mapping',
    href: '/',
    icon: MapPin,
  },
  {
    name: 'Crime Heatmap',
    href: '/crime-heatmap',
    icon: AlertTriangle,
  },
  {
    name: 'Peer-Location Tracking',
    href: '/peer-tracking',
    icon: Users,
  },
];

export default function NavigationMenu({ isMobile = false, onItemClick }: NavigationMenuProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex", isMobile ? "flex-col space-y-4" : "space-x-6")}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center transition-all duration-200 px-3 py-2 rounded-md",
              isMobile ? "text-base" : "text-sm",
              isActive 
                ? "bg-[#671cd9]/20 text-white font-medium" 
                : "hover:bg-[#671cd9]/10 text-gray-300 hover:text-white"
            )}
          >
            <item.icon className={cn("mr-2", isMobile ? "w-5 h-5" : "w-4 h-4")} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}