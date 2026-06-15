"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Hero2 from "@/components/common/Hero2";

interface Gallery {
  id: string;
  title: string;
  image_links: string[];
  created_at: string;
}

export default function GalleryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGallery();
    }
  }, [id]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`/api/admin/gallery/${id}`);
      if (response.ok) {
        const data = await response.json() as Gallery;
        setGallery(data);
      } else {
        console.error("갤러리를 불러오는데 실패했습니다.");
        router.push("/gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      router.push("/gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push("/gallery");
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (gallery && gallery.image_links) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.image_links.length);
    }
  };

  const prevImage = () => {
    if (gallery && gallery.image_links) {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.image_links.length) % gallery.image_links.length);
    }
  };

  if (loading) {
    return (
      <div className="bg-white">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="갤러리" title2="" description="마시마니의 다양한 순간을" description2="만나보세요" />
        <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="bg-white">
        <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="갤러리" title2="" description="마시마니의 다양한 순간을" description2="만나보세요" />
        <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">갤러리를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero2 bg="/images/board_bg.png" title="마시마니" highlightText="갤러리" title2="" description="마시마니의 다양한 순간을" description2="만나보세요" />
      <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen">
        {/* 상단 구분선 */}
        <div className="border-t-2 border-gray-300 mb-6"></div>

        {/* 제목 및 날짜 */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{gallery.title}</h1>
          <p className="text-sm text-gray-600 whitespace-nowrap ml-4">
            {new Date(gallery.created_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-gray-300 mb-10"></div>

        {/* 이미지 그리드 */}
        {gallery.image_links && gallery.image_links.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {gallery.image_links.map((imageUrl, index) => (
              <div key={index} onClick={() => openModal(index)} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100">
                <img src={imageUrl} alt={`${gallery.title} 이미지 ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">이미지가 없습니다.</div>
        )}

        {/* 하단 구분선 */}
        <div className="border-t border-gray-300 mb-8"></div>

        {/* 목록 버튼 */}
        <div className="flex justify-center">
          <button onClick={handleGoBack} className="bg-red-600 text-white px-20 py-3 rounded hover:bg-red-700 transition-colors font-medium">
            목록
          </button>
        </div>
      </div>

      {/* 이미지 모달 */}
      {isModalOpen && gallery.image_links && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={closeModal}>
          <button onClick={closeModal} className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10">
            ×
          </button>

          {/* 이전 버튼 */}
          {gallery.image_links.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ‹
            </button>
          )}

          {/* 이미지 */}
          <div className="relative max-w-6xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={gallery.image_links[currentImageIndex]} alt={`${gallery.title} 이미지 ${currentImageIndex + 1}`} className="max-w-full max-h-[90vh] object-contain" />
          </div>

          {/* 다음 버튼 */}
          {gallery.image_links.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ›
            </button>
          )}

          {/* 이미지 카운터 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {gallery.image_links.length}
          </div>
        </div>
      )}
    </div>
  );
}
