export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IProfile {
  id: number | null;
  username: string;
  email: string;
  confirmed: boolean;
  user_tier: ITier;
  imageUrl: string;
}

interface ITier {
  id: string;
  name: string;
  startedAt: string;
}
