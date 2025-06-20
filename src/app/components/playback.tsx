'use client';

import { FaPlay, FaPause } from 'react-icons/fa';
import { IoPlayBack } from 'react-icons/io5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function Playback() {

    const [moment, setMoment] = useState(0);
    const [playing, setPlaying] = useState(false);

    function formatMomentWithColon(num: number): string {
        const str = num.toString().padStart(4, '0');
        return str.slice(0, 2) + ':' + str.slice(2); 
    }

    useEffect(() => {
        if (playing) {
            const interval = setInterval(() => {
                setMoment(prev => prev + 1);
            }, 1000); // Increment moment every second

            return () => clearInterval(interval);
        }
    }, [moment, playing])

    return(
        <div className="flex flex-col h-[10vh] border-t-2 justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-4">
                <IoPlayBack className="text-2xl" />
                <div className="w-[3vw] h-[2vw] bg-neutral-100 rounded-4xl flex justify-center items-center" onClick={() => setPlaying(!playing)}>
                    {playing ? <FaPause className="text-neutral-900" /> : <FaPlay className="text-neutral-900" />}
                </div>
                <IoPlayBack className="rotate-180 text-2xl" />
            </div>
            <div className="flex gap-4">
                <Label>{formatMomentWithColon(moment)}</Label>
                <Slider className="w-[24vw]" step={1} value={[moment]} onValueChange={(e) => setMoment(e[0] ? e[0] : moment)} />
            </div>
        </div>
    );
}