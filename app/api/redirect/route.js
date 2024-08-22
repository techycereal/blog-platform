// Example API route: /api/some-route
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    // Perform a 307 redirect to the root ('/')
    return NextResponse.redirect(new URL('/', request.url), 308);
}
