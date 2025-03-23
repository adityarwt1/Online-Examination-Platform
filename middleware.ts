import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the requested URL is '/home'
  if (request.nextUrl.pathname === '/Home') {
    // Redirect to the root path '/'
    return NextResponse.redirect(new URL('/', request.url));
  }
  // Allow the request to proceed if it's not '/home'
  return NextResponse.next();
}
