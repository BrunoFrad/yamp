'use client';

import axios from "axios";
import MusicCard from "./components/music-card";
import Playback from "./components/playback";
import PlayerContainer from "./components/player-container";
import { useNavbarContext } from "@/app/context/NavbarContext";
import type { Music } from "@/app/api/music/route";
import { useEffect, useState } from "react";
import { MusicPlaybackProvider } from "./context/MusicPlaybackContext";

export default function Home() {
  const { musicQuery } = useNavbarContext();
  const [musics, setMusics] = useState<Music[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (musicQuery.length === 0) {
      setMusics(null);
      return;
    }
    setLoading(true);
    axios.post('/api/music', { query: musicQuery })
      .then(res => setMusics(res.data))
      .catch(() => setMusics([]))
      .finally(() => setLoading(false));

  }, [musicQuery]);

  return (
    <div className="flex flex-col h-full justify-end">
      <MusicPlaybackProvider>
        <div className="flex justify-center items-center h-full w-full">
          <PlayerContainer>
            {musicQuery.length === 0 ? (
              <>
                <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">You might search for some music now</h1>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-neutral-300">Your search results will appear in this box</h4>
              </>
            ) : loading ? (
              <h1 className="text-center scroll-m-20 text-5xl font-extrabold tracking-tight text-balance">Loading...</h1>
            ) : musics && musics.length === 0 ? (
              <>
                <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">Not founded any music</h1>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-neutral-300">We are sorry! Try to search for another one.</h4>
              </>
            ) : (
              <div className="w-full h-full">
                {musics?.map((music, index) => (
                  <MusicCard key={music.id} title={music.title} file={music.url} thumbnail={music.thumbnail} duration={music.duration ?? 0} index={index} />
                ))}
              </div>
            )}
          </PlayerContainer>
        </div>
        <Playback array={musics} />
      </MusicPlaybackProvider>
    </div>
  );
}