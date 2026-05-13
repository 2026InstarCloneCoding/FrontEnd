import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "@/hooks/useSignup";
import { useInput } from "@/hooks/useInput";
import { FloatingInput } from "@/components/common/FloatingInput";
import { cn } from "@/utils/cn";

// ── 생년월일 셀렉트 컴포넌트 ────────────────────────────────
// 인스타 회원가입의 연도/월/일 드롭다운을 구현하는 공통 select 컴포넌트
interface SelectInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

function SelectInput({ id, value, onChange, placeholder, options }: SelectInputProps) {
  return (
    <div className="relative flex-1">
      <select
        id={id}
        value={value}
        onChange={onChange}
        // value가 빈 문자열("") 이면 플레이스홀더(회색), 선택 후엔 검정색
        className={cn(
          "w-full h-14 px-4 border border-gray-300 rounded-2xl bg-white",
          "text-[15px] appearance-none focus:outline-none focus:border-gray-400",
          "transition-colors duration-150 cursor-pointer",
          value === "" ? "text-gray-400" : "text-[#262626]"
        )}
      >
        {/* 기본 선택 안내 옵션 — value=""로 비활성화된 플레이스홀더 역할 */}
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 커스텀 화살표 아이콘 (appearance-none으로 기본 화살표 제거 후 직접 그림) */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── 생년월일 옵션 데이터 생성 ─────────────────────────────
// 연도: 현재 연도부터 1900년까지 역순
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: currentYear - 1899 }, (_, i) => {
  const y = String(currentYear - i);
  return { value: y, label: y };
});

// 월: 1월 ~ 12월
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}월`,
}));

// 일: 1일 ~ 31일
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}일`,
}));

// ── 회원가입 폼 ───────────────────────────────────────────
export default function SignupForm() {
  // useInput 훅으로 각 입력 필드의 값과 onChange를 한 번에 관리
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [name, onChangeName] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [showPassword, setShowPassword] = useState(false);

  // 생년월일: 백엔드에 전송하지 않는 UI 전용 상태
  // (백엔드 SignupRequest에 birthdate 필드 없음 → 추후 추가 예정)
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  // useSignup 훅에서 API 요청 함수와 로딩/에러 상태를 가져옴
  const { mutate: signup, isLoading, error } = useSignup();

  // 제출 버튼 활성화 조건: 모든 필수 필드가 채워져야 함
  // 생년월일은 필수로 포함 (백엔드로 보내진 않더라도 UI 유효성 검사)
  const isActive =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    name.trim().length > 0 &&
    username.trim().length > 0 &&
    birthYear !== "" &&
    birthMonth !== "" &&
    birthDay !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive || isLoading) return;
    // 백엔드로는 email, password, username, name만 전송
    signup({ email, password, username, name });
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* 인스타그램 로고 */}
      <img
        src="/images/instagram-logo.webp"
        alt="Instagram"
        className="w-28 h-auto object-contain mb-6"
      />

      {/* 타이틀 */}
      <h1 className="text-[22px] font-semibold text-[#262626] text-center">
        Instagram에서 시작하기
      </h1>
      <p className="text-[14px] text-[#737373] text-center mt-2 mb-6">
        친구들의 사진과 동영상을 보려면 가입하세요.
      </p>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-[#ed4956] text-sm text-center mb-4 leading-tight w-full">
          {error}
        </p>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        {/* 이메일 입력 */}
        <FloatingInput
          id="signup-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          label="휴대폰 번호 또는 이메일 주소"
          autoComplete="email"
        />

        {/* 알림 안내 문구 */}
        <p className="text-[13px] text-[#737373] leading-tight -mt-1">
          저희가 회원님에게 보내는 알림을 수신할 수 있습니다.{" "}
          <a href="#" className="text-[#0095f6] hover:underline font-medium">
            회원님의 연락처 정보가 필요한 이유를 알아보세요
          </a>
        </p>

        {/* 비밀번호 입력 (표시/숨기기 토글 포함) */}
        <FloatingInput
          id="signup-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onChangePassword}
          label="비밀번호"
          autoComplete="new-password"
          rightSlot={
            password.length > 0 ? (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-[14px] font-semibold text-[#262626] hover:text-[#737373] transition-colors"
              >
                {showPassword ? "숨기기" : "표시"}
              </button>
            ) : null
          }
        />

        {/* 생년월일 (연도/월/일 드롭다운) */}
        <div>
          <label className="block text-[14px] text-[#262626] font-medium mb-2">
            생년월일{" "}
            <span className="text-[#737373] font-normal text-[12px]">ⓘ</span>
          </label>
          <div className="flex gap-2">
            <SelectInput
              id="birth-year"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="연도"
              options={YEAR_OPTIONS}
            />
            <SelectInput
              id="birth-month"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              placeholder="월"
              options={MONTH_OPTIONS}
            />
            <SelectInput
              id="birth-day"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              placeholder="일"
              options={DAY_OPTIONS}
            />
          </div>
        </div>

        {/* 이름 입력 */}
        <FloatingInput
          id="signup-name"
          type="text"
          value={name}
          onChange={onChangeName}
          label="이름"
          autoComplete="name"
        />

        {/* 사용자 이름(username) 입력 */}
        <FloatingInput
          id="signup-username"
          type="text"
          value={username}
          onChange={onChangeUsername}
          label="사용자 이름"
          autoComplete="username"
        />

        {/* 개인정보 안내 문구 */}
        <p className="text-[13px] text-[#737373] leading-tight">
          저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다.{" "}
          <a href="#" className="text-[#0095f6] hover:underline font-medium">더 알아보기</a>
        </p>
        <p className="text-[13px] text-[#737373] leading-tight">
          회원님은 저희가 보내는 SMS를 받을 수 있으며 언제든지 이를 수신 거부할 수 있습니다.{" "}
          <a href="#" className="text-[#0095f6] hover:underline font-medium">더 알아보기</a>
        </p>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={!isActive || isLoading}
          className={cn(
            "w-full mt-2 h-14 rounded-2xl flex items-center justify-center",
            "text-white text-[16px] font-semibold transition-opacity duration-150",
            isActive && !isLoading
              ? "bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer"
              : "bg-[#0095f6] opacity-40 cursor-not-allowed"
          )}
        >
          {isLoading ? "가입 중..." : "제출"}
        </button>
      </form>

      {/* 이미 계정이 있습니다 → 로그인 페이지로 */}
      <Link
        to="/login"
        className={cn(
          "w-full mt-4 flex items-center justify-center h-14",
          "rounded-2xl border border-gray-300",
          "text-[16px] font-semibold text-[#262626]",
          "hover:bg-gray-50 transition-colors"
        )}
      >
        이미 계정이 있습니다
      </Link>

    </div>
  );
}
