import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet } from "react-native";
import { Picker, View } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const TwitterPage = () => {
  const [selectedValue, setSelectedValue, selectedValue2, setSelectedValue2] =
    useState("Post a tweet");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="A tweet from a specific user is posted" value="1" />
        <Picker.Item label="Specific mention on twitter" value="2" />
      </Picker>

      <View style={{ height: 100, borderWidth: 1 }}></View>

      <Picker
        selectedValue={selectedValue2}
        styles={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
      >
        <Picker.Item label="Message a specific user on discord" value2="1" />
        <Picker.Item label="Send message on a group chat" value2="2" />
        <Picker.Item label="Message by bot discord" value2="3" />
        <Picker.Item label="Post a tweet" value2="4" />
      </Picker>
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

export default TwitterPage;
