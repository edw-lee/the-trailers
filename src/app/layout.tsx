import NavBar from "@/components/NavBar";
import { geistMono, geistSans } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./_providers";

export const metadata: Metadata = {
  title: "The Trailers",
  description: "The Trailers",
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
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
