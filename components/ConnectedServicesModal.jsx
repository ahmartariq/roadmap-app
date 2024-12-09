import React, {
  useCallback,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { StyleSheet, Text, Switch } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

// Reusable LinkedAccountItem Component
const LinkedAccountItem = ({
  avatarSource,
  label,
  isEnabled,
  toggleSwitch,
}) => {
  return (
    <BottomSheetView style={styles.listtab}>
      <BottomSheetView style={styles.innerListtab}>
        <Avatar rounded source={avatarSource} size={54} />
        <Text style={{ ...styles.textstyle, fontSize: 16 }}>{label}</Text>
      </BottomSheetView>
      <Switch
        trackColor={{ false: "#767577", true: "#5EF188" }}
        thumbColor={isEnabled ? "white" : "#f4f4f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </BottomSheetView>
  );
};

const ConnectedServicesModal = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef(null);
  const [toggleStates, setToggleStates] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Toggle handler for switches
  const handleToggle = (index) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  const accountData = [
    { id: 0, avatar: require("../assets/images/lime.png"), label: "Lime" },
    { id: 1, avatar: require("../assets/images/veo.png"), label: "Veo" },
    { id: 2, avatar: require("../assets/images/spin.png"), label: "Spin" },
    { id: 3, avatar: require("../assets/images/uber.png"), label: "Uber" },
    { id: 4, avatar: require("../assets/images/lyft.png"), label: "Lyft" },
    {
      id: 5,
      avatar: require("../assets/images/blacklane.png"),
      label: "Blacklane",
    },
  ];

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  // Expose `handlePresentModalPress` to parent via ref
  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} opacity={0.7} pressBehavior="close" />
    ),
    []
  );

  const snapPoints = useMemo(() => ["90%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["90%"]}
        backdropComponent={renderBackdrop}
        index={0}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetView style={styles.textView}>
            <Text style={{ ...styles.textstyle, fontSize: 32 }}>
              Linked accounts
            </Text>
            <Text
              style={{ ...styles.textstyle, fontSize: 16, textAlign: "center" }}
            >
              Enable toggles to connect the roam app
            </Text>
          </BottomSheetView>
          <BottomSheetView style={{ gap: 5 }}>
            {accountData.map((account, index) => (
              <LinkedAccountItem
                key={account.id}
                avatarSource={account.avatar}
                label={account.label}
                isEnabled={toggleStates[index]}
                toggleSwitch={() => handleToggle(index)}
              />
            ))}
          </BottomSheetView>

          {/* Continue Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 20,
    backgroundColor: "white",
    padding: 20,
  },
  textView: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  textstyle: {
    color: "black",
    fontWeight: "500",
  },
  listtab: {
    height: 58,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  innerListtab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
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

export default ConnectedServicesModal;
