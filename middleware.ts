import { auth } from "./auth"
import { NextRequest } from "next/server"


export default auth((req: NextRequest & { auth: any }) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthPage = nextUrl.pathname.startsWith("/login") || 
                     nextUrl.pathname.startsWith("/register");

  // Logic: If not logged in and trying to access a protected route
  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Logic: If logged in and trying to access login/register, go to dashboard
  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
})

export const config = {
  // This "matcher" ensures the middleware runs on all routes except static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}