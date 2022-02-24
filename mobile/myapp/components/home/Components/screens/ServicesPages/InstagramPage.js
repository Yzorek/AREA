import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet } from "react-native";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const InstagramPage = () => {
  return (
    <View style={styles.container}>
      <Icon name="instagram" size={50} color="#ffa500" />
      <View style={{ height: 50 }} />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          {
            label: "Post a new video on instagram",
            value: "1",
          },
          { label: "Make a new instagram post", value: "2" },
        ]}
      />
      <View style={{ height: 100 }} />
      <View style={{ height: 200, borderWidth: 1 }} />
      <View style={{ height: 100 }} />
      <RNPickerSelect
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
});
export default InstagramPage;
