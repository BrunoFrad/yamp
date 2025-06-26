'use client';

import { FaPlay, FaPause } from 'react-icons/fa';
import { IoPlayBack } from 'react-icons/io5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useMusicPlaybackContext } from '../context/MusicPlaybackContext';
import { buildFormattedTimer } from '@/lib/buildFormatedTimer';

export default function Playback() {
    
    const { play, pause, isPlaying, currentTime, setTimer, currentSrc, setVolume, duration } = useMusicPlaybackContext();
    
    return (
        <>
            <div className="flex flex-col h-[10vh] border-t-2 justify-center items-center gap-2 w-full">
                <div className="flex justify-center items-center gap-4">
                    <IoPlayBack className="text-2xl" />
                    <div
                        className="w-[3vw] h-[2vw] bg-neutral-100 rounded-4xl flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            if (currentSrc === null) return;

                            if (isPlaying) pause();
                            else play();
                        }}
                    >
                        {isPlaying ? <FaPause className="text-neutral-900" /> : <FaPlay className="text-neutral-900" />}
                    </div>
                    <IoPlayBack className="rotate-180 text-2xl" />
                </div>
                <div className="flex gap-4">
                    <Label>{buildFormattedTimer(currentTime)}</Label>
                    <Slider
                        className="w-[24vw]"
                        step={1}
                        max={duration}
                        value={[currentTime]}
                        onValueChange={([value]) => setTimer(value)}
                    />
                </div>
            </div>
            <div className="absolute right-[2vw] bottom-[2.5vh] flex gap-4">
                <Label>Volume</Label>
                <Slider
                    className="w-[10vw]"
                    step={0.01}
                    max={1}
                    defaultValue={[1]}
                    onValueChange={([value]) => setVolume(value)}
                />
            </div>
        </>
    );
}