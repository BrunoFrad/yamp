'use client';

import { Button } from "@/components/ui/button";
import ContributeContainer from "../components/contribute-container";
import { useRef, useState } from "react";
import MusicUploader from "../components/thumb-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Contribute () {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [musicTitle, setMusicTitle] = useState<string | undefined>();
    const [musicDescription, setMusicDescription] = useState<string>("");
    const [file, setFile] = useState<File | undefined>();
    
    function handleAddMusicClick () {
        fileInputRef.current?.click();
    };

    function handleFileChange() {
        const selectedFile = fileInputRef.current?.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMusicTitle(selectedFile?.name.split('.')[0]);
        }
    }

    return(
        <>
            <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <div className="flex flex-col h-full justify-center items-center">
                {
                    !file ?
                        <ContributeContainer>
                            <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">Thanks by helping our web app</h1>
                            <Button onClick={handleAddMusicClick}>Add a new music file</Button>
                        </ContributeContainer>
                        :
                        <ContributeContainer >
                            <div className="flex gap-10">
                            <MusicUploader />
                            <div>
                                <div className="flex flex-col gap-4 py-4">
                                    <Label className="font-medium">Music Title</Label>
                                    <Input value={musicTitle} onChange={(e) => setMusicTitle(e.currentTarget.value)} className="w-[30vw]" />
                                </div>
                                <div className="flex flex-col gap-4 py-4">
                                    <Label className="font-medium">Music Description</Label>
                                    <Input className="w-[30vw]" value={musicDescription} onChange={(e) => setMusicDescription(e.currentTarget.value)} />
                                </div>
                                <div className="flex items-center h-[10vh] gap-4">
                                    <Button onClick={handleAddMusicClick}>Change File</Button>
                                    <Button>Finish</Button>
                                </div>
                            </div>
                            </div>
                        </ContributeContainer>
                }
            </div>
        </>
    );
}