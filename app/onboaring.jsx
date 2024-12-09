import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function OnBoarding() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const handleNextPress = () => {
    if (page === 1) {
      setPage(2);
    } else {
      router.navigate("home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.pageIndicator}>
          <View style={[styles.pageDot, page === 1 && styles.activePageDot]} />
          <View style={[styles.pageDot, page === 2 && styles.activePageDot]} />
          <Text style={styles.pageText}>{page}/2</Text>
        </View>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.navigate("login")}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image
        source={
          page === 2
            ? require("../assets/images/onboarding2.png")
            : require("../assets/images/onboarding1.png")
        }
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text Content */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>One App For All of Your Rides</Text>
        <Text style={styles.subtitle}>
          From scooters to Ubers we've got you covered.
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  pageDot: {
    width: 20,
    height: 11,
    borderRadius: 11,
    backgroundColor: "#f4f4f4",
  },
  activePageDot: {
    backgroundColor: "black",
  },
  pageText: {
    fontSize: 13,
    marginLeft: 10,
  },
  skipButton: {
    height: 46,
    width: 75,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  skipButtonText: {
    fontSize: 14,
    color: "black",
  },
  image: {
    height: 280,
    width: 300,
    alignSelf: "center",
    marginBottom: 16,
  },
  textWrapper: {
    gap: 16,
  },
  title: {
    color: "black",
    fontSize: 32,
    textAlign: "center",
  },
  subtitle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    height: 58,
    borderRadius: 100,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
