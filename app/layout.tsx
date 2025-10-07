import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { geistMono, geistSans } from "@/lib/fonts";
import { AuthProvider } from "./providers";
import AuthButton from "@/components/UtilityComp/AuthButton";
import { Toaster } from "react-hot-toast";

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
        <Toaster toastOptions={{style: {
      border: '3px solid #2b2b2b',
      color: 'white',
      background: '#0E0E0E'
    }}} />
        <AuthProvider>
          <div className="flex justify-center  sm:justify-start items-center min-h-screen">
            <Navbar />
            <div className="hidden sm:block">
              <AuthButton desktop={true} />
            </div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
