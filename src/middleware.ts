import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
const protectedRoutes = ['/feed/', '/profile', '/stats'];
const publicRoutes = ['/', '/login', '/signup'];
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const loginurl = new URL('/login', req.url);
    if (
        !token &&
        req.nextUrl.pathname !== '/login' &&
        req.nextUrl.pathname !== '/signup' &&
        req.nextUrl.pathname !== '/'
    ) {
        console.log('redirecting to login');
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
    if (isPublicRoute && token && req.nextUrl.pathname !== '/login') {
        console.log('redirecting to feed');

        return NextResponse.redirect(new URL('/feed', req.url));
    }
    const isPrivateRoute = protectedRoutes.includes(req.nextUrl.pathname);
    if (isPrivateRoute && !token) {
        console.log('isPrivate redirecting to login ');
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
