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
import { connect } from 'react-redux'
import axios from 'axios';

const Drawer = createDrawerNavigator();

class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ErrorMe: false,
    };
  }

  async componentDidMount() {
      const IP = this.props.ip
      this.setState({isMount: true})
      const source = axios.CancelToken.source();
      try {
          const response = await axios.get('http://'+IP+':8080/users/me',
          {
              cancelToken: source.token,
              'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
          });
          this.props.dispatch({type: "name", value: response.data.username})
      } catch (error) {
          this.setState({
              ErrorMe: true,
          })
      }
  }

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

const mapStateToProps = (state) => {
  return {
  index: state.index,
  name: state.name,
  ip: state.ip,
  accessToken: state.accessToken
  }
}
export default connect(mapStateToProps)(Accueil) 