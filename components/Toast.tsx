import React from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import Typography from "@/components/Typography";
import RowFlex from "@/components/RowFlex";
import ToastIcon from "@/components/ToastIcon";
import ColumnFlex from "@/components/ColumnFlex";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";

import Colors from "@/constants/Colors";

import MoreIcon from "@/assets/vectors/more.svg";

interface ToastProps {
  name: string;
  description: string;
  addCount: number;
  added: boolean;
  checkBoxVisible?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  my?: boolean;
  picture?: string;
  detailButtonVisible?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Toast({
  name,
  description,
  addCount,
  added,
  checkBoxVisible,
  checked,
  onCheckChange,
  my,
  picture,
  detailButtonVisible,
  style,
}: ToastProps) {
  return (
    <RowFlex style={[styles.root, style]} gap={10}>
      <RowFlex style={styles.left} gap={10}>
        {checkBoxVisible && (
          <CheckBox
            checked={checked ?? false}
            onChange={onCheckChange ?? (() => {})}
          />
        )}
        <ToastIcon
          size={40}
          picture={picture}
          like={{ count: addCount, added }}
        />
        <ColumnFlex style={styles.info}>
          <RowFlex style={styles.title} gap={5}>
            <Typography size={16} weight="bold" color={Colors.greyDark}>
              {name}
            </Typography>
            {my && (
              <View style={styles.my}>
                <Typography size={10} color={Colors.white} weight={"bold"}>
                  MY
                </Typography>
              </View>
            )}
          </RowFlex>
          <Typography
            size={14}
            weight="regular"
            numberOfLines={1}
            color={Colors.greyLight}
          >
            {description}
          </Typography>
        </ColumnFlex>
      </RowFlex>
      {detailButtonVisible && (
        <Button icon={<MoreIcon width={24} height={24} />} />
      )}
    </RowFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  left: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  my: {
    paddingHorizontal: 6,
    borderRadius: 10,
    height: 18,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
});

export default Toast;
