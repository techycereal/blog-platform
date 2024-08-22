// Example API route: /api/some-route
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Continue processing if authenticated
  return NextResponse.redirect(new URL('/', request.url))
}
