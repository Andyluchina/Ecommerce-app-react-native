import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import RecoverPhoneForm from "../components/RecoverPhoneForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    marginLeft: 30,
    marginRight: 30
  },
  signupText: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 150,
    marginLeft: 10
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20
  }
});

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
  }

  //redirection is still to do.
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signupText}>
          <Text style={styles.title}>找回密码</Text>
          <View>
            <Text>在这里找回密码</Text>
          </View>
        </View>
        <RecoverPhoneForm />
      </View>
    );
  }
}

export default RecoverPassword;
