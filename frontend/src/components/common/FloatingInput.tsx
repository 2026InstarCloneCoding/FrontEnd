import { useState } from "react";
import { cn } from "@/utils/cn";

// ── 플로팅 라벨 인풋 ─────────────────────────────────────────
// LoginForm, SignupForm 등 여러 폼에서 공통으로 사용하는 입력 컴포넌트
// 포커스하거나 값이 있을 때 라벨이 위로 떠오르는 인스타 스타일 입력창

export interface FloatingInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  autoComplete?: string;
  // 비밀번호 표시/숨기기 버튼처럼 오른쪽에 들어가는 추가 요소
  rightSlot?: React.ReactNode;
}

export function FloatingInput({
  id,
  type = "text",
  value,
  onChange,
  label,
  autoComplete,
  rightSlot,
}: FloatingInputProps) {
  // isFocused: input에 현재 포커스가 있는지 여부
  const [isFocused, setIsFocused] = useState(false);
  // isFloating: 포커스 중이거나 값이 있을 때 라벨을 위로 띄움
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
            ? "top-0.5 text-[12px]"              // 떠오를 때: 작아지고 위로
            : "top-1/2 -translate-y-1/2 text-[15px]" // 기본: 중앙에 플레이스홀더처럼
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
          // 라벨이 떠오르면 입력 텍스트가 라벨과 겹치지 않도록 아래로 밀기
          isFloating ? "pt-2.5" : "pt-0"
        )}
      />

      {/* 오른쪽 슬롯 (예: 비밀번호 표시/숨기기 버튼) */}
      {rightSlot && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          {rightSlot}
        </div>
      )}
    </div>
  );
}
