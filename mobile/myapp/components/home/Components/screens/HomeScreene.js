import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      services: [],
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    // const descr_service = []
    // const descr_reaction = []
    // const params_action = []
    // const params_reaction = []
    // try {
    //     const response = await axios.get('http://'+IP+':8080/AR/',
    //     {
    //         'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
    //     });
    //     for (let data of response.data.actions) {
    //       // this.setState({service: data})
    //       // if (data.id_service===this.props.clickBottom) {
    //         descr_service.push({label: data.description, value: data.id, id_service: data.id_service})
    //         console.log("Action")
    //         console.log(descr_service)
    //         // this.setState({action: descr_service})
    //         // if (data.params!==null) {
    //         //   params_action.push({label: data.params, id: data.id})
    //         //   this.setState({action_params: params_action})
    //         // }
    //       // }
    //     }
    //     for (let data of response.data.reactions) {
    //       // this.setState({Reaservice: data})
    //       descr_reaction.push({label: data.description, value: data.id, id_service: data.id_service})
    //       console.log("Reaction")
    //       console.log(descr_reaction)
    //       // this.setState({reaction: descr_reaction})
    //       // if (data.params!==null) {
    //       //   params_reaction.push({label: data.params, id: data.id})
    //       //   this.setState({reaction_params: params_reaction})
    //       // }
    //     }
    // } catch (error) {
    //     this.setState({isError: true})
    //     Alert.alert(
    //         "Please enter your email and password !",
    //     );
    // }

    try {
        const response = await axios.get('http://'+IP+':8080/AR/link',
        {
            'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
        });
        this.setState({services: response.data})
    } catch (error) {
        this.setState({isError: true})
        Alert.alert(
            "Cannot get Actions/Reactions card !",
        );
    }
  }

  render() {
    // console.log(this.state.services)
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.services}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {  return (
              <View style={styles.view_card}>
                <LinearGradient
                  colors={['#136ea3', '#8c6fed']}
                  style={{width: '100%', height: "100%", borderRadius: 10}}
                >
                  <View style={{flexDirection: "row", width: '100%', height: "100%"}}>
                    <View style={{width: "50%", height: "100%", alignItems: "center",}}>
                      <Icon name="twitter" size={50} style={{marginTop: '3%'}} color="white" />
                      <Text style={[styles.txt_descr, {fontSize: 18, fontWeight: "bold"}]}>{item.idActions}</Text>
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
                      <MaterialCommunityIcons name="discord" style={{marginTop: '3%'}} size={50} color="white" />
                      <Text style={[styles.txt_descr, {fontSize: 18, fontWeight: "bold"}]}>{item.idReactions}</Text>
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