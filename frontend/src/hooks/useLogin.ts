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
  // React Router의 navigate 함수 : 페이지 이동을 담당
  const navigate = useNavigate();
  // AuthContext에서 제공하는 login 함수 : 로그인 성공 시 사용자 정보와 토큰을 저장
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // mutate 함수 : 로그인 요청을 보내고 결과에 따라 상태를 업데이트
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
