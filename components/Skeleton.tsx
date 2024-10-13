import React from "react";

import {
  Animated,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from "react-native";

interface SkeletonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  skeletonStyle?: StyleProp<ViewStyle>;
}

export default function Skeleton({
  isLoading,
  children,
  wrapperStyle,
  contentStyle,
  skeletonStyle,
}: SkeletonProps) {
  const colorAnimated = React.useRef(new Animated.Value(0)).current;
  const opacityAnimated = React.useRef(new Animated.Value(0)).current;

  const dynamicStyles = getDynamicStyles({ colorAnimated, opacityAnimated });

  // 색상 애니메이션 반복
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimated, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnimated, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // isLoading이 바뀔 때 opacity 애니메이션 실행
  React.useEffect(() => {
    Animated.timing(opacityAnimated, {
      toValue: isLoading ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View
        style={[dynamicStyles.color, styles.color, skeletonStyle]}
      />
      <Animated.View
        style={[dynamicStyles.content, contentStyle]}
        pointerEvents={isLoading ? "none" : "auto"}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  color: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
});

interface DynamicStylesProps {
  colorAnimated: Animated.Value;
  opacityAnimated: Animated.Value;
}

const getDynamicStyles = (props: DynamicStylesProps) => ({
  color: {
    backgroundColor: props.colorAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: ["#f0f0f0", "#e0e0e0"],
    }),
    opacity: props.opacityAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  },
  content: {
    opacity: props.opacityAnimated,
  },
});
