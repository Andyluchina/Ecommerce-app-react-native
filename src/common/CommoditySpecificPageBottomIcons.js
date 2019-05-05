import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  AsyncStorage,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import fkg from "../common/Util";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50
  }
});

class CommoditySpecificPageBottomIcons extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: []
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.container}>
          <Image
            source={this.props.image}
            style={{ height: 35, width: 35, marginBottom: 3 }}
          />
          <Text>{this.props.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CommoditySpecificPageBottomIcons;
