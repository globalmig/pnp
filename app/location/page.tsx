"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Hero2 from "@/components/common/Hero2";
import Contact from "@/components/common/Contact";
import Card from "@/components/location/Card";
import { motion, Variants } from "framer-motion";

interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  map_link: string;
  created_at: string;
}

/** 애니메이션 프리셋 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export default function LocationPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/admin/branches");
      if (response.ok) {
        const data = await response.json() as Branch[];
        setBranches(data);
      } else {
        console.error("지점 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      <Hero2 bg="/images/menus_bg.png" title="마시마니" highlightText="매장소개" title2="" description="전국 지점 정보를 한눈에 " description2="확인하세요" />

      {/* 지붕 */}
      <motion.div className="w-full mx-auto" variants={fadeDown} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.7 }}>
        <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
          <Image src="/images/top_Image.png" alt="지붕" fill className="object-cover" priority />
        </div>
      </motion.div>

      <section>
        {/* 타이틀 */}
        <motion.div className="flex justify-center items-center gap-10 pt-10 flex-col md:flex-row" variants={staggerWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <motion.div variants={fadeUp}>
            <Image src={"/images/main_logo.png"} alt="마시마니 로고" width={200} height={200} className="w-32 md:w-40" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-red-500 text-5xl">
            신규 매장
          </motion.h2>
        </motion.div>

        <div className="cardList max-w-[1440px] mx-auto">
          {loading ? (
            <motion.div className="my-14 flex justify-center items-center min-h-[300px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <div className="text-white text-lg">로딩 중...</div>
            </motion.div>
          ) : branches.length === 0 ? (
            <motion.div className="my-14 flex justify-center items-center min-h-[300px]" variants={fadeUp} initial="hidden" animate="show">
              <div className="text-white text-lg">등록된 지점이 없습니다.</div>
            </motion.div>
          ) : (
            <motion.div
              className="my-14 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4"
              variants={staggerWrap}
              initial="hidden"
              animate={!loading ? "show" : "hidden"} // loading이 끝나면 show
              key={branches.length} // 데이터가 변경되면 애니메이션 재실행
            >
              {branches.map((branch) => (
                <motion.div key={branch.id} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                  <Card name={branch.name} locationTitle={branch.name} phone={branch.phone} link={branch.map_link} address={branch.location} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <Contact />
        </motion.div>
      </section>
    </div>
  );
}
