import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"; // Using Material Icons as an example

export const GoogleSearchInput = ({
  placeholder,
  onPlaceSelected,
  APIKey,
  active,
  onFocus,
  onBlur,
  changeStyle,
}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => onPlaceSelected(data, details)}
      fetchDetails
      styles={{
        container: {
          flex: 0,
          zIndex: 1,
        },
        textInput: {
          paddingHorizontal: 20,
          fontSize: 14,
          borderRadius: 69,
          height: 50,
          color: "#101828",
          backgroundColor: "#FFFFFF",
          borderWidth: 2,
          borderColor: active ? "#00A76F" : "#E5E5E5", // Change border color based on active state
        },
        listView: {
          position: "absolute",
          top: changeStyle ? 65 : 130,
          backgroundColor: "white",
          borderRadius: 8,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        row: {
          backgroundColor: "#FFFFFF",
          marginVertical: 10,
          padding: 5,
        },
      }}
      textInputProps={{
        placeholderTextColor: "#101828",
        returnKeyType: "search",
        onFocus,
        onBlur,
      }}
      debounce={400}
      minLength={4}
      enablePoweredByContainer={false}
      nearbyPlacesAPI="GooglePlacesSearch"
      query={{
        key: APIKey,
        language: "en",
      }}
      renderRow={(data) => (
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Ionicons name={"location"} color={"black"} size={24} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>
              {data.structured_formatting.main_text}
            </Text>
            <Text style={styles.subtitle}>{data.description}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#F4F4F4",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  subtitle: {
    color: "black",
    fontSize: 14,
    opacity: 0.6,
  },
});
