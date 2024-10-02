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
import LikeBadge from "@/components/LikeBadge";

import Colors from "@/constants/Colors";

import Logo from "@/assets/vectors/logo.svg";
import InfoIcon from "@/assets/vectors/info.svg";

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
  const icon = picture ? (
    <Image source={{ uri: picture }} style={styles.icon} />
  ) : (
    <View style={[styles.icon, styles.defaultIconBackground]}>
      <Logo width={25} height={25} />
      <LikeBadge liked={added} like={like} style={styles.likeBadge} />
    </View>
  );

  return (
    <RowFlex style={[styles.root, style]}>
      <RowFlex style={styles.left} gap={10}>
        <View>{icon}</View>
        <Typography size={16} weight="medium" color={Colors.greyDark}>
          {name}
        </Typography>
        <Pressable onPress={onDetail}>
          <InfoIcon width={24} height={24} />
        </Pressable>
      </RowFlex>
      <Button
        label={added ? "취소" : "담기"}
        fontSize={16}
        color={added ? Colors.greyLight : Colors.primary}
        onPress={onAdd}
        style={styles.button}
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  likeBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  defaultIconBackground: {
    backgroundColor: Colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 15,
  },
});

export default MinimalToast;
