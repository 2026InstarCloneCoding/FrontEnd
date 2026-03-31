/**
 * 로그인 페이지 좌측 폰 목업 이미지
 * 데스크톱(lg 이상)에서만 표시
 */
export default function PhoneCarousel() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 pr-8">
      <img
        src="/images/login-phones.webp"
        alt="Instagram app preview"
        className="w-[380px] object-contain"
      />
    </div>
  );
}
