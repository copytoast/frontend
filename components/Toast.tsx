import React from "react";

import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Typography from "@/components/Typography";
import ToastIcon from "@/components/ToastIcon";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";

import Colors from "@/constants/Colors";
import ToastDetailMenu, {
  type ToastDetailMenuActions,
} from "@/components/toast/ToastDetailMenu";

interface ToastProps {
  name: string;
  description: string;
  addCount: number;
  added: boolean;
  checkBoxVisible?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  menuActions?: Partial<ToastDetailMenuActions>;
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
  menuActions,
  my,
  picture,
  detailButtonVisible,
  style,
}: ToastProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [detailButtonLayout, setDetailButtonLayout] =
    React.useState<LayoutRectangle>();

  function handleDetailOpen() {
    setMenuOpen(true);
  }

  function handleDetailClose() {
    setMenuOpen(false);
  }

  function handleDetailLayout(event: LayoutChangeEvent) {
    event.currentTarget?.measureInWindow((x, y, width, height) => {
      setDetailButtonLayout({
        x,
        y,
        width,
        height,
      });
    });
  }

  return (
    <>
      <View style={[styles.root, style]}>
        <View style={styles.left}>
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
          <View style={styles.info}>
            <View style={styles.title}>
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
            </View>
            <Typography
              size={14}
              weight="regular"
              numberOfLines={1}
              color={Colors.greyLight}
            >
              {description}
            </Typography>
          </View>
        </View>
        {detailButtonVisible && (
          <Button
            icon={
              <MaterialIcons name={"more-vert"} size={24} color={Colors.grey} />
            }
            onPress={handleDetailOpen}
            onLayout={handleDetailLayout}
          />
        )}
      </View>

      {detailButtonLayout && menuActions && (
        <ToastDetailMenu
          visible={menuOpen}
          actions={menuActions}
          onClose={handleDetailClose}
          triggerLayout={detailButtonLayout}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  title: {
    gap: 5,
    flexDirection: "row",
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
