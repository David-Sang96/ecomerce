import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseTest {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface ConfirmOrder extends BaseTest {
  payload: CartItem[];
}

export interface Cancellation extends BaseTest {
  orderId: string;
}
