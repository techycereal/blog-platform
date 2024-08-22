// Example API route: /api/some-route
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const url = request.nextUrl.clone()   
    
    if (url.pathname === '/') {
      url.pathname = '/hello-nextjs'
      return NextResponse.redirect(url)   
    } 
}
