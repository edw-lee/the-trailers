import NavBar from "@/components/NavBar";
import { geistMono, geistSans } from "@/lib/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import Providers from "./_providers";
import "./globals.css";

config.autoAddCss = false;

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
