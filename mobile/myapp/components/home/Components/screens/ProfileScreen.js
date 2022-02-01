import {React, Component} from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "../../../../charte/colors";
import { connect } from 'react-redux'
import axios from 'axios';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isError: false,
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      const response = await axios.get('http://'+IP+':8080/users/me',
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      this.setState({data: response.data})
    } catch (error) {
      this.setState({isError: true})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.profil_img} source={{uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}}/>
        <View style={{flexDirection: "row", alignItems: 'center', marginBottom: "10%"}}>
          <Text style={styles.txt_name}>{this.state.data.username}</Text>
          <TouchableOpacity style={{marginLeft: "2%"}}>
            <MaterialIcons name="edit" color={colors.secondary} size={28} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: "8%"}}></View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>First name:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.data.firstName}</Text>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Last name:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.data.lastName}</Text>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Email:</Text>
          <View style={styles.view_info_detail}>
            <Text>{this.state.data.email}</Text>
          </View>
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
    flex: 1,
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
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "3%",
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
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
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