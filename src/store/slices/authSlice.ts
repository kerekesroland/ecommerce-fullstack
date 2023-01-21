import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authService } from "../../api/auth/auth";
import { ILoginUser, IRegisterUser } from "../../api/auth/models";

interface IProfile {
  id: number | null;
  email: string | null;
  name: string | null;
}

interface Init {
  isAuthenticated: boolean;
  user: IProfile;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

let user = null;
const userFromLocal = localStorage.getItem("user");

if (userFromLocal) {
  user = JSON.parse(userFromLocal);
}

const initialState: Init = {
  isAuthenticated: false,
  user:
    user !== ""
      ? user
      : {
          id: null,
          email: "",
          name: "",
        },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

//Async Thunks

export const register = createAsyncThunk(
  "auth/register",
  async (user: IRegisterUser, thunkApi) => {
    try {
      const res = await authService.registerUser(user);
      toast.success("Successfully registered!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: ILoginUser, thunkApi) => {
    try {
      const res = await authService.loginUser(user);
      toast.success("Successful login!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isAuthenticated = false;
      state.message = "";
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder

      //register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.user = initialState.user;
      })

      //login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.user = initialState.user;
      })

      //logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = initialState.user;
      });
  },
});

export const { reset } = authSlice.actions;
