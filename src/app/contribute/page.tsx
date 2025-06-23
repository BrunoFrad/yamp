'use client';

import { Button } from "@/components/ui/button";
import ContributeContainer from "../components/contribute-container";
import { useRef, useState } from "react";
import MusicUploader from "../components/thumb-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import { UploadedMusicThumbnailProvider, useUploadedMusicThumbnailContext } from "../context/UploadedMusicThumbnailContext";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Contribute () {
    return(
        <UploadedMusicThumbnailProvider>
            <ContributeContent />
        </UploadedMusicThumbnailProvider>
    );
}

function ContributeContent() {
    const { uploadedMusicThumbnail } = useUploadedMusicThumbnailContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [musicTitle, setMusicTitle] = useState<string | undefined>();
    const [addToPlaylist, setAddToPlaylist] = useState(false);
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

    async function handleUpload() {

        if (!musicTitle || !file || !uploadedMusicThumbnail) throw new Error("Missed some music upload requiremment.");

        const formData = new FormData();
        formData.append('title', musicTitle);
        formData.append('thumbnail', uploadedMusicThumbnail as Blob);
        formData.append('file', file as Blob);
        if (addToPlaylist) formData.append('playlist', "public");

        await axios.post('/api/upload', formData).catch((error) => console.log(error));
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
                                <div className="flex flex-col h-full justify-center">
                                    <div className="flex flex-col gap-4">
                                        <Label className="font-medium">Music Title</Label>
                                        <Input value={musicTitle} onChange={(e) => setMusicTitle(e.currentTarget.value)} className="w-[30vw]" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4 pt-8 items-center">
                                            <Label className="font-medium">Add to a Playlist</Label>
                                            <Switch checked={addToPlaylist} onCheckedChange={(e) => setAddToPlaylist(e)} />
                                        </div>
                                        {
                                            !addToPlaylist &&
                                            <Alert variant="default" className="w-[20vw]">
                                                <AlertDescription className="text-neutral-200">
                                                    Not checking this toogle makes your music public.
                                                </AlertDescription>
                                            </Alert>
                                        }
                                    </div>
                                    <div className="flex items-center h-[10vh] gap-4">
                                        <Button onClick={handleAddMusicClick}>Change File</Button>
                                        <Button onClick={handleUpload}>Finish</Button>
                                    </div>
                                </div>
                            </div>
                        </ContributeContainer>
                }
            </div>
        </>
    );
}