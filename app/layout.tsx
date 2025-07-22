import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Flashcard-Ai",
  description: "Use Ai flashcards to learn anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-start items-center min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
