import axiosInstance, { type CommonResponse } from ".";

interface GetAddedToastsProps {
  id: number;
}

export interface Toast {
  id: number;
  name: string;
  description: string;
  addCount: number;
  picture?: string;
  type: "MATCHING" | "ORDER" | "LIST" | "CLASSIFY" | "BLANK";
  view: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
  added: boolean;
}

export interface GetAddedToastsResult {
  toast: Toast;
}

type Response = CommonResponse<GetAddedToastsResult>;

export default function getToast({ id }: GetAddedToastsProps) {
  return axiosInstance.get<Response>("/toast", {
    params: {
      id,
    },
  });
}
