import { createContext } from "react";
import { UserData } from "../interfaces";

export interface ILoginContext extends UserData {
  loggedIn: boolean;
  initalized: boolean;
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
});
