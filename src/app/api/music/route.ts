import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import {readFile} from "node:fs/promises";

const prisma = new PrismaClient();

export type Music = {
    id: number,
    title: string,
    url: string,
    thumbnail: string,
    playlistId?: number | null,
    duration: number
};

export async function POST(request: NextRequest) {
    const { query } = await request.json();

    const numberOfMusics: number = 5;

    if (!query && typeof query !== "string")
        return NextResponse.json({error: "Invalid query"},{status: 500});

    const result: Music[] = await prisma.music.findMany({
        where: {
            title: {
                startsWith: query,
                mode: "insensitive"
            }
        },
        take: numberOfMusics
    });

    return NextResponse.json(result);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('name');
    const type = searchParams.get('type');

    if (!filename) {
        return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
    }

    if (type != "thumbnail" && type != "audio") {
        return NextResponse.json({ error: 'Missing valid type' }, { status: 400 });
    }

    try {
        const fileBuffer = await readFile(filename)

        if (!filename.startsWith("/usr/src/app/uploads/music"))
            return NextResponse.json({ error: 'Access Denied' }, { status: 403 });

        const ext = path.extname(filename).toLowerCase();
        let contentType: string | null = null

        if (type === "thumbnail") {
            switch (ext) {
                case ".png":
                    contentType = "image/png";
                    break;
                case ".jpg":
                case ".jpeg":
                    contentType = "image/jpeg"
                    break;
                case ".webp":
                    contentType = "image/webp";
                    break;
            }
        }
        else {
            switch (ext) {
                case ".mp3":
                    contentType = "audio/mpeg";
                    break;
                case ".wav":
                    contentType = "audio/wav"
                    break;
            }
        }

        if (!contentType)
            return NextResponse.json({ error: 'Invalid file extension' }, { status: 400 });

        return new NextResponse(fileBuffer, {
            headers: { 'Content-Type': contentType },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
}