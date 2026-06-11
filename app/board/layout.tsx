import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description: "마시마니 프랜차이즈 공지사항. 마시마니의 새로운 소식, 이벤트, 창업 설명회 일정 등 최신 정보를 확인하세요.",
  keywords: ["마시마니공지사항", "마시마니소식", "프랜차이즈이벤트", "창업설명회"],
  openGraph: {
    title: "마시마니 공지사항",
    description: "마시마니 프랜차이즈의 새로운 소식과 공지사항을 확인하세요.",
    url: "/board",
  },
  alternates: {
    canonical: "/board",
  },
};

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
