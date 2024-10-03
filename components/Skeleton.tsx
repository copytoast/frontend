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
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>;
}

export default function Skeleton({
  isLoading,
  children,
  containerStyle,
  contentStyle,
  gradientStyle,
}: SkeletonProps) {
  const gradientAnimated = React.useRef(new Animated.Value(0)).current;
  const opacityAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnimated, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnimated, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  React.useEffect(() => {
    Animated.timing(opacityAnimated, {
      toValue: isLoading ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  const dynamicStyles = {
    gradient: {
      backgroundColor: gradientAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f0f0f0", "#e0e0e0"],
      }),
      opacity: opacityAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    },
    content: {
      opacity: opacityAnimated,
    },
  };

  return (
    <Animated.View style={containerStyle}>
      <Animated.View
        style={[dynamicStyles.gradient, styles.gradient, gradientStyle]}
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
});
