import React from "react";
import {
  View,
  Animated,
  Easing,
  type StyleProp,
  type ViewStyle,
} from "react-native";

interface PopProps {
  visible: boolean;
  children:
    | React.ReactElement<PieceProps, typeof Piece>
    | React.ReactElement<PieceProps, typeof Piece>[];
  style?: StyleProp<ViewStyle>;
}

export default function Pop({ visible, children, style }: PopProps) {
  const components = Array.isArray(children) ? children : [children];
  const animated = React.useRef<Record<string, Animated.Value>>({});

  React.useEffect(() => {
    if (!visible) return;

    Object.keys(animated.current).forEach((key, index) => {
      Animated.timing(animated.current[key], {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  }, [visible]);

  function getStyle(key: string) {
    if (!(key in animated.current))
      animated.current[key] = new Animated.Value(0);
    const aniamtedValue = animated.current[key];

    return {
      opacity: aniamtedValue,
      transform: [
        {
          translateY: aniamtedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };
  }

  return (
    <View style={style}>
      {components.map(
        (child) =>
          child.key && (
            <Animated.View key={child.key} style={getStyle(child.key)}>
              {child.props.children}
            </Animated.View>
          )
      )}
    </View>
  );
}

interface PieceProps {
  children: React.ReactNode;
  key: string;
}

export function Piece({ children, key }: PieceProps) {
  return <>{children}</>;
}
