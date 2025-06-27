'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type NavbarType = {
  musicQuery: string;
  username: string;
  setMusicQuery: (music: string) => void;
  setUsername: (name: string) => void;
};

const NavbarContext = createContext<NavbarType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [musicQuery, setMusicQuery] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  return (
    <NavbarContext.Provider value={{ musicQuery, username, setMusicQuery, setUsername }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error('useNavbarContext must be used within NavbarProvider');
  return context;
}