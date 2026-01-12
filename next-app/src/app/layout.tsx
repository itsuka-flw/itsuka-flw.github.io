import type { Metadata } from "next";
import { Yomogi } from "next/font/google";
import { Zen_Maru_Gothic } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const yomogi = Yomogi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yomogi",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "碧依さくら生誕祭 2026 - 非公式ファンサイト",
  description: "碧依さくらさんの誕生日をお祝いする非公式ファンサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body id="pagetop" className={yomogi.variable}>
        <div id="page">
          <Header />
          <Menu />
          <div id="main">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
