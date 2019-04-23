import React from "react";
import { Text, View } from "react-native";

import ScrollableTabView from "react-native-scrollable-tab-view";
import util from "../common/Const";
import OrderList from "./OrderList";

export default class Order extends React.Component {
  componentWillMount() {
    console.log(this.props.data);
  }
  render() {
    return (
      <ScrollableTabView
        tabBarActiveTextColor={util.headerColor}
        tabBarUnderlineStyle={{ backgroundColor: util.headerColor }}
        tabBarPosition={"top"}
        initialPage={this.props.data.selectedItem}
      >
        <View tabLabel={"全部"}>
          <OrderList navigation={this.props.data} />
        </View>
        <View tabLabel={"待付款"}>
          <OrderList navigation={this.props.data} />
        </View>
        <View tabLabel={"待发货"}>
          <OrderList navigation={this.props.data} />
        </View>
        <View tabLabel={"待收货"}>
          <OrderList navigation={this.props.data} />
        </View>
        <View tabLabel={"已收货"}>
          <OrderList navigation={this.props.data} />
        </View>
        <View tabLabel={"退货"}>
          <OrderList navigation={this.props.data} />
        </View>
      </ScrollableTabView>
    );
  }
}
