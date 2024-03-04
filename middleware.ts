import { NextResponse } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks(.*)'
  ],

  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (!auth.isApiRoute) {
        return redirectToSignIn({ returnBackUrl: req.url })
      } else if (req.url.startsWith('/api/webhooks')) {
        return NextResponse.next()
      } else {
        return NextResponse.json('Unauthorized', { status: 401 })
      }
    }
    
    return NextResponse.next()
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
