import {React, Component} from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "../../../../../charte/colors";
import { connect } from 'react-redux'
import axios from 'axios';
import UpdateProfile from "./UpdateProfile";
import UpdatePwd from "./UpdatePwd";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      hide_pwd: true,
      data: {},
      isError: false,
      isSaving: false,
      isLoading: false,
      Reload: true,
      email: "", password: "", firstName: "", lastName: "", username: "", conf_pwd: ""
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      this.setState({isLoading: true})
      const response = await axios.get('http://'+IP+':8080/users/me',
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      this.setState({
        data: response.data,
        isLoading: false,
        Reload: false
      })
      this.setState({
        username: this.state.data.username,
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        password: this.state.data.password,
      })
    } catch (error) {
      this.setState({
        isError: true,
        isLoading: false,
        Reload: false
      })
    }
  }

  _conditionHide() {
    if (this.state.hide===true) {
      return (<View></View>)
    }
    else {
      return (
        <View style={styles.view_popup}>
          <UpdateProfile parent={this}/>
        </View>
      )
    }
  }

  _conditionHidePwd() {
    if (this.state.hide_pwd===true) {
      return (<View></View>)
    }
    else {
      return (
        <View style={styles.view_popup_pwd}>
          <UpdatePwd parent={this}/>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.profil_img} source={{uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}}/>
        <View style={{flexDirection: "row", alignItems: 'center', marginBottom: "5%"}}>
          <Text style={styles.txt_name}>{this.state.username}</Text>
        </View>
        <View style={{marginTop: "2%"}}></View>

        {this._conditionHide()}
        {this._conditionHidePwd()}
        
        <View style={styles.view_txt_info}>
          <Text style={styles.txt_info}>Basic Details</Text>
          <TouchableOpacity style={{marginLeft: "2%"}} onPress={() => { this.setState({hide: false}) }}>
            <MaterialIcons name="edit" color={colors.secondary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>First name:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.firstName}</Text>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Last name:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.lastName}</Text>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Email:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.email}</Text>
          </View>
        </View>

        <View style={[styles.view_txt_info, {marginTop: "5%"}]}>
          <Text style={styles.txt_info}>Security</Text>
          <TouchableOpacity style={{marginLeft: "2%"}} onPress={() => { this.setState({hide_pwd: false}) }}>
            <MaterialIcons name="edit" color={colors.secondary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Password:</Text>
          <View style={styles.view_info_detail}>
            <Text>********</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  profil_img: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: "10%"
  },
  txt_name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "2%",
  },
  view_info: {
    flexDirection: 'row',
    width: "85%",
    height: "7%",
    marginTop: "5%",
    alignItems: 'center'
  },
  view_info_detail: {
    borderWidth: 1,
    width: "70%",
    marginLeft: "5%",
    padding: 8,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  view_popup: {
    borderRadius: 10,
    height: 450,
    width: 400,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation:10,
    backgroundColor: "white",
    alignItems: 'center',
    position: "absolute",
    top: (windowHeight/2)-225,
    left: (windowWidth/2)-200
  },
  view_popup_pwd: {
    borderRadius: 10,
    height: 300,
    width: 300,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation:10,
    backgroundColor: "white",
    alignItems: 'center',
    position: "absolute",
    top: (windowHeight/2)-150,
    left: (windowWidth/2)-150
  },
  txt_info: {
    fontSize: 26,
    color: colors.secondary,
    fontWeight: "bold"
  },
  view_txt_info: {
    alignItems: 'center',
    flexDirection: "row"
  }
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  accessToken: state.accessToken,
  ip: state.ip
  }
}
export default connect(mapStateToProps)(ProfileScreen) 