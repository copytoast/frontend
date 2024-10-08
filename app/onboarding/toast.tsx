import React from "react";

import { StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";

import ColumnFlex from "@/components/ColumnFlex";
import Typography from "@/components/Typography";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";
import MinimalToast from "@/components/MinimalToast";
import ToastDetailModal from "@/components/onboarding/ToastDetailModal";
import Skeleton from "@/components/Skeleton";

import { OnboardingContext } from "@/contexts/Onboarding";

import ArrowForward from "@/assets/vectors/arrow_forward.svg";

import type { Toast, BasicToast } from "@/types/Toast";

// sample data
const sampleToasts: BasicToast[] = [
  {
    id: 0,
    name: "수능 영단어 1,000선",
    like: 100000,
  },
  {
    id: 1,
    name: "주기율표",
    like: 8431,
  },
];

const sampleToastDetail: Record<number, Toast> = {
  0: {
    id: 0,
    name: "수능 영단어 1,000선",
    like: 100000,
    creator: "관리자",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
    description:
      "수능 영단어 1,000선은 수능 영어 시험에서 자주 나오는 영어 단어 1,000개를 모아놓은 암기빵입니다.",
    added: true,
    type: "MATCHING",
    memoryRate: 0,
    view: 0,
  },
  1: {
    id: 1,
    name: "주기율표",
    like: 8431,
    creator: "관리자",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
    description:
      "주기율표는 화학에서 사용되는 주기율표를 모아놓은 암기빵입니다.",
    added: true,
    type: "ORDER",
    memoryRate: 0,
    view: 0,
  },
};

export default function Username() {
  const onboarding = React.useContext(OnboardingContext);

  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [toastDetail, setToastDetail] = React.useState<Toast>();
  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);
  const [toasts, setToasts] = React.useState<BasicToast[]>();

  React.useEffect(() => {
    // TODO: fetch toasts
    setTimeout(() => setToasts(sampleToasts), 500);
  });

  // 모달 닫기 핸들러
  function handleModalClose() {
    setDetailModalOpen(false);
  }

  // 모달 담기 핸들러
  function handleModalAdd(toastId: number) {
    handleAdd(toastId);
  }

  const dynamicStyles = {
    root: {
      flex: 1,
      paddingBottom: bottomButtonHeight,
    },
  };

  // 돌아가기 버튼 핸들러
  function handleBack() {
    router.back();
  }

  // 다음 버튼 핸들러
  function handleNext() {
    router.push("/onboarding/term");
  }

  // 암기빵 담기 핸들러
  function handleAdd(toastId: number) {
    if (!onboarding.state.toasts.includes(toastId))
      onboarding.dispatch((prev) => ({
        ...prev,
        toasts: [...prev.toasts, toastId],
      }));
    else
      onboarding.dispatch((prev) => ({
        ...prev,
        toasts: prev.toasts.filter((id) => id !== toastId),
      }));
  }

  // 암기빵 상세 핸들러
  function handleDetail(toastId: number) {
    setDetailModalOpen(true);

    // TODO: fetch toast detail
    setToastDetail(undefined);
    setTimeout(() => {
      setToastDetail(sampleToastDetail[toastId]);
    }, 500);
  }

  return (
    <ColumnFlex style={dynamicStyles.root}>
      <StatusBar barStyle={"dark-content"} />
      {/* 상단 */}
      <ColumnFlex gap={10} style={styles.top}>
        <Typography size={30} weight={"bold"}>
          암기빵을 담아주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          원하는 암기빵을 골라주세요. 지금 암기빵을 고르지 않고 나중에 나만의
          암기빵을 만들 수도 있어요.
        </Typography>
      </ColumnFlex>

      {/* 콘텐츠 */}
      <ColumnFlex gap={10} style={styles.content}>
        {toasts ? (
          toasts.map((toast) => (
            <MinimalToast
              name={toast.name}
              like={toast.like}
              picture={toast.picture}
              added={onboarding.state.toasts.includes(toast.id)}
              onAdd={() => handleAdd(toast.id)}
              onDetail={() => handleDetail(toast.id)}
              key={toast.id}
            />
          ))
        ) : (
          <>
            <Skeleton isLoading={!toasts}>
              <MinimalToast
                name={""}
                like={0}
                added={false}
                onAdd={() => {}}
                onDetail={() => {}}
              />
            </Skeleton>
            <Skeleton isLoading={!toasts}>
              <MinimalToast
                name={""}
                like={0}
                added={false}
                onAdd={() => {}}
                onDetail={() => {}}
              />
            </Skeleton>
            <Skeleton isLoading={!toasts}>
              <MinimalToast
                name={""}
                like={0}
                added={false}
                onAdd={() => {}}
                onDetail={() => {}}
              />
            </Skeleton>
          </>
        )}
      </ColumnFlex>

      {/* 하단 */}
      <View
        style={styles.bottom}
        onLayout={(event) =>
          setBottomButtonHeight(event.nativeEvent.layout.height)
        }
      >
        <BottomButton
          anchor={{
            label: "이전",
            onPress: handleBack,
          }}
        >
          <Button
            label={"다음"}
            color={Colors.primary}
            icon={<ArrowForward />}
            iconSize={24}
            style={styles.bottomButton}
            onPress={handleNext}
          />
        </BottomButton>
      </View>

      {/* 모달 */}
      <ToastDetailModal
        toast={toastDetail}
        visible={detailModalOpen}
        onCancel={handleModalClose}
        onAdd={handleModalAdd}
      />
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 200,
    padding: 20,
  },
  content: {
    padding: 20,
  },
  bottom: {
    backgroundColor: Colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  bottomButton: {
    width: "100%",
    height: 50,
  },
});
