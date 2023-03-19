import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoading } from "./loadingSlice";
import { ICartItem } from "../../models/ICartItem";

interface ICartInitial {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  cart: Array<ICartItem>;
  cartShipping: number;
  cartSubTotal: number;
  cartTotal: number;
}

const initialState: ICartInitial = {
  cart: [],
  cartShipping: Number((Math.random() * (10.99 - 4.99) + 4.99).toFixed(2)),
  cartSubTotal: 0,
  cartTotal: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: ICartItem, { getState, dispatch }) => {
    try {
      dispatch(toggleLoading(true));
      dispatch(toggleLoading(false));
      return product;
    } catch (err) {
      console.error(err);
      dispatch(toggleLoading(false));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string, { getState, dispatch }) => {
    try {
      dispatch(toggleLoading(true));
      dispatch(toggleLoading(false));
      return id;
    } catch (err) {
      console.error(err);
      dispatch(toggleLoading(false));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item?.id);

      if (existingItem && item?.quantity) {
        existingItem.quantity += item.quantity;
      } else {
        if (item) state.cart.push({ ...item, quantity: item.quantity });
      }
      state.cartSubTotal = state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      state.cartTotal = state.cartSubTotal + state.cartShipping;
    });

    builder.addCase(addToCart.rejected, (state) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find((i) => i.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== itemId);
        }
        state.cartSubTotal -= existingItem.price;
        state.cartTotal = state.cartSubTotal + state.cartShipping;
      }
    });

    builder.addCase(removeFromCart.rejected, (state) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
    });
  },
});

export default cartSlice.reducer;
