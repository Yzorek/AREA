import React, { Component, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./Components/screens/MainTabScreen";
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
                headerTitleStyle: {fontWeight: 'bold', color: "white"},
              }}
              name="MainTabScreen"
              component={MainTabScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
};