import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
class Nearby extends Component {
  constructor(props) {
    super(props);
  }
  //redirection is still to do.
  render() {
    return (
      <View style={styles.container}>
        <Text>This is nearby page</Text>
      </View>
    );
  }
}

export default Nearby;
