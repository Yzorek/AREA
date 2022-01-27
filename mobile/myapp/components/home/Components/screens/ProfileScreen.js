import React from "react";
import { ImageComponent } from "react-native";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Clicked Here" onPress={() => alert("Button Clicked !")} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
