import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet } from "react-native";
import { Picker, View } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const TelegramPage = () => {
  const [selectedValue, setSelectedValue] = useState("Post a tweet");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Telegram" value="1" />
        <Picker.Item label="test2" value="2" />
      </Picker>
      <View style={{ height: 100, borderWidth: 1 }}></View>

      <Picker
        selectedValue={selectedValue}
        styles={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Message a specific user on discord" value="1" />
        <Picker.Item label="Send message on a group chat" value="2" />
        <Picker.Item label="Message by bot discord" value="3" />
        <Picker.Item label="Post a tweet" value="4" />
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
export default TelegramPage;
