import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import type { SignupRequest } from "@/types/auth";

/**
 * 회원가입 훅
 * - useLogin과 동일한 패턴: useState + async/await
 * - 성공 → 로그인 페이지로 이동 (회원가입 후 바로 로그인하도록 UX 유도)
 * - 실패 → error 상태로 UI에서 에러 메시지 표시
 */
export function useSignup() {
  // React Router의 navigate: 페이지 이동 담당
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      // authService.signup() → POST /api/auth/signup 요청
      await authService.signup(data);
      // 회원가입 성공 → 로그인 페이지로 이동
      navigate("/login");
    } catch (err: unknown) {
      // 백엔드 에러 (이메일 중복, 유저네임 중복 등) 처리
      const message =
        err instanceof Error ? err.message : "회원가입에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    } finally {
      // 성공/실패 상관없이 로딩 해제
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
