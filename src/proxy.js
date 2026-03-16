import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES: If user is logged in, don't let them go back to login/signup
  const authRoutes = ['/signin', '/signup', '/forgotpassword', '/otp', '/newpassword'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. PROTECTED ROUTES: If no token, redirect to signin
  const protectedRoutes = ['/dashboard', '/conversations', '/leads', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

// Config remains the same for matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
