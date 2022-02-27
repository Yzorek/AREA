import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet, Image } from "react-native";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Icon from "react-native-vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DiscordPage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../..//assets/Logo_Discord.png")}
      />
      <View style={{ height: 50 }} />
      <RNPickerSelect
        style={{ inputAndroid: { color: "black" } }}
        onValueChange={(value) => console.log(value)}
        items={[
          {
            label: "Discord",
            value: "1",
          },
          { label: "Discord", value: "2" },
        ]}
      />
      <View style={{ height: 40 }} />
      <View style={{ height: 200, borderWidth: 1 }} />
      <View style={{ height: 40 }} />
      <RNPickerSelect
        style={{ inputAndroid: { color: "black" } }}
        onValueChange={(value) => console.log(value)}
        items={[
          {
            label: "Message a specific user on discord",
            value: "1",
          },
          { label: "Send message on a group chat", value: "2" },
          { label: "Message by bot discord", value: "3" },
          { label: "Post a tweet", value: "4" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    //  resizeMode: "center",
  },
});
export default DiscordPage;
