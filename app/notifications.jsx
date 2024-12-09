import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Avatar } from "@rneui/themed";
import AvatarImg from "../assets/images/img1.png";

// Dummy Data
const data = [
  {
    id: "1",
    title: "Booking Cancelled",
    time: "Today 2:44 PM",
    description: "You cancelled your booking. View details for more info.",
  },
  {
    id: "2",
    title: "New Booking Confirmed",
    time: "Yesterday 3:15 PM",
    description: "You cancelled your booking. View details for more info.",
  },
  {
    id: "3",
    title: "Payment Successful",
    time: "Nov 10 4:20 PM",
    description: "You cancelled your booking. View details for more info.",
  },
  {
    id: "4",
    title: "Driver Assigned",
    time: "Nov 9 1:00 PM",
    description: "You cancelled your booking. View details for more info.",
  },
  {
    id: "5",
    title: "Trip Completed",
    time: "Nov 8 8:30 PM",
    description: "You cancelled your booking. View details for more info.",
  },
];

// Reusable Notification Item Component
const NotificationItem = ({ title, description, time }) => (
  <TouchableOpacity style={styles.notificationItem}>
    <Avatar rounded source={AvatarImg} size={36} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationDescription}>{description}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
  </TouchableOpacity>
);

// Reusable Header Component
const Header = ({ onBack, onSettings }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name={"chevron-back"} color={"black"} size={24} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Notifications</Text>
    <TouchableOpacity onPress={onSettings}>
      <Ionicons name={"settings-outline"} color={"black"} size={24} />
    </TouchableOpacity>
  </View>
);

// Reusable Switch Tabs Component
const SwitchTabs = ({ selectedTab, setSelectedTab }) => (
  <View style={styles.switchTabs}>
    {["All", "Read", "Unread"].map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => setSelectedTab(tab)}
        style={[
          styles.tabButton,
          selectedTab === tab && styles.activeTabButton,
        ]}
      >
        <Text style={styles.tabText}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function Notifications() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("All");

  // Render Footer with Content Based on Selected Tab
  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <Header
        onBack={() => router.back()}
        onSettings={() => router.navigate("notificationsettings")}
      />
      <SwitchTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "All" && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <NotificationItem
              title={item.title}
              description={item.description}
              time={item.time}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
      {selectedTab === "Read" && (
        <Text style={styles.emptyText}>Read Notifications</Text>
      )}
      {selectedTab === "Unread" && (
        <Text style={styles.emptyText}>Unread Notifications</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListFooterComponent={ListFooterComponent}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    padding: 20,
  },
  footer: {
    gap: 25,
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
  switchTabs: {
    flexDirection: "row",
    gap: 16,
  },
  tabButton: {
    height: 40,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#f7f7f7",
  },
  activeTabButton: {
    backgroundColor: "#3FE0D0",
  },
  tabText: {
    color: "black",
  },
  list: {
    marginBottom: 40,
    gap: 15,
  },
  notificationItem: {
    borderRadius: 24,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    height: 133,
    gap: 10,
  },
  notificationContent: {
    flex: 1,
    justifyContent: "space-around",
  },
  notificationTitle: {
    color: "black",
    fontWeight: "medium",
    fontSize: 18,
  },
  notificationDescription: {
    color: "black",
    fontWeight: "medium",
    fontSize: 12,
  },
  notificationTime: {
    color: "black",
    fontWeight: "medium",
    fontSize: 12,
    opacity: 0.4,
  },
  emptyText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
