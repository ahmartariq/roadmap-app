import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useCallback, useRef } from "react";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import ConnectedServicesLoginModal from "../components/ConnectedServicesLoginModal";

// Reusable Button Component
const CustomButton = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

// Reusable Text Input Component
const CustomTextInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  style,
  showPasswordToggle,
  onTogglePassword,
}) => (
  <View style={[styles.textInputWrapper, style]}>
    <TextInput
      style={[styles.textInput, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#101828"
      value={value}
      onChangeText={onChangeText}
    />
    {showPasswordToggle && (
      <TouchableOpacity style={styles.iconView} onPress={onTogglePassword}>
        <Ionicons
          name={secureTextEntry ? "eye" : "eye-off"}
          size={24}
          color="#667085"
        />
      </TouchableOpacity>
    )}
  </View>
);

// Reusable Social Button Component
const SocialButton = ({ icon, title, onPress, iconColor }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Ionicons size={24} name={icon} style={{ color: iconColor }} />
    <Text>{title}</Text>
  </TouchableOpacity>
);

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.handlePresentModalPress();
  }, []);

  const handleLogin = () => {
    if (name.trim() === "" || password.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
      });
    } else {
      handlePresentModalPress();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View
        style={{
          padding: 20,
          gap: 16,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => router.navigate("login")}
        >
          <Text>Forgot?</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Welcome Back to Roam! Please enter the details to continue
        </Text>

        <CustomTextInput
          placeholder="Email"
          value={name}
          onChangeText={setName}
        />
        <CustomTextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#3fe0d0" : undefined}
          />
          <Text>Remember me</Text>
        </View>

        <CustomButton title="Sign In" onPress={handleLogin} />
        <Text style={styles.orText}>OR</Text>

        <View style={styles.socialButtonsWrapper}>
          <SocialButton
            icon="logo-google"
            title="Google"
            iconColor="#3fe0d0"
            onPress={() => {}}
          />
          <SocialButton
            icon="logo-apple"
            title="Apple"
            iconColor="#12131A"
            onPress={() => {}}
          />
        </View>

        <View style={styles.newAction}>
          <Text style={styles.newActionText1}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => router.navigate("signup")}>
            <Text style={styles.newActionText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <ConnectedServicesLoginModal ref={bottomSheetRef} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    rowGap: 16,
  },
  forgotButton: {
    height: 46,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
    width: 75,
    marginLeft: "auto",
  },
  title: {
    color: "black",
    fontSize: 32,
  },
  subtitle: {
    color: "black",
    fontSize: 16,
  },
  textInputWrapper: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
  },
  textInput: {
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 16,
    height: 58,
    color: "#101828",
    flex: 1,
  },
  iconView: {
    height: 58,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxWrapper: {
    flexDirection: "row",
    gap: 20,
  },
  checkbox: {
    borderRadius: 10,
  },
  button: {
    height: 58,
    borderRadius: 800,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },

  orText: {
    fontSize: 13,
    textAlign: "center",
    color: "#3c3c43",
  },
  socialButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  socialButton: {
    flexDirection: "row",
    height: 58,
    gap: 10,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    borderRadius: 100,
    flex: 1,
    justifyContent: "center",
  },
  newAction: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 30,
    marginBottom: 50,
  },
  newActionText1: {
    color: "#777777",
    fontSize: 13,
  },
  newActionText2: {
    color: "black",
    fontSize: 13,
    marginLeft: 5,
  },
});
