import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
class AttributesTab extends Component {
  constructor(props) {
    super(props);
  }
  //redirection is still to do.
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onChangeDisplay}>
          <View
            style={{
              height: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 20 }}>点击回到主页</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AttributesTab;
