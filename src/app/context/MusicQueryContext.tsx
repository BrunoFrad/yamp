'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MusicQueryContext = {
  musicQuery: string;
  setMusicQuery: (music: string) => void;
};

const MusicQueryContext = createContext<MusicQueryContext | undefined>(undefined);

export function MusicQueryProvider({ children }: { children: ReactNode }) {
  const [musicQuery, setMusicQuery] = useState("");

  return (
    <MusicQueryContext.Provider value={{ musicQuery, setMusicQuery }}>
      {children}
    </MusicQueryContext.Provider>
  );
}

export function useMusicQueryContext() {
  const context = useContext(MusicQueryContext);
  if (!context) throw new Error('useMusicQueryContext must be used within MusicQueryProvider');
  return context;
}