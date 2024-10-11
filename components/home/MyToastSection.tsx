import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

import type { DrawerNavigationProp } from "@react-navigation/drawer";

import Section from "@/components/Section";
import Toast from "@/components/Toast";
import RowFlex from "@/components/RowFlex";
import Button from "@/components/Button";
import Pop from "@/components/Pop";
import Skeleton from "@/components/Skeleton";

import Colors from "@/constants/Colors";

import GreyLogo from "@/assets/vectors/logo_grey.svg";
import AddIcon from "@/assets/vectors/add.svg";
import ListIcon from "@/assets/vectors/list.svg";

import { SessionContext } from "@/contexts/Session";

import { type GetAddedToastsResult } from "@/api/getAddedToasts";

import type { ParamList } from "@/app";

const ToastSkeleton = () => (
  <Skeleton containerStyle={styles.skeleton} isLoading>
    <Toast
      name={""}
      description={""}
      addCount={0}
      added={false}
      my={false}
      detailButtonVisible
    />
  </Skeleton>
);

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

  function handleCreateToast() {}

  function handleExploreToast() {}

  return (
    <Section
      title="내가 담은 암기빵"
      titleIcon={<GreyLogo width={20} height={20} />}
      onTitlePress={handleMyToast}
      titleArrowVisible
    >
      {toasts && !refreshing ? (
        <Pop
          style={styles.content}
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
      ) : (
        <View style={[styles.content, styles.skeletonContainer]}>
          <ToastSkeleton />
          <ToastSkeleton />
          <ToastSkeleton />
        </View>
      )}

      <RowFlex gap={10} style={styles.quickButtonContainer}>
        <Button
          label={`새 암기빵\n만들기`}
          icon={<AddIcon width={20} height={20} />}
          iconPosition={"right"}
          color={Colors.greyLighter}
          style={styles.quickButton}
          contentStyle={styles.quickButtonContent}
          fontSize={16}
          fontWeight={"medium"}
          onPress={handleCreateToast}
        />
        <Button
          label={`다른 암기빵\n둘러보기`}
          icon={<ListIcon width={20} height={20} />}
          iconPosition={"right"}
          color={Colors.greyLighter}
          style={styles.quickButton}
          contentStyle={styles.quickButtonContent}
          fontSize={16}
          fontWeight={"medium"}
          onPress={handleExploreToast}
        />
      </RowFlex>
    </Section>
  );
}

const styles = StyleSheet.create({
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
    padding: 10,
  },
  quickButton: {
    flex: 1,
  },
  quickButtonContent: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 15,
  },
});
