"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";

interface Gallery {
  id: string;
  title: string;
  image_links: string[];
  created_at: string;
}

export default function GalleryListPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/admin/gallery");
      if (response.ok) {
        const data = await response.json() as Gallery[];
        setGallery(data);
      } else {
        console.error("갤러리를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (id: string) => {
    router.push(`/gallery/${id}`);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(gallery.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGallery = gallery.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지 번호 배열 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="bg-white ">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="갤러리" title2="" description="마시마니의 다양한 순간을" description2="만나보세요" />
        <div className="max-w-7xl mx-auto py-10 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white ">
      <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="갤러리" title2="" description="마시마니의 다양한 순간을" description2="만나보세요" />
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* 갤러리 그리드 */}
        {gallery.length === 0 ? (
          <div className="text-center py-20 text-gray-500">등록된 갤러리가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentGallery.map((item) => (
              <div key={item.id} onClick={() => handleItemClick(item.id)} className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* 썸네일 이미지 */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  {item.image_links && item.image_links.length > 0 ? (
                    <img src={item.image_links[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">이미지 없음</div>
                  )}

                  {/* 이미지 개수 표시 */}
                  {item.image_links && item.image_links.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">{item.image_links.length}장</div>
                  )}
                </div>

                {/* 제목 */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(item.created_at).toLocaleDateString("ko-KR")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>

            {getPageNumbers().map((page) => (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded ${currentPage === page ? "bg-red-600 text-white" : "border border-gray-300 hover:bg-gray-50"}`}>
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
