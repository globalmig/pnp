"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ images, onImagesChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`업로드 중... (${i + 1}/${files.length})`);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json() as { error?: string };
          throw new Error(error.error || "업로드 실패");
        }

        const data = await response.json() as { url: string };
        uploadedUrls.push(data.url);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("Upload error:", msg);
        alert(`${file.name} 업로드 실패: ${msg}`);
      }
    }

    onImagesChange([...images, ...uploadedUrls]);
    setUploading(false);
    setUploadProgress("");

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async (index: number) => {
    if (!confirm("이미지를 삭제하시겠습니까?")) return;

    const imageUrl = images[index];

    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName }),
        });
      } catch (error) {
        console.error("Delete error:", error);
      }
    }

    // 목록에서 제거
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 업로드 ({images.length}/{maxImages})
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          disabled={uploading || images.length >= maxImages}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {uploading && <p className="mt-2 text-sm text-blue-600">{uploadProgress}</p>}

        <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBP, GIF 형식 지원 (최대 10MB)</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img src={url} alt={`업로드 이미지 ${index + 1}`} className="w-full h-32 object-cover rounded-lg border border-gray-200" />

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveImage(index, "up")}
                  disabled={index === 0}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-white text-gray-700 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveImage(index, "down")}
                  disabled={index === images.length - 1}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-white text-gray-700 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
                <button type="button" onClick={() => handleRemoveImage(index)} className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                  삭제
                </button>
              </div>

              <div className="absolute top-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">{index + 1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
