import { NextRequest, NextResponse } from "next/server";

import type { User } from "@/generated/prisma";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/sessionOptions";
const prisma = new PrismaClient();

export async function POST (request: NextRequest) {
    const {email, password} = await request.json();
    const name: string = email.split('@')[0];

    try {
        const hashedPassword: string = await bcrypt.hash(password, 10);

        const user: User = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });

        const response = NextResponse.json({status: 200});
        const session = await getIronSession<UserSession>(request, response, sessionOptions);
        session.id = user.id;
        session.email = user.email;
        session.name = user.name;
        await session.save();

        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json(
                {error : error.message},
                {status: 201}
            );
    }
}