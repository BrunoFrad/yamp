import type { Metadata } from "next";
import "./globals.css";

import { ThemeProviderClient as ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yamp",
  description: "Listen to music as it should be listened to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="h-[calc(100vh-80px)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
