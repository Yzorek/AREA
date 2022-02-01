import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios';
import colors from '../../charte/colors';

class Login extends Component{
    constructor(props) {
    super(props);
        this.state = {
            email: "", password: "",
            isError: false,
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        const IP = this.props.ip

        try {
            let body = {
                email: this.state.email,
                password: this.state.password
            }
            const response = await axios.post(
                'http://'+IP+':8080/auth/login', body
            );
            this.props.dispatch({type: "accessToken", value: response.data.accessToken})
            this.setState({isError: false})
          } catch (error) {
            this.setState({isError: true})
          }
    }

    _conditionToGoHome(e) {
        this.onSubmit(e)
        if (this.props.accessToken!=="") {
            this.props.dispatch({type: 'index', value: 2});
        }
        else {
            Alert.alert(
                "The email or password is incorrect !",
                "retry or create an account",
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt_logo}>ULYS</Text>
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
                <TouchableOpacity style={styles.btn_login} onPress={(e) => {this._conditionToGoHome(e)}}>
                    <Text style={styles.txt_login}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.social_media}>
                    <Image style={styles.img_google} source={{uri:"https://icones.pro/wp-content/uploads/2021/02/google-icone-symbole-logo-png.png"}} />
                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.dispatch({type: 'index', value: 1})}}>
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
    txt_logo: {
        fontSize: 44,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: "20%",
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
        width: "40%",
        height: "6%",
        borderRadius: 10,
        backgroundColor: colors.secondary,
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
        width: "45%",
        marginBottom: "6%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    img_google: {
        width: 40,
        height:40,
    },
    txt_register: {
        color: colors.secondary,
        fontSize: 20,
        textDecorationLine: 'underline'
    }
});

const mapStateToProps = (state) => {
    return {
    index: state.index,
    name: state.name,
    ip: state.ip,
    accessToken: state.accessToken
    }
}
export default connect(mapStateToProps)(Login) 