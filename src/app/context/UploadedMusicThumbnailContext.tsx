'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type UploadedMusicThumbnailType = {
    uploadedMusicThumbnail: File | undefined;
    setUploadedMusicThumbnail: (UploadedMusicThumbnailType: File | undefined) => void;
};

const UploadedMusicThumbnailContext = createContext<UploadedMusicThumbnailType | undefined>(undefined);

export function UploadedMusicThumbnailProvider({children} : {children : ReactNode}) {
    const [uploadedMusicThumbnail, setUploadedMusicThumbnail] = useState<File | undefined>(undefined);

    return(
        <UploadedMusicThumbnailContext.Provider value={{ uploadedMusicThumbnail, setUploadedMusicThumbnail}}>
            {children}
        </UploadedMusicThumbnailContext.Provider>
    );
}

export function useUploadedMusicThumbnailContext() {
    const context = useContext(UploadedMusicThumbnailContext);
    if (!context) throw new Error("Can not create the UploadedMusicThumbnailContext!");
    return context;
}