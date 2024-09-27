import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Modal,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import Colors from "@/constants/Colors";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  buttons: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ModalFrame({
  visible,
  children,
  buttons,
  style,
}: ModalProps) {
  const [enabled, setEnabled] = React.useState(visible);

  const bgAnimated = React.useRef(new Animated.Value(0)).current;
  const modalAnimated = React.useRef(new Animated.Value(0)).current;
  const contentAnimated = React.useRef(new Animated.Value(0)).current;
  const buttonAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const runAnimations = () => {
      const animations = visible
        ? [
            animate(bgAnimated, 1),
            animate(modalAnimated, 1),
            animate(contentAnimated, 1),
            animate(buttonAnimated, 1, 50),
          ]
        : [
            animate(buttonAnimated, 0),
            animate(bgAnimated, 0, 50),
            animate(modalAnimated, 0, 50),
            animate(contentAnimated, 0, 50),
          ];

      Animated.parallel(animations).start(({ finished }) => {
        if (!visible && finished) setEnabled(false);
      });
    };

    runAnimations();
    if (visible) setEnabled(true);
  }, [visible]);

  const dynamicStyles = {
    background: {
      backgroundColor: bgAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],
      }),
    },
    modal: {
      transform: [
        {
          translateY: modalAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    },
    content: {
      transform: [
        {
          translateY: contentAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
      opacity: contentAnimated,
    },
    button: {
      transform: [
        {
          translateY: buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
      opacity: buttonAnimated,
    },
  };

  return (
    <Modal visible={enabled} transparent>
      <Animated.View style={[dynamicStyles.background, styles.background]}>
        <Animated.View style={[dynamicStyles.modal, styles.modal, style]}>
          <Animated.View style={[dynamicStyles.content, styles.content]}>
            {children}
          </Animated.View>
          <Animated.View style={[dynamicStyles.button, styles.button]}>
            {buttons}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  modal: {
    backgroundColor: Colors.white,
    position: "absolute",
    overflow: "hidden",
    gap: 20,
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 15,
  },
  content: { paddingVertical: 10 },
  button: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
});

const animate = (
  animatedValue: Animated.Value,
  toValue: number,
  delay: number = 0
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration: 200,
    easing: toValue === 1 ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
    useNativeDriver: true,
    delay,
  });
};
