import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
    const requestIncoming = await request.formData();
    const file: File | null = requestIncoming.get('file') as unknown as File;

    if (!file) {
        return new NextResponse("No file uploaded", { status: 400 });
    }

    console.log("File received:", file.name);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({message: "File uploaded successfully"});
}