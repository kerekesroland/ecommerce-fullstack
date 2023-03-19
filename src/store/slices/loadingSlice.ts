import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoadingState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLoading: (
      state,
      action: PayloadAction<ILoadingState["isLoading"]>
    ) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
