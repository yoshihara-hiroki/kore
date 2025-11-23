import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "コレ。| ランダム決定ツール",
  description: "迷ったらコレが決めてくれます。",
  keywords: ["選択肢", "あみだくじ", "ルーレット", "ランダム", "決める", "決定", "優柔不断", "アプリ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> 
      <body className={inter.className}>{children}</body>
    </html>
  );
}
