import SignupForm from "@/components/auth/SignupForm";
import Footer from "@/components/common/Footer";

/**
 * 회원가입 페이지
 *
 * 로그인 페이지와 달리 좌측 폰 이미지 패널 없이
 * 흰 배경 + 중앙 폼 단일 레이아웃으로 구성
 * (실제 인스타그램 회원가입 페이지 구조와 동일)
 */
export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1 justify-center items-start py-10 px-4">

        {/* 폼 영역: 최대 너비를 제한해 중앙 정렬 */}
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>

      </main>

      {/* 로그인 페이지와 공유하는 Footer 컴포넌트 */}
      <Footer />
    </div>
  );
}
