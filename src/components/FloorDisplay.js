import React, { Component } from "react";
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
import fkg from "../common/Util";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Navigation } from "react-native-navigation";
import MediaCard from "./MediaCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

class FloorDisplay extends Component {
  constructor(props) {
    super(props);
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
      category2: this.props.floorNumber,
      pageNo: 1,
      pageSize: 6
    });

    fkg.asyncHttpPost("/mall/commodity/show/search", param, succ, err);
  }
  state = {
    data: []
  };

  renderSplitMedia = item => {
    return <Grid>{item.map(i => this.showCard(i))}</Grid>;
  };

  showCard = i => (
    <Col size={50}>
      <MediaCard data={i} navigate={this.navigateToSpecific} />
    </Col>
  );
  chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }
    //  console.log(tempArray);
    return tempArray;
  };
  //redirection is still to do.

  navigateToSpecific = data => {
    Navigation.push("Home", {
      //Use your stack Id instead of this.pros.componentId
      component: {
        name: "CommoditySpecificPage",
        passProps: {
          data: data
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
  render() {
    return (
      <View>
        {this.chunkArray(this.state.data, 2).map(item => {
          return this.renderSplitMedia(item);
        })}
      </View>
    );
  }
}

export default FloorDisplay;
