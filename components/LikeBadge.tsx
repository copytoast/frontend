import React from "react";

import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import Colors from "@/constants/Colors";

import Typography from "@/components/Typography";
import RowFlex from "@/components/RowFlex";

import EmptyHeartIcon from "@/assets/vectors/empty_heart.svg";
import FilledHeartIcon from "@/assets/vectors/filled_heart.svg";

interface LikeBadgeProps {
  liked: boolean;
  like: number;
  style?: StyleProp<ViewStyle>;
}

export default function LikeBadge({ liked, like, style }: LikeBadgeProps) {
  return (
    <RowFlex gap={3} style={[styles.root, style]}>
      {liked ? (
        <FilledHeartIcon width={8} height={8} />
      ) : (
        <EmptyHeartIcon width={8} height={8} />
      )}
      <Typography size={8} color={Colors.grey}>
        {like < 1000 && like.toLocaleString()}
        {10000 >= like && like >= 1000 && `${(like / 1000).toFixed(1)}k`}
        {10000 < like && "10k+"}
      </Typography>
    </RowFlex>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 12,
    paddingHorizontal: 3,
    borderRadius: 6,
    overflow: "hidden",
    alignItems: "center",
    maxWidth: "100%",
    backgroundColor: Colors.greyLighter,
  },
});
