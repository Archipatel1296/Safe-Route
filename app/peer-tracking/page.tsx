'use client';

import { useState, useEffect } from 'react';
import { Users, UserPlus, Bell, Share2, Shield, Settings } from 'lucide-react';

const demoFriends = [
  { id: '1', name: 'Sarah Johnson', lastUpdate: '2 mins ago' },
  { id: '2', name: 'Mike Chen', lastUpdate: '5 mins ago' },
  { id: '3', name: 'Alex Kumar', lastUpdate: '1 min ago' },
];

export default function PeerTrackingPage() {
  const [activeTab, setActiveTab] = useState('friends');
  const [showDemo, setShowDemo] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDemo(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center gradient-text">
          Peer-Location Tracking
        </h1>
        
        <div className="mb-8 text-center text-gray-300">
          <p>
            Share your location with trusted friends and family for additional safety.
            Get real-time updates on your peers' locations when traveling in unfamiliar areas.
          </p>
        </div>
        
        <div className="glass-effect rounded-xl shadow-lg mb-8 overflow-hidden purple-glow">
          <div className="flex border-b border-[#8e63cf]/30">
            <button 
              className={`flex-1 py-3 px-4 text-center flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'friends' ? 'bg-[#671cd9]/30 text-white' : 'text-gray-300 hover:bg-[#671cd9]/10'
              }`}
              onClick={() => setActiveTab('friends')}
            >
              <Users className="w-5 h-5" />
              <span>Friends</span>
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'invites' ? 'bg-[#671cd9]/30 text-white' : 'text-gray-300 hover:bg-[#671cd9]/10'
              }`}
              onClick={() => setActiveTab('invites')}
            >
              <UserPlus className="w-5 h-5" />
              <span>Invites</span>
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'settings' ? 'bg-[#671cd9]/30 text-white' : 'text-gray-300 hover:bg-[#671cd9]/10'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'friends' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Trusted Friends</h3>
                  <button className="glass-button rounded-md py-1 px-3 text-sm flex items-center gap-1 purple-glow-hover">
                    <UserPlus className="w-4 h-4" />
                    <span>Add Friend</span>
                  </button>
                </div>
                
                {!showDemo ? (
                  <div className="glass-effect rounded-lg p-4 mb-4 text-center">
                    <Users className="w-12 h-12 mx-auto text-[#671cd9]/50 mb-2" />
                    <p className="text-gray-300">Loading friends...</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-4">
                    {demoFriends.map(friend => (
                      <div key={friend.id} className="glass-effect rounded-lg p-4 hover-glass-effect">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#671cd9]/20 flex items-center justify-center">
                              <Users className="w-6 h-6 text-[#671cd9]" />
                            </div>
                            <div>
                              <h4 className="font-medium">{friend.name}</h4>
                              <p className="text-sm text-gray-400">Last updated {friend.lastUpdate}</p>
                            </div>
                          </div>
                          <button className="glass-button text-sm py-1 px-3 rounded-md purple-glow-hover">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'invites' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Location Sharing Invites</h3>
                  <button className="glass-button rounded-md py-1 px-3 text-sm flex items-center gap-1 purple-glow-hover">
                    <Share2 className="w-4 h-4" />
                    <span>Send Invite</span>
                  </button>
                </div>
                
                <div className="glass-effect rounded-lg p-4 text-center">
                  <Bell className="w-12 h-12 mx-auto text-[#671cd9]/50 mb-2" />
                  <p className="text-gray-300">No pending invites.</p>
                  <p className="text-sm text-gray-400 mt-1">When you receive an invite, it will appear here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <h3 className="font-medium mb-4">Location Sharing Settings</h3>
                
                <div className="space-y-4">
                  <div className="glass-effect p-4 rounded-lg hover-glass-effect">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-[#671cd9]" />
                        <div>
                          <h4 className="font-medium">Location Sharing</h4>
                          <p className="text-sm text-gray-300">Allow friends to see your current location</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#230a4e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#671cd9]"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="glass-effect p-4 rounded-lg hover-glass-effect">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6 text-[#671cd9]" />
                        <div>
                          <h4 className="font-medium">Safety Alerts</h4>
                          <p className="text-sm text-gray-300">Send alerts when entering high-risk areas</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-[#230a4e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#671cd9]"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="glass-effect p-4 rounded-lg hover-glass-effect">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-[#671cd9]" />
                        <div>
                          <h4 className="font-medium">Location History</h4>
                          <p className="text-sm text-gray-300">Save my location history for 30 days</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#230a4e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#671cd9]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}