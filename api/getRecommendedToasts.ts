import axiosInstance, { type CommonResponse } from ".";

interface GetRecommendedToastsProps {
  count: number;
  exclude?: number[];
  excludeAdded?: boolean;
}

export interface GetRecommendedToastsResult {
  toasts: {
    id: number;
    name: string;
    addCount: number;
    picture?: string;
    description: string;
    added?: boolean;
  }[];
}

type Response = CommonResponse<GetRecommendedToastsResult>;

export default function getRecommendedToasts({
  count,
  exclude,
  excludeAdded,
}: GetRecommendedToastsProps) {
  return axiosInstance.post<Response>("/toast/recommend", {
    count,
    exclude,
    excludeAdded,
  });
}
