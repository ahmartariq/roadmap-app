import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CustomTextInput = ({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  style,
}) => (
  <TextInput
    style={[styles.textInput, style]}
    placeholder={placeholder}
    placeholderTextColor="#101828"
    secureTextEntry={secureTextEntry}
    returnKeyType="done"
    maxLength={100}
    onChangeText={onChangeText}
  />
);

export const PasswordInput = ({
  placeholder,
  showPassword,
  setShowPassword,
  onChangeText,
}) => (
  <View style={styles.inputWithIcon}>
    <CustomTextInput
      placeholder={placeholder}
      secureTextEntry={!showPassword}
      onChangeText={onChangeText}
      style={{ flex: 1 }}
    />
    <TouchableOpacity
      style={styles.iconView}
      onPress={() => setShowPassword(!showPassword)}
    >
      <Ionicons
        name={showPassword ? "eye-off" : "eye"}
        size={24}
        color="#667085"
      />
    </TouchableOpacity>
  </View>
);

export const ActionButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export const SocialButton = ({ iconName, text, style }) => (
  <TouchableOpacity style={[styles.socialButton, style]}>
    <Ionicons size={24} name={iconName} style={{ color: "#3fe0d0" }} />
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 16,
    height: 58,
    backgroundColor: "#f4f4f4",
    color: "#101828",
  },
  inputWithIcon: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
  },
  iconView: {
    height: 58,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 58,
    borderRadius: 800,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
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
});
