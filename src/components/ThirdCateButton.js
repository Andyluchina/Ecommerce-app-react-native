import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

const styles = {
  container: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 2,
    marginBottom: 2,
    padding: 4
  }
};
class ThirdCateButton extends Component {
  constructor(props) {
    super(props);
  }
  //redirection is still to do.
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ThirdCateButton;
