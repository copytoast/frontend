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

  interface RouteButtonProps {
    name: string;
    icon: React.ReactNode;
    color?: string;
    onPress?: () => void;
  }

  const RouteButton = ({
    name,
    onPress,
    ...routeButtonProps
  }: RouteButtonProps) => (
    <Button
      label={name}
      style={styles.route}
      contentStyle={styles.routeContent}
      fontSize={18}
      fontWeight={"medium"}
      color={currentRoute === name ? Colors.greyLighter : Colors.white}
      onPress={onPress ? onPress : () => props.navigation.navigate(name)}
      {...routeButtonProps}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.safeArea]}>
      <ColumnFlex gap={10} style={styles.root}>
        <View style={styles.logoWrapper}>
          <TextLogo width={140} />
        </View>

        <ColumnFlex gap={5} style={styles.routeContainer}>
          <RouteButton name={"홈"} icon={<HomeIcon width={24} height={24} />} />
          <RouteButton
            name={"암기빵"}
            icon={<GreyLogo width={24} height={24} />}
          />
          <RouteButton
            name={"둘러보기"}
            icon={<ExploreIcon width={24} height={24} />}
          />
          <RouteButton
            name={"친구"}
            icon={<PeopleIcon width={24} height={24} />}
          />
          <RouteButton
            name={"로그아웃"}
            icon={<LogoutIcon width={24} height={24} />}
            onPress={props.onLogout}
          />
        </ColumnFlex>
      </ColumnFlex>
    </SafeAreaView>
  );
}

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
