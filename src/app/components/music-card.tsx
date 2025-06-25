import { useEffect, useRef, useState } from "react";
import { getDuration } from "@/lib/getDuration";
import { Button } from "@/components/ui/button";
import { FaPause, FaPlay } from "react-icons/fa";

type Music = {
    title: string,
    thumbnail: string,
    file: string
}

export default function MusicCard(props: Music) {

    const musicRef = useRef<HTMLAudioElement>(null);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    
    function handlePlay() {
        const audio = musicRef.current;

        if (audio) {
            if (!playing) {
                audio.volume = 0.2;
                audio.play();
                setPlaying(true);
            } else {
                audio.pause();
                setPlaying(false);
            }
        }
    }

    useEffect(() => {
        const audio = musicRef.current;

        if (audio) {
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }

        console.log(duration);

    }, []);

    return(
        <>
            <audio src={props.file} ref={musicRef} preload="metadata" className="hidden" ></audio>
            <div className="flex items-center justify-between h-[14vh] w-full border-b-2">
                <div className="flex p-4">
                    <div className="flex items-center">
                        <div className="group flex justify-center items-center w-[10vh] h-[10vh] border-2 rounded-xl overflow-hidden relative">
                            <img src={props.thumbnail} />
                        </div>
                        <div className="px-6">
                            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">{props.title}</h2>
                            <h4 className="scroll-m-20 text-sm font-semibold tracking-tight text-neutral-300">Duration : {getDuration(duration)} min</h4>
                        </div>
                    </div>
                </div>
                {!playing ?
                    <Button className="mr-[3vw] w-[6vw]" onClick={handlePlay}><FaPlay/> Play</Button> :
                    <Button className="mr-[3vw] w-[6vw]" onClick={handlePlay}><FaPause/> Play</Button>
                }
            </div>
        </>
    );
}