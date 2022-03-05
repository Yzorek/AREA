import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Services = [
  {id: 1, type: AntDesign, name: "twitter", color: "#1C9CEB"},
  {id: 2, type: MaterialCommunityIcons, name: "trello", color: "#1DB954"},
  {id: 3, type: MaterialCommunityIcons, name: "discord", color: "#5562EA"},
  {id: 4, type: FontAwesome, name: "twitch", color: "#8C45F7"},
  {id: 5, type: FontAwesome, name: "youtube", color: "#F70000"},
  {id: 6, type: FontAwesome, name: "telegram", color: "#26A2E1"},
]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      services: [],
      actions: [],
      reactions: [],
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    try {
        const response = await axios.get('http://'+IP+':8080/AR/ilian',
        {
            'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
        });
        this.setState({services: response.data.link})
        this.setState({actions: response.data.actions})
        this.setState({reactions: response.data.reactions})
    } catch (error) {
        this.setState({isError: true})
        Alert.alert(
            "Cannot get Actions/Reactions card !",
        );
    }
  }

  _descriptionAction(item) {
    const descr = this.state.actions.find(descr => descr.id === item.idActions);
    if (descr!==undefined) {
      return(descr.description)
    }
  }

  _descriptionReaction(item) {
    const descr = this.state.reactions.find(descr => descr.id === item.idReactions);
    if (descr!==undefined) {
      return(descr.description)
    }
  }

  _iconAction(item) {
    const descr = this.state.actions.find(descr => descr.id === item.idActions);
    if (descr!==undefined) {
      const icon = Services.find(icon => icon.id === descr.id_service);
      return (
        <icon.type name={icon.name} size={50} style={{marginTop: '3%'}} color="white" />
      )
    }
  }

  _iconReaction(item) {
    const descr = this.state.reactions.find(descr => descr.id === item.idReactions);
    if (descr!==undefined) {
      const icon = Services.find(icon => icon.id === descr.id_service);
      return (
        <icon.type name={icon.name} size={50} style={{marginTop: '3%'}} color="white" />
      )
    }
  }

  _colorAction(item) {
    const descr = this.state.actions.find(descr => descr.id === item.idActions);
    if (descr!==undefined) {
      const icon = Services.find(icon => icon.id === descr.id_service);
      return (
        icon.color
      )
    }
  }

  _colorReaction(item) {
    const descr = this.state.reactions.find(descr => descr.id === item.idReactions);
    if (descr!==undefined) {
      const icon = Services.find(icon => icon.id === descr.id_service);
      return (
        icon.color
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.services}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {  return (
              <View style={styles.view_card}>
                <LinearGradient
                  colors={[this._colorAction(item), this._colorReaction(item)]}
                  style={{width: '100%', height: "100%", borderRadius: 10}}
                >
                  <View style={{flexDirection: "row", width: '100%', height: "100%"}}>
                    <View style={{width: "50%", height: "100%", alignItems: "center",}}>
                      {this._iconAction(item)}
                      <Text style={[styles.txt_descr, {fontSize: 18, fontWeight: "bold"}]}>{this._descriptionAction(item)}</Text>
                        <FlatList
                          data={item.paramsAction}
                          keyExtractor={(item) => item.name}
                          renderItem={({item}) => {  return (
                            <View>
                              <Text style={styles.txt_descr}>{item.name} : {item.value}</Text>
                            </View>
                          ) }}
                        />
                    </View>

                    <View style={{width: "50%", height: "100%", alignItems: "center",}}>
                      {this._iconReaction(item)}
                      <Text style={[styles.txt_descr, {fontSize: 18, fontWeight: "bold"}]}>{this._descriptionReaction(item)}</Text>
                        <FlatList
                          data={item.paramsReaction}
                          keyExtractor={(item) => item.name}
                          renderItem={({item}) => {  return (
                            <View>
                              <Text style={styles.txt_descr}>{item.name} : {item.value}</Text>
                            </View>
                          ) }}
                        />
                    </View>
                  </View>
                </LinearGradient>
              </View>
          )  }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  view_card: {
    // marginTop: "4%",
    // marginLeft: 10,
    // marginRight: 10,
    margin: "4%",
    alignItems: 'center',
    height: 200,
    borderWidth: 1,
    borderRadius: 10
  },
  txt_descr: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginTop: "4%"
  }
});

const mapStateToProps = (state) => {
  return {
    clickBottom: state.clickBottom,
    ip: state.ip,
    accessToken: state.accessToken
  }
}
export default connect(mapStateToProps)(HomeScreen)