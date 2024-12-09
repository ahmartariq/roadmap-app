import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Header } from "../components/Header";

// Reusable Component for Notification Setting Item
const NotificationSettingItem = ({ title, value, onToggle }) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingText}>{title}</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#5EF188" }}
      thumbColor={value ? "white" : "#f4f4f4"}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

export default function NotificationSettings() {
  const router = useRouter();

  // State for switches
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <Header title={"Notifications Settings"} />

      {/* Notification Settings */}
      <View style={styles.settingsContainer}>
        <NotificationSettingItem
          title="Enable"
          value={isEnabled}
          onToggle={() => setIsEnabled((prev) => !prev)}
        />
        <NotificationSettingItem
          title="Ride Availability"
          value={isEnabled1}
          onToggle={() => setIsEnabled1((prev) => !prev)}
        />
        <NotificationSettingItem
          title="Service Disruption"
          value={isEnabled2}
          onToggle={() => setIsEnabled2((prev) => !prev)}
        />
        <NotificationSettingItem
          title="Leave Alert"
          value={isEnabled3}
          onToggle={() => setIsEnabled3((prev) => !prev)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  contentContainer: {
    rowGap: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    fontWeight: "300",
    fontSize: 18,
  },
  settingsContainer: {
    gap: 16,
  },
  settingItem: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  settingText: {
    color: "black",
    fontWeight: "300",
    fontSize: 16,
  },
});
