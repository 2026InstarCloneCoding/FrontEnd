export interface LoginRequest {
  email: string;
  password: string;
}

// 백엔드 LoginResponse DTO 구조에 맞춤
// (SNAKE_CASE → camelCase 변환은 axios 인터셉터에서 자동 처리)
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  member: {
    memberId: number;
    username: string;
    imageUrl: string | null;
  };
}

// ── 회원가입 ─────────────────────────────────────────────────
// 백엔드 SignupRequest DTO: email, password, username, name 4개 필드
// (생년월일은 백엔드 미구현 → 프론트 UI에만 존재)
export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  name: string;
}

// 백엔드 SignupResponse DTO: memberId, username 반환
export interface SignupResponse {
  memberId: number;
  username: string;
}
