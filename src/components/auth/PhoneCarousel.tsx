/**
 * 로그인 페이지 좌측 패널
 * - 데스크톱(lg 이상)에서만 표시
 * - Instagram 로고 (좌측 상단 고정)
 * - 그라데이션 문구 (폰 이미지 위)
 * - 폰 콜라주 이미지
 */
export default function PhoneCarousel() {
  return (
    <div className="w-full h-full flex flex-col relative">

      {/* 인스타그램 로고 — 좌측 상단 */}
      <div className="absolute top-14 left-16">
        <img
          src="/images/instagram-logo.webp"
          alt="Instagram"
          className="w-19 h-auto object-contain"
        />
      </div>

      {/* 중앙 콘텐츠: 텍스트 + 폰 이미지 */}
      <div className="flex flex-col items-center justify-center flex-1 gap-10 pb-8 px-12 translate-y-12.5">

        {/* 그라데이션 문구 */}
        <h2 className="text-[40px] font-medium text-center leading-tight text-gray-800 break-keep">
          <span
            style={{
              /* Instagram 브랜드 그라데이션 */
              background: "linear-gradient(90deg, #E1306C 0%, #F77737 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
          }}
          >
          친한 친구
          </span>
          의 일상 속 순간들을 확인해<br/>보세요.
        </h2>
        

        {/* 폰 이미지 */}
        <img
          src="/images/login-img.webp"
          alt="Instagram app preview"
          className="w-120 max-w-full h-auto object-contain"
        />

      </div>
    </div>
  );
}
