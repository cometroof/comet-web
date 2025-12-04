import type { Metadata } from "next";
import { Exo_2, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/app/header";
import WhatsappButton from "@/components/app/whatsapp-button";
import ScrollTop from "@/components/app/scroll-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const exo = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "id" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = `COMET - PT. Comtech Metalindo Terpadu`;
  let description = `COMET is a metal roofing solution with a modern, minimalist design and maximum protection. Durable, strong, leak-proof, and certified.`;
  const imgUrl = `/comet-logo-flatten.png`;
  if (lang === "id") {
    description = `COMET solusi genteng metal dengan desain modern minimalis dan proteksi maksimal. Awet, kuat, anti bocor, dan bersertifikasi.`;
  }
  const imgObject = {
    url: imgUrl,
    width: 600,
    height: 400,
    alt: title,
  };
  return {
    metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imgObject],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgObject],
    },
  };
}

export const revalidate = 300;

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
        {/*<FooterNew />*/}
        <div
          className="z-10 fixed bottom-10 xl:bottom-20 right-6 xl:right-14 transition-all duration-300 overflow-hidden  flex flex-col items-center gap-6 w-16 h-[60px]"
          id="cta-layer"
        >
          <WhatsappButton />
          <ScrollTop />
        </div>
      </body>
    </html>
  );
}
