import { NextResponse, type NextRequest } from 'next/server'

import { APP_ROUTES, RESOURCES_ROUTES } from './config/routes'
import { normalizePath } from './utils/commom.util'
import { isTokenExpired } from './utils/token.util'

export function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname)
  const accessToken = request.cookies.get('accessToken')?.value

  const isValidAccessToken = accessToken && !isTokenExpired(accessToken)

  // if ([...RESOURCES_ROUTES].includes(pathname) && !isValidAccessToken) {
  //   return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.nextUrl.origin))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!.+\\.[\\w]+$|_next|api).*)', '/(trpc)(.*)'],
}
