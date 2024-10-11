import React from "react";

import type { BasicUser } from "@/types/User";

interface Session {
  user?: BasicUser;
  token?: string;
}

interface SessionContext {
  state: Session;
  dispatch: React.Dispatch<React.SetStateAction<Session>>;
}

export const initialState: SessionContext["state"] = {};

export const initialDispatch: SessionContext["dispatch"] = () => {};

export const SessionContext = React.createContext<SessionContext>({
  state: initialState,
  dispatch: initialDispatch,
});

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [state, dispatch] = React.useState<Session>(initialState);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}
