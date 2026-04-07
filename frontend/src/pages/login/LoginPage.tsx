import LoginForm from "@/components/auth/LoginForm";
import PhoneCarousel from "@/components/auth/PhoneCarousel";
// 공통 푸터 컴포넌트: 로그인·회원가입 페이지에서 공유
import Footer from "@/components/common/Footer";

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

        {/* ── 좌측 패널: 회색 배경, 데스크톱만 표시 hidden lg:flex ── */}
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

      {/* 공통 푸터 컴포넌트 사용 */}
      <Footer />
    </div>
  );
}
