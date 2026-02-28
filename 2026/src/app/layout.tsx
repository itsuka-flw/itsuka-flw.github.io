import type { Metadata } from "next";
import { Zen_Maru_Gothic, Yomogi , Nunito } from "next/font/google";
import "./globals.css";
import RootClientLayout from "@/components/RootClientLayout";

const zenMaru = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

const yomogi = Yomogi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yomogi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sakura-aoi-birthday-page.vercel.app"),
  title: "碧依さくら生誕祭 2026 - 非公式ファンサイト",
  description: "碧依さくらさんの誕生日をお祝いする非公式ファンサイトです。",
  openGraph: {
    title: "碧依さくら生誕祭 2026 - 非公式ファンサイト",
    description: "碧依さくらさんの誕生日をお祝いする非公式ファンサイトです。",
    url: "/",
    siteName: "碧依さくら生誕祭 2026",
    images: [
      {
        url: "/images/ogp.png",
        width: 1200,
        height: 630,
        alt: "碧依さくら生誕祭 2026",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "碧依さくら生誕祭 2026 - 非公式ファンサイト",
    description: "碧依さくらさんの誕生日をお祝いする非公式ファンサイトです。",
    images: ["/images/ogp.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-167.png", sizes: "167x167", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body id="pagetop" className={`${zenMaru.variable} ${yomogi.variable} ${nunito.variable}`}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}