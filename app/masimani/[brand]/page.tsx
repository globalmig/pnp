"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";
import Image from "next/image";
import Contact from "@/components/common/Contact";
import StartupCostSection from "@/components/common/StartupCostSection";
import { motion, Variants } from "framer-motion";

type BrandKey = "octopus" | "goat";

const tabs: { key: BrandKey; label: string }[] = [
  { key: "octopus", label: "마시마니 문어&전복갈비찜전문점" },
  { key: "goat", label: "마시마니 흑염소요리전문점" },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** ✅ 애니메이션 프리셋 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export default function Page() {
  const router = useRouter();
  const params = useParams<{ brand?: string }>();

  const brand = (params.brand as BrandKey) ?? "octopus";

  function onClickTab(next: BrandKey) {
    router.push(`/masimani/${next}`);
  }

  return (
    <div className="bg-black min-h-screen">
      {/* HERO */}
      {brand === "octopus" ? (
        <Hero2 bg="/images/hero_bg3.png" title="마시마니는" highlightText="힘" title2="이다" description="희소성과 완성도." description2="확실한 메뉴가 매출을 만든다." />
      ) : (
        <Hero2 bg="/images/hero_bg3.png" title="마시마니는" highlightText="힘" title2="이다" description="진한 국물과 건강함." description2="단골이 생기는 맛." />
      )}

      {/* TABS */}
      <motion.div className="grid grid-cols-2 text-center w-full max-w-[1440px] pt-10 mx-auto px-4" variants={fadeUp} initial="hidden" animate="show">
        {tabs.map((t) => {
          const active = brand === t.key;

          return (
            <div key={t.key} className={cn("py-4 border-b-2 transition-colors duration-200", active ? "border-red-500" : "border-white/30")}>
              <button
                type="button"
                onClick={() => onClickTab(t.key)}
                className={cn("w-full transition-colors duration-200 text-sm md:text-2xl", active ? "text-red-500 font-semibold" : "text-white hover:text-white/80")}
                aria-current={active ? "page" : undefined}
              >
                {t.label}
              </button>
            </div>
          );
        })}
      </motion.div>

      {/* CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto py-10">{brand === "octopus" ? <OctopusContent /> : <GoatContent />}</div>
    </div>
  );
}

// 문어&전복갈비찜 콘텐츠 컴포넌트
function OctopusContent() {
  return (
    <section className="bg-[url('/images/brand_bg_01.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-center">
      {/* 타이틀 섹션 */}
      <div className="flex text-white justify-center w-full max-w-[1440px] mx-auto items-center min-h-[400px] md:min-h-[600px] px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={fadeRight} className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <Image src="/images/logo_01.png" alt="문어전복갈비찜로고" fill className="object-contain" priority />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">차별화된 경쟁자 없는 성공의 맛!</h2>
            <p className="text-white/80 text-sm md:text-base">억대매출 높은 마진 및 가치성 & 중독성 가맹비 + 보증금 + 로열티 면제</p>
          </motion.div>
        </motion.div>
      </div>

      {/* 매출 섹션 */}
      <SalesSection />

      {/* 혜택 이미지 그리드 */}
      <motion.div className="flex flex-col md:flex-row px-4 bg-black" variants={staggerWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {[
          { src: "/images/benefits_item01.png", alt: "혜택1" },
          { src: "/images/benefits_item02.png", alt: "혜택2" },
          { src: "/images/benefits_item03.png", alt: "혜택3" },
        ].map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative w-full h-[500px] md:h-[300px]" whileHover={{ y: -6, transition: { duration: 0.2 } }}>
            <Image src={item.src} alt={item.alt} fill className="object-contain" />
          </motion.div>
        ))}
      </motion.div>

      {/* 본사 혜택 카드 */}
      <BenefitsCards type="octopus" />

      {/* 창업 비용 */}
      <StartupCostSection />

      {/* 비디오 */}
      <motion.div className="w-full" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <video src="/videos/brand01.mp4" controls autoPlay loop muted playsInline className="w-full h-auto" aria-label="마시마니 문어&전복갈비찜 소개 영상" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <Contact />
      </motion.div>
    </section>
  );
}

// 흑염소 콘텐츠 컴포넌트
function GoatContent() {
  return (
    <section className="bg-[url('/images/brand_bg_02.png')] bg-contain bg-center flex flex-col justify-center">
      {/* 타이틀 섹션 */}
      <div className="flex text-white justify-center w-full max-w-[1440px] mx-auto items-center min-h-[400px] md:min-h-[600px] px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={fadeRight} className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <Image src="/images/logo_02.png" alt="마시마니흑염소로고" fill className="object-contain" priority />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">이제 일상이 보양이 되다.</h2>
            <p className="text-white/90 text-lg md:text-2xl mb-2">기찬 보양요리 동반성장 상생의 파트너가 되다</p>
            <p className="text-white/90 text-lg md:text-2xl">보양남녀가 즐기는 맛과 건강, 모두 잡은 돈 되는 창업!</p>
          </motion.div>
        </motion.div>
      </div>

      {/* 매출 섹션 */}
      <SalesSection />

      {/* 혜택 이미지 그리드 */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 bg-black" variants={staggerWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {[
          { src: "/images/benefits_02_item01.png", alt: "혜택1" },
          { src: "/images/benefits_02_item02.png", alt: "혜택2" },
          { src: "/images/benefits_02_item03.png", alt: "혜택3" },
        ].map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative w-full h-[500px] md:h-[300px]" whileHover={{ y: -6, transition: { duration: 0.2 } }}>
            <Image src={item.src} alt={item.alt} fill className="object-contain" />
          </motion.div>
        ))}
      </motion.div>

      {/* 본사 혜택 카드 */}
      <BenefitsCards type="goat" />

      {/* 창업 비용 */}
      <StartupCostSection />

      {/* 비디오 */}
      <motion.div
        className="w-full flex flex-col md:flex-row items-start h-auto md:h-[400px] overflow-hidden"
        variants={staggerWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.video variants={fadeUp} src="/videos/brand02_cook.mp4" controls autoPlay loop muted playsInline className="w-full md:w-1/2 h-auto md:h-full object-cover" aria-label="조리 영상 1" />
        <motion.video variants={fadeUp} src="/videos/brand02_cook2.mp4" controls autoPlay loop muted playsInline className="w-full md:w-1/2 h-auto md:h-full object-cover" aria-label="조리 영상 2" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <Contact />
      </motion.div>
    </section>
  );
}

// 매출 섹션 컴포넌트
function SalesSection() {
  return (
    <motion.div
      className="bg-[url('/images/benefits_bg.png')] bg-cover bg-center bg-no-repeat py-12 md:py-24 lg:py-32 px-4 flex flex-col justify-center items-center text-white"
      variants={staggerWrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp} className="flex flex-col text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">분기별 매출 걱정은 그만하세요!</h2>
        <p className="text-white/80 text-sm md:text-base">35평 테이블12개 점포 일 매출 550만원입니다</p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 md:gap-10 py-6 md:py-10 w-full max-w-4xl">
        {/* 매출 박스 */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col bg-white px-8 md:px-14 py-6 md:py-8 rounded-lg text-center">
            <p className="text-[#525178]/80 text-sm md:text-base">오늘 매출</p>
            <p className="text-[#525178] font-bold text-xl md:text-2xl">5,459,000</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-white px-4 py-6 md:py-8 rounded-lg text-center">
              <p className="text-[#525178]/80 text-sm">판매수량</p>
              <p className="text-[#525178] font-bold text-xl md:text-2xl">380개</p>
            </div>
            <div className="flex flex-col bg-white px-4 py-6 md:py-8 rounded-lg text-center">
              <p className="text-[#525178]/80 text-sm">손님수</p>
              <p className="text-[#525178] font-bold text-xl md:text-2xl">103명</p>
            </div>
          </div>
        </div>

        {/* 원형 아이콘 */}
        <div className="flex justify-center items-center gap-4 flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white text-black/80 text-center rounded-full p-6 md:p-10 py-8 md:py-14 text-sm md:text-base"
          >
            계절 상관없는 <br />
            <strong className="text-2xl md:text-3xl font-extrabold text-red-600">희소성</strong>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="text-4xl md:text-6xl"
          >
            +
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="bg-white text-black/80 text-center rounded-full p-6 md:p-12 py-8 md:py-14 text-sm md:text-base"
          >
            입증된 <br />
            <strong className="text-2xl md:text-3xl font-extrabold text-red-600">고매출</strong>
          </motion.div>
        </div>
      </motion.div>

      {/* 그래프 */}
      <motion.div variants={fadeUp} className="relative w-full h-[200px] md:h-[300px] mt-6">
        <Image src="/images/benefits_graph.png" alt="매출 그래프" fill className="object-contain" />
      </motion.div>
    </motion.div>
  );
}

// 혜택 카드 컴포넌트
function BenefitsCards({ type }: { type: "octopus" | "goat" }) {
  const octopusCards = [
    {
      title: (
        <>
          초보도 가능한 <span className="text-red-600">원팩 시스템</span>
        </>
      ),
      description: "21년 검증된 맛, 초보자도 OK! 초간단 원팩시스템의 셋팅하는 조리 운영 시스템",
    },
    {
      title: (
        <>
          <span className="text-red-600">억대매출</span> 높은 마진 및 가치성
        </>
      ),
      description: "중독성 있는 차별화된 창업 아이템으로 경쟁자 없는 성공의 맛을 느껴보실 수 있습니다.",
    },
    {
      title: (
        <>
          계절 영향 없는 <span className="text-red-600">안정 매출</span>
        </>
      ),
      description: (
        <>
          문어·전복 등 프리미엄 재료를 활용한 차별화 메뉴로 <span className="text-red-600">어떤 계절에도 꾸준히 수요</span>가 발생하는 독창적인 메뉴 경쟁력을 갖추고 있습니다.
        </>
      ),
    },
    {
      title: (
        <>
          <span className="text-red-600">억대매출</span> 높은 마진 및 가치성
        </>
      ),
      description: (
        <>
          KBS, MBC, SBS, 일본TV 등 약 <span className="text-red-600">50회 이상</span> 방송 및 다양한 언론 보도를 통해 브랜드의 대중성·신뢰도가 검증된 외식업체입니다. 국내뿐 아니라 싱가포르 등 해외
          진출 경험도 갖춘 확장성 높은 브랜드입니다.
        </>
      ),
    },
  ];

  const goatCards = [
    {
      title: (
        <>
          <span className="text-red-600">최소비용</span>으로 <br />
          업종변경 가능 지원
        </>
      ),
      description: (
        <>
          국밥 브랜드에서 업종 변경 후 <span className="text-red-600">월 매출 1억</span>달성
          <br />
          <span className="text-red-600">독립독점 상권역</span> 절대 보장 시스템
        </>
      ),
    },
    {
      title: (
        <>
          <span className="text-red-600">꾸준한 수요</span>있는 <br />
          창업 아이템
        </>
      ),
      description: "바쁜 시대에 식사 한 끼로 건강·맛·포만감까지 잡는 국내 보양식 전문 프랜차이즈.",
    },
    {
      title: (
        <>
          <span className="text-red-600">성장성</span>을 그대로 가져가세요
        </>
      ),
      description: "경기 영향 적고, 시즌을 타지 않는 보양 메뉴로 꾸준한 단골 + 안정적 매출 구조 확보.",
    },
    {
      title: (
        <>
          ONE <span className="text-red-600">교육</span> 시스템
        </>
      ),
      description: (
        <>
          조리교육 및 실무현장교육 및 <br /> 실습까지 ONE시스템
          <br />
          <br />
          단순조리 + 본사 레시피 + 실전 교육
          <br />→ 초보 창업자도 빠른 오픈, 빠른 안정화 가능.
        </>
      ),
    },
  ];

  const cards = type === "octopus" ? octopusCards : goatCards;

  return (
    <div className="bg-[url('/images/bg_cardList.png')] bg-cover bg-center bg-no-repeat py-24 md:py-48 px-4">
      <motion.div
        className="flex text-white justify-center w-full max-w-[1440px] mx-auto items-center text-center mb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <h2 className="text-2xl md:text-5xl font-bold">본사에서 제공하는 혜택!</h2>
      </motion.div>

      <motion.div
        className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        variants={staggerWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="bg-white text-center rounded-xl py-8 md:py-10 px-4 hover:shadow-lg transition-shadow duration-200"
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <h4 className="font-bold text-base md:text-lg mb-3">{card.title}</h4>
            <p className="text-sm px-2 md:px-4 break-keep text-black/80">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
