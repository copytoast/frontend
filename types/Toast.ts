export interface MinimalToast {
  id: number;
  name: string;
  like: number;
  picture?: string;
}

export interface Toast {
  id: number;
  name: string;
  like: number;
  added: boolean;
  picture?: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}
