import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { geistMono, geistSans } from "@/lib/fonts";
import { AuthProvider } from "./providers";

export const metadata: Metadata = {
  title: "Flashcard-Ai",
  description: "Use Ai flashcards to learn anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const name = "john doe c";
  const user = false;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex justify-start items-center min-h-screen">
            <Navbar />
            <div className="absolute top-10 right-10 ">
              {user ? (
                <div className="border border-[#181818] px-5 py-2 rounded-lg uppercase text-sm duration-300 hover:bg-[#181818] cursor-pointer">
                  {name.length > 10 ? `${name.slice(0, 10)}...` : name}
                </div>
              ) : (
                <div className="border border-[#181818] px-5 py-2 rounded-lg uppercase text-sm duration-300 hover:bg-[#181818] cursor-pointer">
                  Sign in
                </div>
              )}
            </div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
