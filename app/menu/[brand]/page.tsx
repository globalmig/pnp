"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";
import Image from "next/image";
import Contact from "@/components/common/Contact";

type BrandKey = "octopus" | "goat";

const tabs: { key: BrandKey; label: string }[] = [
  { key: "goat", label: "마시마니 황칠 흑염소 전문점" },
  { key: "octopus", label: "마시마니 김치찜&갈비찜 전문" },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const router = useRouter();
  const params = useParams<{ brand?: string }>();

  const brand = (params.brand as BrandKey) ?? "goat";

  function onClickTab(next: BrandKey) {
    router.push(`/menu/${next}`);
  }

  return (
    <div className="bg-black">
      {/* HERO: 탭별로 다르게 보여주고 싶으면 여기서 분기 */}
      {brand === "octopus" && <Hero2 bg="/images/menus_bg.png" title="마시마니" highlightText="메뉴소개" title2="" description="희소성과 완성도." description2="확실한 메뉴가 매출을 만든다." />}

      {brand === "goat" && (
        <Hero2
          bg="/images/menus_bg.png"
          title="마시마니"
          highlightText="
메뉴 소개"
          title2=""
          description="희소성과 완성도."
          description2="확실한 메뉴가 매출을 만든다."
        />
      )}

      <div className="w-full mx-auto  ">
        <div className="relative w-full  h-40 overflow-hidden rounded-t-xl">
          <Image src="/images/top_Image.png" alt="지붕" fill className="object-cover" priority />
        </div>
      </div>

      {/* TABS */}
      <div className="grid grid-cols-2 text-center w-full max-w-[1440px] pt-10 mx-auto">
        {tabs.map((t) => {
          const active = brand === t.key;

          return (
            <div key={t.key} className={cn("py-4 border-b-2 text-sm md:text-2xl", active ? "border-red-500" : "border-white/30")}>
              <button type="button" onClick={() => onClickTab(t.key)} className={cn("w-full", active ? "text-red-500 font-semibold" : "text-white")}>
                {t.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* SECTION */}
      <div className="w-full max-w-[1440px] mx-auto py-10 text-white">
        {brand === "octopus" && (
          <section className="px-4">
            {/* 대표 이미지 */}
            <div className="w-full max-w-3xl mx-auto mb-12 aspect-video relative rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/menu_detail_hero_01.png" alt="마시마니 김치찜&갈비찜 전문 대표 이미지" fill className="object-cover" priority />
            </div>

            {/* 메뉴 테이블 */}
            <div className="w-full max-w-3xl mx-auto mb-8 bg-[#f5f0eb] rounded-2xl shadow-lg overflow-hidden text-sm md:text-base">
              <div className="grid grid-cols-2">
                {/* 헤더 */}
                <div className="bg-[#E60115] text-white font-bold text-center py-3 border-b border-r border-red-200 tracking-widest">식 사 류</div>
                <div className="bg-[#E60115] text-white font-bold text-center py-3 border-b border-red-200 tracking-widest">요 리 류</div>

                {/* 식사류 */}
                <div className="border-r border-gray-400 divide-y divide-gray-300">
                  {[
                    { name: "김치찜", desc: "시간이 빚어낸 깊은 맛의 미학" },
                    { name: "돼지고기김치찜", desc: "돼지고기와 풍미가득한 조화" },
                    { name: "참치김치찜", desc: "담백하게 즐기는 추억의 맛" },
                    { name: "갈비찜", desc: "정성과 기다림의 명품 맛" },
                    { name: "김치갈비찜", desc: "속성갈비와 김치의 개운함이 만났을때" },
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-4 text-center">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">({item.desc})</p>
                    </div>
                  ))}
                </div>

                {/* 요리류 */}
                <div className="divide-y divide-gray-300">
                  {[
                    { name: "통삼겹김치찜", desc: "1인기준 | 2인이상주문", subdesc: "통삼겹과 숙성김치의 환상적인 만남" },
                    { name: "갈비찜전골", desc: "1인기준 | 2인이상주문", subdesc: "식탁 위에서 완성되는 풍미가득한 만찬" },
                    { name: "김치갈비찜전골", desc: "1인기준 | 2인이상주문", subdesc: "깊고 칼칼한 김치국물속 속성갈비" },
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-4 text-center">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      {item.subdesc && <p className="text-gray-500 text-xs mt-1">({item.subdesc})</p>}
                      {item.desc && <p className="text-red-500 text-xs mt-1">[{item.desc}]</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* 추가류 */}
              <div className="border-t border-gray-400">
                <div className="px-6 py-4 text-center text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">추가류 : </span>
                  볶음밥, 두부, 감자전, 갈비찜고기, 문어, 전복, 떡갈비
                </div>
              </div>
            </div>

            {/* 하단 문구 */}
            <div className="w-full max-w-3xl mx-auto mb-16 text-center text-sm md:text-base space-y-1">
              <p className="text-white/80">1,000일 숙성 발효한 풍미와 현대적 감각을 덧입힌 미식의 조화</p>
              <p className="text-red-500 font-semibold">☆배달 및 포장판매(TakeOut)합니다.</p>
            </div>

            <Contact />
          </section>
        )}

        {brand === "goat" && (
          <section className="px-4">
            {/* 대표 이미지 */}
            <div className="w-full max-w-3xl mx-auto mb-12 aspect-video relative rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/menu_detail_hero_02.png" alt="마시마니 황칠 흑염소 전문점 대표 이미지" fill className="object-cover" priority />
            </div>

            {/* 메뉴 테이블 — 흰 배경 */}
            <div className="w-full max-w-3xl mx-auto mb-16 bg-[#F9FAFB] rounded-2xl shadow-lg overflow-hidden text-sm md:text-base">
              <div className="grid grid-cols-2">
                {/* 헤더 */}
                <div className="bg-[#E60115] text-white font-bold text-center py-3 border-b border-r border-red-200 tracking-widest">식 사 류</div>
                <div className="bg-[#E60115] text-white font-bold text-center py-3 border-b border-red-200 tracking-widest">요 리 류</div>

                {/* 식사류 항목들 */}
                <div className="border-r border-gray-400 divide-y divide-gray-300">
                  {[
                    { name: "황칠흑염소탕", desc: "천년의 영험함 기운을 담은 깊은 보양 한 그릇" },
                    { name: "전복황칠흑염소탕", desc: "바다와 산으로 기력을 채우는 최고의 대접" },
                    { name: "황칠삼계탕", desc: "황칠의 보양향이 스며든 맑고 담백한 활력의 맛" },
                    { name: "전복황칠삼계탕", desc: "전복과 황칠의 정성이 더해진 특별한 보양식" },
                    { name: "한우우거지국밥", desc: "한우와 구수한 우거지가 빚어낸 고향의 위로" },
                    { name: "갈비탕", desc: "맑고 깊은 진심 한 그릇" },
                    { name: "전복갈비탕", desc: "갈비와 전복이 선사하는 풍성한 풍미" },
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-4 text-center">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">({item.desc})</p>
                    </div>
                  ))}
                </div>

                {/* 요리류 항목들 */}
                <div className="divide-y divide-gray-300">
                  {[
                    { name: "황칠흑염소전골", desc: "1인기준 | 2인이상주문", subdesc: "황칠 향을 입힌 흑염소의 영양을 나누는 따스한 보양시간" },
                    { name: "황칠흑염소수육", desc: "1인기준 | 2인이상주문", subdesc: "황칠과 함께 쪄낸 부드러운 육질, 담백함과 깊은 풍미" },
                    { name: "황칠흑염소무침", desc: "1인분 | 주문가능", subdesc: "황칠과 흑염소의 쫄깃함이 어우러진 매콤하고 향긋한 활력의 조화" },
                    { name: "통전복버터구이", desc: "전복에 고소한 버터의 풍미가 스며들어, 입안가득 피지는 행복", subdesc: "" },
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-4 text-center">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      {item.desc && <p className="text-red-500 text-xs mt-1">({item.desc})</p>}
                      {item.subdesc && <p className="text-gray-500 text-xs mt-1">{item.subdesc}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* 추가류 / 추가 및 계절메뉴 */}
              <div className="divide-y divide-gray-300 border-t border-gray-400">
                <div className="px-6 py-4 text-center text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">추가류: </span>
                  감자전, 볶음밥, 전복, 흑염소섭시만두, 흑염소만두사리, 사리, 야채, 두부(전골용), 떡갈비
                </div>
                <div className="px-6 py-4 text-center text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">추가 및 계절메뉴: </span>
                  황칠만두국, 황칠흑염소매생이탕, 황칠흑염소주, 황칠흑염소불고기
                </div>
              </div>
            </div>

            {/* 하단 문구 */}
            <div className="w-full max-w-3xl mx-auto mb-16 text-center text-sm md:text-base space-y-1">
              <p className="text-white/80">4계절 기찬 보양남녀를 행복하게 만드는 마시마니흑염소</p>
              <p className="text-white/80">이제 일상이 미식으로 보양이 되다.</p>
              <p className="text-red-500 font-semibold">☼포장판매(TakeOut)합니다.</p>
            </div>

            <Contact />
          </section>
        )}
      </div>
    </div>
  );
}
