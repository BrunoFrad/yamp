import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export async function POST (request: NextRequest) {
    const {email, password} = await request.json();
    const name: string = email.split('@')[0];

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });

        return NextResponse.json({ status: 201 });
    } catch (error: any) {
        console.log(error.message);
 
        return NextResponse.json(
            {error : error.message},
            {status: 200}
        );
    }
}