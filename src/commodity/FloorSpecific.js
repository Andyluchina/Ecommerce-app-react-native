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

  async componentWillMount() {
    const succ = result => {
      this.setState({ data: result.body });
      //  alert("in success");
    };

    const err = result => {
      alert(result);
    };
    const orgId = await fkg.getAppItem("currOperatorId");
    const mallType = await fkg.getAppItem("currMall");
    const tradeType = await fkg.getAppItem("currType");
    let ctype;
    if (fkg.G_MALL == mallType) {
      if (fkg.B2B == tradeType) {
        ctype = fkg.TYPE_B2B_G;
      } else if (fkg.B2C == tradeType) {
        ctype = fkg.TYPE_B2C_G;
      }
    } else if (fkg.R_MALL == mallType) {
      if (fkg.B2B == tradeType) {
        ctype = fkg.TYPE_B2B_R;
      } else if (fkg.B2C == tradeType) {
        ctype = fkg.TYPE_B2C_R;
      }
    }
    const param = JSON.stringify({
      category: 1,
      category2: this.props.data.floorNumber,
      pageNo: 1,
      orgId,
      ctype
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
