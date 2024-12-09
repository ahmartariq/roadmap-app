import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Animated,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = "AIzaSyDEBlZDXMpfgJKt8cUjz2JVTEjYqapwaK0";
import AvatarImg from "../assets/images/img1.png";
import { useRouter } from "expo-router";
import { Avatar } from "@rneui/themed";
import React, { useEffect, useRef } from "react";

export default function MapComp({
  userLocation,
  mapRef,
  origin,
  destination,
  isModalVisible,
  openModal,
}) {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={[
          styles.iconButton,
          { zIndex: isModalVisible ? -1 : 1 }, // Adjust zIndex based on modal state
        ]}
      >
        <TouchableOpacity onPress={() => router.navigate("profile")}>
          <Avatar rounded source={AvatarImg} size={50} />
        </TouchableOpacity>

        {!origin && !destination && (
          <TouchableOpacity
            style={styles.locationInputContainer}
            onPress={openModal}
          >
            <View style={styles.locationInput}>
              <Text style={styles.locationText}>where to?</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
        }}
        showsCompass={false}
        maxZoomLevel={20}
        region={{
          latitude:
            origin?.location?.lat ||
            destination?.location?.lat ||
            userLocation?.latitude ||
            28.456312,
          longitude:
            origin?.location?.lng ||
            destination?.location?.lat ||
            userLocation?.longitude ||
            -16.252929,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {!origin && !destination && (
          <Marker
            coordinate={{
              latitude: userLocation?.latitude || 28.456312,
              longitude: userLocation?.longitude || -16.252929,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0421,
            }}
            identifier="origin"
          >
            <View style={styles.markerContainer}>
              <View style={styles.imageContainer}>
                <Image source={AvatarImg} style={styles.image} />
              </View>
              <View style={styles.pinTip} />
            </View>
          </Marker>
        )}
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            description={origin.description}
            identifier="origin"
            pinColor="#00A76F"
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            description={destination.description}
            identifier="destination"
            pinColor="#FF4C4C"
          />
        )}
        {origin && destination && (
          <>
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              description={destination.description}
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
  );
}

const styles = StyleSheet.create({
  iconButton: {
    position: "absolute",
    flexDirection: "row",
    padding: 20,
    gap: 15,
  },
  locationInputContainer: {
    flex: 1,
  },
  locationInput: {
    justifyContent: "center",
    borderRadius: 69,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    height: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  locationText: {
    color: "black",
    fontWeight: "medium", // Use numerical weight for consistency
    fontSize: 16,
  },

  markerContainer: {
    alignItems: "center",
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 25, // Circular shape
    backgroundColor: "white",
    overflow: "hidden", // Clip image to the circle
    borderWidth: 2,
    borderColor: "black",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pinTip: {
    width: 20, // Adjust the width
    height: 20, // Keep the same as width for a perfect square
    backgroundColor: "black", // Color of the pin tip
    transform: [{ rotate: "45deg" }], // Rotate to create a diamond shape
    marginTop: -16, // Align the tip with the bottom of the circle
  },
});
