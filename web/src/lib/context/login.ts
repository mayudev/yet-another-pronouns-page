import { createContext } from "react";
import { UserData } from "../interfaces";

export interface ILoginContext extends UserData {
  loggedIn: boolean;
  initalized: boolean;
  setUsername: (arg1: string) => void;
}

export interface IUser {}

export const LoginContext = createContext<ILoginContext>({
  loggedIn: false,
  initalized: false,
  username: "",
  id: "",
  avatar: "",
  bio: "",
  pronouns: [],
  setUsername: (string) => {},
});
