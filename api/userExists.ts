import axiosInstance, { type CommonResponse } from ".";

interface UserExistsProps {
  username?: string;
  id?: string;
}

export interface UserExistsResult {
  exists: boolean;
}

type Response = CommonResponse<UserExistsResult>;

export default function userExists({ username, id }: UserExistsProps) {
  return axiosInstance.get<Response>("/user/exists", {
    params: {
      username,
      id,
    },
  });
}
