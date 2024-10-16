import React from "react";

interface OnboardingData {
  username: string;
  id: string;
  toasts: number[];
  OAuthProvider: "GOOGLE" | "KAKAO";
  OAuthToken: string;
}

interface OnboardingContext {
  state: OnboardingData;
  dispatch: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

export const initialState: OnboardingContext["state"] = {
  username: "",
  id: "",
  toasts: [],
  OAuthProvider: "GOOGLE",
  OAuthToken: "",
};

export const initialDispatch: OnboardingContext["dispatch"] = () => {};

export const OnboardingContext = React.createContext<OnboardingContext>({
  state: initialState,
  dispatch: initialDispatch,
});

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [state, dispatch] = React.useState<OnboardingData>(initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}
