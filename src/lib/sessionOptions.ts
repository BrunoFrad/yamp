import { SessionOptions } from "iron-session";

export type UserSession = {
    id: number,
    email: string
};

export const sessionOptions: SessionOptions = {
    cookieName: 'yamp_session',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
};