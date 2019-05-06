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
  TouchableOpacity
} from "react-native";
import fkg from "../common/Util";
import FloorDisplay from "../components/FloorDisplay";
import { Navigation } from "react-native-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  floorText: {
    fontSize: 20,
    color: "#96bbf7"
  },
  floorTextContainer: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#eff0f2",
    marginTop: 2,
    marginBottom: 2,
    padding: 4
  }
});

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const succ = result => {
      console.log(result.body);
      this.setState({
        data: result.body
      });
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
    fkg.asyncHttpGet(
      "/mall/floor/search?orgId=" + orgId + "&commType=" + ctype,
      succ,
      err
    );
  }

  state = {
    data: []
  };

  onPressFloor = floor => {
    Navigation.push("Home", {
      //Use your stack Id instead of this.pros.componentId
      component: {
        name: "FloorSpecific",
        passProps: {
          data: floor
        },
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            animate: false
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true }
        }
      }
    });
  };
  //redirection is still to do.
  render() {
    return this.state.data.map(floor => {
      return (
        <View style={{ marginTop: 10 }} key={JSON.stringify(floor)}>
          <TouchableOpacity onPress={() => this.onPressFloor(floor)}>
            <View style={styles.floorTextContainer}>
              <Text style={styles.floorText}>{floor.floorName}</Text>
            </View>
          </TouchableOpacity>
          <FloorDisplay floorNumber={floor.floorNumber} />
        </View>
      );
    });
  }
}

export default Floor;
