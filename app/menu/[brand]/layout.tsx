import { Metadata } from "next";

const brandMeta = {
  octopus: {
    title: "마시마니 김치찜&갈비찜 전문 메뉴",
    description:
      "마시마니 김치찜&갈비찜 전문 메뉴 소개. 1,000일 숙성 발효 김치찜, 갈비찜, 통삼겹김치찜, 문어·전복 요리류 등 차별화된 프리미엄 메뉴. 배달 및 포장판매 가능.",
    keywords: ["마시마니메뉴", "김치찜메뉴", "갈비찜메뉴", "문어전복요리", "프랜차이즈메뉴"],
  },
  goat: {
    title: "마시마니 황칠 흑염소 전문점 메뉴",
    description:
      "마시마니 황칠 흑염소 전문점 메뉴 소개. 황칠흑염소탕, 전복황칠흑염소탕, 황칠삼계탕, 갈비탕 등 4계절 보양식 메뉴. 포장판매 가능.",
    keywords: ["황칠흑염소메뉴", "흑염소탕", "황칠삼계탕", "보양식메뉴", "갈비탕"],
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
      url: `/menu/${brand}`,
    },
    alternates: {
      canonical: `/menu/${brand}`,
    },
  };
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
