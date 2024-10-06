export interface BasicToast {
  id: number;
  name: string;
  like: number;
  picture?: string;
}

export type ToastType = "MATCHING" | "ORDER" | "LIST" | "CLASSIFY" | "BLANK";

export interface DetailToast {
  id: number;
  name: string;
  like: number;
  type: ToastType;
  view: number;
  picture?: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface UserToast {
  added: boolean;
  memoryRate: number;
}

export interface Toast extends DetailToast, UserToast {}
