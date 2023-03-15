import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";
import { productsService } from "../../api/products/products";
import { toggleLoading } from "./loadingSlice";

interface IProductsInitial {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  products: Array<IProduct>;
}

const initialState: IProductsInitial = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(toggleLoading(true));
      const data = await productsService.getProducts();
      dispatch(toggleLoading(false));
      return data;
    } catch (error: any) {
      rejectWithValue(error?.message);
      console.error(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<Array<IProduct>>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      }
    );
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.products = initialState.products;
    });
  },
});

export default productSlice.reducer;
