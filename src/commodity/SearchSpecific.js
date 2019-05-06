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

class SearchSpecific extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.data,
          alignment: "center"
        }
      }
    };
  }

  async componentWillMount() {
    const mallType = await fkg.getAppItem("currMall");
    const tradeType = await fkg.getAppItem("currType");
    const orgId = await fkg.getAppItem("currOperatorId");
    let uri = "";
    if (fkg.G_MALL == mallType) {
      if (fkg.B2B == tradeType) {
        uri = `/commodity/b2b/global/commodity/search`;
      } else if (fkg.B2C == tradeType) {
        uri = `/commodity/b2c/global/commodity/search`;
      }
    } else if (fkg.R_MALL == mallType) {
      if (fkg.B2B == tradeType) {
        uri = `/commodity/b2b/region/commodity/search`;
      } else if (fkg.B2C == tradeType) {
        uri = `/commodity/b2c/region/commodity/search`;
      }
    }
    const succ = result => {
      this.setState({ data: result.body });
      //  alert("in success");
      console.log(result.body);
    };

    const err = result => {
      alert(result);
    };
    const param = JSON.stringify({
      commodityName: this.props.data,
      pageNo: 1,
      orgId
    });

    fkg.asyncHttpPost(uri, param, succ, err);

    // ctype;
    //
    // const { commodityId } = this.props.match.params;
    // if (fkg.G_MALL == this.mallType) {
    //   if (fkg.B2B == this.tradeType) {
    //     this.ctype = fkg.TYPE_B2B_G;
    //   } else if (fkg.B2C == this.tradeType) {
    //     this.ctype = fkg.TYPE_B2C_G;
    //   }
    // } else if (fkg.R_MALL == this.mallType) {
    //   if (fkg.B2B == this.tradeType) {
    //     this.ctype = fkg.TYPE_B2B_R;
    //   } else if (fkg.B2C == this.tradeType) {
    //     this.ctype = fkg.TYPE_B2C_R;
    //   }
    // }
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
          <FloorSpecificDisplay data={this.state.data} mode={"commodity"} />
        </ScrollView>
      </View>
    );
  }
}

export default SearchSpecific;
