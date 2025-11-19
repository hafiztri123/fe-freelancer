import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(path);

  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
