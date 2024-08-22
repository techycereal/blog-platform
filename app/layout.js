'use client'

import "./globals.css";
import ReduxProvider from "./store/redux-provider";
import Header from "./components/Header";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>
        <Header/>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
