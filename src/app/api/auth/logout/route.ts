import { NextRequest, NextResponse } from "next/server";

import { getIronSession } from "iron-session";
import { sessionOptions  } from "@/lib/sessionOptions";

export async function POST(request: NextRequest) {
    const response = NextResponse.json({status: 200});

    const session = await getIronSession(request, response, sessionOptions);
    await session.destroy();

    return response;
}
