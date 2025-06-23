import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useUploadedMusicThumbnailContext } from "../context/UploadedMusicThumbnailContext";

export default function MusicUploader() {

    const { setUploadedMusicThumbnail } = useUploadedMusicThumbnailContext();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleAddThumbnail() {
        fileInputRef.current?.click();
    };
    
    function handleFileChange() {
        const selectedFile = fileInputRef.current?.files?.[0];
        if (selectedFile) {
            setUploadedMusicThumbnail(selectedFile);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    return(
        <>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <div className="group flex justify-center items-center w-[33vh] h-[33vh] border-2 rounded-xl overflow-hidden relative">
                {preview ? (
                    <>
                        <img
                            src={preview}
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                            className="w-full h-full object-cover"
                            alt="Preview"
                        />
                        <Button
                            onClick={handleAddThumbnail}
                            className="absolute hidden group-hover:flex"
                        >
                            Change Image
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleAddThumbnail}>Add Image</Button>
                )}
            </div>
        </>
    );

}