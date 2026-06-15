"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";
import Image from "next/image";

interface Notice {
  id: string;
  title: string;
  description: string;
  posted_at: string;
  image_links: string[];
  created_at: string;
}

export default function BoardListPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/admin/notices");
      if (response.ok) {
        const data = await response.json();
        setNotices(data as Notice[]);
      } else {
        console.error("공지사항을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/board/${id}`);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

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
      <div className="bg-white">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="공지사항" title2="" description="마시마니의 새로운 소식을" description2="확인해보세요" />
        <div className="max-w-6xl mx-auto py-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="공지사항" title2="" description="마시마니의 새로운 소식을" description2="확인해보세요" />
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* 테이블 */}
        <div className="overflow-x-auto">
          {notices.length === 0 ? (
            <div className="text-center py-20 text-gray-500">등록된 공지사항이 없습니다.</div>
          ) : (
            <table className="w-full border-collapse">
              {/* 헤더 */}
              <thead>
                <tr className="border-t-2 border-b border-gray-300">
                  <th className="py-4 px-2 md:px-6 text-left text-sm font-medium text-gray-900 w-12 md:w-16"></th>
                  <th className="py-4 px-2 md:px-6 text-center text-sm font-medium text-gray-900">제목</th>
                  <th className="py-4 px-2 md:px-6 text-right text-sm font-medium text-gray-900 w-20 md:w-28">등록일</th>
                </tr>
              </thead>

              {/* 바디 */}
              <tbody>
                {currentNotices.map((notice, index) => {
                  return (
                    <tr
                      key={notice.id}
                      onClick={() => handleRowClick(notice.id)}
                      className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-4 px-2 md:px-6 text-sm text-gray-900">
                        <div className="w-8 h-8 md:w-10 md:h-10 relative">
                          <Image src={"/images/logo.png"} alt="마시마니로고" fill sizes="40px" className="object-contain" />
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-6 text-sm text-center text-gray-900 truncate max-w-0">{notice.title}</td>
                      <td className="py-4 px-2 md:px-6 text-xs md:text-sm text-right text-gray-900 whitespace-nowrap">
                        <span className="md:hidden">
                          {new Date(notice.posted_at).toLocaleDateString("ko-KR", {
                            year: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                        <span className="hidden md:inline">
                          {new Date(notice.posted_at).toLocaleDateString("ko-KR", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-1 md:gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 md:px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 md:px-4 py-2 text-sm rounded ${currentPage === page ? "bg-red-600 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 md:px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
