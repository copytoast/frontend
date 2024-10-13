import React from "react";

import {
  StyleSheet,
  Modal,
  Dimensions,
  type LayoutRectangle,
} from "react-native";

import Pop from "@/components/Pop";
import Colors from "@/constants/Colors";

interface MenuProps {
  buttonLayout?: LayoutRectangle;
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Menu({
  buttonLayout,
  open,
  children,
  onClose,
}: MenuProps) {
  const windowWidth = Dimensions.get("window").width;
  const width = 180;

  const dynamicStyles = getDynamicStyles({
    x:
      buttonLayout !== undefined
        ? buttonLayout.x > windowWidth - width - 10
          ? windowWidth - width - 10
          : buttonLayout.x
        : 0,
    y: buttonLayout !== undefined ? buttonLayout.y + buttonLayout.height : 0,
    width,
  });

  return (
    <Modal
      transparent
      visible={open}
      onDismiss={onClose}
      onRequestClose={onClose}
    >
      <Pop style={[staticStyles.wrapper, dynamicStyles.wrapper]} visible>
        <>{children}</>
      </Pop>
    </Modal>
  );
}

const staticStyles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    overflow: "hidden",
  },
});

interface DynamicStylesProps {
  x: number;
  y: number;
  width: number;
}

const getDynamicStyles = (props: DynamicStylesProps) => ({
  wrapper: {
    width: props.width,
    top: props.y,
    left: props.x,
  },
});
