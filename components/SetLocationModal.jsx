import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
const GOOGLE_MAPS_APIKEY = "AIzaSyDEBlZDXMpfgJKt8cUjz2JVTEjYqapwaK0";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../utils/navSlice";
import { GoogleSearchInput } from "../components/GoogleSearchInput";
import { GoogleSearchInputDestination } from "../components/GoogleSeachInputDestination";
import { RoundedButton } from "../components/RoundedButton";
import { RecentSearchItem } from "../components/RecentSearchItem";

const SetLocationModal = forwardRef(({ setIsModalVisible }, ref) => {
  const dispatch = useDispatch();
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  // Track which input is active
  const [activeInput, setActiveInput] = useState(null);
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    // Update origin and destination whenever a place is selected
    if (originPlace) {
      dispatch(setOrigin(originPlace));
    }
    if (destinationPlace) {
      dispatch(setDestination(destinationPlace));
    }
  }, [originPlace, destinationPlace]);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
    setIsModalVisible(true); // Notify parent that modal is visible
  };

  const handleDismissModal = () => {
    setIsModalVisible(false); // Notify parent that modal is hidden
  };

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));

  const handleDonePress = () => {
    // Close the modal
    bottomSheetModalRef.current?.dismiss();
    setIsModalVisible(false); // Notify parent that the modal is closed
  };

  // Handle place selection without clearing the other place
  const handlePlaceSelect = (type, data, details) => {
    const place = {
      name: details.formatted_address,
      location: details.geometry.location,
      description: data.description,
    };

    if (type === "origin") {
      setOriginPlace(place); // Set origin place
    } else if (type === "destination") {
      setDestinationPlace(place); // Set destination place
    }
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["90%"]}
        onDismiss={handleDismissModal} // Update visibility when dismissed
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={{ ...styles.textstyle, fontSize: 16 }}>
            Enter your route
          </Text>

          <BottomSheetView style={{ marginTop: 20, gap: 10 }}>
            <GoogleSearchInput
              placeholder={"Pick Up"}
              onFocus={() => setActiveInput("origin")} // Set active input
              onBlur={() => setActiveInput(null)} // Reset active input
              onPlaceSelected={(data, details) =>
                handlePlaceSelect("origin", data, details)
              }
              APIKey={GOOGLE_MAPS_APIKEY}
              active={activeInput === "origin"} // Pass active state as a prop
            />

            <GoogleSearchInputDestination
              placeholder={"Destination"}
              onFocus={() => setActiveInput("destination")} // Set active input
              onBlur={() => setActiveInput(null)} // Reset active input
              onPlaceSelected={(data, details) =>
                handlePlaceSelect("destination", data, details)
              }
              APIKey={GOOGLE_MAPS_APIKEY}
              active={activeInput === "destination"} // Pass active state as a prop
            />

            <BottomSheetScrollView
              horizontal
              contentContainerStyle={{ gap: 10 }}
            >
              <RoundedButton icon="home" label="Home" onPress={() => {}} />
              <RoundedButton
                icon="briefcase"
                label="Office"
                onPress={() => {}}
              />
              <RoundedButton
                icon="location"
                label="Main road street"
                onPress={() => {}}
              />
            </BottomSheetScrollView>

            <BottomSheetView style={styles.recentSearchContainer}>
              <Text style={styles.recentSearchTitle}>Recent Searches</Text>
              <BottomSheetView style={{ gap: 24 }}>
                {["Bobst Library", "Main Street"].map((title, index) => (
                  <RecentSearchItem
                    key={index}
                    title={title}
                    subtitle="Newyork - Main road street 2, near..."
                    onPress={() => {}}
                  />
                ))}
              </BottomSheetView>
            </BottomSheetView>
          </BottomSheetView>

          {!activeInput && (
            <TouchableOpacity style={styles.button} onPress={handleDonePress}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

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
  button: {
    height: 58,
    borderRadius: 100,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  recentSearchContainer: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    gap: 24,
  },
  recentSearchTitle: {
    color: "black",
    fontSize: 20,
  },
});

export default SetLocationModal;
