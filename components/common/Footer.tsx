import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-white/80 flex flex-col items-center mx-auto py-20 gap-6">
      <div className="text-start">
        <h4>주식회사 피앤피아이앤씨</h4>
        <p className="text-sm">
          대표자: 최명성 | 사업자 번호: 211-87-40374
          <br />
          전화 번호: 010-3712-0077
          <br />
          주소: 서울특별시 송파구 마천로 196(오금동, 201호(B03호))
        </p>
        <p className="text-xs text-white/50 mt-4">© {new Date().getFullYear()} 주식회사 피앤피아이앤씨. All rights reserved.</p>
      </div>
      <Link
        href="https://www.weasley-market.com/homepage-development"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-white/40 hover:text-white/70 transition"
      >
        Designed &amp; Developed by 글로벌엠아이지
      </Link>
    </footer>
  );
}
