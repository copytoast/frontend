import React from "react";

import { View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";

import Typography from "@/components/Typography";

interface FavoriteBadgeProps {
  favorite: boolean;
  favoriteCount: number;
  style?: StyleProp<ViewStyle>;
}

export default function FavoriteBadge({
  favorite,
  favoriteCount,
  style,
}: FavoriteBadgeProps) {
  // 아이콘
  const Icon = React.useCallback(
    () =>
      favorite ? (
        <MaterialIcons name={"favorite"} size={8} color={Colors.red} />
      ) : (
        <MaterialIcons name={"favorite-border"} size={8} color={Colors.grey} />
      ),
    [favorite]
  );

  // 담긴 횟수 문자열
  const addCountString = React.useMemo(() => {
    if (favoriteCount < 1000) return favoriteCount.toLocaleString();
    if (favoriteCount < 10000) return `${(favoriteCount / 1000).toFixed(1)}k`;
    return "10k+";
  }, [favoriteCount]);

  return (
    <View style={[staticStyles.root, style]}>
      <Icon />
      <Typography size={8} color={Colors.grey}>
        {addCountString}
      </Typography>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    gap: 3,
    height: 12,
    paddingHorizontal: 3,
    borderRadius: 6,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    maxWidth: "100%",
    backgroundColor: Colors.greyLighter,
  },
});
