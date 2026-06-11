import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GNB from "@/components/common/GNB";
import Footer from "@/components/common/Footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "Apple SD Gothic Neo", "Noto Sans KR", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masimani.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "마시마니 프랜차이즈 | 황칠 흑염소·김치찜·갈비찜 전문 창업",
    template: "%s | 마시마니 프랜차이즈",
  },
  description:
    "마시마니 프랜차이즈 공식 사이트. 황칠 흑염소 전문점·김치찜&갈비찜 전문 창업 브랜드. 월 매출 1억 달성, 독립독점 상권역 보장, 최소 비용으로 업종변경 창업 가능. 21년 검증된 맛과 원팩 시스템으로 초보 창업자도 성공.",
  keywords: ["마시마니", "마시마니프랜차이즈", "프랜차이즈창업", "흑염소창업", "황칠흑염소", "김치찜창업", "갈비찜창업", "보양식프랜차이즈", "외식창업", "음식점창업", "업종변경", "소자본창업"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "마시마니 프랜차이즈",
    title: "마시마니 프랜차이즈 | 황칠 흑염소·김치찜·갈비찜 전문 창업",
    description: "황칠 흑염소 전문점·김치찜&갈비찜 전문 창업 브랜드 프랜차이즈. 월 매출 1억 달성, 독립독점 상권역 보장.",
    images: [{ url: "/images/og-image.png", width: 800, height: 600, alt: "마시마니 프랜차이즈 로고" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "마시마니 프랜차이즈 | 황칠 흑염소·김치찜·갈비찜 전문 창업",
    description: "마시마니 프랜차이즈 공식 사이트. 황칠 흑염소·김치찜&갈비찜 전문 창업 브랜드.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased relative bg-[#fcfeff]`}>
        <GNB />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
