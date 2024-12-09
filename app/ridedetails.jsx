import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useRef, useEffect } from "react";
import car from "../assets/images/car.png";
import AvatarImg from "../assets/images/img1.png";
import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../utils/navSlice";
const GOOGLE_MAPS_APIKEY = "AIzaSyDEBlZDXMpfgJKt8cUjz2JVTEjYqapwaK0";

// Reusable RideDetails Component
const RideDetails = ({ carName, carModel, image }) => (
  <View style={styles.carDetails}>
    <Text style={styles.carName}>{carName}</Text>
    <Text style={styles.carModel}>{carModel}</Text>
    <Image source={image} style={styles.carImage} resizeMode="contain" />
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

export default function RideDetailsScreen() {
  const router = useRouter();
  const bottomSheetRef = useRef();
  const mapref = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <View style={styles.container}>
      {/* Header and map */}

      <View
        style={{
          height: "30%",
        }}
      >
        <BlurView intensity={100} tint="light" style={styles.iconButton}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name={"chevron-back"} color={"black"} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ride details</Text>
          <Ionicons name={"chevron-back"} color={"transparent"} size={24} />
        </BlurView>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          showsCompass={false}
          maxZoomLevel={20}
          region={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }}
          ref={mapref}
        >
          {origin && destination && (
            <>
              <Marker
                coordinate={{
                  latitude: origin.location.lat,
                  longitude: origin.location.lng,
                }}
                description={origin.description}
                identifier="origin"
                pinColor="#00A76F"
              />
              <MapViewDirections
                origin={{
                  latitude: origin.location.lat,
                  longitude: origin.location.lng,
                }}
                destination={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="black"
              />
              <Marker
                coordinate={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                description={destination.description}
                identifier="destination"
                pinColor="#FF4C4C"
              />
            </>
          )}
        </MapView>
      </View>
      {/* Car Details */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["75%"]}
        enableDynamicSizing={false}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <BottomSheetScrollView
          style={{ padding: 20 }}
          contentContainerStyle={{ rowGap: 30, flexGrow: 1 }}
        >
          <RideDetails
            carName="Nissan Patrol"
            carModel="Washington - White"
            image={car}
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("paymentmethod")}
          >
            <Text style={styles.buttonText}>Book now</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
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
  carDetails: {
    gap: 10,
  },
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
    marginBottom: 50,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
