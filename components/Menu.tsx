import React from "react";

import { View, StyleSheet, Modal, Dimensions } from "react-native";

import Button from "@/components/Button";
import Pop from "@/components/Pop";
import Colors from "@/constants/Colors";

interface MenuProps {
  anchorElement: View;
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Menu({
  anchorElement,
  open,
  children,
  onClose,
}: MenuProps) {
  const windowWidth = Dimensions.get("window").width;
  const width = 180;

  const [anchorLayout, setAnchorLayout] = React.useState({
    x: 0,
    y: 0,
    height: 0,
  });

  React.useEffect(() => {
    anchorElement.measureInWindow((x, y, height) => {
      setAnchorLayout({ x, y, height });
    });
  }, [open, anchorElement]);

  const dynamicStyles = getDynamicStyles({
    x:
      anchorLayout.x > windowWidth - width - 10
        ? windowWidth - width - 10
        : anchorLayout.x,
    y: anchorLayout.y + anchorLayout.height,
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
