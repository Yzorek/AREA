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
import { connect, useSelector, useDispatch } from 'react-redux'
import colors from "../../../../charte/colors";

import { AuthContext } from "./../context";

//import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";

function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "index", value: 0 })
    dispatch({ type: "accessToken", value: "" })
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const name = useSelector((state) => state.name)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
                }}
                size={50}
              />
              <View style={{ marginLeft: 20, flexDirection: "column" }}>
                <Title style={styles.title}>{name}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section title="Account" style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="radio-button-on-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Service 1"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="radio-button-off-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Service 2"
              onPress={() => {
                props.navigation.navigate("Notifications");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="radio-button-off-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Service 3"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="radio-button-off-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Service 4"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
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
            logOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

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

const mapStateToProps = (state) => {
  return {
    name: state.name,
    index: state.index,
    accessToken: state.accessToken,
  }
}
export default connect(mapStateToProps)(DrawerContent) 