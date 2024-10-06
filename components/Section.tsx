import React from "react";

import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import ColumnFlex from "@/components/ColumnFlex";
import RowFlex from "@/components/RowFlex";
import Typography from "@/components/Typography";
import FeedbackPressable from "@/components/FeedbackPressable";

import Colors from "@/constants/Colors";

import ArrowIcon from "@/assets/vectors/arrow.svg";

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
    <ColumnFlex style={[styles.root, style]}>
      <FeedbackPressable
        onPress={onTitlePress}
        style={styles.titleButton}
        contentStyle={styles.titleButtonContent}
        scaleComponent={"content"}
        colorComponent={"content"}
      >
        <RowFlex style={[styles.title, titleStyle]}>
          <RowFlex gap={10}>
            {titleIcon}
            <Typography size={18} color={Colors.grey} weight={"medium"}>
              {title}
            </Typography>
          </RowFlex>
          <RowFlex>
            {titleArrowVisible && <ArrowIcon width={12} height={12} />}
          </RowFlex>
        </RowFlex>
      </FeedbackPressable>
      {children}
    </ColumnFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleButton: {},
  titleButtonContent: {
    borderRadius: 10,
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});
