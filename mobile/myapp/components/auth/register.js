import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'
import colors from '../../charte/colors';

class Register extends Component{
    constructor(props) {
    super(props);
        this.state = {
            first: "", last: "", email: "", password: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt_logo}>ULYS</Text>
                <Text style={styles.txt_input}>FIRST NAME</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Thomas"
                        onChangeText={(value) => {this.setState({first: value})}}
                    ></TextInput>
                </View>

                <Text style={styles.txt_input}>LAST NAME</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Labro"
                        onChangeText={(value) => {this.setState({last: value})}}
                    ></TextInput>
                </View>

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
                    <Text style={styles.txt_login}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.dispatch({type: 'index', value: 0})}}>
                    <Text style={styles.txt_register}>Sign in</Text>
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
        width: "35%",
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
    }
}
export default connect(mapStateToProps)(Register) 