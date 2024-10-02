import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic Authentication işlemi
export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]!
    const [user, pwd] = atob(authValue).split(':')

    // Kullanıcı adı ve şifre doğrulama
    if (user === process.env.STUDIO_USER && pwd === process.env.STUDIO_PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Middleware'in hangi rotalara uygulanacağını belirtiyoruz
export const config = {
  matcher: ['/studio/:path*']}