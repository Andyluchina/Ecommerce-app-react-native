import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  DeviceEventEmitter,
  ScrollView,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { Navigation } from "react-native-navigation";
import util from "../common/Const";
import HTTP from "../common/HTTPmethod";
import fkg from "../common/Util";

export default class ShoppingCartList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      h: "hhh",
      isChecked: true,
      data: [],
      checked: [],
      isRefreshing: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      console.log(await fkg.getAppItem("currUserId"));

      let type = "";

      if (this.props.type === "B2B全国") {
        type = "b2b/global";
      } else if (this.props.type === "B2B地方") {
        type = "b2b/region";
      } else if (this.props.type === "B2C全国") {
        type = "b2c/global";
      } else if (this.props.type === "B2C地方") {
        type = "b2c/region";
      }

      let formData = {
        memberId: await fkg.getAppItem("currUserId")
      };

      let response = await HTTP._fetch(
        HTTP.GET({
          url: "/commodity/" + type + "/cart/search2",
          formData
        })
      );

      util.log(response);
      if (response.status === 200) {
        let responseJson = await response.json();

        let body = responseJson.body;
        let data = [];

        Object.keys(body).forEach(key => {
          data.push({
            shopName: key,
            items: body[key]
          });
        });

        let checked = this.getChecked(data);
        this.setState({
          data: data,
          checked: checked
        });
      } else util.toastLong("网络错误");
    } catch (error) {
      util.toastLong(error);
    }

    this.getChecked();
  }

  getChecked(data) {
    let checked = [];
    for (let i = 0; i < data.length; i++) {
      let item = [];
      for (let j = 0; j < data[i].items.length; j++) {
        item.push(false);
      }
      checked.push({ all: false, item: item });
    }

    return checked;
  }

  getSelectedItems() {
    util.log(this.state.data);
    let ids = [];
    let specids = [];
    let prices = [];
    let names = [];
    let quantitys = [];
    let goods = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let item = [];
      for (let j = 0; j < this.state.data[i].items.length; j++) {
        if (this.state.checked[i].item[j]) {
          ids.push(this.state.data[i].items[j].id);
          specids.push(this.state.data[i].items[j].specId);
          prices.push(this.state.data[i].items[j].specPrice);
          names.push(this.state.data[i].items[j].commodityName);
          quantitys.push(this.state.data[i].items[j].quantity);
          goods.push({
            name: this.state.data[i].items[j].commodityName,
            quantity: this.state.data[i].items[j].quantity,
            price: this.state.data[i].items[j].specPrice
          });
        }
      }
    }

    return {
      id: ids,
      specId: specids,
      price: prices,
      quantity: quantitys,
      name: names,
      good: goods
    };
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.getData();

      //逻辑执行完之后，修改刷新状态为false
      this.setState({ isRefreshing: false });
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)} //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
              tintColor="white"
              title={this.state.isRefreshing ? "刷新中...." : "下拉刷新"}
            />
          }
          style={{ backgroundColor: util.backgroundColor }}
        >
          {this.state.data.map((item, index) => (
            <View style={styles.contentBar}>
              <View>
                <View style={styles.contentItem}>
                  <TouchableHighlight
                    style={{ flexDirection: "row", flex: 1, padding: 0 }}
                    onPress={() => {
                      let checked = this.state.checked;
                      checked[index].all = !checked[index].all;
                      if (checked[index].all) {
                        for (let j = 0; j < checked[index].item.length; j++) {
                          checked[index].item[j] = true;
                        }
                      } else {
                        for (let j = 0; j < checked[index].item.length; j++) {
                          checked[index].item[j] = false;
                        }
                      }

                      let newCheck = [];
                      for (let i = 0; i < checked.length; i++) {
                        newCheck.push(checked[i]);
                      }

                      this.setState({
                        checked: newCheck
                      });
                    }}
                    underlayColor="transparent"
                  >
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      {this.state.checked[index].all ? (
                        <Image
                          source={require("./../assets/ic_check_box.png")}
                        />
                      ) : (
                        <Image
                          source={require("./../assets/ic_check_box_outline_blank.png")}
                        />
                      )}

                      <Text style={{ flex: 1, marginLeft: 10 }}>
                        {item.shopName}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              {item.items.map((item1, i) => (
                <TouchableHighlight
                  style={{ flexDirection: "row", padding: 2, marginLeft: 30 }}
                  onPress={() => {
                    let newChecked = this.state.checked;
                    newChecked[index].item[i] = !newChecked[index].item[i];

                    // 判断是否全选或者取消
                    let change = true;
                    for (let j = 0; j < newChecked[index].item.length; j++) {
                      if (
                        newChecked[index].item[i] !== newChecked[index].item[j]
                      ) {
                        change = false;
                        break;
                      }
                    }
                    if (change) {
                      newChecked[index].all = newChecked[index].item[i];
                    }

                    this.setState({
                      checked: newChecked
                    });
                  }}
                  underlayColor="transparent"
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "flex-start"
                    }}
                  >
                    {this.state.checked[index].item[i] ? (
                      <Image source={require("./../assets/ic_check_box.png")} />
                    ) : (
                      <Image
                        source={require("./../assets/ic_check_box_outline_blank.png")}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 3,
                        width: util.width / 2
                      }}
                    >
                      {item1.commodityName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 3,
                        textAlign: "right",
                        width: util.width / 4 - 20
                      }}
                    >
                      {item1.specPrice} 元 ✖️ {item1.quantity}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => {
              let result = this.getSelectedItems();

              let type = "";

              if (this.props.type === "B2B全国") {
                type = "b2b/global";
              } else if (this.props.type === "B2B地方") {
                type = "b2b/region";
              } else if (this.props.type === "B2C全国") {
                type = "b2c/global";
              } else if (this.props.type === "B2C地方") {
                type = "b2c/region";
              }

              //跳转到结算界面
              if (result.id.length === 0) {
                util.toastLong("请选择下单商品后提交");
              } else {
                if (this.props.NotinShoppingCart) {
                  this.props.CreateOrder(result, type);
                } else {
                  Navigation.push("ShoppingCart", {
                    component: {
                      name: "CreateOrder",
                      passProps: {
                        data: result,
                        type: type
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
                }
              }
            }}
          >
            <View style={styles.redBottomView}>
              <Text style={styles.redBottomText}>提交订单</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    backgroundColor: "#f8f8f8"
  },
  container: {
    height: 55,
    backgroundColor: "#f8f8f8"
  },
  row: {
    width: (util.width * 11) / 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginLeft: 17,
    marginRight: 17,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    paddingTop: 5,
    paddingBottom: 10
  },
  icon: {
    height: 80,
    width: 80,
    borderRadius: 0,
    marginLeft: 20
  },
  infoView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 60,
    width: util.width - 90,
    marginLeft: 20,
    marginTop: 5,
    marginRight: 20
  },
  infoName: {
    fontSize: 20,
    color: "#414141"
  },
  infoTextView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 15
  },

  contentBar: {
    width: (util.width * 11) / 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 17,
    marginRight: 17,
    marginTop: 15,
    borderRadius: 5
  },
  contentItem: {
    width: (util.width * 7) / 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15
  },
  content: {
    color: "#453E3E",
    fontSize: 15,
    marginLeft: -10
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
