import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios';

const Icon = [
  {id: 1, type: AntDesign, name: "twitter"},
  {id: 2, type: AntDesign, name: "instagram"},
  {id: 3, type: MaterialCommunityIcons, name: "discord"},
  {id: 4, type: FontAwesome, name: "twitch"},
  {id: 5, type: FontAwesome, name: "youtube"},
  {id: 6, type: FontAwesome, name: "telegram"},
]

class ServiceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      isError: false,
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      const response = await axios.get('http://'+IP+':8080/services',
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      this.setState({services: response.data})
    } catch (error) {
      this.setState({
        isError: true,
      })
    }
  }

  _onPressCard = async(item) => {
    const IP = this.props.ip
    item.isActive = !item.isActive;
    this.setState({services: [...this.state.services]})
    const source = axios.CancelToken.source();
    try {
      let body = {
        action: item.isActive ? 'sub' : 'unsub',
        serviceId: item.id
      };
      const response = await axios.post('http://'+IP+':8080/services/subscribe', body,
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
    } catch (error) {
      this.setState({
        isError: true,
      })
    }
  }
  
  _icon(item) {
    const icon = Icon.find(icon => icon.id === item.id);
    return (
      <icon.type name={icon.name} color="white" size={42} />
    )
  }

  _backg(item) {
    if (item.isActive===false) {
      return ("grey")
    }
    else {
      return (item.color)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.services}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {  return (
              <TouchableOpacity style={[styles.view_card, {backgroundColor: this._backg(item)}]} onPress={() => {this._onPressCard(item)}}>
                {this._icon(item)}
                <Text style={styles.txt_name}>{item.name}</Text>
              </TouchableOpacity>
          )  }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  view_card: {
    width: "45%",
    height: 180,
    margin: "2%",
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: "2%"
  },
  txt_name: {
    fontSize: 24, 
    fontWeight: "bold",
    color: "white",
    marginTop: "10%"
  }
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  accessToken: state.accessToken,
  ip: state.ip
  }
};

export default connect(mapStateToProps)(ServiceSettings) 