"use client";
import { useEffect, useState, type FormEvent } from "react";

export default function SalesConsultationLayout() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
    agree: false,
  });

  // ✅ 개인정보 처리방침 모달
  const [openPolicy, setOpenPolicy] = useState(false);

  useEffect(() => {
    if (!openPolicy) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPolicy(false);
    };

    document.addEventListener("keydown", onKeyDown);
    // 스크롤 잠금
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openPolicy]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.contact.trim(),
          message: formData.message.trim(),
        }),
      });

      const j = await res.json().catch(() => null);

      if (!res.ok) {
        alert(j?.error || "전송 실패");
        return;
      }

      alert("문의가 접수되었습니다!");

      setFormData({
        name: "",
        contact: "",
        message: "",
        agree: false,
      });
    } catch (err) {
      alert("네트워크 오류로 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[700px]">
      {/* 왼쪽 섹션 - 히어로 이미지 */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-100 bg-[url('/images/bg_contact.png')] bg-no-repeat" />

        <div className="relative z-10 h-full flex flex-col justify-center items-start p-8 md:p-16 text-white text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight break-keep">
            저희가 매출을
            <br />
            올려드리겠습니다!
          </h2>

          <div className="mt-4 md:mt-12">
            <p className="text-2xl md:text-4xl mb-6">
              <span className="text-white">문의 </span>
              <span className="text-red-500 font-bold">'즉시'</span>
              <span className="text-white break-keep"> 상담 가능합니다.</span>
            </p>

            <div className="flex items-center gap-4 mt-12 text-center">
              <div className="bg-red-500 rounded-full p-3 md:block hidden">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <span className="text-3xl md:text-4xl font-bold break-keep w-full">02-400-1230</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션 - 상담 폼 */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">창업상담문의</h2>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* 성함 입력 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">성함</label>
              <input
                type="text"
                placeholder="성함을 입력해주세요."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900"
                required
              />
            </div>

            {/* 연락처 입력 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                placeholder="연락처를 입력해주세요."
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900"
                required
              />
            </div>

            {/* 문의 내용 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">문의내용</label>
              <textarea
                placeholder="문의 내용을 입력해주세요."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none text-gray-900"
                required
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start gap-3 pb-2">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                className="mt-1 w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="privacy" className="text-sm text-gray-700 flex-1">
                개인정보취급방침을 읽었으며 이에 동의합니다.
                <button type="button" className="ml-2 text-gray-500 underline hover:text-gray-700" onClick={() => setOpenPolicy(true)}>
                  자세히 보기
                </button>
              </label>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E60115] hover:bg-red-600 disabled:opacity-60 text-white font-bold my-2 py-4 px-6 rounded-lg transition duration-200 text-lg"
            >
              {loading ? "전송 중..." : "문의하기"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ 개인정보 처리방침 모달 */}
      {openPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
          {/* 배경 */}
          <button type="button" aria-label="닫기" className="absolute inset-0 bg-black/50" onClick={() => setOpenPolicy(false)} />

          {/* 모달 본문 */}
          <div className="relative z-10 w-[92%] max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 id="privacy-title" className="text-lg font-bold text-gray-900">
                개인정보 처리방침
              </h3>
              <button type="button" onClick={() => setOpenPolicy(false)} className="text-gray-500 hover:text-gray-700 px-2 py-1">
                ✕
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto max-h-[calc(80vh-120px)] text-sm leading-6 text-gray-700 whitespace-pre-line">
              {`개인정보 처리방침
(주)피앤피아이엔씨(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 관련 고충을 신속하고 원활하게 처리하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

제1조 (개인정보의 처리 목적)
회사는 다음의 목적을 위하여 개인정보를 처리합니다.
1. 문의 및 상담 응대
2. 문의 접수 및 내용 확인
3. 상담 및 요청 사항 처리
4. 처리 결과 안내 및 회신

제2조 (처리하는 개인정보 항목)
필수항목: 성명, 연락처(휴대전화번호)
선택항목: 이메일

제3조 (보유 및 이용기간)
문의 처리 완료 후 1년 보관 후 파기 (관련 법령에 따라 보관이 필요한 경우 해당 기간 보관)

제4조 (개인정보의 제3자 제공)
회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.`}
            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button type="button" onClick={() => setOpenPolicy(false)} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
