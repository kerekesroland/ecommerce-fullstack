import { ILoginUser, IRegisterUser } from "./models";
import axios from "axios";
export const authUrl = "http://localhost:1337/auth/local";

export const registerUser = async (user: IRegisterUser) => {
  const res = await axios.post(`${authUrl}/register`, user);
  return res.data;
};

export const loginUser = async (user: ILoginUser) => {
  const res = await axios.post(authUrl, user);
  return res.data;
};
