import {React, Component} from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ProfileScreen extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.profil_img} source={{uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}}/>
        <Text style={styles.txt_name}>Houssam El Affas</Text>
        <View style={{marginTop: "8%"}}></View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>First name:</Text>
          <View style={styles.view_info_detail}>
            <Text>Houssam</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" color="black" size={28} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Last name:</Text>
          <View style={styles.view_info_detail}>
            <Text>El Affas</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" color="black" size={28} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Email:</Text>
          <View style={styles.view_info_detail}>
            <Text>houssam@gmail.com</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" color="black" size={28} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view_info}>
          <Text style={{width: "25%"}}>Password:</Text>
          <View style={styles.view_info_detail}>
            <Text>********</Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" color="black" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default ProfileScreen;

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
    marginTop: "4%"
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
    padding: 6,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
