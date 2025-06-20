import { NextRequest, NextResponse } from "next/server";

import { getIronSession } from "iron-session";
import { UserSession, sessionOptions } from "@/lib/sessionOptions";

export async function GET(request: NextRequest) {
    const session = await getIronSession<UserSession>(request, NextResponse.next(), sessionOptions);

    if (!session.id) {
        return NextResponse.json({ error: "No user session found" }, { status: 401 });
    }

    return NextResponse.json({ cookies: session }, { status: 200 });
}