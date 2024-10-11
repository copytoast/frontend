import React from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import Pop from "@/components/Pop";
import MyToastSection from "@/components/home/MyToastSection";

import getAddedToasts, {
  type GetAddedToastsResult,
} from "@/api/getAddedToasts";

export default function Home() {
  const [addedToasts, setAddedToasts] =
    React.useState<GetAddedToastsResult["toasts"]>();
  const [refreshing, setRefreshing] = React.useState(false);

  // 담은 암기빵 불러오기
  async function loadAddedToasts() {
    const res = await getAddedToasts({
      count: 3,
    });
    const result = res.data.result;

    if (res.data.code !== 1000 || result === undefined) {
      // TODO: 에러 처리
      return;
    }

    setAddedToasts(result.toasts);
  }

  React.useEffect(() => {
    handleRefresh();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await Promise.all([loadAddedToasts()]);
    setRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <StatusBar barStyle={"dark-content"} />
      <Pop style={styles.root} visible>
        <MyToastSection
          key="toast_section"
          toasts={addedToasts}
          refreshing={refreshing}
        />
      </Pop>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  sectionContent: {
    padding: 5,
    paddingTop: 0,
  },
  quickButtonContainer: {
    padding: 10,
  },
  quickButton: {
    flex: 1,
  },
  quickButtonContent: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 15,
  },
});
