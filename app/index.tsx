import React from "react";
import { StyleSheet } from "react-native";
import { useRootNavigationState, Redirect, useNavigation } from "expo-router";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { SessionContext } from "@/contexts/Session";

import HomeScreen from "@/app/home";

const Drawer = createDrawerNavigator();

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const navigation = useNavigation();

  const session = React.useContext(SessionContext);

  const loggedIn =
    session.state.user !== undefined && session.state.token !== undefined;

  React.useEffect(() => {
    if (loggedIn)
      navigation.reset({
        index: 0,
        routes: [{ name: "홈" as keyof typeof Drawer.Screen }],
      });
  }, [loggedIn]);

  if (!rootNavigationState?.key) return null;

  if (!loggedIn) return <Redirect href={"/login"} />;

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="홈" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
