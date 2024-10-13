import React from "react";

import { StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";

import Typography from "@/components/Typography";
import BottomButton from "@/components/BottomButton";
import Button from "@/components/Button";
import MinimalToast from "@/components/MinimalToast";
import ToastDetailModal from "@/components/onboarding/ToastDetailModal";
import Skeleton from "@/components/Skeleton";
import Pop from "@/components/Pop";

import { OnboardingContext } from "@/contexts/Onboarding";

import getRecommendedToasts, {
  type GetRecommendedToastsResult,
} from "@/api/getRecommendedToasts";
import getToast, { type GetToastResult } from "@/api/getToast";

export default function Username() {
  const onboarding = React.useContext(OnboardingContext);

  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [toastDetail, setToastDetail] =
    React.useState<NonNullable<GetToastResult["toast"]>>();
  const [bottomButtonHeight, setBottomButtonHeight] = React.useState(0);
  const [toasts, setToasts] =
    React.useState<GetRecommendedToastsResult["toasts"]>();

  const dynamicStyles = getDynamicStyles({ bottomButtonHeight });

  // 추천 암기빵 불러오기
  React.useEffect(() => {
    (async () => {
      const res = await getRecommendedToasts({ count: 3 });

      const result = res.data.result;
      if (res.data.code !== 1000 || result === undefined) {
        // TODO: 에러 처리
        return;
      }

      setToasts(
        result.toasts.map((toast) => ({
          ...toast,
          added: false,
        }))
      );
    })();
  }, []);

  // 모달 닫기 핸들러
  function handleModalClose() {
    setDetailModalOpen(false);
  }

  // 모달 담기 핸들러
  function handleModalAdd(toastId: number) {
    handleAdd(toastId);
  }

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
  async function handleDetail(toastId: number) {
    setDetailModalOpen(true);
    setToastDetail(undefined);
    const res = await getToast({ id: toastId });
    const result = res.data.result;

    if (res.data.code !== 1000 || result === undefined) {
      // TODO: 에러 처리
      setDetailModalOpen(false);
      return;
    }

    const previewToast = toasts?.find((toast) => toast.id === toastId);
    const toast = result.toast;

    setToastDetail({
      ...toast,
      added: previewToast?.added ?? false,
    });
  }

  return (
    <View style={[staticStyles.root, dynamicStyles.root]}>
      <StatusBar barStyle={"dark-content"} />
      {/* 상단 */}
      <View style={staticStyles.top}>
        <Typography size={30} weight={"bold"}>
          암기빵을 담아주세요.
        </Typography>
        <Typography size="medium" color={Colors.grey}>
          원하는 암기빵을 골라주세요. 지금 암기빵을 고르지 않고 나중에 나만의
          암기빵을 만들 수도 있어요.
        </Typography>
      </View>

      {/* 콘텐츠 */}
      {toasts ? (
        <Pop style={staticStyles.content} visible={toasts !== undefined}>
          {toasts.map((toast) => (
            <MinimalToast
              name={toast.name}
              addCount={toast.addCount}
              picture={toast.picture}
              added={onboarding.state.toasts.includes(toast.id)}
              onAdd={() => handleAdd(toast.id)}
              onDetail={() => handleDetail(toast.id)}
              key={toast.id}
            />
          ))}
        </Pop>
      ) : (
        <View style={staticStyles.content}>
          <ToastSkeleton />
          <ToastSkeleton />
          <ToastSkeleton />
        </View>
      )}

      {/* 하단 */}
      <View
        style={staticStyles.bottom}
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
            backgroundColor={Colors.primary}
            icon={
              <MaterialIcons
                name={"arrow-forward"}
                size={24}
                color={Colors.white}
              />
            }
            style={staticStyles.bottomButton}
            onPress={handleNext}
          />
        </BottomButton>
      </View>

      {/* 모달 */}
      <ToastDetailModal
        toast={
          toastDetail && {
            ...toastDetail,
            added: onboarding.state.toasts.includes(toastDetail?.id ?? 0),
          }
        }
        visible={detailModalOpen}
        onCancel={handleModalClose}
        onAdd={handleModalAdd}
      />
    </View>
  );
}

const ToastSkeleton = () => (
  <Skeleton isLoading>
    <MinimalToast
      name={""}
      addCount={0}
      added={false}
      onAdd={() => {}}
      onDetail={() => {}}
    />
  </Skeleton>
);

const staticStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    gap: 10,
    height: 200,
    padding: 20,
  },
  content: {
    gap: 10,
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

interface DynamicStylesProps {
  bottomButtonHeight: number;
}

const getDynamicStyles = ({ bottomButtonHeight }: DynamicStylesProps) => ({
  root: {
    paddingBottom: bottomButtonHeight,
  },
});
