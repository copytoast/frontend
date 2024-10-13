import { StyleSheet, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ModalFrame from "@/components/ModalFrame";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToastIcon from "@/components/ToastIcon";
import Skeleton from "@/components/Skeleton";

import Colors from "@/constants/Colors";

import getRelativeTime from "@/utility/getRelativeTime";

export interface Toast {
  id: number;
  name: string;
  description: string;
  addCount: number;
  picture?: string;
  type: "MATCHING" | "ORDER" | "LIST" | "CLASSIFY" | "BLANK";
  creator: string;
  createdAt: string;
  updatedAt: string;
  added: boolean;
}

interface ToastDetailModalProps {
  toast?: Toast;
  visible: boolean;
  onCancel: () => void;
  onAdd: (toastId: number) => void;
}

export default function ToastDetailModal({
  toast,
  visible,
  onCancel,
  onAdd,
}: ToastDetailModalProps) {
  const buttons = (
    <>
      <Button
        label={"닫기"}
        backgroundColor={Colors.grey}
        onPress={onCancel}
        style={staticStyles.button}
      />

      <Skeleton
        isLoading={!toast}
        wrapperStyle={staticStyles.buttonSkeletonWrapper}
        skeletonStyle={staticStyles.buttonSkeleton}
        contentStyle={staticStyles.button}
      >
        <Button
          label={toast?.added ? "담기 취소" : "담기"}
          backgroundColor={Colors.primary}
          icon={
            <MaterialIcons
              name={"favorite-border"}
              size={20}
              color={Colors.white}
            />
          }
          onPress={toast && (() => onAdd(toast.id))}
          style={staticStyles.button}
        />
      </Skeleton>
    </>
  );

  return (
    <ModalFrame visible={visible} buttons={buttons}>
      <View style={staticStyles.content}>
        <View style={staticStyles.info}>
          {/* 제목 */}
          <Skeleton isLoading={!toast} contentStyle={staticStyles.name}>
            <ToastIcon
              picture={toast?.picture}
              size={40}
              like={{
                added: toast?.added ?? false,
                count: toast?.addCount ?? 0,
              }}
            />
            <Typography size={20} weight={"bold"} color={Colors.greyDark}>
              {toast?.name}
            </Typography>
          </Skeleton>

          {/* 제작 날짜 및 업데이트 날짜 */}
          <Skeleton isLoading={!toast}>
            <Typography size={12} color={Colors.greyLight}>
              {toast
                ? `${toast.creator}님이 ${getRelativeTime(
                    new Date(toast.createdAt)
                  )}에 제작 ㆍ ${getRelativeTime(
                    new Date(toast.updatedAt)
                  )}에 업데이트`
                : "정보를 불러올 수 없어요."}
            </Typography>
          </Skeleton>

          {/* 설명 */}
          <Skeleton isLoading={!toast}>
            <Typography size={16} color={Colors.grey}>
              {toast?.description}
            </Typography>
          </Skeleton>
        </View>
        <View style={staticStyles.preview}></View>
      </View>
    </ModalFrame>
  );
}

const staticStyles = StyleSheet.create({
  content: {
    gap: 20,
  },
  info: {
    gap: 10,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  preview: {
    height: 200,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.greyLighter,
    borderRadius: 5,
  },
  buttonSkeletonWrapper: {
    flex: 1,
    height: 50,
  },
  buttonSkeleton: {
    borderRadius: 10,
  },
  button: {
    flex: 1,
    height: 50,
  },
});
