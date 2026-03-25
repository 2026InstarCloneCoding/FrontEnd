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

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}
