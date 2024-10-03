import Typography from "@/components/Typography";

import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";

export default function Home() {
  return (
    <View>
      <Typography>Home</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
  },
  content: {
    paddingTop: 120,
  },
  top: {},
  textLogo: {
    gap: 10,
  },
  bottom: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    padding: 20,
    gap: 10,
  },
  loginButton: {
    width: "100%",
    height: 50,
  },
});
