import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'
import colors from '../../charte/colors';

const Account = [
    {id: 1, type: "user", name: "Area", email: "Area@gmail.com", password: "1234"},
]

class Login extends Component{
    constructor(props) {
		super(props);
        this.state = {
            email: "", password: "",
        };
    }

    // checkEmail = () => {
    //     const user = Account.find(user => user.email === this.state.email);
    //     if (user && (this.state.email!=="" || this.state.password!=="")) return user;
    //     else {
    //         Alert.alert(
    //             "The email or password is incorrect !",
    //             "retry or create an account",
    //         );
    //     }
    // };

    // _conditionToGoHome() {
    //     const result = this.checkEmail()
    //     if (result) {
    //         if (this.state.email===result.email && this.state.password===result.password && result.type==='user') {
    //             this.props.dispatch({type: 'index', value: 5});
    //             this.props.dispatch({type: 'name', value: result.name});
    //         }
    //         else if (this.state.email===result.email && this.state.password===result.password && result.type==='organizer') {
    //             this.props.dispatch({type: 'index', value: 6});
    //             this.props.dispatch({type: 'name', value: result.name});
    //         }
    //         else {
    //             Alert.alert(
    //                 "The email or password is incorrect !",
    //                 "retry or create an account",
    //             );
    //         }
    //     }
    //     else {
    //         Alert.alert(
    //             "The email or password is incorrect !",
    //             "retry or create an account",
    //         );
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image style={styles.img_logo} source={require("../assets/logo.png")} /> */}
                <Text style={styles.txt_input}>EMAIL</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Area@gmail.com"
                        keyboardType="email-address"
                        onChangeText={(value) => {this.setState({email: value})}}
                    ></TextInput>
                </View>
                <Text style={styles.txt_input}>PASSWORD</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="*******"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(value) => {this.setState({password: value})}}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.btn_login} onPress={() => {}}>
                    <Text style={styles.txt_login}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.social_media}>
                    <Image style={styles.img_google} source={{uri:"https://icones.pro/wp-content/uploads/2021/02/google-icone-symbole-logo-png.png"}} />
                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/*this.props.dispatch({type: 'index', value: 1})*/}}>
                    <Text style={styles.txt_register}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img_logo: {
        width: 100,
        height: 160,
        marginBottom: "10%",
    },
    txt_input: {
        color: colors.login.txt_input,
        fontSize: 16,
        width: "55%",
        textAlign: 'left',
        marginBottom: "2%",
    },
    input: {
        width: "60%",
        borderRadius: 50,
        padding: "3%",
        backgroundColor: colors.login.backg_input,
        marginBottom: "5%",
    },
    btn_login: {
        width: "35%",
        height: "5%",
        borderRadius: 10,
        backgroundColor: colors.login.btn_login,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "5%",
    },
    txt_login: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    social_media: {
        flexDirection: "row",
        width: "35%",
        marginBottom: "6%",
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    img_google: {
        width: 40,
        height:40,
    },
    txt_register: {
        color: colors.txt_create_account,
        fontSize: 20,
        textDecorationLine: 'underline'
    }
  });

  const mapStateToProps = (state) => {
    return {
      index: state.index,
      name: state.name,
    }
}
export default connect(mapStateToProps)(Login)