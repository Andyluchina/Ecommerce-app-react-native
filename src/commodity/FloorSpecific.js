import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { Button } from "react-native-elements";
import FloorSpecificDisplay from "../components/FloorSpecificDisplay";
import fkg from "../common/Util";

const styles = StyleSheet.create({});

class FloorSpecific extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.data.floorName,
          alignment: "center"
        }
      }
    };
  }

  componentWillMount() {
    const succ = result => {
      this.setState({ data: result.body });
      //  alert("in success");
    };

    const err = result => {
      alert(result);
    };
    const param = JSON.stringify({
      category: 1,
      category2: this.props.data.floorNumber,
      pageNo: 1
    });

    fkg.asyncHttpPost("/mall/commodity/show/search", param, succ, err);
  }

  constructor(props) {
    super(props);
    //  Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  state = {
    data: []
  };

  render() {
    return (
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        <ScrollView>
          <FloorSpecificDisplay data={this.state.data} mode={"display"} />
        </ScrollView>
      </View>
    );
  }
}

export default FloorSpecific;
