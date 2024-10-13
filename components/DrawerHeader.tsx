import React from "react";

import { View, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { DrawerHeaderProps } from "@react-navigation/drawer";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import FeedbackPressable from "@/components/FeedbackPressable";

import Colors from "@/constants/Colors";

export default function DrawerHeader({ navigation }: DrawerHeaderProps) {
  const dynamicStyles = getDynamicStyles({
    statusBarHeight: StatusBar.currentHeight ?? 0,
  });

  // 검색창을 눌렀을 때의 동작
  function handleSearchBoxPress() {
    // TODO: 검색 화면으로 이동
  }

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <View style={styles.wrapper}>
        <Button
          onPress={navigation.toggleDrawer}
          icon={<MaterialIcons name={"menu"} size={30} color={Colors.grey} />}
        />
        <FeedbackPressable
          style={styles.searchBoxWrapper}
          onPress={handleSearchBoxPress}
        >
          <View style={styles.searchBox}>
            <MaterialIcons name={"search"} size={24} color={Colors.greyLight} />
            <Typography size={18} color={Colors.greyLight}>
              암기빵, 사용자 검색
            </Typography>
          </View>
        </FeedbackPressable>
      </View>
    </SafeAreaView>
  );
}

interface DynamicStylesProps {
  statusBarHeight: number;
}

const getDynamicStyles = (props: DynamicStylesProps) =>
  StyleSheet.create({
    safeArea: {
      height: 60 + props.statusBarHeight,
    },
  });

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: Colors.greyLighter,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: 60,
  },
  searchBoxWrapper: {
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.white,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
