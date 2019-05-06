import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import fkg from "../common/Util";
import util from "../common/Const";
import HTTP from "../common/HTTPmethod";
import ClearButton from "../components/ClearButton";
import { goToMain } from "./startMainApp";

class Region extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    B2B: "",
    regionSelected: "",
    displayData: [],
    selectState: 1,
    currRegion: ""
  };
  async componentWillMount() {
    //fetching data
    const res = await this.getData("8");
    console.log(res.body);
    this.setState({ displayData: res.body });
  }
  async componentDidMount() {
    //fetching data
    const currentType = await fkg.getAppItem("currType");
    if (currentType === fkg.B2B) {
      this.setState({
        B2B: "B2B"
      });
    } else {
      this.setState({
        B2B: "B2C"
      });
    }
    const regionName = await fkg.getAppItem("regionName");
    this.setState({ currRegion: regionName });
  }
  async getData(parentId) {
    try {
      let formData = {
        parentId: parentId
      };
      let response = await HTTP._fetch(
        HTTP.POST({ url: "/sys/region/search", formData })
      );

      if (response.status === 200) {
        let responseJson = await response.json();
        return responseJson;
      } else {
        util.toastLong("网络故障");
      }
    } catch (error) {
      util.toastLong(error);
    }
  }
  onPressB2B = async () => {
    if (this.state.B2B === "B2B") {
      await this.reverseType(this.state.B2B);
      this.setState({
        B2B: "B2C"
      });
      util.toastLong("已经切换到" + this.state.B2B);
    } else {
      this.setState({
        B2B: "B2B"
      });
      await this.reverseType(this.state.B2B);
      util.toastLong("已经切换到" + this.state.B2B);
    }
  };
  onPressFisrtLevel = async item => {
    if (this.state.selectState === 1) {
      console.log(item);
      this.setState({
        regionSelected: item.regionFullName
      });
      const res = await this.getData(item.id);
      this.setState({
        displayData: res.body,
        selectState: 2
      });
    } else if (this.state.selectState === 2) {
      console.log(item);
      var s = this.state.regionSelected;
      var reg = s + "/" + item.regionFullName;
      this.setState({
        regionSelected: reg
      });
      this.getThirdLevel(item.id);
      this.setState({
        selectState: 3
      });
    } else if (this.state.selectState === 3) {
      console.log(item);
      var s = this.state.regionSelected;
      var reg = s + "/" + item.second;
      this.setState({
        regionSelected: reg
      });

      if (item.first === "") {
        const res = await this.getData("8");
        this.setState({ displayData: res.body, selectState: 1 });
        this.setState({
          regionSelected: ""
        });
        util.toastLong("选择地区没有运营商");
      } else {
        util.toastLong("商城已切换至: " + this.state.regionSelected);
        const res = await this.getData("8");
        this.setState({ displayData: res.body, selectState: 1 });
        this.setState({
          currRegion: this.state.regionSelected
        });
        this.setState({
          regionSelected: ""
        });
        await fkg.setAppItem("regionName", this.state.currRegion);
        await fkg.setAppItem("currOperatorId", item.third);
        await fkg.setAppItem("currMall", fkg.R_MALL);
        goToMain();
      }
    }
  };
  getThirdLevel = id => {
    const succ = result => {
      console.log(result);
      this.setState({ displayData: result.body });
    };

    const err = result => {
      alert(result);
    };
    fkg.asyncHttpGet(
      "/sys/region/operator/search?secordLevelId=" + id,
      succ,
      err
    );
  };

  reverseType = async mall => {
    if (mall === "B2B") {
      await fkg.setAppItem("currType", fkg.B2C);
      goToMain();
    } else {
      await fkg.setAppItem("currType", fkg.B2B);
      goToMain();
    }
  };

  renderRegions = () => {
    if (this.state.selectState === 3) {
      return this.state.displayData.map(item => {
        return (
          <View
            key={JSON.stringify(item)}
            style={{
              marginLeft: 5,
              marginRight: 5,
              paddingRight: 3,
              paddingLeft: 3,
              paddingTop: 2,
              paddingBottom: 2,
              marginBottom: 5
            }}
          >
            <TouchableOpacity onPress={() => this.onPressFisrtLevel(item)}>
              <Text style={{ fontSize: 18 }}>{item.second}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return this.state.displayData.map(item => {
        return (
          <View
            key={JSON.stringify(item)}
            style={{
              marginLeft: 5,
              marginRight: 5,
              paddingRight: 3,
              paddingLeft: 3,
              paddingTop: 2,
              paddingBottom: 2,
              marginBottom: 5
            }}
          >
            <TouchableOpacity onPress={() => this.onPressFisrtLevel(item)}>
              <Text style={{ fontSize: 18 }}>{item.regionFullName}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  clearRegion = async () => {
    this.setState({
      regionSelected: ""
    });
    const res = await this.getData("8");
    this.setState({ displayData: res.body, selectState: 1 });
  };

  onPressGlobal = async () => {
    util.toastLong("商城已切换至: " + "全国");
    this.setState({
      currRegion: "全国",
      regionSelected: ""
    });
    await fkg.setAppItem("currMall", fkg.G_MALL);
    await fkg.setAppItem("regionName", this.state.currRegion);
    await fkg.setAppItem("currOperatorId", 8);
    const res = await this.getData("8");
    this.setState({ displayData: res.body, selectState: 1 });
    goToMain();
  };
  render() {
    return (
      <ScrollView>
        <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.B2B}>
              <TouchableOpacity onPress={this.onPressB2B}>
                <Text style={{ fontSize: 24 }}>{this.state.B2B}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 20 }}>
              当前地区: {this.state.currRegion}
            </Text>
            <Text style={{ fontSize: 20 }}>
              已选地区：{this.state.regionSelected}
            </Text>
            <ClearButton title="重新选择" onPress={this.clearRegion} />
            <View style={{ marginTop: 20 }}>
              <View style={{ marginLeft: 8, marginBottom: 3 }}>
                <TouchableOpacity onPress={this.onPressGlobal}>
                  <Text style={{ fontSize: 18 }}>全国</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this.renderRegions()}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  B2B: {
    padding: 3,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10
  }
};
export default Region;
//            <Text style={{ fontSize: 24, marginRight: 10 }}>切换</Text>
