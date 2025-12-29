import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export { auth as middleware } from '@/auth'

export function middleware2(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value

  if (!accessToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/' // Redirect to login
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
