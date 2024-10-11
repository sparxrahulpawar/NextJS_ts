import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to check authentication
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const { pathname } = request.nextUrl;

    if (pathname === "/" && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/signup" && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const protectedRoutes = ["/", "/profile", "/settings"];
    const isProtectedRoute = protectedRoutes.includes(pathname);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

// Apply middleware to the appropriate routes
export const config = {
    matcher: ["/", "/signup", "/signin", "/profile", "/settings"],
};
