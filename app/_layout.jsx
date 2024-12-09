import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="signup" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="home" />
                  <Stack.Screen name="profile" />
                  <Stack.Screen name="notifications" />
                  <Stack.Screen name="notificationsettings" />
                  <Stack.Screen name="paymentmethod" />
                  <Stack.Screen name="bookingmessage" />
                </Stack>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </GestureHandlerRootView>
        </ThemeProvider>
        <Toast />
      </Provider>
    </>
  );
}
