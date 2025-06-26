import { buildFormattedTimer } from "@/lib/buildFormatedTimer";
import { Button } from "@/components/ui/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { useMusicPlaybackContext } from "../context/MusicPlaybackContext";

type Music = {
    title: string,
    thumbnail: string,
    file: string,
    duration: number,
}

export default function MusicCard(props: Music) {

    const { isPlaying, play, pause } = useMusicPlaybackContext();

    function handlePlay() {
        if (isPlaying)
            pause();
        else play(props.file);
    }

    return(
        <>
            <div className="flex items-center justify-between h-[14vh] w-full border-b-2">
                <div className="flex p-4">
                    <div className="flex items-center">
                        <div className="group flex justify-center items-center w-[10vh] h-[10vh] border-2 rounded-xl overflow-hidden relative">
                            <img src={props.thumbnail} />
                        </div>
                        <div className="px-6">
                            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">{props.title}</h2>
                            <h4 className="scroll-m-20 text-sm font-semibold tracking-tight text-neutral-300">Duration : {buildFormattedTimer(props.duration)} min</h4>
                        </div>
                    </div>
                </div>
                {!isPlaying ?
                    <Button className="mr-[3vw] w-[6vw]" onClick={handlePlay}><FaPlay/> Play</Button> :
                    <Button className="mr-[3vw] w-[6vw]" onClick={handlePlay}><FaPause/> Play</Button>
                }
            </div>
        </>
    );
}