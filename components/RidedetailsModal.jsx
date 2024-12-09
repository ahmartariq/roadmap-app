import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import car from "../assets/images/car.png";
import AvatarImg from "../assets/images/img1.png";
import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";

// Reusable RideDetails Component
const RideDetails = ({ carName, image, activeRide }) => (
  <View style={styles.carDetails}>
    <Image
      source={activeRide.namepic}
      resizeMode="contain"
      style={{ alignSelf: "center" }}
    />
    <Text style={styles.carName}>{activeRide.realname || "Nissan Patrol"}</Text>
    <Text style={styles.carModel}>
      washington - {activeRide?.color || "white"}
    </Text>
    <Image
      source={activeRide?.actualimage || image}
      style={styles.carImage}
      resizeMode="contain"
    />
  </View>
);

// Reusable DriverDetails Component
const DriverDetails = ({ name, rating, distance }) => (
  <View style={styles.driverDetails}>
    <View style={styles.driverInfo}>
      <Avatar rounded source={AvatarImg} size={40} />
      <View>
        <Text style={styles.driverName}>{name}</Text>
        <View style={styles.driverRating}>
          <Ionicons name={"star"} color={"#FF9E0D"} size={20} />
          <Text style={styles.driverRatingText}>{rating}</Text>
        </View>
      </View>
    </View>
    <View style={styles.driverDistance}>
      <Text style={styles.driverDistanceText}>{distance}</Text>
    </View>
  </View>
);

// Reusable RideSummary Component
const RideSummary = ({ from, to, time, color }) => (
  <View style={styles.rideSummary}>
    <View style={styles.rideLocation}>
      <Ionicons name={"ellipse"} color={color} size={20} />
      <View>
        <Text style={styles.rideLocationText}>{from}</Text>
        <Text style={styles.rideLocationSubText}>{to}</Text>
      </View>
    </View>
    <Text style={styles.rideTime}>{time}</Text>
  </View>
);

// Reusable CostSummary Component
const CostSummary = ({ label, amount }) => (
  <View style={styles.costSummary}>
    <Text style={styles.costSummaryLabel}>{label}</Text>
    <Text style={styles.costSummaryAmount}>{amount}</Text>
  </View>
);

const RidedetailsModal = forwardRef(
  ({ setIsRideModalVisible, activeRide }, ref) => {
    const bottomSheetModalRef1 = useRef(null);
    const router = useRouter();
    const handlePresentModalPress1 = () => {
      bottomSheetModalRef1.current?.present();
      setIsRideModalVisible(true); // Notify parent that modal is visible
    };

    const handleDismissModal = () => {
      setIsRideModalVisible(false); // Notify parent that modal is hidden
    };

    useImperativeHandle(ref, () => ({
      handlePresentModalPress1,
    }));

    const handleDonePress = () => {
      // Close the modal
      bottomSheetModalRef1.current?.dismiss();
      setIsRideModalVisible(false); // Notify parent that the modal is closed
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef1}
          snapPoints={["80%"]}
          onDismiss={handleDismissModal} // Update visibility when dismissed
          enableDynamicSizing={false}
          enableHandlePanningGesture={false} // Disable sliding from the handle to dismiss
          enableContentPanningGesture={false}
        >
          <BottomSheetScrollView
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{ rowGap: 20, flexGrow: 1 }}
          >
            <RideDetails
              carName="Nissan Patrol"
              image={car}
              activeRide={activeRide}
            />
            <DriverDetails
              name="David"
              rating="4.9 (122)"
              distance="5 mins away"
            />
            <RideSummary
              from="Bobst Library"
              to="70 Washington Square ..."
              time="10:00 AM"
              color="#54E17B"
            />
            <RideSummary
              from="Bobst Library"
              to="70 Washington Square ..."
              time="10:00 AM"
              color="#F64336"
            />
            <View style={styles.separator} />

            {/* Cost Summary */}
            <CostSummary label="Estimated time travel" amount="15 min" />
            <CostSummary label="Ride subtotal" amount="$7.89" />
            <CostSummary label="Tax %" amount="$0.11" />
            <CostSummary label="Total" amount="$8.00" />

            <View style={{ gap: 15 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.navigate("paymentmethod")}
              >
                <Text style={styles.buttonText}>Book now</Text>
              </TouchableOpacity>

              {/* Button to close modal */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#FF4D4D", marginBottom: 50 },
                ]}
                onPress={handleDonePress} // Dismiss the modal
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  textstyle: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
  },
  iconButton: {
    zIndex: 10,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    overflow: "hidden",
  },

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
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    rowGap: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "black",
    fontWeight: "light",
    fontSize: 18,
  },
  carDetails: { gap: 5 },
  carName: {
    color: "black",
    fontWeight: "medium",
    fontSize: 32,
    textAlign: "center",
  },
  carModel: {
    color: "black",
    fontWeight: "medium",
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
  carImage: {
    height: 146,
    width: 300,
    alignSelf: "center",
  },
  driverDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  driverInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  driverName: {
    color: "black",
    fontWeight: "medium",
    fontSize: 16,
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  driverRatingText: {
    color: "black",
    fontWeight: "medium",
    fontSize: 14,
    opacity: 0.6,
  },
  driverDistance: {
    height: 30,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  driverDistanceText: {
    fontSize: 11,
    color: "black",
    fontWeight: "medium",
  },
  rideSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rideLocation: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  rideLocationText: {
    color: "black",
    fontWeight: "medium",
    fontSize: 13,
  },
  rideLocationSubText: {
    color: "black",
    fontWeight: "medium",
    fontSize: 14,
    opacity: 0.6,
  },
  rideTime: {
    color: "black",
    fontWeight: "medium",
    fontSize: 14,
  },
  separator: {
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 2,
    marginTop: 20,
  },
  costSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costSummaryLabel: {
    color: "black",
    fontWeight: "medium",
    fontSize: 13,
    opacity: 0.6,
  },
  costSummaryAmount: {
    color: "black",
    fontWeight: "medium",
    fontSize: 14,
  },
  button: {
    height: 58,
    borderRadius: 100,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    height: 58,
    borderRadius: 100,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default RidedetailsModal;
