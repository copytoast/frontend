import React from "react";
import {
  View,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Pop from "@/components/Pop";

import Colors from "@/constants/Colors";
import CheckBox from "@/components/CheckBox";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

import { SessionContext } from "@/contexts/Session";

import getAddedToasts, {
  type GetAddedToastsResult,
} from "@/api/getAddedToasts";
import Toast from "@/components/Toast";

export default function My() {
  const sessionContext = React.useContext(SessionContext);

  const [toasts, setToasts] = React.useState<GetAddedToastsResult["toasts"]>();
  const [checkedToasts, setCheckedToasts] = React.useState<number[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.root}>
        <View style={styles.header}>
          {toasts && (
            <>
              <CheckBox
                checked={checkedToasts.length > 0}
                indeterminate={
                  0 < checkedToasts.length &&
                  checkedToasts.length < toasts.length
                }
                onChange={handleCheckAll}
                color={Colors.grey}
                label={`총 ${toasts.length}개${
                  checkedToasts.length > 0
                    ? ` 중 ${checkedToasts.length}개 선택`
                    : ""
                }`}
              />
            </>
          )}
          <Button
            icon={
              <MaterialIcons
                name={"filter-alt"}
                size={24}
                color={Colors.grey}
              />
            }
          />
        </View>
        {toasts && (
          <Pop
            style={styles.content}
            visible={toasts !== undefined && !refreshing}
          >
            {toasts.map((toast) => (
              <Toast
                style={styles.toast}
                key={toast.id}
                name={toast.name}
                description={toast.description}
                addCount={toast.addCount}
                added={toast.added}
                my={toast.creator === sessionContext.state.user?.username}
                checked={checkedToasts.includes(toast.id)}
                onCheckChange={(checked) => handleToastCheck(toast.id, checked)}
                checkBoxVisible
                detailButtonVisible
              />
            ))}
          </Pop>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
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
});
