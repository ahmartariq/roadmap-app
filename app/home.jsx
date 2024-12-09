import { useRef, useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import MapComp from "../components/MapComp";
import LocationSheet from "../components/LocationSheet";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../utils/navSlice";
import SetLocationModal from "../components/SetLocationModal";
import RidedetailsModal from "../components/RidedetailsModal";
import SetSingleLocationModal from "../components/SetSingleLocationModal";

const home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRideModalVisible, setIsRideModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Add active input state
  const [activeRide, setActiveRide] = useState(null); // Add active input state
  const bottomSheetRef = useRef(null);
  const bottomSheetRef1 = useRef(null);
  const bottomSheetRef2 = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.handlePresentModalPress();
  }, []);

  const handlePresentModalPress1 = useCallback(() => {
    bottomSheetRef1.current?.handlePresentModalPress1();
  }, []);

  const handlePresentModalPress2 = useCallback(() => {
    bottomSheetRef2.current?.handlePresentModalPress2();
  }, []);

  const openLocationModal = (type) => {
    setActiveInput(type); // Set the active input
    handlePresentModalPress2(); // Open the modal
  };

  const openLocationModal2 = (type) => {
    setActiveRide(type); // Set the active ride
    handlePresentModalPress1(); // Open the modal
  };

  useEffect(() => {
    if (origin && destination) return;
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    // Check if both origin and destination exist
    if (origin && destination) {
      const timeout = setTimeout(() => {
        mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: {
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          },
          animated: true,
        });
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timeout); // Cleanup timeout
    } else if (origin && !destination) {
      // If only origin is available
      const timeout = setTimeout(() => {
        mapRef?.current?.fitToCoordinates(
          [
            {
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            },
          ],
          {
            edgePadding: {
              top: 50,
              right: 50,
              left: 50,
              bottom: 50,
            },
            animated: true,
          }
        );
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timeout); // Cleanup timeout
    } else if (!origin && destination) {
      // If only destination is available

      const timeout = setTimeout(() => {
        mapRef?.current?.fitToCoordinates(
          [
            {
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            },
          ],
          {
            edgePadding: {
              top: 50,
              right: 50,
              left: 50,
              bottom: 50,
            },
            animated: true,
          }
        );
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin && !destination) return;
    const timeout = setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {
          top: 50,
          right: 50,
          left: 50,
          bottom: 50,
        },
        animated: true,
      });
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [origin, destination]);

  // if (!userLocation) {
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       color="#3fe0d0"
  //       style={{ flex: 1, alignSelf: "center" }}
  //     />
  //   );
  // }

  return (
    <>
      {/* Map */}
      <MapComp
        userLocation={userLocation}
        mapRef={mapRef}
        origin={origin}
        destination={destination}
        isModalVisible={isModalVisible}
        openModal={handlePresentModalPress}
      />
      {/* Bottom View */}

      {(origin || destination) && (
        <LocationSheet
          openModal={handlePresentModalPress}
          openRideModal={(type) => openLocationModal2(type)}
          openLocationModal={(type) => openLocationModal(type)}
        />
      )}
      {/* openModal={handlePresentModalPress} */}
      <SetLocationModal
        ref={bottomSheetRef}
        setIsModalVisible={setIsModalVisible} // Pass visibility handler
      />

      <RidedetailsModal
        ref={bottomSheetRef1}
        setIsRideModalVisible={setIsRideModalVisible} // Pass visibility handler
        activeRide={activeRide}
      />

      <SetSingleLocationModal
        ref={bottomSheetRef2}
        setIsLocationModalVisible={setIsLocationModalVisible} // Pass visibility handler
        activeInput={activeInput} // Pass the active input type
      />
    </>
  );
};

export default home;
