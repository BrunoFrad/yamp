'use client';

import { FaPlay, FaPause } from 'react-icons/fa';
import { IoPlayBack } from 'react-icons/io5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function Playback() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [playing, setPlaying] = useState(false);

    function formatMomentWithColon(min: number, sec: number): string {
        const minStr = min.toString().padStart(2, '0');
        const secStr = sec.toString().padStart(2, '0');
        return `${minStr}:${secStr}`;
    }

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev + 1 >= 60) {
                    setMinutes(m => m + 1);
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [playing]);

    const totalSeconds = minutes * 60 + seconds;
    const maxSeconds = 360;

    return (
        <div className="flex flex-col h-[10vh] border-t-2 justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-4">
                <IoPlayBack className="text-2xl" />
                <div
                    className="w-[3vw] h-[2vw] bg-neutral-100 rounded-4xl flex justify-center items-center cursor-pointer"
                    onClick={() => setPlaying(!playing)}
                >
                    {playing ? <FaPause className="text-neutral-900" /> : <FaPlay className="text-neutral-900" />}
                </div>
                <IoPlayBack className="rotate-180 text-2xl" />
            </div>
            <div className="flex gap-4">
                <Label>{formatMomentWithColon(minutes, seconds)}</Label>
                <Slider
                    className="w-[24vw]"
                    step={1}
                    max={maxSeconds}
                    value={[totalSeconds]}
                    onValueChange={([value]) => {
                        const v = value ?? 0;
                        setMinutes(Math.floor(v / 60));
                        setSeconds(v % 60);
                    }}
                />
            </div>
        </div>
    );
}