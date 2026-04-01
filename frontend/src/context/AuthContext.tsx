import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { setAccessToken } from "@/services/client";

// ── 타입 정의 ─────────────────────────────────────────────
// 백엔드 MemberInfo DTO 구조에 맞춤 (camelCase 변환 후)
interface User {
  memberId: number;
  username: string;
  imageUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

// ── Context 생성 ───────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ───────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken); // axios 인터셉터에 토큰 전달
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── 커스텀 훅 ──────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  return ctx;
}
