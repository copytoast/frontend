import axiosInstance, { type CommonResponse } from ".";

interface UserExistsProps {
  username?: string;
  id?: string;
}

interface Result {
  exists: boolean;
}

type Response = CommonResponse<Result>;

export default function userExists({ username, id }: UserExistsProps) {
  return axiosInstance.get<Response>("/user/exists", {
    params: {
      username,
      id,
    },
  });
}
