import { Metadata } from "next";

export const metadata: Metadata = {
  title: "매장 소개",
  description: "마시마니 프랜차이즈 전국 매장 소개. 마시마니 황칠 흑염소·김치찜&갈비찜 전문점 전국 지점 위치, 주소, 전화번호를 확인하세요.",
  keywords: ["마시마니매장", "마시마니지점", "마시마니위치", "흑염소전문점위치", "김치찜전문점위치"],
  openGraph: {
    title: "마시마니 매장 소개",
    description: "마시마니 프랜차이즈 전국 매장 위치와 연락처를 확인하세요.",
    url: "/location",
  },
  alternates: {
    canonical: "/location",
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
