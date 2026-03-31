import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

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
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
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

// Response 인터셉터 — 401 시 토큰 재발급 후 원래 요청 재시도
authApiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await apiClient.post<{ accessToken: string }>("/reissue");
        _accessToken = data.accessToken;
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return authApiClient(original);
      } catch {
        _accessToken = null;
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
