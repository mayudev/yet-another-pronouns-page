import { createContext } from "react";

export interface ILoginContext {
  loggedIn: boolean;
  username: string;
}

export interface IUser {}

export const LoginContext = createContext<ILoginContext>({
  loggedIn: false,
  username: "",
});
