import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Dimensions, Touchable } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios';
import colors from '../../../../charte/colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      hide: true,
    };
  }

  _deleteAccount = async () => {
    const IP = this.props.ip
    try {
        await axios.delete('http://'+IP+':8080/users/deleteAccount',
        {
            'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
        });
        this.props.dispatch({type: "index", value: 0})
        this.props.dispatch({type: "accessToken", value: ""})
        this.props.dispatch({type: "clickBottom", value: 7})
    } catch (error) {
        this.setState({isError: true})
        Alert.alert(
            "Cannot delete your account, try to reconnect !",
        );
    }
  }

  _displayPopup() {
    if (this.state.hide===false)
      return (
        <View style={styles.view_popup}>
          <Text>Are you sur to delete your account?</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10%', width: "100%", height: "25%"}}>
            <TouchableOpacity style={[styles.btn_confirm, {backgroundColor: 'grey'}]} onPress={() => {this.setState({hide: true})}}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn_confirm]} onPress={() => {this._deleteAccount()}}>
              <Text style={{color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', margin: "5%", width: "60%", alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: "bold"}}>Delete Account: </Text>
          <Text style={{fontSize: 15, marginLeft: "2%"}}>Delete your account and all of your source data. This is irreversible.</Text>
        </View>
        <TouchableOpacity style={styles.btn_delete} onPress={() => {this.setState({hide: false})}}>
          <Text style={{fontSize: 15, fontWeight: "bold", color: colors.third}}>DELETE</Text>
        </TouchableOpacity>
        {this._displayPopup()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  btn_delete: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    width: "25%",
    right: 0,
    position: 'absolute',
    top: "10%",
    right: "2%",
    padding: 8,
    borderRadius: 8,
  },
  view_popup: {
    borderRadius: 10,
    height: 150,
    width: 300,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation:10,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    top: (windowHeight/2)-75,
    left: (windowWidth/2)-150
  },
  btn_confirm: {
    width: "25%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "2%",
    flexDirection: 'row'
  },
});

const mapStateToProps = (state) => {
  return {
    clickBottom: state.clickBottom,
    ip: state.ip,
    index: state.index,
    accessToken: state.accessToken
  }
}
export default connect(mapStateToProps)(AccountScreen)