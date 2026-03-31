export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer";
  user: {
    id: number;
    username: string;
    profileImageUrl: string | null;
  };
}
