import React from "react";

import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToastIcon from "@/components/ToastIcon";

import Colors from "@/constants/Colors";

interface MinimalToastProps {
  name: string;
  addCount: number;
  added: boolean;
  onAdd: () => void;
  onDetail: () => void;
  picture?: string;
  style?: StyleProp<ViewStyle>;
}

function MinimalToast({
  name,
  addCount,
  onAdd,
  onDetail,
  picture,
  added,
  style,
}: MinimalToastProps) {
  return (
    <View style={[staticStyles.root, style]}>
      <View style={staticStyles.left}>
        <ToastIcon
          size={40}
          picture={picture}
          like={{ count: addCount, added }}
        />
        <View style={staticStyles.name}>
          <Typography size={16} weight={"medium"} color={Colors.greyDark}>
            {name}
          </Typography>
          <Button
            onPress={onDetail}
            icon={
              <MaterialIcons
                name={"info-outline"}
                size={24}
                color={Colors.grey}
              />
            }
          />
        </View>
      </View>
      <Button
        label={added ? "취소" : "담기"}
        labelSize={16}
        backgroundColor={added ? Colors.greyLight : Colors.primaryLight}
        onPress={onAdd}
        style={staticStyles.button}
      />
    </View>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  button: {
    paddingHorizontal: 10,
  },
});

export default MinimalToast;
