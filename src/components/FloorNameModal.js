import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default class FloorNameModal extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.floorText}>{this.props.data.floorName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {},
  floorText: {
    fontSize: 20,
    color: "#96bbf7"
  }
});
