import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { useInput } from "@/hooks/useInput";
import { cn } from "@/utils/cn";

export default function LoginForm() {
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isLoading, error } = useLogin();

  const isActive = username.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive || isLoading) return;
    login({ username, password });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[350px] mx-auto">

      {/* ── 로그인 박스 ── */}
      <div className="w-full border border-[#dbdbdb] bg-white px-10 pt-10 pb-6 flex flex-col items-center">

        {/* 인스타그램 워드마크 */}
        <h1
          className="text-[#000000] mb-8 select-none"
          style={{
            fontFamily: "'Grand Hotel', cursive",
            fontSize: "3rem",
            lineHeight: 1,
          }}
        >
          Instagram
        </h1>

        {/* 에러 메시지 */}
        {error && (
          <p className="text-[#ed4956] text-sm text-center mb-3 leading-tight">
            {error}
          </p>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[6px]">
          {/* 사용자 이름 */}
          <input
            type="text"
            value={username}
            onChange={onChangeUsername}
            placeholder="전화번호, 사용자 이름 또는 이메일"
            autoComplete="username"
            className={cn(
              "w-full bg-[#fafafa] border border-[#dbdbdb] rounded-[3px]",
              "text-[12px] text-[#262626] placeholder:text-[#737373]",
              "px-2 py-[9px]",
              "focus:outline-none focus:border-[#a8a8a8] focus:bg-white",
              "transition-colors duration-150"
            )}
          />

          {/* 비밀번호 */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호"
              autoComplete="current-password"
              className={cn(
                "w-full bg-[#fafafa] border border-[#dbdbdb] rounded-[3px]",
                "text-[12px] text-[#262626] placeholder:text-[#737373]",
                "px-2 py-[9px] pr-16",
                "focus:outline-none focus:border-[#a8a8a8] focus:bg-white",
                "transition-colors duration-150"
              )}
            />
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#262626] hover:text-[#737373]"
              >
                {showPassword ? "숨기기" : "표시"}
              </button>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isActive || isLoading}
            className={cn(
              "w-full mt-2 py-[7px] rounded-[8px]",
              "text-white text-sm font-semibold transition-opacity duration-150",
              isActive && !isLoading
                ? "bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer"
                : "bg-[#0095f6] opacity-40 cursor-not-allowed"
            )}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* OR 구분선 */}
        <div className="flex items-center w-full my-4 gap-3">
          <div className="flex-1 h-px bg-[#dbdbdb]" />
          <span className="text-[13px] font-semibold text-[#737373]">또는</span>
          <div className="flex-1 h-px bg-[#dbdbdb]" />
        </div>

        {/* Facebook 로그인 */}
        <button
          type="button"
          className="flex items-center gap-2 text-[14px] font-semibold text-[#385185] hover:text-[#1c3a6e] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#385185" className="w-4 h-4">
            <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
          Facebook으로 로그인
        </button>

        {/* 비밀번호 찾기 */}
        <Link
          to="/accounts/password/reset"
          className="text-xs text-[#00376b] mt-4 hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      {/* ── 회원가입 유도 ── */}
      <div className="w-full border border-[#dbdbdb] bg-white mt-2 py-4 text-center text-sm">
        계정이 없으신가요?{" "}
        <Link to="/accounts/signup" className="text-[#0095f6] font-semibold hover:text-[#1877f2]">
          가입하기
        </Link>
      </div>

      {/* ── 앱 다운로드 ── */}
      <div className="mt-4 text-center">
        <p className="text-sm text-[#262626] mb-3">앱을 다운로드하세요.</p>
        <div className="flex gap-2 justify-center">
          <a href="#">
            <img src="/images/appStore.png" alt="App Store" className="h-10 w-auto" />
          </a>
          <a href="#">
            <img src="/images/googlePlay.png" alt="Google Play" className="h-10 w-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
