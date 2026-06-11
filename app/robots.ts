import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masimani.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── 일반 검색엔진 (전체 허용) ──────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        // 네이버 검색 크롤러
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // 다음/카카오 검색 크롤러
        userAgent: "Daum",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },

      // ── AI 검색 어시스턴트 (사용자에게 답변 제공 목적 → 허용) ───────────
      {
        // ChatGPT가 사용자 요청에 응답할 때 실시간 웹 검색에 사용
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // OpenAI SearchGPT 검색 제품
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // Perplexity AI 검색 (사용자에게 출처와 함께 답변 제공 → 트래픽 유입)
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // Claude가 사용자 요청에 응답할 때 실시간 웹 검색에 사용
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },

      // ── AI 학습 데이터 수집 봇 (콘텐츠 무단 학습 방지 → 차단) ─────────
      {
        // OpenAI GPT 모델 학습용 크롤러
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Google Gemini / Bard AI 모델 학습용 크롤러
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        // Anthropic Claude 모델 학습용 크롤러
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        // 다수의 AI 기업이 학습 데이터셋으로 활용하는 Common Crawl
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        // Meta(Facebook) AI 모델 학습용 크롤러
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        // Meta AI 외부 에이전트
        userAgent: "Meta-ExternalAgent",
        disallow: "/",
      },
      {
        // ByteDance(TikTok 모회사) AI 학습용 크롤러
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        // Apple AI 모델 학습용 크롤러
        userAgent: "Applebot-Extended",
        disallow: "/",
      },
      {
        // AI 기반 데이터 추출 서비스
        userAgent: "Diffbot",
        disallow: "/",
      },
      {
        // Cohere AI 학습용 크롤러
        userAgent: "cohere-ai",
        disallow: "/",
      },
      {
        // Amazon Alexa AI 학습용 크롤러
        userAgent: "Amazonbot",
        disallow: "/",
      },

      // ── 기본 규칙 (위에 명시되지 않은 모든 봇) ──────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
