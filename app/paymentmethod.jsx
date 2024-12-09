import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import mastercard from "../assets/images/mastercard.png";
import { Header } from "../components/Header";

// Sample Data
const cardsData = [
  { id: "1", name: "MasterCard .... 5456", expiry: "29/2030" },
  { id: "2", name: "Visa .... 1234", expiry: "12/2025" },
  { id: "3", name: "Discover .... 5678", expiry: "03/2028" },
];

const paymentMethods = [
  { id: "1", name: "Apple", icon: "apple" },
  { id: "2", name: "Cash", icon: "dollar" },
];

// Reusable CardItem Component
const CardItem = ({ card, isSelected, onSelect }) => (
  <View style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Image source={mastercard} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardName}>{card.name}</Text>
      <Text style={styles.cardExpiry}>Expiration {card.expiry}</Text>
    </View>
    <Checkbox
      style={styles.checkbox}
      value={isSelected}
      onValueChange={onSelect}
      color={isSelected ? "#3fe0d0" : undefined}
    />
  </View>
);

// Reusable PaymentMethodItem Component
const PaymentMethodItem = ({ method, isSelected, onSelect }) => (
  <View style={{ ...styles.itemContainer, marginBottom: 16 }}>
    <View style={styles.iconContainer}>
      <FontAwesome name={method.icon} color={"black"} size={24} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.paymentMethodName}>{method.name}</Text>
    </View>
    <Checkbox
      style={styles.checkbox}
      value={isSelected}
      onValueChange={onSelect}
      color={isSelected ? "#3fe0d0" : undefined}
    />
  </View>
);

// Reusable PrimaryButton Component
const PrimaryButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.primaryButton, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function PaymentMethod() {
  const router = useRouter();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header title={"Payment Method"} />

      {/* Card Selection */}
      <View style={styles.section}>
        <View style={{ gap: 24 }}>
          {cardsData.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              isSelected={selectedCardId === card.id}
              onSelect={() => setSelectedCardId(card.id)}
            />
          ))}
          <PrimaryButton
            title="Add new method"
            style={styles.secondaryButton}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Payment Method Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pay With</Text>
        <View style={{ gap: 24 }}>
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              isSelected={selectedMethodId === method.id}
              onSelect={() => setSelectedMethodId(method.id)}
            />
          ))}
        </View>
      </View>

      {/* Book Now Button */}
      <PrimaryButton
        title="Book Now"
        style={styles.bookNowButton}
        onPress={() => router.navigate("bookingmessage")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    fontWeight: "300",
    fontSize: 18,
  },
  section: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    gap: 24,
  },
  sectionTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "medium",
  },
  itemContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#F4F4F4",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardName: {
    color: "black",
    fontSize: 16,
  },
  cardExpiry: {
    color: "black",
    opacity: 0.6,
    fontSize: 14,
  },
  paymentMethodName: {
    color: "black",
    fontSize: 16,
  },
  checkbox: {
    borderRadius: 10,
  },
  primaryButton: {
    height: 58,
    borderRadius: 800,
    backgroundColor: "#3fe0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#F4F4F4",
    height: 46,
  },
  bookNowButton: {
    marginVertical: 50,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "medium",
  },
});
