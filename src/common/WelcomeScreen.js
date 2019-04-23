import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions
} from "react-native";
import welcome from "../assets/welcome.png";
import { goToMain } from "./startMainApp";
import { getAuth } from "./getAuth";
import fkg from "./Util";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  logo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    setTimeout(async function() {
      const user = await fkg.getAppItem("token");
      console.log("user: ", user);
      if (user) {
        goToMain();
      } else {
        getAuth();
      }
    }, 10);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={welcome} style={styles.logo} />
      </View>
    );
  }
}

export default WelcomeScreen;
