import React from "react";

import { Platform, Pressable, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { DrawerHeaderProps } from "@react-navigation/drawer";

import RowFlex from "@/components/RowFlex";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

import Colors from "@/constants/Colors";

import MenuIcon from "@/assets/vectors/menu.svg";
import SearchIcon from "@/assets/vectors/search.svg";

export default function DrawerHeader(props: DrawerHeaderProps) {
  const dynamicStyles = {
    safeArea: {
      height:
        60 + (Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0),
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <RowFlex gap={15} style={styles.root}>
        <Button
          onPress={props.navigation.toggleDrawer}
          icon={<MenuIcon width={30} height={30} />}
        />

        <Pressable style={styles.searchBoxWrapper} onPress={() => {}}>
          <RowFlex gap={10} style={styles.searchBox}>
            <SearchIcon width={24} height={24} />
            <Typography size={18} color={Colors.greyLight}>
              암기빵, 사용자 검색
            </Typography>
          </RowFlex>
        </Pressable>
      </RowFlex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.greyLighter,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
  },
  searchBoxWrapper: {
    flex: 1,
  },
  searchBox: {
    backgroundColor: Colors.white,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
