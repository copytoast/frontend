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
import Button from "@/components/Button";

import Colors from "@/constants/Colors";

import InfoIcon from "@/assets/vectors/info.svg";
import ToastIcon from "./ToastIcon";

interface MinimalToastProps {
  name: string;
  like: number;
  added: boolean;
  onAdd: () => void;
  onDetail: () => void;
  picture?: string;
  style?: StyleProp<ViewStyle>;
}

function MinimalToast({
  name,
  like,
  onAdd,
  onDetail,
  picture,
  added,
  style,
}: MinimalToastProps) {
  return (
    <RowFlex style={[styles.root, style]}>
      <RowFlex style={styles.left} gap={10}>
        <ToastIcon size={40} picture={picture} like={{ count: like, added }} />
        <RowFlex style={styles.left} gap={5}>
          <Typography size={16} weight="medium" color={Colors.greyDark}>
            {name}
          </Typography>
          <Button
            onPress={onDetail}
            icon={<InfoIcon width={24} height={24} />}
          />
        </RowFlex>
      </RowFlex>
      <Button
        label={added ? "취소" : "담기"}
        fontSize={16}
        color={added ? Colors.greyLight : Colors.primary}
        onPress={onAdd}
        contentStyle={styles.button}
      />
    </RowFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "space-between",
  },
  left: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 15,
  },
});

export default MinimalToast;
