import React from "react";

import { View, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

import Colors from "@/constants/Colors";

import Button from "@/components/Button";

import GreyLogo from "@/assets/vectors/logo_grey.svg";
import TextLogo from "@/assets/vectors/text_logo.svg";

interface DrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
}

export default function DrawerContent({
  onLogout,
  state,
  navigation,
}: DrawerContentProps) {
  const currentRoute = state.routeNames[state.index];
  const dynamicStyles = getDynamicStyles({
    statusBarHeight: StatusBar.currentHeight ?? 0,
  });

  function handleRouteButtonPress(route: string) {
    navigation.navigate(route);
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <View style={staticStyles.wrapper}>
        <View style={staticStyles.logoWrapper}>
          <TextLogo width={140} />
        </View>

        <View style={staticStyles.routeContainer}>
          <RouteButton
            name={"홈"}
            icon={<MaterialIcons name={"home"} size={24} color={Colors.grey} />}
            onPress={() => handleRouteButtonPress("홈")}
            currentRoute={currentRoute}
          />
          <RouteButton
            name={"암기빵"}
            icon={<GreyLogo width={24} height={24} />}
            onPress={() => handleRouteButtonPress("암기빵")}
            currentRoute={currentRoute}
          />
          <RouteButton
            name={"둘러보기"}
            icon={
              <MaterialIcons name={"search"} size={24} color={Colors.grey} />
            }
            onPress={() => handleRouteButtonPress("둘러보기")}
            currentRoute={currentRoute}
          />
          <RouteButton
            name={"친구"}
            icon={
              <MaterialIcons name={"people"} size={24} color={Colors.grey} />
            }
            onPress={() => handleRouteButtonPress("친구")}
            currentRoute={currentRoute}
          />
          <RouteButton
            name={"로그아웃"}
            icon={
              <MaterialIcons name={"logout"} size={24} color={Colors.grey} />
            }
            currentRoute={currentRoute}
            onPress={onLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

interface RouteButtonProps {
  name: string;
  icon: React.ReactElement;
  currentRoute: string;
  onPress?: () => void;
}

function RouteButton({ name, icon, currentRoute, onPress }: RouteButtonProps) {
  return (
    <Button
      label={name}
      style={staticStyles.route}
      contentStyle={staticStyles.routeContent}
      labelSize={18}
      labelWeight={"medium"}
      backgroundColor={
        currentRoute === name ? Colors.greyLighter : Colors.white
      }
      icon={icon}
      onPress={onPress}
    />
  );
}

interface DynamicStylesProps {
  statusBarHeight: number;
}

const getDynamicStyles = (props: DynamicStylesProps) =>
  StyleSheet.create({
    safeArea: {
      height: 50 + props.statusBarHeight,
    },
  });

const staticStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: Colors.white,
    gap: 10,
    flex: 1,
  },
  logoWrapper: {
    padding: 20,
  },
  routeContainer: {
    gap: 5,
    padding: 10,
  },
  route: {
    width: "100%",
    borderRadius: 5,
  },
  routeContent: {
    padding: 15,
    width: "100%",
    justifyContent: "flex-start",
  },
});
