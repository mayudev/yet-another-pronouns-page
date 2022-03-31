import { createContext } from "react";

export interface ILoginContext {
  loggedIn: boolean;
  username: string;
}

export const LoginContext = createContext<ILoginContext>({
  loggedIn: false,
  username: "",
});
