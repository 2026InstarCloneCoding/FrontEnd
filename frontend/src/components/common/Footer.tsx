// ── 공통 푸터 컴포넌트 ─────────────────────────────────────
// 로그인, 회원가입 등 여러 페이지에서 공통으로 사용하는 하단 푸터
// 기존에 LoginPage에 인라인으로 있던 코드를 컴포넌트로 분리

const FOOTER_LINKS = [
  "Meta", "소개", "블로그", "채용 정보", "도움말",
  "API", "개인정보처리방침", "약관", "위치",
  "Instagram Lite", "Meta AI", "Threads",
  "연락처 업로드 & 비사용자", "Meta Verified",
];

export default function Footer() {
  return (
    <footer className="bg-white flex flex-col justify-center h-24 text-center border-t-2 border-gray-100">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 mb-4">
        {FOOTER_LINKS.map((item) => (
          <a key={item} href="#" className="text-[13px] text-[#737373] hover:underline">
            {item}
          </a>
        ))}
      </nav>
      <p className="text-[13px] text-[#737373]">© 2026 Instagram from Meta</p>
    </footer>
  );
}
