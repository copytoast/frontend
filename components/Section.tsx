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
      <Pressable onPress={onTitlePress}>
        <RowFlex style={[styles.title, titleStyle]}>
          <RowFlex gap={10}>
            {titleIcon}
            <Typography size={18} color={Colors.grey} weight={"medium"}>
              {title}
            </Typography>
          </RowFlex>
          <RowFlex>
            {titleArrowVisible && (
              <Pressable>
                <ArrowIcon width={12} height={12} />
              </Pressable>
            )}
          </RowFlex>
        </RowFlex>
      </Pressable>
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
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});
