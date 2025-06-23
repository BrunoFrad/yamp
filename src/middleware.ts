import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "./lib/sessionOptions";

export default async function middleware(request: NextRequest) {
    const session = await getIronSession<UserSession>(request, NextResponse.next(), sessionOptions);
    const pathname: NextURL = request.nextUrl;
    
    if (session?.id && (pathname.pathname === "/login" || pathname.pathname === "/signup"))
        return NextResponse.redirect(new URL('/', request.url));
    else if (!session.id && (pathname.pathname === "/" || pathname.pathname === "/contribute"))
        return NextResponse.redirect(new URL('/login', request.url));
        
}