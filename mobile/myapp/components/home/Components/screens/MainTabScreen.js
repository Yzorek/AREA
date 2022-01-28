import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./HomeScreen";
import NotificationsScreen from "./NotificationsScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: "black",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#6f7a82",
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-home" color={"white"} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarColor: "#6f7a82",
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-notifications" color={"white"} size={20} />
        ),
        tabBarBadge: 0,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#6f7a82",
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-person" color={"white"} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: "Settings",
        tabBarColor: "#6f7a82",
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-settings" color={"white"} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;