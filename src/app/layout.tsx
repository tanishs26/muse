import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Header from "@/components/Header";

import "./globals.css";
import Footbar from "@/components/footbar";

const font = Figtree({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muse",
  description: "Music player app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${font.className} antialiased h-full`}>
        <div className="flex flex-col h-full">
          
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <Hero />
              {children}
            </main>
          </div>

          <Footbar/>
        </div>
      </body>
    </html>
  );
}
