import LoginForm from "@/components/auth/LoginForm";
import PhoneCarousel from "@/components/auth/PhoneCarousel";

/**
 * 로그인 페이지
 *
 * 데스크톱(lg↑): [좌측 회색 패널 — 로고 + 텍스트 + 폰 이미지] | [우측 흰색 패널 — 로그인 폼]
 * 모바일:         흰 배경에 로그인 폼 중앙 정렬
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1">

        {/* ── 좌측 패널: 회색 배경, 데스크톱만 표시 ── */}
        <div className="hidden lg:flex flex-1 relative">
          <PhoneCarousel />
        </div>

        {/* ── 우측 패널: 흰 배경, 폼 ── */}
        <div className="flex flex-1 lg:flex-none lg:w-165 flex-col justify-center items-center bg-white px-10 py-12 border-l-2 border-gray-200">
          <div className="w-full max-w-145">
            <LoginForm />
          </div>
        </div>

      </main>

      {/* 하단 푸터 */}
      <footer className="bg-white flex flex-col justify-center h-24 text-center border-t-2 border-gray-100">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 mb-4">
          {[
            "Meta", "소개", "블로그", "채용 정보", "도움말",
            "API", "개인정보처리방침", "약관", "위치",
            "Instagram Lite", "Meta AI", "Threads",
            "연락처 업로드 & 비사용자", "Meta Verified",
          ].map((item) => (
            <a key={item} href="#" className="text-[13px] text-[#737373] hover:underline">
              {item}
            </a>
          ))}
        </nav>
        {/* 저작권 문구 + 언어지원도 추가할 예정 */}
        <p className="text-[13px] text-[#737373]">© 2026 Instagram from Meta</p>
      </footer>
    </div>
  );
}
