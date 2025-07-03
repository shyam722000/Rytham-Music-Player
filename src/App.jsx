import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import data from './data.json';

const App = () => {
  const [activeSongId, setActiveSongId] = useState(data[0]?.id || null); // Initialize with first song's ID
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('player'); // 'player' or 'sidebar'

  const handleSongSelect = (id) => {
    setActiveSongId(id);
    setIsPlaying(true);
    setActiveTab('player'); // Switch to player view
  };

  const handleNext = () => {
    const currentIndex = data.findIndex((song) => song.id === activeSongId);
    const nextIndex = (currentIndex + 1) % data.length;
    setActiveSongId(data[nextIndex].id);
    setIsPlaying(true);
  };

  // Find currentSongIndex for MusicPlayer based on activeSongId
  const currentSongIndex = data.findIndex((song) => song.id === activeSongId);

  return (
    <div
      className="h-screen text-white flex flex-col md:flex-row overflow-hidden"
      style={{
        background: "linear-gradient(to top, #0f0c29, #302b63, #0f0c29)",
      }}
    >
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-1/4">
        <Sidebar
          songs={data}
          onSongSelect={handleSongSelect}
          activeSongId={activeSongId}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {/* Header only on md+ */}
        <div className="hidden md:flex justify-between items-center mb-6 border-b border-white-700 pb-4">
          <h1 className="text-2xl font-bold discover">DISCOVER</h1>
          <input
            type="text"
            placeholder="Search artist, album..."
            className="p-2 rounded bg-gray-700"
          />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile view: Show based on tab */}
          <div className="block md:hidden">
            {activeTab === 'sidebar' ? (
              <Sidebar
                songs={data}
                onSongSelect={handleSongSelect}
                activeSongId={activeSongId}
              />
            ) : (
              <MusicPlayer
                songs={data}
                currentSongIndex={currentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleNext={handleNext}
              />
            )}
          </div>

          {/* Desktop view: always show MusicPlayer */}
          <div className="hidden md:block">
            <MusicPlayer
              songs={data}
              currentSongIndex={currentSongIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              handleNext={handleNext}
            />
          </div>
        </div>
      </div>

      {/* Bottom tabs on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-2 border-t border-gray-700 z-50">
        <button
          className={`flex-1 text-center p-2 ${activeTab === 'sidebar' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('sidebar')}
        >
          Playlist
        </button>
        <button
          className={`flex-1 text-center p-2 ${activeTab === 'player' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('player')}
        >
          Player
        </button>
      </div>
    </div>
  );
};

export default App;