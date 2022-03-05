import React, { Component, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from 'react-redux'

import HomeScreen from "./Components/screens/HomeScreene"
import SettingsScreen from "./Components/screens/SettingsScreen";
import ProfileScreen from "./Components/screens/Profile/ProfileScreene"
import TrelloPage from "./Components/screens/ServicesPages/TrelloPagee";
import TwitterPage from "./Components/screens/ServicesPages/TwitterPagee";
import TelegramPage from "./Components/screens/ServicesPages/TelegramPagee";
import TwitchPage from "./Components/screens/ServicesPages/TwitchPagee";
import YoutubePage from "./Components/screens/ServicesPages/YoutubePagee";
import DiscordPage from "./Components/screens/ServicesPages/DiscordPagee";
import AccountScreen from "./Components/screens/AccountScreen";

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

    else if (this.props.clickBottom===7) {
      return (
        <HomeScreen/>
      )
    }

    else if (this.props.clickBottom===8) {
      return (
        <AccountScreen/>
      )
    }

    else if (this.props.clickBottom===1) {
        return (
            <TwitterPage/>
        )
    }

    else if (this.props.clickBottom===2) {
      return (
        <TrelloPage/>
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