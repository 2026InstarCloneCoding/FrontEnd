"use client";

import { create } from "zustand";

interface User {
  id: number;
  username: string;
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
}

/**
 * 로그인 상태 전역 관리 (Zustand)
 * - 서버 데이터(피드, 게시글)는 TanStack Query가 담당
 * - 이 스토어는 "지금 로그인된 유저가 누구인가"만 책임짐
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),

  clearAuth: () =>
    set({ user: null, accessToken: null, isAuthenticated: false }),
}));
