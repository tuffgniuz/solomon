import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solomon - Security Standards Simplified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-nord-polarnight-50 text-nord-snowstorm-50 ${rubik.className}`}>
        {children}
      </body>
    </html>
  );
}
