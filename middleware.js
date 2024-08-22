import { authMiddleware } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";
import { getTokens } from "next-firebase-auth-edge";
import { NextResponse } from 'next/server';

const userCache = new Map();

export async function middleware(request) {
  const response = authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
  });

  const tokens = await getTokens(request.cookies, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  if (tokens) {
    const { uid } = tokens.decodedToken;
    console.log(uid)
    if (!userCache.has(uid)) {
      try {
        const apiResponse = await fetch(`/api/user/${uid}`);
        if (!apiResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        console.log(userData)
        const userData = await apiResponse.json();
        
        userCache.set(uid, userData.data);
  
        // Create response object and set cookie
        const res = NextResponse.next();
        res.cookies.set('userUid', JSON.stringify(userData.data), {
          path: '/', // Ensure the cookie is available on all routes
          maxAge: 60 * 60 * 24, // 1 day
        });
  
        return res;
      } catch (error) {
        console.error("Error fetching user data from local API:", error);
      }
    } else {
      const userData = userCache.get(uid)
      const res = NextResponse.next();
        res.cookies.set('userUid', JSON.stringify(userData), {
          path: '/', // Ensure the cookie is available on all routes
          maxAge: 60 * 60 * 24, // 1 day
        });
  
        return res;
    }
  }
  

  return response;
}

export const config = {
  matcher: [
    "/createpost",
    "/((?!_next|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
