import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { DrawerNavigationProp } from "@react-navigation/drawer";

import Section from "@/components/Section";
import Toast from "@/components/Toast";
import Button from "@/components/Button";
import Pop from "@/components/Pop";

import Colors from "@/constants/Colors";

import GreyLogo from "@/assets/vectors/logo_grey.svg";

import { SessionContext } from "@/contexts/Session";

import { type GetAddedToastsResult } from "@/api/getAddedToasts";

import type { ParamList } from "@/app";

interface MyToastSectionProps {
  toasts?: GetAddedToastsResult["toasts"];
  refreshing?: boolean;
}

export default function MyToastSection({
  toasts,
  refreshing,
}: MyToastSectionProps) {
  // TODO: never 타입 제거
  const navigation = useNavigation().getParent<DrawerNavigationProp<ParamList>>(
    "main" as never
  );
  const sessionContext = React.useContext(SessionContext);

  function handleMyToast() {
    navigation.navigate("암기빵");
  }

  function handleCreateToast() {
    // TODO: 암기빵 만들기 화면으로 이동
  }

  function handleExploreToast() {
    // TODO: 다른 암기빵 둘러보기 화면으로 이동
  }

  return (
    <Section
      title="내가 담은 암기빵"
      titleIcon={<GreyLogo width={20} height={20} />}
      onTitlePress={handleMyToast}
      titleArrowVisible
    >
      {toasts && (
        <Pop
          style={staticStyles.content}
          visible={toasts !== undefined && !refreshing}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              name={toast.name}
              description={toast.description}
              addCount={toast.addCount}
              added={toast.added}
              my={toast.creator === sessionContext.state.user?.username}
              detailButtonVisible
            />
          ))}
        </Pop>
      )}

      <View style={staticStyles.quickButtonContainer}>
        <Button
          label={`새 암기빵\n만들기`}
          icon={
            <MaterialIcons name={"add"} size={20} color={Colors.greyDark} />
          }
          iconPosition={"right"}
          backgroundColor={Colors.greyLighter}
          style={staticStyles.quickButton}
          contentStyle={staticStyles.quickButtonContent}
          labelSize={16}
          labelWeight={"medium"}
          onPress={handleCreateToast}
        />
        <Button
          label={`다른 암기빵\n둘러보기`}
          icon={
            <MaterialIcons name={"explore"} size={20} color={Colors.greyDark} />
          }
          iconPosition={"right"}
          backgroundColor={Colors.greyLighter}
          style={staticStyles.quickButton}
          contentStyle={staticStyles.quickButtonContent}
          labelSize={16}
          labelWeight={"medium"}
          onPress={handleExploreToast}
        />
      </View>
    </Section>
  );
}

const staticStyles = StyleSheet.create({
  content: {
    padding: 5,
    paddingTop: 0,
  },
  skeleton: {
    width: "100%",
    height: 50,
  },
  skeletonContainer: {
    gap: 10,
    padding: 15,
    paddingTop: 0,
  },
  quickButtonContainer: {
    gap: 10,
    padding: 10,
    flexDirection: "row",
  },
  quickButton: {
    flex: 1,
    borderRadius: 10,
  },
  quickButtonContent: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 15,
  },
});
