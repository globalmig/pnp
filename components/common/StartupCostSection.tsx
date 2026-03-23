"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const rows = [
  { item: "가맹비", desc: "경영 및 서비스 전수, 브랜드 사용 등", badge: "전액면제", badgeStyle: "bg-red-600 text-white" },
  { item: "교육비", desc: "개점 전 이론/실습/실무교육", badge: "200만원", badgeStyle: "bg-red-600 text-white" },
  { item: "주방설비 집기", desc: "주방기기, 홀집기, 초도물품, 기타 등", badge: "직접구매가능", badgeStyle: "border border-red-600 text-red-500" },
  { item: "인테리어", desc: "목공사, 전기, 설비, 주방방수, 미장, 주방후드, 실내금속, 실내 조명공사 등", badge: "직접시공가능", badgeStyle: "border border-red-600 text-red-500" },
  { item: "간판", desc: "간판, 내·외부 사인물 등", badge: "직접시공가능", badgeStyle: "border border-red-600 text-red-500" },
  { item: "홍보 판촉물", desc: "유니폼, 명함, 홍보전단 등", badge: "직접구매가능", badgeStyle: "border border-red-600 text-red-500" },
];

export default function StartupCostSection() {
  return (
    <motion.section className="bg-black py-20 md:py-32 px-4" variants={staggerWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <div className="w-full max-w-[960px] mx-auto">
        {/* 타이틀 */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-baseline gap-3 mb-10">
          <h2 className="text-white text-4xl md:text-5xl font-bold">창업 비용</h2>
          <span className="text-white/50 text-sm md:text-base"></span>
        </motion.div>

        {/* 테이블 */}
        <motion.div variants={fadeUp} className="border border-white/20 rounded-xl overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-[1fr_2fr_auto] bg-white/10 text-white/60 text-xs md:text-sm font-medium">
            <div className="px-5 py-4">항 목</div>
            <div className="px-5 py-4 border-l border-white/10">내 용</div>
            <div className="px-5 py-4 border-l border-white/10 min-w-[130px] text-center">
              금 액 <span className="text-white/40">(VAT별도)</span>
            </div>
          </div>

          {/* 본문 행 */}
          {rows.map((row, idx) => (
            <motion.div key={idx} variants={fadeUp} className="grid grid-cols-[1fr_2fr_auto] border-t border-white/10 text-white hover:bg-white/5 transition-colors">
              <div className="px-5 py-5 text-sm md:text-base font-medium whitespace-nowrap">{row.item}</div>
              <div className="px-5 py-5 text-sm md:text-base text-white/70 border-l border-white/10 break-keep">{row.desc}</div>
              <div className="px-5 py-5 border-l border-white/10 min-w-[130px] flex items-center justify-center">
                <span className={`text-xs md:text-sm font-bold px-3 py-1.5 rounded-md whitespace-nowrap ${row.badgeStyle}`}>{row.badge}</span>
              </div>
            </motion.div>
          ))}

          {/* 합계 행 */}
          <div className="grid grid-cols-[1fr_2fr_auto] border-t-2 border-red-600 bg-red-600/10">
            <div className="px-5 py-6 text-white font-bold text-base md:text-lg">합 계</div>
            <div className="px-5 py-6 border-l border-white/10" />
            <div className="px-5 py-6 border-l border-white/10 min-w-[130px] flex items-center justify-center">
              <span className="text-red-500 font-extrabold text-lg md:text-2xl">200만원</span>
            </div>
          </div>
        </motion.div>

        {/* 주석 */}
        <motion.p variants={fadeUp} className="mt-6 text-white/40 text-xs md:text-sm leading-relaxed break-keep">
          * 상·하수도 및 화장실 공사, 외부공사 및 철거, 냉·난방 시설, 소방공사, 음향시설, TV, 전기/가스 증설, 오픈행사, 인·허가, 주방 후드, 닥트, 어닝, 외부테라스, 정수기, CCTV, 주방배수설비, 시설 외
          창고공사 등의 비용은 별도입니다.
        </motion.p>
      </div>
    </motion.section>
  );
}
