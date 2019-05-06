import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";
import util from "../common/Const";
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar
} from "@valdio/react-native-scrollable-tabview";
import ShoppingCartList from "./ShoppingCartList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  redBottomView: {
    width: util.width,
    backgroundColor: "#ea5d45",
    height: 50
  },
  redBottomText: {
    width: util.width,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 20,
    flex: 1,
    paddingTop: 15
  }
});

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  CreateOrder = (result, type) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "CreateOrder",
        passProps: {
          data: result,
          type: type,
          NotinShoppingCart: true
        },
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            animate: false
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true
          }
        }
      }
    });
  };
  //redirection is still to do.
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 0 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <ShoppingCartList
          tabLabel={"B2B全国"}
          navigation={this.props.navigation}
          type={"B2B全国"}
          NotinShoppingCart={this.props.NotinShoppingCart}
          CreateOrder={this.CreateOrder}
        />
        <ShoppingCartList
          tabLabel={"B2B地方"}
          navigation={this.props.navigation}
          type={"B2B地方"}
          NotinShoppingCart={this.props.NotinShoppingCart}
          CreateOrder={this.CreateOrder}
        />
        <ShoppingCartList
          tabLabel={"B2C全国"}
          navigation={this.props.navigation}
          type={"B2C全国"}
          NotinShoppingCart={this.props.NotinShoppingCart}
          CreateOrder={this.CreateOrder}
        />
        <ShoppingCartList
          tabLabel={"B2C地方"}
          navigation={this.props.navigation}
          type={"B2C地方"}
          NotinShoppingCart={this.props.NotinShoppingCart}
          CreateOrder={this.CreateOrder}
        />
      </ScrollableTabView>
    );
  }
}
