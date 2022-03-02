import React, { Component } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View , Alert, FlatList} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux'
import axios from 'axios';
import colors from "../../../../../charte/colors";

class TwitchPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isError: false,
        acti_id: 0,
        reacti_id: 0,
        action: [],
        reaction: [],
        action_params: [],
        reaction_params: [],
        service: [],
        Reaservice: [],
        input: "",
        input2: ""
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const descr_service = []
    const descr_reaction = []
    const params_action = []
    const params_reaction = []
    try {
        const response = await axios.get('http://'+IP+':8080/AR/',
        {
            'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
        });
        for (let data of response.data.actions) {
          this.setState({service: data})
          if (data.id_service===this.props.clickBottom) {
            descr_service.push({label: data.description, value: data.id})
            this.setState({action: descr_service})
            if (data.params!==null) {
              params_action.push({label: data.params, id: data.id})
              this.setState({action_params: params_action})
            }
          }
        }
        for (let data of response.data.reactions) {
          this.setState({Reaservice: data})
          descr_reaction.push({label: data.description, value: data.id})
          this.setState({reaction: descr_reaction})
          if (data.params!==null) {
            params_reaction.push({label: data.params, id: data.id})
            this.setState({reaction_params: params_reaction})
          }
        }
    } catch (error) {
        this.setState({isError: true})
        Alert.alert(
            "Please enter your email and password !",
        );
    }
  }

  _display_params = () => {
    for (let data of this.state.action_params) {
      if (data.label!==undefined) {
        if(data.id===this.state.acti_id) {
          return (
              <FlatList
                data={data.label}
                numColumns={2}
                keyExtractor={(item) => item}
                renderItem={({item}) => {  return (
                  <View style={styles.textinput}>
                    <TextInput style={{width: "100%"}} placeholder={item} />
                  </View>
                )  }}
              />
          )
        }
      }
    }
  }

  _display_paramsRea = () => {
    for (let data of this.state.reaction_params) {
      if (data.label!==undefined) {
        if(data.id===this.state.reacti_id) {
          return (
              <FlatList
                data={data.label}
                numColumns={2}
                keyExtractor={(item) => item}
                renderItem={({item}) => {  return (
                  <View style={styles.textinput}>
                    <TextInput style={{width: "100%"}} placeholder={item} />
                  </View>
                )  }}
              />
          )
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="twitch" style={styles.logo} size={90} color="#a800a8" />
        <View style={styles.input}>
          <Text style={styles.txt_input}>Action *</Text>
          <RNPickerSelect
            style={{inputAndroid: {color: 'white'}}}
            onValueChange={(value) => this.setState({acti_id: value})}
            items={this.state.action}
          />
          {this._display_params()}
        </View>

        <View style={styles.input}>
          <Text style={styles.txt_input}>Reaction *</Text>
          <RNPickerSelect
            style={{inputAndroid: {color: 'white'}}}
            onValueChange={(value) => this.setState({reacti_id: value})}
            items={this.state.reaction}
          />
          {this._display_paramsRea()}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: "white"}}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: 'space-between',
    margin: "8%",
  },
  logo: {
    marginBottom: "0%",
  },
  input: {
    width: "70%",
    borderRadius: 10,
    padding: "2%",
    borderWidth: 1,
    backgroundColor: "#a800a8",
    marginBottom: "10%",
    marginTop: "6%",
  },
  textinput: {
    width: "45%",
    borderRadius: 50,
    padding: "3%",
    backgroundColor: colors.login.backg_input,
    margin: "2%"
},
  txt_input: {
    fontSize: 18,
    fontWeight: 'bold',
    width: "70%",
    color: "white",
    textAlign: 'left',
    marginBottom: "2%",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondary,
    width: "25%",
    padding: "3%"
  }
});

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    accessToken: state.accessToken,
    clickBottom: state.clickBottom
  }
}
export default connect(mapStateToProps)(TwitchPage)