"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, LogOut, Bell, LayoutGrid, MapPin, LayoutDashboard, X, Loader2, Image as ImageIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

type Gallery = {
  id: string;
  title: string;
  image_links: string[];
  created_at: string;
};

type Notice = {
  id: string;
  title: string;
  description: string;
  posted_at: string;
  image_links: string[];
  created_at: string;
};

type Branch = {
  id: string;
  name: string;
  location: string;
  phone: string;
  map_link: string;
  created_at: string;
};

type TabType = "notices" | "gallery" | "branches";
type ModalMode = "create" | "edit" | null;

const initialFormData = {
  title: "",
  description: "",
  posted_at: "",
  name: "",
  location: "",
  phone: "",
  map_link: "",
  image_links: [] as string[],
};

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("notices");
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/admin/verify");
    if (!res.ok) router.push("/admin");
  };

  const fetchSingle = async (tab: TabType) => {
    try {
      const res = await fetch(`/api/admin/${tab}`);
      const data = await res.json();
      if (!Array.isArray(data)) return;
      if (tab === "notices") setNotices(data as Notice[]);
      else if (tab === "gallery") setGallery(data as Gallery[]);
      else if (tab === "branches") setBranches(data as Branch[]);
    } catch {
      console.error(`${tab} 로드 실패`);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchSingle("notices"), fetchSingle("gallery"), fetchSingle("branches")]);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await fetchSingle(activeTab);
    } catch {
      alert("삭제 실패");
    }
  };

  const openCreateModal = () => {
    setFormData({
      ...initialFormData,
      posted_at: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setModalMode("create");
  };

  const openEditModal = async (id: string) => {
    setEditingId(id);
    setModalMode("edit");
    setModalLoading(true);
    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}`);
      const data = await res.json() as Record<string, unknown>;
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
    } catch {
      alert("데이터를 불러오는데 실패했습니다.");
      setModalMode(null);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/${activeTab}/${editingId}` : `/api/admin/${activeTab}`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        closeModal();
        await fetchSingle(activeTab);
      } else {
        alert("저장 실패");
      }
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const tabs = [
    { key: "notices" as TabType, label: "공지사항", icon: Bell, count: notices.length },
    { key: "gallery" as TabType, label: "갤러리", icon: LayoutGrid, count: gallery.length },
    { key: "branches" as TabType, label: "지점", icon: MapPin, count: branches.length },
  ];

  const modalTitles: Record<TabType, Record<"create" | "edit", string>> = {
    notices: { create: "공지사항 작성", edit: "공지사항 수정" },
    gallery: { create: "갤러리 작성", edit: "갤러리 수정" },
    branches: { create: "지점 추가", edit: "지점 수정" },
  };

  const activeTabMeta = tabs.find((t) => t.key === activeTab)!;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-sm flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-0.5">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            <span className="text-base font-bold text-gray-900">마시마니</span>
          </div>
          <p className="text-xs text-gray-400 pl-7">관리자 대시보드</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                {label}
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === key ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{count}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{activeTabMeta.label}</h2>
            <p className="text-xs text-gray-400 mt-0.5">총 {activeTabMeta.count}건</p>
          </div>
          <button onClick={openCreateModal} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            새로 작성
          </button>
        </header>

        {/* Stats Cards */}
        <div className="px-8 pt-6 grid grid-cols-3 gap-4">
          {tabs.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`bg-white rounded-xl p-5 shadow-sm text-left border-2 transition-all hover:shadow-md ${activeTab === key ? "border-blue-500" : "border-transparent"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
                <div className={`p-2 rounded-lg ${activeTab === key ? "bg-blue-50" : "bg-gray-50"}`}>
                  <Icon className={`w-4 h-4 ${activeTab === key ? "text-blue-600" : "text-gray-400"}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-400 mt-1">전체 항목 수</p>
            </button>
          ))}
        </div>

        {/* Content Table */}
        <div className="px-8 py-6 flex-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                {activeTab === "notices" && <NoticesTable notices={notices} onDelete={handleDelete} onEdit={openEditModal} />}
                {activeTab === "gallery" && <GalleryGrid gallery={gallery} onDelete={handleDelete} onEdit={openEditModal} />}
                {activeTab === "branches" && <BranchesTable branches={branches} onDelete={handleDelete} onEdit={openEditModal} />}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">{modalMode === "create" ? modalTitles[activeTab].create : modalTitles[activeTab].edit}</h3>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {modalLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : (
                <form id="modal-form" onSubmit={handleSubmit} className="space-y-5">
                  {activeTab === "notices" && (
                    <>
                      <Field label="제목">
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="공지사항 제목" />
                      </Field>
                      <Field label="내용">
                        <textarea
                          required
                          rows={5}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className={inputClass}
                          placeholder="공지사항 내용을 입력하세요"
                        />
                      </Field>
                      <Field label="게시일">
                        <input type="date" required value={formData.posted_at} onChange={(e) => setFormData({ ...formData, posted_at: e.target.value })} className={inputClass} />
                      </Field>
                      <ImageUploader images={formData.image_links} onImagesChange={(imgs) => setFormData({ ...formData, image_links: imgs })} maxImages={10} />
                    </>
                  )}

                  {activeTab === "gallery" && (
                    <>
                      <Field label="제목">
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="갤러리 제목" />
                      </Field>
                      <ImageUploader images={formData.image_links} onImagesChange={(imgs) => setFormData({ ...formData, image_links: imgs })} maxImages={20} />
                    </>
                  )}

                  {activeTab === "branches" && (
                    <>
                      <Field label="지점명">
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="지점명" />
                      </Field>
                      <Field label="위치">
                        <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} placeholder="주소" />
                      </Field>
                      <Field label="연락처">
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="010-0000-0000" />
                      </Field>
                      <Field label="지도 링크">
                        <input type="url" required value={formData.map_link} onChange={(e) => setFormData({ ...formData, map_link: e.target.value })} className={inputClass} placeholder="https://" />
                      </Field>
                    </>
                  )}
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                취소
              </button>
              <button
                type="submit"
                form="modal-form"
                disabled={saving || modalLoading}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-0.5">
      <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="수정">
        <Pencil className="w-4 h-4" />
      </button>
      <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="삭제">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="py-20 text-center text-sm text-gray-400">{message}</div>;
}

function NoticesTable({ notices, onDelete, onEdit }: { notices: Notice[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  if (notices.length === 0) return <EmptyState message="등록된 공지사항이 없습니다." />;
  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">제목</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">게시일</th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">작업</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {notices.map((notice) => (
          <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{notice.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{notice.posted_at}</td>
            <td className="px-6 py-4 flex justify-end">
              <ActionButtons onEdit={() => onEdit(notice.id)} onDelete={() => onDelete(notice.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GalleryGrid({ gallery, onDelete, onEdit }: { gallery: Gallery[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  if (gallery.length === 0) return <EmptyState message="등록된 갤러리가 없습니다." />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {gallery.map((item) => (
        <div key={item.id} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
          {item.image_links[0] ? (
            <img src={item.image_links[0]} alt={item.title} className="w-full h-44 object-cover" />
          ) : (
            <div className="w-full h-44 bg-gray-50 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-200" />
            </div>
          )}
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">{item.title}</p>
            <div className="flex justify-end">
              <ActionButtons onEdit={() => onEdit(item.id)} onDelete={() => onDelete(item.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BranchesTable({ branches, onDelete, onEdit }: { branches: Branch[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  if (branches.length === 0) return <EmptyState message="등록된 지점이 없습니다." />;
  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">지점명</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">위치</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">연락처</th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">작업</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {branches.map((branch) => (
          <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{branch.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{branch.location}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{branch.phone}</td>
            <td className="px-6 py-4">
              <div className="flex justify-end">
                <ActionButtons onEdit={() => onEdit(branch.id)} onDelete={() => onDelete(branch.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
