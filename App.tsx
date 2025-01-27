import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  applicationId,
  nativeApplicationVersion,
  nativeBuildVersion,
} from "expo-application";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.row}>
        <Text style={styles.bold}>Application ID:</Text>
        <Text>{applicationId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Application Version:</Text>
        <Text>{nativeApplicationVersion}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Build Version:</Text>
        <Text>{nativeBuildVersion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
});
