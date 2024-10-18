import React from "react";
import { type LayoutRectangle, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Button from "@/components/Button";
import Menu from "@/components/Menu";

import Colors from "@/constants/Colors";

export interface ToastDetailMenuActions {
  onPlay: () => void;
  onDelete: () => void;
  onDetail: () => void;
}

interface ToastDetailMenuProps {
  triggerLayout: LayoutRectangle;
  visible: boolean;
  actions: Partial<ToastDetailMenuActions>;
  onClose?: () => void;
}

export default function ToastDetailMenu({
  triggerLayout,
  visible,
  actions,
  onClose,
}: ToastDetailMenuProps) {
  return (
    <Menu open={visible} onClose={onClose} buttonLayout={triggerLayout}>
      {/* 학습 */}
      {actions.onPlay && (
        <Button
          icon={
            <MaterialIcons name={"play-arrow"} size={20} color={Colors.grey} />
          }
          label={"학습"}
          onPress={() => {
            actions.onPlay?.();
            onClose?.();
          }}
          backgroundColor={Colors.white}
          contentStyle={staticStyles.menuItem}
        />
      )}

      {/* 상세 */}
      {actions.onDetail && (
        <Button
          icon={<MaterialIcons name={"info"} size={20} color={Colors.grey} />}
          label={"상세"}
          onPress={() => {
            actions.onDetail?.();
            onClose?.();
          }}
          backgroundColor={Colors.white}
          contentStyle={staticStyles.menuItem}
        />
      )}

      {/* 담기 취소 */}
      {actions.onDelete && (
        <Button
          icon={<MaterialIcons name={"delete"} size={20} color={Colors.grey} />}
          label={"담기 취소"}
          onPress={() => {
            actions.onDelete?.();
            onClose?.();
          }}
          backgroundColor={Colors.white}
          contentStyle={staticStyles.menuItem}
        />
      )}
    </Menu>
  );
}

const staticStyles = StyleSheet.create({
  menuItem: {
    justifyContent: "flex-start",
    width: "100%",
  },
});
