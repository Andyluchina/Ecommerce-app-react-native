import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  AsyncStorage,
  FlatList
} from "react-native";
import { goToMain } from "../common/startMainApp";
import fkg from "../common/Util";
import CreateOrder from "../order/CreateOrder";
var _ = require("lodash");

class Fkgou extends Component {
  constructor(props) {
    super(props);
    //  Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  componentWillMount() {
    //fetching data
  }

  render() {
    return (
      <View>
        <Text>still fkgou page</Text>
      </View>
    );
  }
}

export default Fkgou;
