// /pages/api/logout.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
export const dynamic = 'force-dynamic'
export async function GET(request) {
  
  // Clear the cache for the user
  const userCache = new Map();
  userCache.clear()
  cookies().delete('userUid')
  cookies().delete('authToken')
  cookies().delete('sessionid')

  return NextResponse.json({status: 'Success'});
}