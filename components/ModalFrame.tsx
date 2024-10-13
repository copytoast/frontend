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

interface ModalFrameProps {
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
}: ModalFrameProps) {
  const [enabled, setEnabled] = React.useState(visible);

  const bgAnimated = React.useRef(new Animated.Value(0)).current;
  const modalAnimated = React.useRef(new Animated.Value(0)).current;
  const contentAnimated = React.useRef(new Animated.Value(0)).current;
  const buttonAnimated = React.useRef(new Animated.Value(0)).current;

  const dynamicStyles = getDynamicStyles({
    bgAnimated,
    modalAnimated,
    contentAnimated,
    buttonAnimated,
  });

  // visible 값이 변경될 때마다 애니메이션을 실행
  React.useEffect(() => {
    if (visible) setEnabled(true);

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
      if (finished && !visible) setEnabled(false);
    });
  }, [visible]);

  return (
    <Modal visible={enabled} transparent>
      <Animated.View style={[dynamicStyles.background, staticStyles.background]}>
        <Animated.View style={[dynamicStyles.modal, staticStyles.modal, style]}>
          <Animated.View style={[dynamicStyles.content, staticStyles.content]}>
            {children}
          </Animated.View>
          <Animated.View style={[dynamicStyles.button, staticStyles.button]}>
            {buttons}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const staticStyles = StyleSheet.create({
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
  content: {
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
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

interface dynamicStylesProps {
  bgAnimated: Animated.Value;
  modalAnimated: Animated.Value;
  contentAnimated: Animated.Value;
  buttonAnimated: Animated.Value;
}

const getDynamicStyles = (props: dynamicStylesProps) => ({
  background: {
    backgroundColor: props.bgAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],
    }),
  },
  modal: {
    transform: [
      {
        translateY: props.modalAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
  },
  content: {
    transform: [
      {
        translateY: props.contentAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
    opacity: props.contentAnimated,
  },
  button: {
    transform: [
      {
        translateY: props.buttonAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
    opacity: props.buttonAnimated,
  },
});
