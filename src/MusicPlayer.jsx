import React, { useRef, useEffect, useState } from "react";
import {
  FaRandom,
  FaStepBackward,
  FaPlay,
  FaPause,
  FaStepForward,
  FaRedo,
} from "react-icons/fa";

const MusicPlayer = ({
  songs,
  currentSongIndex,
  isPlaying,
  setIsPlaying,
  handleNext,
}) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const backgroundImage = songs[currentSongIndex]?.image;

  return (
    <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden text-white">
      {/* Diagonal image area (top-left triangle) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
          clipPath: "polygon(0 0, 100% 0, 0% 100%)", // top-left triangle
        }}
      ></div>

      {/* Diagonal content area (bottom-right triangle) */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm clip-bottom-right flex flex-col items-center justify-center p-6">
        <audio ref={audioRef} src={songs[currentSongIndex]?.song} />

        <div className="mb-4 text-sm text-gray-200 uppercase tracking-widest bg-black/50 px-3 py-1 rounded">
          Now Playing
        </div>

        <div className="text-center mb-6 bg-black/40 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">
            {songs[currentSongIndex]?.name}
          </h2>
          <p className="text-sm text-gray-300">
            {songs[currentSongIndex]?.artist}
          </p>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <button className="text-gray-200 hover:text-white">
            <FaRandom size={20} />
          </button>
          <button className="text-gray-200 hover:text-white">
            <FaStepBackward size={20} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button onClick={handleNext} className="text-gray-200 hover:text-white">
            <FaStepForward size={20} />
          </button>
          <button className="text-gray-200 hover:text-white">
            <FaRedo size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-200 bg-black/50 px-3 py-1 rounded">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
