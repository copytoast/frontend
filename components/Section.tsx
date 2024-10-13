import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Typography from "@/components/Typography";
import FeedbackPressable from "@/components/FeedbackPressable";

import Colors from "@/constants/Colors";

interface SectionProps {
  style?: StyleProp<ViewStyle>;
  titleIcon?: React.ReactNode;
  title: string;
  titleStyle?: StyleProp<ViewStyle>;
  titleArrowVisible?: boolean;
  onTitlePress?: () => void;
  children: React.ReactNode;
}

export default function Section({
  style,
  titleIcon,
  title,
  titleStyle,
  titleArrowVisible = true,
  onTitlePress,
  children,
}: SectionProps) {
  return (
    <View style={[staticStyles.root, style]}>
      <FeedbackPressable
        style={[staticStyles.title, titleStyle]}
        onPress={onTitlePress}
      >
        <View style={staticStyles.left}>
          {titleIcon}
          <Typography size={18} color={Colors.grey} weight={"medium"}>
            {title}
          </Typography>
        </View>
        <View>
          {titleArrowVisible && (
            <MaterialIcons
              name={"keyboard-arrow-right"}
              size={20}
              color={Colors.grey}
            />
          )}
        </View>
      </FeedbackPressable>
      {children}
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: "hidden",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
});
