import axiosInstance, { type CommonResponse } from ".";

interface GetToastProps {
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
  added?: boolean;
}

export interface GetToastResult {
  toast?: Toast;
}

type Response = CommonResponse<GetToastResult>;

export default function getToast({ id }: GetToastProps) {
  return axiosInstance.get<Response>("/toast", {
    params: {
      id,
    },
  });
}
