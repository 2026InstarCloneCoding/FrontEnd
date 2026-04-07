import { apiClient } from "@/services/client";
import type { LoginRequest, LoginResponse } from "@/types/auth";

// 백엔드 모든 응답은 ApiResponse<T> 래퍼로 감싸져 있음: { success, data, message }
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // res.data = ApiResponse<LoginResponse> → .data로 한 번 더 벗겨야 실제 데이터
    const res = await apiClient.post<ApiResponse<LoginResponse>>("/api/auth/login", data);
    return res.data.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },
};
