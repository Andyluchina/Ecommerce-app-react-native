import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { WebView } from "react-native-webview";
class WebViewCommo extends Component {
  constructor(props) {
    super(props);
  }
  //redirection is still to do.
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginRight: 1,
          marginLeft: 1
        }}
      >
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
        <WebView
          source={{
            html: "<html><body>" + this.props.data + "</body></html>"
          }}
          style={{
            width: Dimensions.get("window").width
          }}
          automaticallyAdjustContentInsets={true}
          javaScriptEnabled={false}
          scrollEnabled={false}
          scalesPageToFit={true}
        />
      </View>
    );
  }
}

export default WebViewCommo;
