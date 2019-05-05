import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default class ImageUpload extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.button}>
          <Text allowFontScaling={false} style={{ fontSize: 18 }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: "#ffffff",
    backgroundColor: "#ea5d45",
    padding: 10,
    width: 100,
    borderRadius: 15,
    justifyContent: "center"
  }
});
