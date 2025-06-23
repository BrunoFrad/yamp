import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadFile(file: File) {

    if (!file) return new Error("Request with no file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return filePath;
}