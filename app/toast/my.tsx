import React from "react";
import {
  View,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Pop from "@/components/Pop";

import Colors from "@/constants/Colors";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import Menu from "@/components/Menu";

import { SessionContext } from "@/contexts/Session";

import getAddedToasts, {
  type GetAddedToastsResult,
} from "@/api/getAddedToasts";

export default function My() {
  const sessionContext = React.useContext(SessionContext);

  const [toasts, setToasts] = React.useState<GetAddedToastsResult["toasts"]>();
  const [checkedToasts, setCheckedToasts] = React.useState<number[]>([]);
  const [moreButtonLayout, setMoreButtonLayout] =
    React.useState<LayoutRectangle>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);

  // 담은 암기빵 불러오기
  async function loadAddedToasts() {
    const res = await getAddedToasts({
      count: 50,
    });
    const result = res.data.result;

    if (res.data.code !== 1000 || result === undefined) {
      // TODO: 에러 처리
      return;
    }

    setCheckedToasts([]);
    setToasts(result.toasts);
  }

  React.useEffect(() => {
    handleRefresh();
  }, []);

  // 새로고침 핸들러
  async function handleRefresh() {
    setRefreshing(true);
    setCheckedToasts([]);
    await Promise.all([loadAddedToasts()]);
    setRefreshing(false);
  }

  // 암기빵 선택 핸들러
  function handleToastCheck(id: number, checked: boolean) {
    if (checked) {
      setCheckedToasts([...checkedToasts, id]);
    } else {
      setCheckedToasts(checkedToasts.filter((checkedId) => checkedId !== id));
    }
  }

  // 암기빵 전체 선택 핸들러
  function handleCheckAll(checked: boolean) {
    if (checked) {
      setCheckedToasts(toasts?.map((toast) => toast.id) ?? []);
    } else {
      setCheckedToasts([]);
    }
  }

  // 암기빵 더보기 버튼 레이아웃 변경 핸들러
  function handleMoreButtonLayout(event: LayoutChangeEvent) {
    event.currentTarget?.measureInWindow((x, y, width, height) => {
      setMoreButtonLayout({
        x,
        y,
        width,
        height,
      });
    });
  }

  // 암기빵 더보기 메뉴 열기 핸들러
  function handleMenuOpen() {
    setMenuOpen(true);
  }

  // 암기빵 더보기 메뉴 닫기 핸들러
  function handleMenuClose() {
    setMenuOpen(false);
  }

  // 암기빵 필터 열기 핸들러
  function handleFilterOpen() {
    setFilterOpen(true);
  }

  // 암기빵 필터 닫기 핸들러
  function handleFilterClose() {
    setFilterOpen(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={staticStyles.root}>
        <View style={staticStyles.header}>
          <CheckBox
            checked={checkedToasts.length > 0}
            indeterminate={
              toasts &&
              0 < checkedToasts.length &&
              checkedToasts.length < toasts.length
            }
            onChange={handleCheckAll}
            color={Colors.grey}
            label={
              toasts &&
              `총 ${toasts.length}개${
                checkedToasts.length > 0
                  ? ` 중 ${checkedToasts.length}개 선택`
                  : ""
              }`
            }
          />
          <View style={staticStyles.buttonsWrapper}>
            <Button
              icon={
                <MaterialIcons
                  name={"filter-alt"}
                  size={24}
                  color={Colors.grey}
                />
              }
              onPress={handleFilterOpen}
            />
            {checkedToasts.length > 0 && (
              <Button
                icon={
                  <MaterialIcons
                    name={"more-vert"}
                    size={24}
                    color={Colors.grey}
                  />
                }
                onPress={handleMenuOpen}
                onLayout={handleMoreButtonLayout}
              />
            )}
          </View>
        </View>
        {toasts && (
          <Pop
            style={staticStyles.content}
            visible={toasts !== undefined && !refreshing}
          >
            {toasts.map((toast) => (
              <Toast
                style={staticStyles.toast}
                key={toast.id}
                name={toast.name}
                description={toast.description}
                addCount={toast.addCount}
                added={toast.added}
                my={toast.creator === sessionContext.state.user?.username}
                checked={checkedToasts.includes(toast.id)}
                onCheckChange={(checked) => handleToastCheck(toast.id, checked)}
                onDetail={() => {}}
                checkBoxVisible
                detailButtonVisible
              />
            ))}
          </Pop>
        )}
      </View>

      {/* 더보기 메뉴 */}
      <Menu
        open={menuOpen}
        onClose={handleMenuClose}
        buttonLayout={moreButtonLayout}
      >
        <Button
          icon={<MaterialIcons name={"delete"} size={20} color={Colors.grey} />}
          label={"담기 취소"}
          onPress={() => {
            handleMenuClose();
          }}
          backgroundColor={Colors.white}
          contentStyle={staticStyles.menuItem}
        />
      </Menu>
    </ScrollView>
  );
}

const staticStyles = StyleSheet.create({
  root: {
    padding: 10,
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  content: {
    gap: 5,
    paddingBottom: 50,
  },
  toast: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuItem: {
    justifyContent: "flex-start",
    width: "100%",
  },
});
