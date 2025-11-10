import { Geist, Geist_Mono, Roboto, Roboto_Slab } from "next/font/google";

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const slab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});