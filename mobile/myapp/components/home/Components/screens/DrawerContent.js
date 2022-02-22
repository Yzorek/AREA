import React from "react";
import { View, StyleSheet, ColorPropType } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import colors from "../../../../charte/colors";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./../context";
import TwitterPage from "./ServicePage/TwitterPage";
import InstagramPage from "./ServicePage/InstagramPage";

import Icon from "react-native-vector-icons/Ionicons";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerContent(props) {
  const { signOut } = 0;

  const Stack = createStackNavigator();

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="TwitterPage" component={TwitterPage} />
      <Stack.Screen name="InstagramPage" component={InstagramPage} />
    </Stack.Navigator>
  </NavigationContainer>;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 20, flexDirection: "column" }}>
                <Title style={styles.title}>Ulys</Title>
              </View>
            </View>
          </View>

          <Drawer.Section title="Services" style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="logo-twitter" color={color} size={size} />
              )}
              label="Twitter"
              onPress={() => {
                props.navigation.navigate("TwitterPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="logo-instagram" color={color} size={size} />
              )}
              label="Instagram"
              onPress={() => {
                props.navigation.navigate("InstagramPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="discord"
                  color={color}
                  size={size}
                />
              )}
              label="Discord"
              onPress={() => {
                props.navigation.navigate("DiscordPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="logo-twitch" color={color} size={size} />
              )}
              label="Twitch"
              onPress={() => {
                props.navigation.navigate("TwitchPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="logo-youtube" color={color} size={size} />
              )}
              label="Youtube"
              onPress={() => {
                props.navigation.navigate("YoutubePage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="telegram" color={color} size={size} />
              )}
              label="Telegram"
              onPress={() => {
                props.navigation.navigate("TelegramPage");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="log-out-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#F4F4F4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
