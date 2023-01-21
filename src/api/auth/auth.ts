import { ILoginUser, IRegisterUser } from "./models";
import axios from "axios";

export const authUrl = "http://localhost:1337/api/auth/local";

const registerUser = async (user: IRegisterUser) => {
  const res = await axios.post(`${authUrl}/register`, user);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const loginUser = async (user: ILoginUser) => {
  const res = await axios.post(authUrl, user);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  registerUser,
  loginUser,
  logout,
};
