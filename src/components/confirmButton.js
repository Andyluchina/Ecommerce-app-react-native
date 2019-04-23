import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import util from "./../common/Const"
import React from "react"

export default class ImageUpload extends React.Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text allowFontScaling={false} style={styles.button}>确认</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    width: util.width - 50,
    color: '#ffffff',
    backgroundColor: '#ea5d45',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 25
  }
});
