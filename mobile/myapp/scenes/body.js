import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Accueil from "../components/home/home";
import TwitterPage from "../components/home/Components/screens/ServicesPages/TwitterPage";
import InstagramPage from "../components/home/Components/screens/ServicesPages/InstagramPage";
import DiscordPage from "../components/home/Components/screens/ServicesPages/DiscordPage";
import TwitchPage from "../components/home/Components/screens/ServicesPages/TwitchPage";
import YoutubePage from "../components/home/Components/screens/ServicesPages/YoutubePage";
import TelegramPage from "../components/home/Components/screens/ServicesPages/TelegramPage";

import MainTabScreen from "../components/home/Components/screens/MainTabScreen.js";
import DrawerContent from "../components/home/Components/screens/DrawerContent";

const Stack = createStackNavigator();

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.index === 0) {
      return <Login />;
    } else if (this.props.index === 1) {
      return <Register />;
    } else if (this.props.index === 2) {
      return <Accueil />;
    } else if (this.props.index === 3) {
      return (
        <>
          <Stack.Screen name="DrawerContent" component={DrawerContent} />
          <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
          <Stack.Screen name="Twitter" component={TwitterPage} />
        </>
      );
    } else if (this.props.index === 4) {
      return <InstagramPage />;
    } else if (this.props.index === 5) {
      return <DiscordPage />;
    } else if (this.props.index === 6) {
      return <TwitchPage />;
    } else if (this.props.index === 7) {
      return <YoutubePage />;
    } else if (this.props.index === 8) {
      return <TelegramPage />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.index,
  };
};
export default connect(mapStateToProps)(Body);
