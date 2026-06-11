import { Metadata } from "next";

export const metadata: Metadata = {
  title: "갤러리",
  description: "마시마니 프랜차이즈 갤러리. 마시마니 황칠 흑염소·김치찜&갈비찜 전문점의 다양한 매장 사진과 음식 사진을 확인하세요.",
  keywords: ["마시마니갤러리", "마시마니사진", "흑염소매장", "김치찜매장"],
  openGraph: {
    title: "마시마니 갤러리",
    description: "마시마니 프랜차이즈 갤러리. 매장 사진과 음식 사진을 확인하세요.",
    url: "/gallery",
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
