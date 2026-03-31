import { apiClient } from "@/services/client";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>("/login", data);
    return res.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post("/logout");
  },
};
