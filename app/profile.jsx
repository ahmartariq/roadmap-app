import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import AvatarImg from "../assets/images/img1.png";
import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState, useRef, useCallback } from "react";
import { Header } from "../components/Header";
import ConnectedServicesModal from "../components/ConnectedServicesModal";

const Profile = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.handlePresentModalPress();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ flex: 1, padding: 20, gap: 20 }}>
        <Header title={"User Profile"} />
        <ProfileCard />
        <ButtonCard
          router={router}
          toggleSwitch={toggleSwitch}
          isEnabled={isEnabled}
          handlePresentModalPress={handlePresentModalPress}
        />
        <Footer router={router} />
      </View>

      <ConnectedServicesModal ref={bottomSheetRef} />
    </ScrollView>
  );
};

// Profile Card with Avatar and Camera Icon
const ProfileCard = () => (
  <View style={styles.profileCard}>
    <Avatar rounded source={AvatarImg} size={110} />
    <TouchableOpacity style={styles.cameraIcon}>
      <Ionicons
        name="camera-outline"
        size={25}
        style={styles.cameraIconInner}
      />
    </TouchableOpacity>
  </View>
);

// Button Card with multiple options
const ButtonCard = ({
  router,
  toggleSwitch,
  isEnabled,
  handlePresentModalPress,
}) => (
  <View style={styles.buttonCard}>
    <OptionButton icon="edit" text="Edit Account" />
    <OptionButton icon="shield-checkmark-outline" text="Preferences" />
    <OptionButton
      icon="notifications-outline"
      text="Notifications"
      notificationCount={9}
      onPress={() => router.navigate("notifications")}
      disabled={false}
    />
    <OptionButton
      icon="git-network-outline"
      text="Connected Services"
      onPress={handlePresentModalPress}
      disabled={false}
    />
    <SwitchButton
      text="Matric Units"
      isEnabled={isEnabled}
      toggleSwitch={toggleSwitch}
    />
    <OptionButton
      icon="wallet-outline"
      text="Payment Methods"
      onPress={() => router.navigate("paymentmethod")}
      disabled={false}
    />
    <OptionButton icon="language-outline" text="Language" />
    <OptionButton icon="trash-outline" text="Delete Account" />
    <OptionButton icon="information-circle-outline" text="About Roam" />
  </View>
);

// Option Button Component for general list items
const OptionButton = ({ icon, text, notificationCount, onPress, disabled }) => (
  <TouchableOpacity
    style={styles.optionButton}
    onPress={onPress}
    disabled={disabled}
  >
    {text === "Edit Account" ? (
      <AntDesign
        name={"edit"}
        color={"black"}
        size={24}
        style={{ marginRight: 10 }}
      />
    ) : (
      <Ionicons name={icon} color={"black"} size={24} style={styles.icon} />
    )}

    <Text style={styles.optionText}>{text}</Text>
    {notificationCount && (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationText}>{`+${notificationCount}`}</Text>
      </View>
    )}
    {text !== "Notifications" && (
      <Ionicons
        name={"chevron-forward"}
        color={"black"}
        size={24}
        style={styles.chevron}
      />
    )}
  </TouchableOpacity>
);

// Switch Button for toggle
const SwitchButton = ({ text, isEnabled, toggleSwitch }) => (
  <TouchableOpacity style={styles.switchButton}>
    <Feather
      name={"external-link"}
      color={"black"}
      size={24}
      style={styles.icon}
    />
    <Text style={styles.optionText}>{text}</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#5EF188" }}
      thumbColor={isEnabled ? "white" : "#f4f4f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={styles.switch}
    />
  </TouchableOpacity>
);

// Footer with version and logout button
const Footer = ({ router }) => (
  <>
    <Text style={styles.versionText}>11.451.12 version</Text>
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => router.navigate("login")}
    >
      <Ionicons name={"log-out-outline"} color={"#FF5656"} size={24} />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  scrollView: {
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
  profileCard: {
    alignItems: "center",
  },
  cameraIcon: {
    marginLeft: 60,
    top: -35,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "black",
  },
  cameraIconInner: {
    color: "white",
    borderRadius: 20,
    padding: 5,
  },
  buttonCard: {
    top: -35,
  },
  optionButton: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    color: "black",
    fontWeight: "light",
    fontSize: 16,
    marginLeft: 5,
  },
  notificationBadge: {
    marginLeft: "auto",
    height: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FF5656",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "white",
    fontWeight: "light",
    fontSize: 16,
  },
  chevron: {
    marginLeft: "auto",
  },
  switchButton: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  switch: {
    marginLeft: "auto",
  },
  versionText: {
    color: "#A0A0A0",
    fontWeight: "medium",
    fontSize: 11,
    textAlign: "center",
    top: -35,
  },
  logoutButton: {
    backgroundColor: "#F7F7F7",
    height: 58,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    top: -35,
  },
  logoutText: {
    color: "#FF5656",
    fontWeight: "medium",
    fontSize: 16,
  },
});

export default Profile;
