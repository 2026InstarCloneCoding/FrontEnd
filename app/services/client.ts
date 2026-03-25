import ky from "ky";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

/**
 * 인증 없는 요청 (로그인, 회원가입 등)
 */
export const apiClient = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000,
  retry: { limit: 1, methods: ["get"] },
});

/**
 * JWT 인증이 필요한 요청
 * - beforeRequest 훅에서 Zustand authStore의 accessToken을 헤더에 주입
 * - afterResponse 훅에서 401 시 토큰 재발급 처리 (추후 구현)
 */
export const authApiClient = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        // 클라이언트 환경에서만 토큰 접근
        if (typeof window !== "undefined") {
          // TODO: useAuthStore.getState().accessToken 으로 교체
          const token = sessionStorage.getItem("accessToken");
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          // TODO: 토큰 재발급 로직
          console.warn("[authApiClient] 401 — 토큰 재발급 필요");
        }
        return response;
      },
    ],
  },
});
