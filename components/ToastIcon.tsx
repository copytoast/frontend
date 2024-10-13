import React from "react";

import { StyleSheet, View, Image } from "react-native";

import FavoriteBadge from "@/components/FavoriteBadge";

import Colors from "@/constants/Colors";

import Logo from "@/assets/vectors/logo.svg";

interface ToastIconProps {
  picture?: string;
  size: number;
  like?: {
    count: number;
    added: boolean;
  };
}

export default function ToastIcon({ picture, size, like }: ToastIconProps) {
  const dynamicStyles = {
    root: {
      width: size,
      height: size,
    },
    icon: {
      borderRadius: size / 2,
    },
  };

  return (
    <View style={dynamicStyles.root}>
      {picture ? (
        <View style={[styles.icon, dynamicStyles.icon]}>
          <Image source={{ uri: picture }} width={size} height={size} />
        </View>
      ) : (
        <View
          style={[
            styles.icon,
            dynamicStyles.icon,
            styles.defaultIconBackground,
          ]}
        >
          <Logo width={size * ratio} height={size * ratio} />
        </View>
      )}

      {like && (
        <FavoriteBadge
          favorite={like.added}
          favoriteCount={like.count}
          style={styles.likeBadge}
        />
      )}
    </View>
  );
}

const ratio = 0.6;

const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
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
});
