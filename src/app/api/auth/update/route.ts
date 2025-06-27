import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/generated/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/sessionOptions";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    
    const {email, username} = await request.json();

    try {
        const response = NextResponse.json({message: "User updated sucessfully!"});
        const session = await getIronSession<UserSession>(request, response, sessionOptions);
        
        const user: User = await prisma.user.update({
            where: {
                email: session.email,
            },
            data: {
                name: (username !== null ? username : session.name),
                email: (email !== null ? email : session.email),
            }
        });

        session.name = user.name;
        session.email = user.email;
        await session.save();

        return response;
        
    } catch(error: unknown) {
        if (error instanceof Error) 
            return NextResponse.json({error: error.message}, {status: 500});
    }

}