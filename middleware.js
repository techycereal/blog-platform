import { authMiddleware } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";
import { getTokens } from "next-firebase-auth-edge";
import { NextResponse } from 'next/server';
export async function middleware(request) {
  try {
    const authResponse = await authMiddleware(request, {
      loginPath: "/api/login",
      logoutPath: "/api/logout",
      apiKey: clientConfig.apiKey,
      cookieName: serverConfig.cookieName,
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      cookieSerializeOptions: serverConfig.cookieSerializeOptions,
      serviceAccount: serverConfig.serviceAccount,
    });
    return authResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect('/api/login');
  }
}


export const config = {
  matcher: [
    "/createpost",
    "/((?!_next|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
}