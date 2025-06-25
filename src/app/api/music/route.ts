import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export type Music = {
    id: number,
    title: string,
    url: string,
    thumbnail: string,
    playlistId?: number | null
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