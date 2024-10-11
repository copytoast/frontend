import axiosInstance, { type CommonResponse } from ".";

interface SignupProps {
  id: string;
  username: string;
  OAuthProvider: "GOOGLE" | "KAKAO";
  OAuthToken: string;
  toasts: number[];
}

export interface SignupResult {
  token: {
    accessToken: {
      token: string;
      expiresIn: number;
    };
    refreshToken: {
      token: string;
      expiresIn: number;
    };
  };
}

type Response = CommonResponse<SignupResult>;

export default function signup({
  id,
  username,
  OAuthProvider,
  OAuthToken,
  toasts,
}: SignupProps) {
  return axiosInstance.post<Response>("/user", {
    id,
    username,
    OAuthProvider,
    OAuthToken,
    toasts,
  });
}
