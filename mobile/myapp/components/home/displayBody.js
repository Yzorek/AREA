import React, { Component, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from 'react-redux'

import SettingsScreen from "./Components/screens/SettingsScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";
import InstagramPage from "./Components/screens/ServicesPages/InstagramPage";
import TwitterPage from "./Components/screens/ServicesPages/TwitterPage";
import TelegramPage from "./Components/screens/ServicesPages/TelegramPage";
import TwitchPage from "./Components/screens/ServicesPages/TwitchPage";
import YoutubePage from "./Components/screens/ServicesPages/YoutubePage";
import DiscordPage from "./Components/screens/ServicesPages/DiscordPage";

class DisplayBody extends Component {
  constructor(props) {
    super(props);
  }

  _conditionDisplayBody() {

    if (this.props.clickBottom===10) {
        return (
          <SettingsScreen/>
        )
    }

    else if (this.props.clickBottom===9) {
      return (
        <ProfileScreen/>
      )
    }

    else if (this.props.clickBottom===1) {
        return (
            <TwitterPage/>
        )
    }

    else if (this.props.clickBottom===2) {
      return (
        <InstagramPage/>
      )
    }

    else if (this.props.clickBottom===3) {
        return (
            <DiscordPage/>
        )
    }

    else if (this.props.clickBottom===4) {
        return (
            <TwitchPage/>
        )
    }

    else if (this.props.clickBottom===5) {
        return (
            <YoutubePage/>
        )
    }

    else if (this.props.clickBottom===6) {
        return (
            <TelegramPage/>
        )
    }
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1, width: "100%"}}>
            {this._conditionDisplayBody()}
        </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clickBottom: state.clickBottom
  }
}
export default connect(mapStateToProps)(DisplayBody) 