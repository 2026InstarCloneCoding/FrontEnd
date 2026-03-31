import LoginForm from "@/components/auth/LoginForm";
import PhoneCarousel from "@/components/auth/PhoneCarousel";

/**
 * 로그인 페이지
 *
 * 데스크톱 (lg↑): [폰 이미지] | [로그인 폼]
 * 모바일:         [로그인 폼] 중앙 정렬
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* 중앙 콘텐츠 */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="flex items-center gap-8 w-full max-w-[935px]">
          {/* 좌측: 폰 이미지 (데스크톱만) */}
          <PhoneCarousel />

          {/* 우측: 로그인 폼 */}
          <div className="flex flex-col w-full lg:w-[350px] shrink-0">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="pb-8 text-center">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4 px-4">
          {[
            "Meta", "소개", "블로그", "채용 정보", "도움말",
            "API", "개인정보처리방침", "약관", "위치", "인기 계정",
            "해시태그", "언어",
          ].map((item) => (
            <a key={item} href="#" className="text-[11px] text-[#737373] hover:underline">
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[11px] text-[#737373]">© 2026 Instagram from Meta</p>
      </footer>
    </main>
  );
}
