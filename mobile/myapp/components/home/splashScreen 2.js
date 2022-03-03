import React, { Component } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux'
import Login from "../auth/login";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SplashScreen extends Component {
    constructor(props) {
		super(props);
    }
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 5000
      }).start();
      setTimeout(()=>{
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
          }).start();
            this.props.dispatch({type: "index", value: 0})
        }, 6000);
  }

  fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: this.state.fadeAnim
            }
          ]}
        >
          <TouchableOpacity>
            <Image style={styles.img_logo} source={require("../../assets/Ulys.png")} />
        </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img_logo: {
    width: 300,
    height: 300,
    marginBottom: "8%",
    marginTop: "8%",
  },
});

const mapStateToProps = (state) => {
    return {
      index: state.index,
    }
}
export default connect(mapStateToProps)(SplashScreen)