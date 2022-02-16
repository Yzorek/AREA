import React, { Component, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./Components/screens/MainTabScreen";
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

const mapStateToProps = (state) => {
  return {
  index: state.index,
  name: state.name,
  ip: state.ip,
  accessToken: state.accessToken
  }
}
export default connect(mapStateToProps)(Accueil) 