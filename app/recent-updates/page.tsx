'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Info, ChevronUp, ChevronDown, Filter, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CrimeUpdate {
  id: string;
  type: string;
  location: string;
  time: string;
  date: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  details?: string;
  summary: string;
}

export default function RecentUpdatesPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [crimeUpdates, setCrimeUpdates] = useState<CrimeUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentCrimes = async () => {
      try {
        const response = await fetch('/api/recent-crimes');
        const data = await response.json();
        setCrimeUpdates(data);
      } catch (error) {
        console.error('Error fetching recent crimes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCrimes();
  }, []);
  
  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  
  const filteredUpdates = filter === 'all' 
    ? crimeUpdates 
    : crimeUpdates.filter(update => update.severity === filter);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-white';
    }
  };
  
  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-400/20 border-green-400/30';
      case 'medium': return 'bg-yellow-400/20 border-yellow-400/30';
      case 'high': return 'bg-red-400/20 border-red-400/30';
      default: return 'bg-gray-400/20 border-gray-400/30';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
            Recent Crime Updates
          </h1>
          <div className="glass-effect rounded-xl p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#671cd9]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Recent Crime Updates
        </h1>
        
        <div className="mb-8 text-center text-gray-300">
          <p>
            Stay informed about recent safety incidents in your area.
            Updates from the past 5 days.
          </p>
        </div>

        <div className="glass-effect rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 bg-[#671cd9]/20 border-b border-[#8e63cf]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#671cd9]" />
              <h2 className="text-xl font-semibold">Last 5 Days</h2>
            </div>
            
            <div className="flex items-center">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm py-1 px-3 rounded-md hover:bg-[#671cd9]/30 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter: {filter === 'all' ? 'All' : filter}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#230a4e] border border-[#8e63cf]/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    {['all', 'low', 'medium', 'high'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFilter(option as any)}
                        className={cn(
                          "block w-full text-left px-4 py-2 text-sm",
                          filter === option ? 'bg-[#671cd9]/30' : 'hover:bg-[#671cd9]/20'
                        )}
                      >
                        {option === 'all' ? 'All Severities' : `${option.charAt(0).toUpperCase() + option.slice(1)} Severity`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#671cd9] scrollbar-track-black/20">
            {filteredUpdates.length > 0 ? (
              <ul className="divide-y divide-[#8e63cf]/20">
                {filteredUpdates.map((crime) => (
                  <li 
                    key={crime.id} 
                    className={cn(
                      "p-4 transition-colors duration-200 hover:bg-[#671cd9]/10",
                      expandedItem === crime.id ? "bg-[#671cd9]/10" : ""
                    )}
                  >
                    <div 
                      className="flex justify-between items-start cursor-pointer"
                      onClick={() => toggleItem(crime.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn("p-2 rounded-lg", getSeverityBg(crime.severity))}>
                          <AlertTriangle className={cn("w-5 h-5", getSeverityColor(crime.severity))} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{crime.type}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                            <div className="flex items-center">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-[#8e63cf]" />
                              {crime.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3.5 h-3.5 mr-1 text-[#8e63cf]" />
                              {crime.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="text-[#8e63cf] p-1 rounded-full hover:bg-[#671cd9]/20">
                        {expandedItem === crime.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {expandedItem === crime.id && (
                      <div className="mt-3 pl-10 pr-2 animate-in slide-in-from-top-2 duration-200">
                        <div className="p-3 rounded-lg bg-[#230a4e]/40 border border-[#8e63cf]/20">
                          <div className="flex items-start gap-2 mb-2">
                            <Info className="w-4 h-4 text-[#8e63cf] mt-1" />
                            <p className="text-sm text-gray-300">{crime.description}</p>
                          </div>
                          
                          <div className="mt-3 border-t border-[#8e63cf]/20 pt-3">
                            <p className="text-sm text-gray-300 bg-[#671cd9]/10 p-2 rounded">
                              {crime.summary}
                            </p>
                          </div>
                          
                          <div className="flex justify-end mt-3">
                            <button 
                              className="text-xs py-1 px-2 rounded bg-[#671cd9]/30 hover:bg-[#671cd9]/50 transition-colors text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View on Map
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-[#671cd9]/50" />
                <p>No crime updates match your filter</p>
                <button 
                  onClick={() => setFilter('all')}
                  className="mt-3 text-sm text-[#671cd9] hover:underline"
                >
                  Show all updates
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}