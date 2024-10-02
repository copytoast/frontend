import { StyleSheet, View } from "react-native";

import ModalFrame from "@/components/ModalFrame";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import RowFlex from "@/components/RowFlex";

import Colors from "@/constants/Colors";

import EmptyHeartIcon from "@/assets/vectors/empty_heart_white.svg";

import type { Toast } from "@/types/Toast";
import ToastIcon from "../ToastIcon";
import getRelativeTime from "@/utility/getRelativeTime";

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
        color={Colors.grey}
        onPress={onCancel}
        style={styles.button}
      />

      <Button
        label={toast?.added ? "담기 취소" : "담기"}
        color={Colors.primary}
        icon={<EmptyHeartIcon />}
        iconSize={20}
        onPress={toast && (() => onAdd(toast.id))}
        style={styles.button}
      />
    </>
  );

  return (
    <ModalFrame visible={visible} buttons={buttons}>
      <View style={styles.content}>
        <View style={styles.info}>
          {/* 제목 */}
          <RowFlex gap={15} style={styles.name}>
            <ToastIcon
              picture={toast?.picture}
              size={40}
              like={{
                added: toast?.added ?? false,
                count: toast?.like ?? 0,
              }}
            />
            <Typography size={20} weight={"bold"} color={Colors.greyDark}>
              {toast?.name}
            </Typography>
          </RowFlex>

          {/* 제작 날짜 및 업데이트 날짜 */}
          {toast && (
            <Typography size={12} color={Colors.greyLight}>
              {toast?.creator}님이 {getRelativeTime(new Date(toast?.createdAt))}
              에 제작 ㆍ {getRelativeTime(new Date(toast?.updatedAt))}에
              업데이트
            </Typography>
          )}

          {/* 설명 */}
          <Typography size={16} color={Colors.grey}>
            {toast?.description}
          </Typography>
        </View>
        <View style={styles.preview}></View>
      </View>
    </ModalFrame>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  info: {
    gap: 10,
  },
  name: {
    alignItems: "center",
  },
  preview: {
    height: 200,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.greyLighter,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    height: 50,
  },
});
