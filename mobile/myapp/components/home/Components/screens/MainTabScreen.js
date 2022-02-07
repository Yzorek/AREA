import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import NotificationsScreen from "./NotificationsScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import colors from "../../../../charte/colors";

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: "black",
    }}
    activeColor={colors.secondary}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-home" color={colors.secondary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-notifications" color={colors.secondary} size={20} />
        ),
        tabBarBadge: 0,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-person" color={colors.secondary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: "Settings",
        tabBarColor: colors.primary,
        tabBarIcon: ({ color, size }) => (
          <Icon name="ios-settings" color={colors.secondary} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;