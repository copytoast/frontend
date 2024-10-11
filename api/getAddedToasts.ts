import axiosInstance, { type CommonResponse } from ".";

interface GetAddedToastsProps {
  count: number;
  offset?: number;
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
  toasts: Toast[];
}

type Response = CommonResponse<GetAddedToastsResult>;

export default function getAddedToasts({ count, offset }: GetAddedToastsProps) {
  return axiosInstance.get<Response>("/toast/added", {
    params: {
      count,
      offset,
    },
  });
}
