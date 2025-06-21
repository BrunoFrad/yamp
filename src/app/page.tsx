'use client';

import Playback from "./components/playback";
import PlayerContainer from "./components/player-container";
import { useMusicQueryContext } from "@/app/context/MusicQueryContext";

export default function Home() {

  const { musicQuery } = useMusicQueryContext();

  return (
   <div className="flex flex-col h-full justify-end">
      <div className="flex justify-center items-center h-full w-full">
        <PlayerContainer>
          {
            musicQuery.length > 0 ?
              <h1>{musicQuery}</h1> :
            <>
              <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">You might search for some music now</h1>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-neutral-300">Your search results will appear in this box</h4> 
            </>
          }
        </PlayerContainer>
      </div>
      <Playback />
   </div>
  );
}
