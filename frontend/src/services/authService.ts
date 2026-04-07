import { apiClient } from "@/services/client";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "@/types/auth";

// 백엔드 모든 응답은 ApiResponse<T> 래퍼로 감싸져 있음: { success, data, message }
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const authService = {
  // 로그인 API 호출 : POST /api/auth/login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // res.data = ApiResponse<LoginResponse> → .data로 한 번 더 벗겨야 실제 데이터 이유 : axios 인터셉터에서 SNAKE_CASE → camelCase 변환 후 반환하기 때문
    const res = await apiClient.post<ApiResponse<LoginResponse>>("/api/auth/login", data);
    return res.data.data;
  },

  // 회원가입 API 호출 : POST /api/auth/signup
  // 백엔드가 201 Created 로 응답 → 성공 시 { memberId, username } 반환
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const res = await apiClient.post<ApiResponse<SignupResponse>>("/api/auth/signup", data);
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },
};
