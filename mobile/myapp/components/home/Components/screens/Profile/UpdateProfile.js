import {React, Component} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native";
import colors from "../../../../../charte/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import axios from 'axios';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", password: "", firstName: "", lastName: "", username: "", conf_pwd: "",
    };
  }

  componentDidMount() {
    if (!this.props.parent.state.isLoading && this.props.parent.state.data) {
        this.setState({username: this.props.parent.state.username})
        this.setState({firstName: this.props.parent.state.firstName})
        this.setState({lastName: this.props.parent.state.lastName})
        this.setState({email: this.props.parent.state.email})
    }
  }

  async _changePassword() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      let body = {
          lastPassword: this.state.password,
          newPassword: this.state.conf_pwd,
      }
      const response = await axios.put('http://'+IP+':8080/users/password', body,
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      if (response.status!==200) {
        Alert.alert(
            "Can't update your password !",
            "Your last password is incorrect !",
        );
      }
      console.log(response.status)
    } catch (err) {
        if (err.response) {
            this.props.parent.setState({isError: true})
        }
    }
  }

  async _savePress() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      let body = {
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          avatar: this.props.parent.state.data.avatar,
          email: this.state.email,
          lastPassword: this.state.password,
          newPassword: this.state.conf_pwd,
      }
      this.props.parent.setState({isSaving: true})
      await axios.put('http://'+IP+':8080/users/me', body,
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      this.props.parent.setState({isSaving: false})
      this.props.parent.setState({Reload: true})
    } catch (err) {
        if (err.response) {
            this.props.parent.setState({isError: true})
            this.props.parent.setState({isSaving: false})
        }
    }
    this.props.parent.setState({hide: true})
    this.props.parent.setState({username: this.state.username})
    this.props.parent.setState({firstName: this.state.firstName})
    this.props.parent.setState({lastName: this.state.lastName})
    this.props.parent.setState({email: this.state.email})
  }

  _cancelPress() {
    this.props.parent.setState({hide: true})
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header_popup}>
            <Text style={{color: "white", fontWeight: "500", fontSize: 24}}>Update profil</Text>
          </View>
          <View style={styles.container}>
              <Text style={[styles.txt_input, {marginTop: '2%'}]}>USERNAME</Text>
              <View style={styles.input}>
                <TextInput
                    value={this.state.username}
                    onChangeText={(value) => {this.setState({username: value})}}
                ></TextInput>
              </View>

              <Text style={styles.txt_input}>FIRST NAME</Text>
              <View style={styles.input}>
                <TextInput
                    value={this.state.firstName}
                    onChangeText={(value) => {this.setState({firstName: value})}}
                ></TextInput>
              </View>

              <Text style={styles.txt_input}>LAST NAME</Text>
              <View style={styles.input}>
                <TextInput
                    value={this.state.lastName}
                    onChangeText={(value) => {this.setState({lastName: value})}}
                ></TextInput>
              </View>

              <Text style={styles.txt_input}>EMAIL</Text>
              <View style={styles.input}>
                <TextInput
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(value) => {this.setState({email: value})}}
                ></TextInput>
              </View>
              
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%', width: "100%", height: "10%"}}>
                <TouchableOpacity style={styles.btn_login} onPress={() => {this._savePress(), this._changePassword()}}>
                    <MaterialIcons style={{marginRight: "5%"}} name="save" color="white" size={18} />
                    <Text style={styles.txt_popup}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_login, {backgroundColor: colors.primary}]} onPress={() => {this._cancelPress()}}>
                    <MaterialIcons style={{marginRight: "5%"}} name="cancel" color="white" size={18} />
                    <Text style={styles.txt_popup}>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>

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
  txt_input: {
    color: colors.login.txt_input,
    fontSize: 14,
    width: "65%",
    textAlign: 'left',
    marginBottom: "1%",
  },
  input: {
      width: "70%",
      borderRadius: 15,
      padding: "2%",
      backgroundColor: colors.login.backg_input,
      marginBottom: "2%",
  },
  btn_login: {
    width: "25%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "2%",
    flexDirection: 'row'
  },
  txt_popup: {
    fontSize: 15,
    color: 'white',
    fontWeight: "500"
  },
  header_popup: {
      height: "12%",
      borderWidth: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: "100%",
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  accessToken: state.accessToken,
  ip: state.ip
  }
}
export default connect(mapStateToProps)(UpdateProfile) 