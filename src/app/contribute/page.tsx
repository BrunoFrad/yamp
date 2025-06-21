'use client';

import { Button } from "@/components/ui/button";
import ContributeContainer from "../components/contribute-container";
import { useRef, useState } from "react";
import axios from "axios";

export default function Contribute () {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | undefined>();
    
    function handleAddMusicClick () {
        fileInputRef.current?.click();
    };

    function handleFileChange() {
        const selectedFile = fileInputRef.current?.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
            {!file ? 
                <div className="flex flex-col h-full justify-center items-center">
                    <ContributeContainer>
                        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">Thanks by helping our web app</h1>
                        <Button onClick={handleAddMusicClick}>Add a new music file</Button>
                    </ContributeContainer>
                </div> :
                <></>
            }
        </>
    );
}