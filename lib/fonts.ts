import { Geist, Geist_Mono, Roboto } from "next/font/google";

export const roboto = Roboto({
  variable: "--font-roboto", // ✅ Unique variable name
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'] // Add weights
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});