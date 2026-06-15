"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posted_at: "",
    name: "",
    location: "",
    phone: "",
    map_link: "",
    image_links: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/${type}/${id}`);
      const data = await response.json() as Record<string, unknown>;

      setFormData({
        title: (data.title as string) || "",
        description: (data.description as string) || "",
        posted_at: (data.posted_at as string) || "",
        name: (data.name as string) || "",
        location: (data.location as string) || "",
        phone: (data.phone as string) || "",
        map_link: (data.map_link as string) || "",
        image_links: (data.image_links as string[]) || [],
      });
    } catch (error) {
      alert("데이터를 불러오는데 실패했습니다.");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image_links: formData.image_links,
        }),
      });

      if (response.ok) {
        alert("수정되었습니다.");
        router.push("/admin/dashboard");
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {type === "notices" && "공지사항 수정"}
              {type === "gallery" && "갤러리 수정"}
              {type === "branches" && "지점 수정"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === "notices" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">게시일</label>
                  <input
                    type="date"
                    required
                    value={formData.posted_at}
                    onChange={(e) => setFormData({ ...formData, posted_at: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <ImageUploader images={formData.image_links} onImagesChange={(images) => setFormData({ ...formData, image_links: images })} maxImages={10} />
              </>
            )}

            {type === "gallery" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <ImageUploader images={formData.image_links} onImagesChange={(images) => setFormData({ ...formData, image_links: images })} maxImages={20} />
              </>
            )}

            {type === "branches" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지점명</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">위치</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지도 링크</label>
                  <input
                    type="url"
                    required
                    value={formData.map_link}
                    onChange={(e) => setFormData({ ...formData, map_link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                {loading ? "저장 중..." : "저장"}
              </button>
              <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
