"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Hero2 from "@/components/common/Hero2";

interface Notice {
  id: string;
  title: string;
  description: string;
  posted_at: string;
  image_links: string[];
  created_at: string;
}

export default function BoardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNotice();
    }
  }, [id]);

  const fetchNotice = async () => {
    try {
      const response = await fetch(`/api/admin/notices/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNotice(data);
      } else {
        console.error("공지사항을 불러오는데 실패했습니다.");
        router.push("/board");
      }
    } catch (error) {
      console.error("Error fetching notice:", error);
      router.push("/board");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push("/board");
  };

  if (loading) {
    return (
      <div className="bg-white">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="공지사항" title2="" description="마시마니의 새로운 소식을" description2="확인해보세요" />
        <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="bg-white">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="공지사항" title2="" description="마시마니의 새로운 소식을" description2="확인해보세요" />
        <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">공지사항을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="공지사항" title2="" description="마시마니의 새로운 소식을" description2="확인해보세요" />
      <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen">
        {/* 상단 구분선 */}
        <div className="border-t-2 border-gray-300 mb-6"></div>

        {/* 제목 및 날짜 */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{notice.title}</h1>
          <p className="text-sm text-gray-600 whitespace-nowrap ml-4">
            {new Date(notice.posted_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-gray-300 mb-10"></div>

        {/* 이미지들 */}
        {notice.image_links && notice.image_links.length > 0 && (
          <div className="space-y-8 mb-12">
            {notice.image_links.map((imageUrl, index) => (
              <div key={index} className="flex justify-center">
                <div className="relative w-full max-w-3xl">
                  <img src={imageUrl} alt={`${notice.title} 이미지 ${index + 1}`} className="w-full h-auto rounded-lg object-contain" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 내용 */}
        <div className="mb-12">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{notice.description}</p>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-gray-300 mb-8"></div>

        {/* 목록 버튼 */}
        <div className="flex justify-center">
          <button onClick={handleGoBack} className="bg-red-600 text-white px-20 py-3 rounded hover:bg-red-700 transition-colors font-medium">
            목록
          </button>
        </div>
      </div>
    </div>
  );
}
