"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Contact from "@/components/common/Contact";
import StartupCostSection from "@/components/common/StartupCostSection";
import { motion, Variants } from "framer-motion";
import ScrollIndicator from "@/components/common/ScrollIndicator";

export default function HomePageClient() {
  const handleScrollToConsulting = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("startup-consulting")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#startup-consulting");
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <section aria-label="히어로 섹션" className="bg-[url('/images/hero_bg2.png')] bg-cover bg-center bg-no-repeat">
        <div className="w-full max-w-[1440px] mx-auto relative h-[640px] md:h-[800px]">
          <motion.div className="absolute right-10 top-[180px] -translate-y-1/2" initial="hidden" animate="visible" variants={slideInRight}>
            <div className="flex gap-10 mt-32">
              <Image src="/images/logo_03.png" alt="마시마니 김치찜&갈비찜 전문 로고" width={280} height={280} className="hidden md:block" />
              <Image src="/images/logo_04.png" alt="마시마니 황칠 흑염소 전문점 로고" width={280} height={280} className="hidden md:block" />
            </div>
          </motion.div>

          <motion.div className="main-text text-center md:text-start pt-44 md:p-0 px-4 md:absolute md:top-60 md:left-10" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="text-white font-bold text-[40px] md:text-[80px] lg:text-[90px]" variants={fadeInUp}>
              <span className="text-[#F93333] pr-2">간판만 </span>바꿨을뿐인데?
            </motion.h1>

            <motion.p className="text-white font-bold text-4xl lg:text-5xl break-keep mt-20" variants={fadeInUp}>
              <span className="text-[#F93333]">월 1억 달성</span> <br />
              <span className="text-[#F93333]">월 매출 200%</span>
              <br />맛 100% 보장 브랜드
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="#startup-consulting"
                onClick={handleScrollToConsulting}
                className="border-white hover:border-[#F93333] border py-2 px-20 rounded-md inline-flex items-center gap-2 font-medium text-white hover:bg-[#F93333] transition mt-12"
              >
                문의하기
                <span aria-hidden="true" className="text-[#F93333]">
                  &gt;
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center " />
        </div>
      </section>

      <section aria-label="마시마니 황칠 흑염소 창업경쟁력" className="bg-[url('/images/hero_bg2.png')] bg-cover bg-center bg-no-repeat ">
        <motion.div className="w-full h-32 relative overflow-hidden rounded-t-xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
          <Image src="/images/top_Image.png" alt="지붕" fill className="object-cover object-bottom" />
        </motion.div>

        <div className="bg-[url('/images/brand_bg_02.png')] bg-cover bg-center bg-no-repeat py-20 md:py-48 px-4">
          <motion.div
            className="title-wrap flex text-white justify-between w-full max-w-[1440px] item-center mx-auto items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-wrap flex  flex-col md:flex-row items-center gap-10">
              <Image src={"/images/logo_04.png"} alt="마시마니 황칠 흑염소 전문점 로고" width={100} height={100} />
              <h2 className="text-center break-keep">마시마니 황칠 흑염소 전문점 창업경쟁력</h2>
            </div>
            <Link href={"/masimani/goat"}>
              <p className="text-red-600 text-4xl font-bold hidden md:block">{">"}</p>
            </Link>
          </motion.div>
          <motion.div
            className="cardList  max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 my-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="card bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                <span className="text-red-600">최소비용</span>으로 <br /> 업종변경 가능 지원
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                국밥 브랜드에서 업종변경 후 <span className="text-red-600">월 매출 1억</span> 달성 <span className="text-red-600">독립독점 상권역</span> 절대 보장 시스템
              </p>
            </motion.div>
            <motion.div className="card2 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                <span className="text-red-600">꾸준한 수요</span>있는 <br />
                창업 아이템
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                바쁜 시대에 식사 한 끼로 건강·맛·포만감까지 잡는
                <br /> 국내 보양식 전문 프랜차이즈.
              </p>
            </motion.div>
            <motion.div className="card3 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                <span className="text-red-600">성장성</span>을 그대로 가져가세요
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                경기 영향 적고, 시즌을 타지 않는 보양 메뉴로
                <br />
                꾸준한 단골 + 안정적 매출 구조 확보.
              </p>
            </motion.div>
            <motion.div className="card4 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                ONE <span className="text-red-600">교육</span> 시스템
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                조리교육 및 실무현장교육 및 <br />
                실습까지 ONE시스템 <br /> <br /> 단순조리 + 본사 레시피 + 실전 교육 <br /> → 초보 창업자도 빠른 오픈, 빠른 안정화 가능.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section aria-label="마시마니 김치찜&갈비찜 창업경쟁력" className="bg-[url('/images/hero_bg2.png')] bg-cover bg-center bg-no-repeat  ">
        <div className="bg-[url('/images/brand_bg_01.png')] bg-cover bg-center bg-no-repeat py-20 md:py-48  px-4 ">
          <motion.div
            className="title-wrap flex  text-white justify-between w-full max-w-[1440px] item-center mx-auto items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-wrap flex flex-col md:flex-row items-center gap-10">
              <Image src={"/images/logo_03.png"} alt="마시마니 김치찜&갈비찜 전문 로고" width={100} height={100} />
              <h2 className="text-center break-keep">마시마니 김치찜&갈비찜 전문 창업경쟁력</h2>
            </div>
            <Link href={"/masimani/octopus"}>
              <p className="text-red-600 text-4xl font-bold hidden md:block">{">"}</p>
            </Link>
          </motion.div>
          <motion.div
            className="cardList max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 my-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="card bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                초보도 가능한 <span className="text-red-600"> 원팩 시스템</span>
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                21년 검증된 맛, 초보자도 OK!
                <br />
                초간단 원팩시스템의 셋팅하는 조리 운영 시스템
              </p>
            </motion.div>
            <motion.div className="card2 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                <span className="text-red-600"> 억대매출</span> 높은 마진 및 가치성
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">중독성 있는 차별화된 창업 아이템으로 경쟁자 없는 성공의 맛을 느껴보실 수 있습니다.</p>
            </motion.div>
            <motion.div className="card3 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                계절 영향 없는 <span className="text-red-600"> 안정 매출</span>
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                문어·전복 등 프리미엄 재료를 활용한 차별화 메뉴로 <span className="text-red-600">어떤 계절에도 꾸준히 수요</span>가 발생하는 독창적인 메뉴 경쟁력을 갖추고 있습니다.
              </p>
            </motion.div>
            <motion.div className="card4 bg-white text-center rounded-xl py-10 px-4" variants={scaleIn} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <h3 className="font-bold">
                <span className="text-red-600"> 억대매출</span> 높은 마진 및 가치성
              </h3>
              <p className="text-sm px-4 break-keep text-light text-black/80">
                KBS, MBC, SBS, 일본TV 등 약 <span className="text-red-600">50회 이상</span> 방송 및 다양한 언론 보도를 통해브랜드의 대중성·신뢰도가 검증된 외식업체입니다.국내뿐 아니라 싱가포르 등 해외
                진출 경험도 갖춘 확장성 높은 브랜드입니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section aria-label="창업 비용">
        <StartupCostSection />
      </section>
      <section id="startup-consulting" aria-label="창업 상담 문의">
        <Contact />
      </section>
    </>
  );
}
