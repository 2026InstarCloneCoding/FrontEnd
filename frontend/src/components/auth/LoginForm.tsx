import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { useInput } from "@/hooks/useInput";
import { cn } from "@/utils/cn";

// ── 플로팅 라벨 인풋 ──────────────────────────────────────
interface FloatingInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
}

function FloatingInput({
  id,
  type = "text",
  value,
  onChange,
  label,
  autoComplete,
  rightSlot,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div
      className={cn(
        "relative w-full h-14 border rounded-2xl bg-white transition-colors duration-150",
        isFocused ? "border-gray-400" : "border-gray-300"
      )}
    >
      {/* 플로팅 라벨 — 포커스/값 입력 시 위로 이동 */}
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 pointer-events-none text-gray-400 transition-all duration-200 z-10",
          isFloating
            ? "top-2.5 text-[12px]" // 떠오를 때 텍스트 위치 및 크기 조정
            : "top-1/2 -translate-y-1/2 text-[15px]" // 기본 상태일 때 텍스트 크기 증가
        )}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete={autoComplete}
        className={cn(
          "absolute inset-0 w-full h-full bg-transparent rounded-2xl px-4 text-[15px] text-[#262626] z-0",
          "focus:outline-none",
          rightSlot ? "pr-20" : "pr-4",
          isFloating ? "pt-2.5" : "pt-0" // 라벨이 떠오르면 텍스트가 겹치지 않게 아래로 밀어줌
        )}
      />

      {rightSlot && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          {rightSlot}
        </div>
      )}
    </div>
  );
}

// ── 로그인 폼 ─────────────────────────────────────────────
export default function LoginForm() {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isLoading, error } = useLogin();

  const isActive = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive || isLoading) return;
    login({ email, password });
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* 헤더: Instagram으로 로그인 */}
      <div className="flex justify-center items-center w-full">
        <span className="text-[22px] font-semibold text-[#262626]">
          Instagram으로 로그인
        </span>
      </div>

      {/* 구분 여백 */}
      <div className="h-8" />

      {/* 에러 메시지 */}
      {error && (
        <p className="text-[#ed4956] text-sm text-center mb-4 leading-tight w-full">
          {error}
        </p>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        <FloatingInput
          id="email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          label="이메일 주소"
          autoComplete="email"
        />

        <FloatingInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onChangePassword}
          label="비밀번호"
          autoComplete="current-password"
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

        {/* 로그인 버튼 */}
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
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 구분 여백 */}
      <div className="h-3" />
      {/* 비밀번호 찾기 */}
      <Link
        to="/accounts/password/reset"
        className="text-[15px] text-[#262626] mt-6 hover:underline"
      >
        비밀번호를 잊으셨나요?
      </Link>

      {/* 구분 여백 */}
      <div className="h-20" />

      {/* Facebook 로그인 */}
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-center gap-2 h-14",
          "rounded-2xl border border-gray-300",
          "text-[16px] font-semibold text-[#385185]",
          "hover:bg-gray-50 transition-colors"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" className="w-6 h-6 shrink-0">
          <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
        Facebook으로 로그인
      </button>

      {/* 구분 여백 */}
      <div className="h-3" />

      {/* 새 계정 만들기 */}
      <button
        type="button"
        className={cn(
          "w-full mt-4 flex items-center justify-center h-14",
          "rounded-2xl border border-[#0095f6]",
          "text-[16px] font-semibold text-[#0095f6]",
          "hover:bg-blue-50 transition-colors"
        )}
      >
        새 계정 만들기
      </button>

      {/* Meta 로고 */}
      <div className="mt-12 flex items-center gap-1.5">
      </div>

    </div>
  );
}