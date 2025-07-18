import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { redirect } from 'next/navigation';
import { NextURL } from 'next/dist/server/web/next-url';
const protectedRoutes = ['/feed/', '/profile', '/stats'];
const publicRoutes = ['/', '/login', '/signup'];
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const loginurl = new URL('/login', req.url);
    if (!token && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/feed', req.url));
    }
    const isPrivateRoute = protectedRoutes.includes(req.nextUrl.pathname);
    if (isPrivateRoute && !token) {
        return NextResponse.redirect(loginurl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/feed/:path*',
        '/profile/:path*',
        '/stats/:path*',
        '/create-blog/:path*',
    ],
};
