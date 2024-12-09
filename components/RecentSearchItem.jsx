import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RecentSearchItem = ({
  title,
  subtitle,
  icon = "location",
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} color={"black"} size={24} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#F4F4F4",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  subtitle: {
    color: "black",
    fontSize: 14,
    opacity: 0.6,
  },
};
