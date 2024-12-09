import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Header = ({ title }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name={"chevron-back"} color={"black"} size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <Ionicons name={"chevron-back"} color={"transparent"} size={24} />
    </View>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "medium",
  },
};
