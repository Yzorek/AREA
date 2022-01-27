import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./Components/context";

import AsyncStorage from "@react-native-async-storage/async-storage";

//import { View } from "react-native-animatable";
//import { ActivityIndicator } from "react-native-paper";
import MainTabScreen from "./Components/screens/MainTabScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";
import NotificationsScreen from "./Components/screens/NotificationsScreen";
import SettingsScreen from "./Components/screens/SettingsScreen";
import HomeScreen from "./Components/screens/HomeScreen";
import DrawerContent from "./Components/screens/DrawerContent";

const Drawer = createDrawerNavigator();

const Accueil = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Accueil;