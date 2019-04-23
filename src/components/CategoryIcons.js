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
  TouchableNativeFeedback
} from "react-native";
import fkg from "../common/Util";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100
  }
});

class CategoryIcons extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // const succ = result => {
    //   console.log(JSON.parse(result.body));
    // };
    //
    // const err = result => {
    //   alert(result);
    // };
    //
    // fkg.asyncHttpGet("/mall/floor/search?orgId=8", succ, err);
  }

  state = {
    data: []
  };
  onPressCate1 = id => {
    console.log(id);
    //navigation to secondary page
  };
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.navigation(this.props.data)}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri:
                "https://cdn3.iconfinder.com/data/icons/document-icons-2/30/647709-image-512.png"
            }}
            style={{ height: 65, width: 65, marginBottom: 5 }}
          />
          <Text>{this.props.data.categorySimpleName}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default CategoryIcons;
