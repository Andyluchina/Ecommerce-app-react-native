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

  componentWillMount() {
    const succ = result => {
      console.log(result.body);
      this.setState({
        data: result.body
      });
    };

    const err = result => {
      alert(result);
    };

    fkg.asyncHttpGet("/mall/floor/search?orgId=8", succ, err);
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
        <View style={{ marginTop: 10 }}>
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
