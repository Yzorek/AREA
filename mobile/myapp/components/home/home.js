import React, { Component, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet, View } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./Components/context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MainTabScreen from "./Components/screens/MainTabScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";
import NotificationsScreen from "./Components/screens/NotificationsScreen";
import SettingsScreen from "./Components/screens/SettingsScreen";
import HomeScreen from "./Components/screens/HomeScreen";
import DrawerContent from "./Components/screens/DrawerContent";
import colors from "../../charte/colors";

const Drawer = createDrawerNavigator();

export default class Accueil extends Component {
  render() {
    return (
      <View style={{flex: 1, width: "100%"}}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen options={{
                headerStyle: {backgroundColor: colors.primary},
                headerTitleStyle: {fontWeight: 'bold', color: "white"}
              }}
              name="MainTabScreen"
              component={MainTabScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
};