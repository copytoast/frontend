import React from "react";

import { Redirect, Stack } from "expo-router";

import { SessionContext } from "@/contexts/Session";

export default function LoginLayout() {
  const session = React.useContext(SessionContext);

  const loggedIn =
    session.state.user !== undefined && session.state.token !== undefined;

  if (loggedIn) return <Redirect href={"/"} />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
