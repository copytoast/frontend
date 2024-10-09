import React from "react";
import { StyleSheet } from "react-native";
import { Redirect, useNavigation } from "expo-router";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";

import { SessionContext } from "@/contexts/Session";

import Colors from "@/constants/Colors";

import DrawerHeader from "@/components/DrawerHeader";
import DrawerContent from "@/components/DrawerContent";

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

  function handleLogout() {
    session.dispatch({
      user: undefined,
      token: undefined,
    });
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: DrawerHeader,
        headerStyle: styles.header,
        sceneContainerStyle: styles.content,
      }}
      drawerContent={(props) => (
        <DrawerContent onLogout={handleLogout} {...props} />
      )}
    >
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
  header: {
    height: 50,
  },
  content: {
    backgroundColor: Colors.greyLighter,
  },
});
