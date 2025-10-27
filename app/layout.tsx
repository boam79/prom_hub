import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: "--font-noto-sans-kr",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PromHub - AI Prompt Marketplace",
  description: "Buy and sell high-quality AI prompts for ChatGPT, Midjourney, DALL-E, and Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
