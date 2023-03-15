import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<InitState["isLoading"]>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
