import { createContext } from "react";

export type GlobalContextProps = {
  auth: boolean;
};

export const GlobalContext = createContext<GlobalContextProps>({
  auth: false
});
