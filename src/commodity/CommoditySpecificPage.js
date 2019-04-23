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
import { Overlay } from "react-native-elements";
import { Button } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import fkg from "../common/Util";
import CommoditySpecificPageBottomIcons from "../common/CommoditySpecificPageBottomIcons";

var _ = require("lodash");
import support from "../assets/support.png";
import likeEmpty from "../assets/like-empty.png";
import shopping from "../assets/shopping-cart.png";
import NumericInput from "react-native-numeric-input";
import HTTP from "../common/HTTPmethod";
import util from "../common/Const";

const styles = StyleSheet.create({
  description: {
    fontSize: 25,
    fontWeight: "200",
    color: "#222323"
  },
  descriptionSmall: {
    fontSize: 18,
    color: "#222323"
  },
  priceTag: {
    fontSize: 26,
    fontWeight: "300",
    color: "#d35800"
  },
  priceTagWrap: {
    marginTop: 12
  },
  infoWrap: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
  chosen: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginTop: 15
  },
  chosenText: {
    fontSize: 18,
    fontWeight: "200",
    color: "#222323"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    paddingRight: 20,
    paddingLeft: 20
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  putInCart: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#8ae000",
    borderColor: "#8ae000",
    paddingTop: 10,
    paddingBottom: 10,
    width: 90,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20
  },
  buyNow: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#c3e80b",
    borderColor: "#c3e80b",
    paddingTop: 10,
    paddingBottom: 10,
    width: 90,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20
  }
});

class CommoditySpecificPage extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: "商品详情",
          alignment: "center"
        }
      }
    };
  }

  constructor(props) {
    super(props);
    //  Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  state = {
    data: {},
    value: 0,
    selectedCommodity: [],
    overLayVisible: false,
    mode: "",
    entries: []
  };

  componentWillMount() {
    //fetching data
    console.log(this.props.data);
    const succ = result => {
      console.log(result.body);
      this.setState({
        data: result.body,
        entries: JSON.parse(result.body.bigImageUri)
      });
    };

    const err = result => {
      alert(result);
    };

    // const id = "322870972065513473"; //passed props

    fkg.asyncHttpGet(
      "/commodity/b2c/global/commodity/load?id=" + this.props.data.commodityId,
      succ,
      err
    );
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={{ width: Dimensions.get("window").width, height: 300 }}
          source={{
            uri: fkg.PIC_URL + item
          }}
        />
      </View>
    );
  }

  onPressPutInCart = () => {
    console.log("cart");
    this.setState({
      overLayVisible: true,
      mode: "putInCart"
    });
  };
  onPressBuyNow = () => {
    console.log("buynow");
    this.setState({ overLayVisible: true, mode: "buyNow" });
  };

  onConfirm = async () => {
    this.setState({ overLayVisible: false, mode: "" });

    //do some operation
    // 加入购物车
    // TODO cytpe
    let cType = 1;
    let type = "";
    if (cType === fkg.COMMODITY_TYPE_B2B_G) {
      type = "b2b/global";
    } else if (cType === fkg.COMMODITY_TYPE_B2B_R) {
      type = "b2b/region";
    } else if (cType === fkg.COMMODITY_TYPE_B2C_G) {
      type = "b2c/global";
    } else if (cType === fkg.COMMODITY_TYPE_B2C_R) {
      type = "b2c/region";
    }

    // TODO 这边需要渲染specid specPrice id commodityName supplierName
    let formData = {
      action: 0,
      commodityName: "string",
      id: "string",
      memberId: await fkg.getAppItem("currentUserId"),
      quantity: this.state.value,
      specId: "string",
      specPrice: 0,
      status: 0,
      supplierName: "string",
      transactionId: "string"
    };

    try {
      let response = await HTTP._fetch(
        HTTP.POST({
          url: "/commodity/" + type + "/cart/create",
          formData
        })
      );

      if (response.status === 200) {
        util.toastLong("成功加入购物车");
      } else util.toastLong("网络错误");
    } catch (error) {
      util.toastLong(error);
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        <ScrollView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            lockScrollWhileSnapping
            enableSnap
            loop
          />
          <View style={styles.infoWrap}>
            <View>
              <Text style={styles.description}>
                {this.state.data.commodityName}
              </Text>
              <Text style={styles.descriptionSmall}>
                {this.state.data.descriptions}
              </Text>
            </View>
            <View style={styles.priceTagWrap}>
              <Text style={styles.priceTag}>&yen;{this.state.data.price}</Text>
            </View>
          </View>

          <View style={styles.chosen}>
            <Text style={styles.chosenText}>已选</Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.icons}>
            <CommoditySpecificPageBottomIcons name={"客服"} image={support} />
            <CommoditySpecificPageBottomIcons name={"收藏"} image={likeEmpty} />
            <CommoditySpecificPageBottomIcons
              name={"购物车"}
              image={shopping}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={this.onPressPutInCart}>
              <View style={styles.putInCart}>
                <Text>加入购物车</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onPressBuyNow}>
              <View style={styles.buyNow}>
                <Text>立即购买</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Overlay
          isVisible={this.state.overLayVisible}
          onBackdropPress={() =>
            this.setState({ overLayVisible: false, mode: "" })
          }
          width={Dimensions.get("window").width - 80}
          height="auto"
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: "http://www.w3school.com.cn/i/eg_tulip.jpg" }}
                style={{ height: 130, width: 130 }}
              />
              <View style={{ justifyContent: "flex-end", marginLeft: 15 }}>
                <Text
                  style={{ fontSize: 17, color: "#ed4f3d", marginBottom: 7 }}
                >
                  &yen;商品价格
                </Text>
                <Text style={{ marginBottom: 5 }}>库存</Text>
                <Text>配送至</Text>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  borderBottomColor: "#c0c1c4",
                  borderBottomWidth: 1,
                  paddingBottom: 40
                }}
              >
                <Text>规格</Text>
              </View>
              <View>
                <Text style={{ marginBottom: 5 }}>数量</Text>
                <NumericInput
                  minValue={0}
                  value={this.state.value}
                  initValue={this.state.value}
                  onChange={value => {
                    this.setState({ value });
                  }}
                />
              </View>
            </ScrollView>
            <View style={{ marginTop: 10 }}>
              <Button title="确认" onPress={this.onConfirm} />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

export default CommoditySpecificPage;
