import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import "./globals.css";
import Footbar from "@/components/footbar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterPorvider";
import getSongsbyUser from "@/actions/getSongsbyUser";

const font = Figtree({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muse",
  description: "Music player app",
};

//Fetch User SOngs
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsbyUser();
  console.log(userSongs);
  return (
    <html lang="en" className="h-full">
      <body className={`${font.className} antialiased h-full`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <div className="flex flex-col h-full">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar songs={userSongs}>{children}</Sidebar>
                <main className="flex-1  overflow-auto ">{children}</main>
              </div>
              <Footbar />
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
