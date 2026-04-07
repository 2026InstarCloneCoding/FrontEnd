// ── API 클라이언트 설정 ───────────────────────────────────────────────
// reference types="vite/client" : Vite의 타입 정의 참조 (import.meta.env 등 사용 위해)
/// <reference types="vite/client" />
import axios from "axios";

// 개발: 빈 문자열 → Vite 프록시(/api → http://localhost:8080)가 처리
// 배포: .env에 VITE_API_BASE_URL=https://api.yourdomain.com 으로 설정
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// ── snake_case → camelCase 변환 유틸 ─────────────────────────
// 백엔드 Jackson 설정이 SNAKE_CASE라 응답 키를 자동으로 camelCase로 변환
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

// 재귀적으로 객체/배열 탐색하며 키 변환
// 이유 : 백엔드 응답이 중첩된 구조일 수 있기 때문 (예: { data: { access_token, refresh_token } })
function transformKeys(data: unknown): unknown {
  if (Array.isArray(data)) return data.map(transformKeys);
  if (data !== null && typeof data === "object") {
    // Object.entries로 객체의 [key, value] 쌍을 배열로 변환 → map으로 키 변환 → Object.fromEntries로 다시 객체로 변환
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([k, v]) => [
        snakeToCamel(k),
        transformKeys(v),
      ])
    );
  }
  return data;
}

/**
 * 모듈 레벨 토큰 저장소
 * Context(React 트리 바깥)에서도 토큰을 주입할 수 있도록 모듈 변수로 관리
 * AuthContext의 login/logout 이 setAccessToken()을 호출해 동기화
 */
let _accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  _accessToken = token;
};

// ── 인증 불필요 클라이언트 (로그인, 회원가입, 토큰 재발급) ──
// 일반적인 API 호출에 사용되는 클라이언트 : 로그인/회원가입/토큰 재발급 등 인증이 필요 없는 엔드포인트에 사용
// 이유: 로그인 API는 토큰이 없으므로 authApiClient 대신 apiClient 사용
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// snake_case → camelCase 자동 변환
apiClient.interceptors.response.use((res) => {
  res.data = transformKeys(res.data);
  return res;
});

// ── 인증 필요 클라이언트 (피드, 스토리, DM 등) ────────────
export const authApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request 인터셉터 — 모듈 변수에서 토큰 꺼내 헤더 주입
authApiClient.interceptors.request.use((config) => {
  if (_accessToken) config.headers.Authorization = `Bearer ${_accessToken}`;
  return config;
});

// Response 인터셉터 — snake_case 변환 + 401 시 토큰 재발급 후 원래 요청 재시도
authApiClient.interceptors.response.use(
  (res) => {
    res.data = transformKeys(res.data);
    return res;
  },
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // ApiResponse 래퍼 벗기기: { success, data: { accessToken }, message }
        const { data } = await apiClient.post<{ data: { accessToken: string } }>("/api/auth/refresh");
        _accessToken = data.data.accessToken;
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return authApiClient(original);
      } catch {
        _accessToken = null;
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
