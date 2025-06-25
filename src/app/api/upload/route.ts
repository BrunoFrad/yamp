import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from './upload-file';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.formData();

    if (!data) {
        return NextResponse.json({ error: "No file was received" }, { status: 500 });
    }

    const file = data.get('file');
    if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: "No file was received or file is invalid" }, { status: 400 });
    }

    const thumbnail = data.get('thumbnail');
    if (!thumbnail || !(thumbnail instanceof File)) {
        return NextResponse.json({ error: "No file was received or file is invalid" }, { status: 400 });
    }

    const filePath = await uploadFile(file);
    const thumbnailPath = await uploadFile(thumbnail);
    const title = data.get('title');

    if (
        typeof title !== 'string' ||
        typeof filePath !== 'string' ||
        typeof thumbnailPath !== 'string'
        // || typeof playlist !== 'string' // Uncomment after implementing playlist system
    ) {
        return NextResponse.json({ error: "All args must be of the type string" }, { status: 400 });
    }

    await prisma.music.create({
        data: {
            title: title,
            url: filePath,
            thumbnail: thumbnailPath
        },
    });

    return NextResponse.json({ success: true});
}