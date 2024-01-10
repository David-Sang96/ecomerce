import { Cancellation, CartSlice, ConfirmOrder } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (option: ConfirmOrder, thunkApi) => {
    const { payload, onSuccess, onError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      onSuccess && onSuccess(data);
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const orderCancel = createAsyncThunk(
  "cart/orderCancellation",
  async (option: Cancellation, thunkApi) => {
    const { orderId, onSuccess, onError } = option;
    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (!quantity) {
        state.items = state.items.filter(
          (items) => items.id !== action.payload.id
        );
      } else {
        state.items = state.items.map((items) =>
          items.id === action.payload.id
            ? { ...items, quantity: action.payload.quantity }
            : items
        );
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
