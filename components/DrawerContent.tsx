import React from "react";

import { View, Platform, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Button from "@/components/Button";

import GreyLogo from "@/assets/vectors/logo_grey.svg";
import TextLogo from "@/assets/vectors/text_logo.svg";
import HomeIcon from "@/assets/vectors/home.svg";
import ExploreIcon from "@/assets/vectors/explore.svg";
import PeopleIcon from "@/assets/vectors/people.svg";
import LogoutIcon from "@/assets/vectors/logout.svg";

interface DrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
}

export default function DrawerContent(props: DrawerContentProps) {
  const dynamicStyles = {
    safeArea: {
      height:
        50 + (Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0),
    },
  };

  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.safeArea]}>
      <ColumnFlex gap={10} style={styles.root}>
        <View style={styles.logoWrapper}>
          <TextLogo width={140} />
        </View>

        <ColumnFlex gap={5} style={styles.routeContainer}>
          <RouteButton
            label={"홈"}
            color={currentRoute === "홈" ? Colors.greyLighter : Colors.white}
            icon={<HomeIcon width={24} height={24} />}
            onPress={() => props.navigation.navigate("/")}
          />
          <RouteButton
            label={"암기빵"}
            color={
              currentRoute === "암기빵" ? Colors.greyLighter : Colors.white
            }
            icon={<GreyLogo width={24} height={24} />}
            onPress={() => props.navigation.navigate("/toast/my")}
          />
          <RouteButton
            label={"둘러보기"}
            color={
              currentRoute === "둘러보기" ? Colors.greyLighter : Colors.white
            }
            icon={<ExploreIcon width={24} height={24} />}
            onPress={() => props.navigation.navigate("/explore")}
          />
          <RouteButton
            label={"친구"}
            color={currentRoute === "친구" ? Colors.greyLighter : Colors.white}
            icon={<PeopleIcon width={24} height={24} />}
            onPress={() => props.navigation.navigate("/friend")}
          />
          <RouteButton
            label={"로그아웃"}
            icon={<LogoutIcon width={24} height={24} />}
            onPress={props.onLogout}
          />
        </ColumnFlex>
      </ColumnFlex>
    </SafeAreaView>
  );
}

interface RouteButtonProps {
  label: string;
  icon: React.ReactNode;
  color?: string;
  onPress?: () => void;
}

const RouteButton = (props: RouteButtonProps) => (
  <Button
    style={styles.route}
    contentStyle={styles.routeContent}
    fontSize={18}
    fontWeight={"medium"}
    color={Colors.white}
    {...props}
  />
);

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
  },
  root: {
    backgroundColor: Colors.white,
    flex: 1,
    height: "100%",
  },
  logoWrapper: {
    padding: 20,
  },
  routeContainer: {
    padding: 10,
  },
  route: {
    width: "100%",
    padding: 0,
  },
  routeContent: {
    padding: 15,
    borderRadius: 5,
    justifyContent: "flex-start",
  },
});
