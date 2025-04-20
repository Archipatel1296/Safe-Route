'use client';

import { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Info, ChevronUp, ChevronDown, Filter, Sparkles } from 'lucide-react';
import { mockCrimeUpdates } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function CrimeUpdates() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [generatingSummary, setGeneratingSummary] = useState<string | null>(null);
  
  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  
  const filteredUpdates = filter === 'all' 
    ? mockCrimeUpdates 
    : mockCrimeUpdates.filter(update => update.severity === filter);
  
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

  const generateSummary = async (crimeId: string) => {
    const crime = mockCrimeUpdates.find(c => c.id === crimeId);
    if (!crime) return;

    setGeneratingSummary(crimeId);
    
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crimeType: crime.type,
          location: crime.location,
          description: crime.description,
          details: crime.details,
          severity: crime.severity
        }),
      });

      const data = await response.json();
      
      if (data.summary) {
        setSummaries(prev => ({
          ...prev,
          [crimeId]: data.summary
        }));
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setGeneratingSummary(null);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#8e63cf]/30 bg-black/40 backdrop-blur-sm shadow-lg">
      <div className="p-4 bg-[#671cd9]/20 border-b border-[#8e63cf]/30 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-[#671cd9]" />
          Crime Updates Near You
        </h2>
        
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
      
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#671cd9] scrollbar-track-black/20">
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
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#8e63cf]" />
                          <h4 className="text-sm font-medium text-gray-200">AI Summary</h4>
                        </div>
                        
                        {summaries[crime.id] ? (
                          <p className="text-sm text-gray-300 bg-[#671cd9]/10 p-2 rounded">
                            {summaries[crime.id]}
                          </p>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-400">No summary available</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                generateSummary(crime.id);
                              }}
                              disabled={generatingSummary === crime.id}
                              className={cn(
                                "text-xs py-1 px-2 rounded flex items-center gap-1",
                                generatingSummary === crime.id
                                  ? "bg-[#671cd9]/30 cursor-wait"
                                  : "bg-[#671cd9]/40 hover:bg-[#671cd9]/60 transition-colors"
                              )}
                            >
                              {generatingSummary === crime.id ? (
                                <>
                                  <div className="animate-spin h-3 w-3 border-t-2 border-[#8e63cf] rounded-full mr-1"></div>
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3" />
                                  Generate Summary
                                </>
                              )}
                            </button>
                          </div>
                        )}
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
      
      <div className="p-3 bg-[#230a4e]/30 border-t border-[#8e63cf]/30 flex justify-center">
        <button className="text-sm py-1.5 px-4 rounded-md bg-[#671cd9]/40 hover:bg-[#671cd9]/60 transition-colors flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Report a Safety Concern</span>
        </button>
      </div>
    </div>
  );
}