import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/sessionOptions";

const prisma = new PrismaClient();

export async function POST (request: NextRequest) {
    const { email, password} =  await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
        return NextResponse.json(
            {error: "User not found"},
            {status: 201}
        );

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
        return NextResponse.json(
            {error: "Password is not valid"},
            {status: 201}
        );
    
    const response = NextResponse.json({status: 200});
    const session = await getIronSession<UserSession>(request, response, sessionOptions);
    session.id = user.id;
    session.email = user.email;
    await session.save();

    return response;
}