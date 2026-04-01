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
