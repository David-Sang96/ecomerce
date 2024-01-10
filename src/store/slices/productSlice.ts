import { ProductSlice } from "@/types/product";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const response = await fetch(`${config.apiBaseUrl}/products`);
    const data = await response.json();
    thunkApi.dispatch(setProduct(data));
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
