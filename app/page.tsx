import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "마시마니 프랜차이즈 | 황칠 흑염소·김치찜·갈비찜 전문 창업",
  description:
    "마시마니 프랜차이즈 공식 사이트. 황칠 흑염소·김치찜&갈비찜 전문 창업 브랜드. 월 매출 1억 달성, 독립독점 상권역 보장, 최소 비용 업종변경 창업. KBS·MBC·SBS 50회 이상 방송 검증 브랜드.",
  openGraph: {
    title: "마시마니 프랜차이즈 | 황칠 흑염소·김치찜·갈비찜 전문 창업",
    description: "월 매출 1억 달성, 독립독점 상권역 보장. 21년 검증된 맛과 원팩 시스템으로 초보 창업자도 성공.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePageClient />;
}
