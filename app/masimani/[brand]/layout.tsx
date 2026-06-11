import { Metadata } from "next";

const brandMeta = {
  octopus: {
    title: "마시마니 김치찜&갈비찜 전문 창업",
    description:
      "마시마니 김치찜&갈비찜 전문 창업 정보. 21년 검증된 맛, 초보자도 OK! 원팩 시스템으로 쉽고 빠른 창업. 가맹비·보증금·로열티 면제, 억대 매출 달성 가능한 차별화 아이템.",
    keywords: ["마시마니김치찜", "갈비찜프랜차이즈", "김치찜창업", "원팩시스템", "가맹비면제"],
  },
  goat: {
    title: "마시마니 황칠 흑염소 전문점 창업",
    description:
      "마시마니 황칠 흑염소 전문점 창업 정보. 최소 비용 업종변경 지원, 월 매출 1억 달성, 독립독점 상권역 보장. 4계절 꾸준한 보양식 수요로 안정적인 매출 확보.",
    keywords: ["황칠흑염소창업", "흑염소프랜차이즈", "보양식창업", "업종변경창업", "독점상권"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const meta = brandMeta[brand as keyof typeof brandMeta] ?? brandMeta.octopus;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | 마시마니 프랜차이즈`,
      description: meta.description,
      url: `/masimani/${brand}`,
    },
    alternates: {
      canonical: `/masimani/${brand}`,
    },
  };
}

export default function MasimaniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
