import { Fjalla_One, Geist, Geist_Mono } from "next/font/google";

export const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
