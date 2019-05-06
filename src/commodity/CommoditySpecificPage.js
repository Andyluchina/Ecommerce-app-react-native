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
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Overlay } from "react-native-elements";
import { Button } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import fkg from "../common/Util";
import CommoditySpecificPageBottomIcons from "../common/CommoditySpecificPageBottomIcons";
import WebViewCommo from "./WebViewCommo";
import ScrollableTabView from "react-native-scrollable-tab-view";
// import {
//   ScrollableTabView,
//   DefaultTabBar,
//   ScrollableTabBar
// } from "@valdio/react-native-scrollable-tabview";
import CommodityDisplay from "./CommodityDisplay";
var _ = require("lodash");
import support from "../assets/support.png";
import likeEmpty from "../assets/like-empty.png";
import shopping from "../assets/shopping-cart.png";
import NumericInput from "react-native-numeric-input";
import HTTP from "../common/HTTPmethod";
import util from "../common/Const";
import AttributesTab from "./AttributesTab";
import CommentTab from "./CommentTab";
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
    borderRadius: 20,
    marginRight: 10
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
  },
  specContainer: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 2,
    marginBottom: 2,
    paddingRight: 6,
    paddingLeft: 6
  },
  specSelectedContainer: {
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ff7e28",
    marginTop: 2,
    marginBottom: 2,
    paddingRight: 6,
    paddingLeft: 6
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
    value: 1,
    selectedCommodity: [],
    overLayVisible: false,
    mode: "",
    entries: [],
    selectedSpec: {},
    specs: [],
    display: "up",
    specsMap: new Map(),
    specSelected: {}
  };

  async componentWillMount() {
    //fetching data
    console.log(this.props.data);
    const succ = result => {
      console.log(result.body);
      this.setState({
        data: result.body,
        entries: JSON.parse(result.body.bigImageUri),
        selectedSpec: result.body.commoditySpecs[0],
        specs: result.body.commoditySpecs
      });
      ////
      const specsMap = new Map();
      const specSelected = {};
      for (const spec of result.body.commoditySpecs) {
        const specValues = JSON.parse(spec.specValues);
        for (const value of specValues) {
          if (specsMap.has(value.ni)) {
            const mapList = specsMap.get(value.ni);
            if (!mapList.find(e => e.vi === value.vi)) {
              specsMap.get(value.ni).push(value);
            }
          } else {
            specSelected[value.ni] = value.vi;
            specsMap.set(value.ni, [value]);
          }
        }
      }
      this.setState({
        specsMap,
        specSelected
      });
      /////
    };

    const err = result => {
      alert(result);
    };
    const ctype = this.props.data.ctype;
    let uri;
    if (ctype === fkg.TYPE_B2B_G) {
      uri = "/commodity/b2b/global/commodity/load?id=";
    } else if (ctype === fkg.TYPE_B2B_R) {
      uri = "/commodity/b2b/region/commodity/load?id=";
    } else if (ctype === fkg.TYPE_B2C_G) {
      uri = "/commodity/b2c/global/commodity/load?id=";
    } else if (ctype === fkg.TYPE_B2C_R) {
      uri = "/commodity/b2c/region/commodity/load?id=";
    }
    fkg.asyncHttpGet(uri + this.props.id, succ, err);
  }

  onPressPutInCart = () => {
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
    console.log(this.state.selectedSpec);
    //do some operation
    // 加入购物车
    // TODO cytpe
    let cType = this.state.data.ctype;
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

    util.log(await fkg.getAppItem("currentUserId"));
    // TODO 这边需要渲染specid specPrice id commodityName supplierName
    let formData = {
      commodityName: this.state.data.commodityName,
      // id: this.props.data.commodityId,
      memberId: await fkg.getAppItem("currUserId"),
      quantity: this.state.value,
      specId: this.state.selectedSpec.id,
      specPrice: this.state.selectedSpec.fkgouPrice,
      supplierName: this.state.data.supplierName,
      commodityImageUri: this.state.entries[0],
      specName: this.state.selectedSpec.specName
      // transactionId: this.state.data.transactionId
    };

    util.log(formData);

    try {
      let response = await HTTP._fetch(
        HTTP.POST({
          url: "/commodity/" + type + "/cart/create",
          formData
        })
      );

      util.log(response);
      if (response.status === 200) {
        util.toastLong("成功加入购物车");
      } else util.toastLong("网络错误");
    } catch (error) {
      util.toastLong(error);
    }
  };

  renderSpecsHere = () => {
    this.state.specs.map(spec => {
      if (spec.id === this.state.selectedSpec.id) {
        return (
          <View style={styles.specContainer}>
            <TouchableOpacity
              onPress={event => {
                this.setState({
                  selectedSpec: spec
                });
              }}
            >
              <Text>{spec.specName}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.specSelectedContainer}>
            <TouchableOpacity
              onPress={event => {
                this.setState({
                  selectedSpec: spec
                });
              }}
            >
              <Text>{spec.specName}</Text>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  // onSwipe(gestureName, gestureState) {
  //   const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
  //   this.setState({ gestureName: gestureName });
  //   switch (gestureName) {
  //     case SWIPE_UP:
  //       this.setState({ backgroundColor: "red" });
  //       break;
  //     case SWIPE_DOWN:
  //       this.setState({ backgroundColor: "green" });
  //       break;
  //     case SWIPE_LEFT:
  //       this.setState({ backgroundColor: "blue" });
  //       break;
  //     case SWIPE_RIGHT:
  //       this.setState({ backgroundColor: "yellow" });
  //       break;
  //   }
  // }
  onChangeDisplay = () => {
    this.setState({ display: "down" });
  };

  onChangeDisplayUp = () => {
    this.setState({ display: "up" });
  };
  renderDisplay = () => {
    if (this.state.display === "up") {
      return (
        <CommodityDisplay
          tabLabel="商品参数"
          entries={this.state.entries}
          data={this.state.data}
          specSelected={this.state.specSelected}
          quantity={this.state.value}
          onChangeDisplay={this.onChangeDisplay}
          specsMap={this.state.specsMap}
          selectedSpec={this.state.selectedSpec}
        />
      );
    } else {
      return (
        <ScrollableTabView
          tabBarActiveTextColor={util.headerColor}
          tabBarUnderlineStyle={{ backgroundColor: util.headerColor }}
          tabBarPosition={"top"}
        >
          <WebViewCommo
            tabLabel="商品详情"
            data={this.state.data.descriptions}
            onChangeDisplay={this.onChangeDisplayUp}
          />
          <AttributesTab
            tabLabel="商品参数"
            onChangeDisplay={this.onChangeDisplayUp}
          />
          <CommentTab
            tabLabel="商品评论"
            onChangeDisplay={this.onChangeDisplayUp}
          />
        </ScrollableTabView>
      );
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        {this.renderDisplay()}
        <View style={styles.footer}>
          <View style={styles.icons}>
            <CommoditySpecificPageBottomIcons name={"客服"} image={support} />
            <CommoditySpecificPageBottomIcons name={"收藏"} image={likeEmpty} />
            <CommoditySpecificPageBottomIcons
              name={"购物车"}
              image={shopping}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  //Use your stack Id instead of this.pros.componentId
                  component: {
                    name: "ShoppingCart",
                    passProps: {
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
              }}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={this.onPressPutInCart}>
              <View style={styles.putInCart}>
                <Text>加入购物车</Text>
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
                source={{ uri: fkg.PIC_URL + this.state.entries[0] }}
                style={{ height: 130, width: 130 }}
              />
              <View style={{ justifyContent: "flex-end", marginLeft: 15 }}>
                <Text
                  style={{ fontSize: 17, color: "#ed4f3d", marginBottom: 7 }}
                >
                  &yen;{this.state.selectedSpec.fkgouPrice}
                </Text>
                <Text style={{ marginBottom: 5 }}>
                  库存 {this.state.selectedSpec.inventories}
                </Text>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  borderBottomColor: "#c0c1c4",
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }}
              >
                <Text style={{ fontSize: 15 }}>规格</Text>
                {this.renderList()}
              </View>
              <View>
                <Text style={{ marginBottom: 5, fontSize: 15 }}>数量</Text>
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
  renderList = () => {
    var res = [];
    this.state.specsMap.forEach((value, key, map) => {
      res.push(
        <View>
          <Text style={{ fontSize: 15 }}>{value[0].n}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.renderAttr(key, value)}
          </View>
        </View>
      );
    });
    return res;
  };
  renderAttr = (key, value) => {
    return value.map(item => {
      if (item.vi === this.state.specSelected[key]) {
        return (
          <View style={styles.specSelectedContainer} key={JSON.stringify(item)}>
            <TouchableOpacity
              onPress={event => {
                var s = this.state.specSelected;
                s[key] = item.vi;
                this.setState({
                  specSelected: s
                });
                this.updateSelectedSpecs();
              }}
            >
              <Text style={{ color: "#ff7e28", fontSize: 17 }}>{item.v}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.specContainer} key={JSON.stringify(item)}>
            <TouchableOpacity
              onPress={event => {
                var s = this.state.specSelected;
                s[key] = item.vi;
                this.setState({
                  specSelected: s
                });
                this.updateSelectedSpecs();
              }}
            >
              <Text style={{ fontSize: 17 }}>{item.v}</Text>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  updateSelectedSpecs = () => {
    var i;
    for (i = 0; i < this.state.specs.length; i++) {
      const s = JSON.parse(this.state.specs[i].specValues);
      if (this.compareSpec(s)) {
        this.setState({
          selectedSpec: this.state.specs[i]
        });
        return;
      }
    }
  };
  compareSpec = s => {
    // const keys = Object.keys(this.state.specSelected);
    var i;
    for (i = 0; i < s.length; i++) {
      if (s[i].vi !== this.state.specSelected[s[i].ni]) {
        return false;
      }
    }
    return true;
  };
}

export default CommoditySpecificPage;

// {this.state.specs.map(specific => {
//   if (specific.id === this.state.selectedSpec.id) {
//     return (
//       <View style={styles.specContainer}>
//         <TouchableOpacity
//           onPress={event => {
//             this.setState({
//               selectedSpec: specific
//             });
//           }}
//         >
//           <Text>{specific.specName}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.specSelectedContainer}>
//         <TouchableOpacity
//           onPress={event => {
//             this.setState({
//               selectedSpec: specific
//             });
//           }}
//         >
//           <Text>{specific.specName}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// })}
