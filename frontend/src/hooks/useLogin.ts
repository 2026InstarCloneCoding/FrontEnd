import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import type { LoginRequest } from "@/types/auth";

/**
 * 로그인 훅
 * - useMutation(TanStack Query) 대신 useState + async/await 사용
 * - 성공 → AuthContext에 저장 + / 이동
 * - 실패 → error 상태로 UI에서 처리
 */
export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      login(res.member, res.accessToken);
      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "아이디 또는 비밀번호가 올바르지 않습니다.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
