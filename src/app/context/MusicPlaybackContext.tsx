'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MusicPlaybackContextType {
  play: (src?: string) => void;
  pause: () => void;
  setTimer: (seconds: number) => void;
  setVolume: (value: number) => void;
  setCurrentIndex: (value: number) => void;
  duration: number;
  isPlaying: boolean;
  currentSrc: string | null;
  currentTime: number;
  currentIndex: number;
}

const MusicPlaybackContext = createContext<MusicPlaybackContextType | undefined>(undefined);

export const MusicPlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      if (duration <= currentTime) setCurrentTime(0);
      
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentTime, duration, isPlaying]);

  const play = (src?: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (src && src !== currentSrc) {
      audioRef.current.src = `/api/music?name=${src}&type=audio`;
      setCurrentSrc(src);
      setCurrentTime(0);
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setTimer = (seconds: number) => {
    if (audioRef.current === null) return;

      setCurrentTime(seconds);
      audioRef.current.currentTime = seconds;
  };

  const setVolume = (value: number) => {
    if (audioRef.current === null) return;
    audioRef.current.volume = value;
  }

  return (
    <MusicPlaybackContext.Provider value={{ play, pause, isPlaying, setTimer, setVolume, duration, currentSrc, currentTime, setCurrentIndex, currentIndex }}>
      {children}
    </MusicPlaybackContext.Provider>
  );
};

export const useMusicPlaybackContext = () => {
  const context = useContext(MusicPlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};