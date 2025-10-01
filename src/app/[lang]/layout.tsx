import type { Metadata } from "next";
import { Exo_2, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/app/header";
import FooterNew from "@/components/app/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const exo = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COMET - PT. Comtech Metalindo Terpadu",
  description: "PT. Comtech Metalindo Terpadu",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${exo.variable} antialiased`}>
        <Header />
        {children}
        <FooterNew />
      </body>
    </html>
  );
}
