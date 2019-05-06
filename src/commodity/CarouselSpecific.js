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

class CarouselSpecific extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.data.imageName,
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
      category: 3,
      category2: this.props.data.position,
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

export default CarouselSpecific;
