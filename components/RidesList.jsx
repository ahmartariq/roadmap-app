import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RidesList = ({
  data,
  scooterdata,
  selectedCar,
  setSelectedCar,
  selectedScooter,
  setSelectedScooter,
  selectedTab,
  setSelectedTab,
  setShowRides,
  openRideModal,
}) => {
  // Reusable render function for both cars and scooters
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.carOption,
        {
          borderColor:
            selectedTab === "Car" && selectedCar?.id === item.id
              ? "black"
              : selectedTab === "Scooter" && selectedScooter?.id === item.id
              ? "black"
              : "#f3f3f3",
        },
      ]}
      onPress={() =>
        selectedTab === "Car"
          ? setSelectedCar(item)
          : selectedTab === "Scooter"
          ? setSelectedScooter(item)
          : null
      }
    >
      <Image source={item.image} resizeMode="contain" />
      <View style={styles.carDetails}>
        <View style={styles.carTitleRow}>
          <Image
            source={item.namepic}
            style={{ marginRight: 10 }}
            resizeMode="contain"
          />
          <Ionicons name={"person"} color={"black"} size={14} />
          <Text style={styles.carPeople}>{item.people}</Text>
        </View>
        <Text style={styles.carTime}>{item.time}</Text>
        <View style={styles.carType}>
          <Text style={styles.carTypeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.carPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowRides(false)}>
          <Ionicons name={"chevron-back"} color={"black"} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Available Options</Text>
        <Ionicons name={"chevron-back"} color={"transparent"} size={24} />
      </View>
      <View style={styles.tabBar}>
        {["Car", "Scooter", "Bike"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.listContainer}>
        {selectedTab === "Car" && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
          />
        )}
        {selectedTab === "Scooter" && (
          <FlatList
            data={scooterdata}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
          />
        )}
        {selectedTab === "Bike" && (
          <Text style={styles.noOptionText}>No Bikes Available</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.chooseButton}
        onPress={() =>
          openRideModal(selectedTab === "Car" ? selectedCar : selectedScooter)
        }
      >
        <Text style={styles.chooseButtonText}>
          Choose{" "}
          {selectedTab === "Car"
            ? selectedCar?.name
            : selectedTab === "Scooter"
            ? selectedScooter?.name
            : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    gap: 15,
  },
  title: {
    color: "black",
    fontWeight: "500",
    fontSize: 20,
    marginLeft: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: 6,
    borderRadius: 100,
  },
  tab: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  selectedTab: {
    backgroundColor: "#3fe0d0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabText: {
    color: "black",
    fontSize: 16,
  },
  listContainer: {
    height: 200,
  },
  noOptionText: {
    color: "black",
    fontSize: 16,
  },
  carOption: {
    borderRadius: 16,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    height: 95,
    gap: 5,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
  },
  carDetails: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    marginLeft: 10,
  },
  carTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  carName: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    marginRight: 10,
  },
  carPeople: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
  },
  carTime: {
    color: "black",
    fontWeight: "500",
    fontSize: 12,
  },
  carType: {
    backgroundColor: "#5EF188",
    padding: 5,
    borderRadius: 39,
    flexDirection: "row",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  carTypeText: {
    color: "black",
    fontWeight: "500",
    fontSize: 11,
  },
  carPrice: {
    color: "black",
    fontWeight: "500",
    fontSize: 15,
  },
  chooseButton: {
    height: 58,
    borderRadius: 800,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  chooseButtonText: {
    color: "black",
    fontSize: 16,
  },
});
