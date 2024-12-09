import React, {
  useCallback,
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

const SetSingleLocationModal = forwardRef(
  ({ setIsLocationModalVisible, activeInput }, ref) => {
    const dispatch = useDispatch();
    const [originPlace, setOriginPlace] = useState(null);
    const [destinationPlace, setDestinationPlace] = useState(null);
    const [activeInputNow, setActiveInputNow] = useState(null);

    useEffect(() => {
      if (originPlace) {
        dispatch(setOrigin(originPlace));
      }
      if (destinationPlace) {
        dispatch(setDestination(destinationPlace));
      }
    }, [originPlace, destinationPlace]);

    const bottomSheetModalRef2 = useRef(null);

    const handlePresentModalPress2 = (type) => {
      bottomSheetModalRef2.current?.present();
      setIsLocationModalVisible(true); // Notify parent that modal is visible
    };

    const handleDismissModal = () => {
      setIsLocationModalVisible(false); // Notify parent that modal is hidden
    };

    useImperativeHandle(ref, () => ({
      handlePresentModalPress2,
    }));

    const handleDonePress = () => {
      bottomSheetModalRef2.current?.dismiss();
      setIsLocationModalVisible(false); // Notify parent that the modal is closed
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef2}
          snapPoints={["80%"]}
          onDismiss={handleDismissModal}
          enableDynamicSizing={false}
          enableContentPanningGesture={false}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={{ ...styles.textstyle, fontSize: 16 }}>
              Enter {activeInput === "origin" ? "Pickup" : "Drop Off"}
            </Text>

            <BottomSheetView style={{ marginTop: 20, gap: 10 }}>
              {activeInput === "origin" && (
                <GoogleSearchInput
                  placeholder={"Pick Up"}
                  onFocus={() => setActiveInputNow("origin")} // Set active input
                  onBlur={() => setActiveInputNow(null)} // Reset active input
                  onPlaceSelected={(data, details) =>
                    setOriginPlace({
                      name: details.formatted_address,
                      location: details.geometry.location,
                      description: data.description,
                    })
                  }
                  APIKey={GOOGLE_MAPS_APIKEY}
                  active={activeInputNow === "origin"} // Pass active state as a prop
                  changeStyle={true}
                />
              )}

              {activeInput === "destination" && (
                <GoogleSearchInputDestination
                  placeholder={"Destination"}
                  onFocus={() => setActiveInputNow("origin")} // Set active input
                  onBlur={() => setActiveInputNow(null)} // Reset active input
                  onPlaceSelected={(data, details) =>
                    setDestinationPlace({
                      name: details.formatted_address,
                      location: details.geometry.location,
                      description: data.description,
                    })
                  }
                  APIKey={GOOGLE_MAPS_APIKEY}
                  active={activeInputNow === "origin"}
                />
              )}

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

            {!activeInputNow && (
              <TouchableOpacity style={styles.button} onPress={handleDonePress}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            )}
          </BottomSheetView>
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

export default SetSingleLocationModal;
