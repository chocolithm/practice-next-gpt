'use server';

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    id: string;
    name: string;
}

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodeKey);
}

export const verify = async (session: string | undefined = "") => {
    try {
        const { payload } = await jwtVerify<SessionPayload>(session, encodeKey, {
            algorithms: ['HS256']
        });

        return payload;
    } catch(error) {
        console.log('error', error);
    }
}

export const createSession = async (payload: SessionPayload) => {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt(payload);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })
}

export const deleteSession = async () => {
    cookieStore.delete("session");
}

export const verifySession = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await verify(cookie);

    if (!session?.id) {
        redirect("/login");
    }

    return session;
}