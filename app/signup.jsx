import { useState } from "react";
import { useRouter } from "expo-router";
import {
  CustomTextInput,
  PasswordInput,
  ActionButton,
  SocialButton,
} from "../components/SignUpComp";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "login to continue",
      });
      router.navigate("login");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", padding: 20 }}
      contentContainerStyle={{ rowGap: 16 }}
    >
      <Text style={{ fontSize: 32, color: "black" }}>Register</Text>
      <Text style={{ fontSize: 16, color: "black" }}>
        Enter the details to create an account
      </Text>

      <CustomTextInput placeholder="Enter Name" onChangeText={setName} />
      <CustomTextInput placeholder="Email" onChangeText={setEmail} />
      <PasswordInput
        placeholder="Password"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onChangeText={setPassword}
      />
      <PasswordInput
        placeholder="Confirm Password"
        showPassword={showPassword1}
        setShowPassword={setShowPassword1}
        onChangeText={setConfirmPassword}
      />

      <ActionButton title="Sign Up" onPress={handleSignup} />
      {errorMessage ? (
        <Text style={{ color: "#F04438", textAlign: "center" }}>
          {errorMessage}
        </Text>
      ) : null}

      <Text style={{ fontSize: 13, textAlign: "center", color: "#3c3c43" }}>
        OR
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <SocialButton iconName="logo-google" text="Google" />
        <SocialButton iconName="logo-apple" text="Apple" />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 30,
          marginBottom: 50,
        }}
      >
        <Text style={{ fontSize: 13, color: "#777777" }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 13, color: "black", marginLeft: 5 }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
