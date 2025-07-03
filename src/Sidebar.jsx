import React, { useState } from "react";
import logo from "./assets/whitelogo.png";
import "./Sidebar.css";

const Sidebar = ({ songs, onSongSelect, activeSongId }) => {
  const [filter, setFilter] = useState("All");

  const filteredSongs =
    filter === "All" ? songs : songs.filter((song) => song.category === filter);

  return (
    <div
      className="w-full text-white p-4 h-full flex flex-col shadow-[4px_0_10px_rgba(0,0,0,0.5)]"
      style={{
        background: "linear-gradient(to top, #0f0c29, #302b63, #0f0c29)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-4 w-full justify-center">
        <img
          src={logo}
          alt="Rythem Logo"
          className="w-28 h-18 md:w-28 md:h-18"
        />
      </div>

      {/* Playlist Header with Filters */}
      <div className="mb-4">
        <div className="flex items-center justify-between md:justify-start md:gap-4 mb-2">
          <div className="flex gap-2 ml-2">
            {["All", "Hindi", "Tamil", "Malayalam"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs px-2 py-1  rounded-full border cursor-pointer ${
                  filter === cat
                    ? "bg-white text-black"
                    : "text-gray-300 border-gray-500 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable songs list */}
      <ul className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
        {filteredSongs.map((song) => (
          <li
            key={song.id}
            onClick={() => onSongSelect(song.id)}
            className={`p-2 rounded-lg cursor-pointer border-b border-gray-700 transition duration-200 ease-in-out text-sm md:text-base ${
              song.id === activeSongId
                ? "bg-gray-600 text-white font-bold"
                : "hover:bg-gray-700"
            }`}
          >
            <div className="font-medium truncate">{song.name}</div>
            <div className="text-xs text-gray-400 truncate">{song.artist}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;