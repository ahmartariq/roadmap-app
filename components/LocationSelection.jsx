import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

export const LocationSelection = ({
  origin,
  destination,
  setDestination,
  setOrigin,
  distance,
  travelTime,
  setShowRides,
  openLocationModal,
}) => {
  const dispatch = useDispatch();

  // Validation Function
  const handleFindRide = () => {
    if (!origin || !destination) {
      Toast.show({
        type: "info", // Use "success", "error", or "info" by default
        text1: "Location Missing!",
        text2: "Please select both origin and destination.",
      });
      return;
    }
    setShowRides(true);
  };

  const handleCancel = () => {
    Alert.alert("Cancel Ride?", "Are you sure you want to cancel?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          dispatch(setOrigin(null));
          dispatch(setDestination(null));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Origin Input */}

        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/*first view */}
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <MaterialCommunityIcons
              name={"record-circle"}
              color={"#00A76F"}
              size={24}
            />
            <View
              style={{
                backgroundColor: "black",
                opacity: 0.2,
                width: 2,
                flex: 1,
              }}
            />
            <Ionicons name={"location"} color={"#FF4C4C"} size={24} />
          </View>
          {/*2nd view */}
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity onPress={() => openLocationModal("origin")}>
              <View style={styles.locationInput}>
                <Text style={{ color: "black", opacity: 0.3, fontSize: 12 }}>
                  Pick Up
                </Text>
                <Text style={styles.locationText}>
                  {origin
                    ? origin.name.substring(0, 30) + "..."
                    : "Where From?"}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ borderColor: "black", opacity: 0.2, borderWidth: 1 }}
            />
            {/* Destination Input */}
            <TouchableOpacity onPress={() => openLocationModal("destination")}>
              <View style={styles.locationInput}>
                <Text style={{ color: "black", opacity: 0.3, fontSize: 12 }}>
                  Drop Off
                </Text>
                <Text style={styles.locationText}>
                  {destination
                    ? destination.name.substring(0, 35) + "..."
                    : "Where to?"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Distance and Travel Time */}
        {origin && destination && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>
              {distance} - {travelTime}
            </Text>
          </View>
        )}

        {/* Find Ride Button */}
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity
            style={styles.findRideButton2}
            onPress={handleCancel} // Use the validation function here
          >
            <Text style={styles.findRideText}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.findRideButton}
            onPress={handleFindRide} // Use the validation function here
          >
            <Text style={styles.findRideText}>Find ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  scrollViewContent: {
    padding: 15,
    flexGrow: 1,
    gap: 10,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "red",
    borderWidth: 1,
  },
  title: {
    color: "black",
    fontWeight: "medium",
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInput: {
    justifyContent: "center",
    flex: 1,
    height: 50,
  },
  locationText: {
    color: "black",
    fontWeight: "medium", // Use numerical weight for consistency
    fontSize: 16,
  },
  distanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 69,
    backgroundColor: "#f4f4f4",
    height: 50,
    flex: 1,
  },
  distanceText: {
    color: "black",
    fontWeight: "300",
    fontSize: 16,
  },
  findRideButton: {
    height: 50,
    borderRadius: 69,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  findRideButton2: {
    height: 50,
    borderRadius: 69,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  findRideText: {
    color: "black",
    fontSize: 16,
  },
});
