export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  user_tier?: null;
}

export interface ILoginUser {
  identifier: string;
  password: string;
}
