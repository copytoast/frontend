import React from "react";
import { StyleSheet } from "react-native";
import { Redirect, useNavigation } from "expo-router";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";

import { SessionContext } from "@/contexts/Session";

import HomeScreen from "@/app/home";

const Drawer = createDrawerNavigator();

export default function Index() {
  const session = React.useContext(SessionContext);
  const navigation = useNavigation();

  const loggedIn =
    session.state.user !== undefined && session.state.token !== undefined;

  React.useEffect(() => {
    if (navigation.canGoBack()) navigation.dispatch(StackActions.popToTop);
  }, [loggedIn]);

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
