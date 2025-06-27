import type { Metadata } from "next";
import "./globals.css";

import { ThemeProviderClient as ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";

import { Inter } from "next/font/google";
import { NavbarProvider } from "./context/NavbarContext";
import { MusicPlaybackProvider } from "./context/MusicPlaybackContext";
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
          <NavbarProvider>
            <MusicPlaybackProvider>
              <Navbar />
              <main className="h-[92vh]">{children}</main>
            </MusicPlaybackProvider>
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
