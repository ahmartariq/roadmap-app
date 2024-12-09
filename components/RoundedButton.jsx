import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RoundedButton = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={20} color={"black"} />
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    gap: 8,
  },
  buttonLabel: {
    color: "black",
    fontSize: 16,
  },
};
