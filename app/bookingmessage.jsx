import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";

export default function BookingMessage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={"Payment method"} />

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Ionicons name={"checkmark"} color={"black"} size={35} />
        </View>
        <Text style={styles.successText}>Booking Confirmed Successfully!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.navigate("home")}
        >
          <Text style={styles.buttonText}>See trip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.navigate("home")}
        >
          <Text style={styles.buttonText}>Go to home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  content: {
    marginTop: 40,
    gap: 24,
    padding: 20,
  },
  iconWrapper: {
    height: 90,
    width: 90,
    backgroundColor: "#3FE0D0",
    borderRadius: 45, // Half the height/width for a perfect circle
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    color: "black",
    fontSize: 32,
  },
  buttonsWrapper: {
    gap: 16,
    marginTop: "auto",
    marginBottom: 50,
  },
  button: {
    height: 58,
    borderRadius: 800,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#3FE0D0",
  },
  secondaryButton: {
    backgroundColor: "#F4F4F4",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
