import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import AddressIcon from "../assets/addressIcon.jpg";
import fkg from "../common/Util";
import { Navigation } from "react-native-navigation";
import util from "../common/Const";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  address: {
    height: 100,
    backgroundColor: "#fffcf2",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    flexDirection: "row"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100
  },
  bottomBar: {
    alignItems: "center",
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
  confirm: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#8ae000",
    borderColor: "#8ae000",
    paddingTop: 10,
    paddingBottom: 10,
    width: 90,
    borderRadius: 20
  },
  fullPrice: {
    marginRight: 20
  },
  fullPriceText: {
    fontSize: 26,
    fontWeight: "300",
    color: "#d35800",
    flexDirection: "row"
  },
  commodityBar: {
    backgroundColor: "#fffcf2",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    paddingTop: 20
  },
  addressSpec: {
    justifyContent: "center",
    marginLeft: 20
  },
  commoContainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
    justifyContent: "space-between"
  }
});
class CreateOrder extends Component {
  constructor(props) {
    super(props);
  }

  // mockComm = [
  //   { name: "qwe", price: 12 },
  //   { name: "qwe", price: 12 },
  //   { name: "qwe", price: 12 },
  //   { name: "qwe", price: 12 },
  //   { name: "qwe", price: 12 }
  // ];
  state = {
    fullPrice: 0,
    deposit: "",
    postage: "0",
    addresses: [],
    commodities: [],
    selectedAddress: {
      detailAddress: "地址详情",
      reveiptPerson: "收件人",
      reveiptPhone: "手机号"
    }
  };
  async componentWillMount() {
    console.log(this.props.data);
    console.log(this.props.type);
    memberId = await fkg.getAppItem("currUserId");
    //

    // console.log(memberId);
    // console.log(this.props.data);
    this.props.data.good.map(com => {
      var price = this.state.fullPrice + com.price * com.quantity;
      var p = Math.round(price * 100) / 100;
      console.log(p);
      this.setState({
        fullPrice: p
      });
    });
    const succ = result => {
      console.log(result);
      if (!result.body[0]) {
        util.toastLong("请添加地址");
        return;
      }
      this.setState({
        addresses: result.body,
        selectedAddress: result.body[0]
      });
    };

    const err = result => {
      alert(result);
    };
    const param = JSON.stringify({ memberId });

    fkg.asyncHttpPost("/sys/receipt/address/member/search", param, succ, err);
  }
  //redirection is still to do.
  onConfirm = async () => {
    const token = await fkg.getAppItem("token");
    // console.log(this.state.selectedAddress);
    let param, uri;
    if (this.props.type === "b2b/global") {
      uri = "/order/b2b/common/order/create";
      param = {
        b2bGlobalQty: this.props.data.quantity,
        b2bGlobalSpecIds: this.props.data.specId,
        depositAmount: this.state.deposit,
        receiptAddressId: this.state.selectedAddress.id,
        receiptRegionId: this.state.selectedAddress.regionId
      };
    } else if (this.props.type === "b2b/region") {
      uri = "/order/b2b/common/order/create";
      param = {
        b2bRegionQty: this.props.data.quantity,
        b2bRegionSpecIds: this.props.data.specId,
        depositAmount: this.state.deposit,
        receiptAddressId: this.state.selectedAddress.id,
        receiptRegionId: this.state.selectedAddress.regionId
      };
    } else if (this.props.type === "b2c/global") {
      uri = "/order/b2c/common/order/create";
      param = {
        b2cGlobalQty: this.props.data.quantity,
        b2cGlobalSpecIds: this.props.data.specId,
        depositAmount: this.state.deposit,
        receiptAddressId: this.state.selectedAddress.id,
        receiptRegionId: this.state.selectedAddress.regionId
      };
    } else if (this.props.type === "b2c/region") {
      uri = "/order/b2c/common/order/create";
      param = {
        b2cRegionQty: this.props.data.quantity,
        b2cRegionSpecIds: this.props.data.specId,
        depositAmount: this.state.deposit,
        receiptAddressId: this.state.selectedAddress.id,
        receiptRegionId: this.state.selectedAddress.regionId
      };
    }
    console.log(param);
    console.log(uri);
    const succ = result => {
      console.log(result);
      alert(result.message);
      //  alert("in success");
    };

    const err = result => {
      console.log(result);
      alert(result);
    };
    console.log(uri);
    console.log(param);
    fkg.asyncHttpPost(
      uri,
      JSON.stringify(param),
      succ,
      err,
      "application/json",
      token
    );
  };
  onChangeAddress = () => {
    //console.log("changing address");
  };
  ChooseAddress = index => {
    var address = this.state.addresses[index];
    this.setState({
      selectedAddress: address
    });
  };
  handleInputChange = deposit => {
    this.setState({
      deposit
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            if (this.props.NotinShoppingCart) {
              Navigation.push(this.props.componentId, {
                //Use your stack Id instead of this.pros.componentId
                component: {
                  name: "ChooseAddressPage",
                  passProps: {
                    addresses: this.state.addresses,
                    choose: this.ChooseAddress
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
            Navigation.push("ShoppingCart", {
              //Use your stack Id instead of this.pros.componentId
              component: {
                name: "ChooseAddressPage",
                passProps: {
                  addresses: this.state.addresses,
                  choose: this.ChooseAddress
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
        >
          <View style={styles.address}>
            <View style={styles.iconContainer}>
              <Image
                source={AddressIcon}
                style={{ height: 65, width: 65, marginBottom: 5 }}
              />
              <Text>选择地址</Text>
            </View>
            <View style={styles.addressSpec}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Text style={{ fontSize: 19, marginRight: 10 }}>
                  {this.state.selectedAddress.reveiptPerson}
                </Text>
                <Text>{this.state.selectedAddress.reveiptPhone}</Text>
              </View>
              <Text>{this.state.selectedAddress.detailAddress}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.commodityBar}>
            {this.props.data.good.map(com => {
              return (
                <View style={styles.commoContainer}>
                  <View>
                    <Text>
                      {com.name} * {com.quantity}
                    </Text>
                  </View>
                  <View>
                    <Text>&yen;{com.price * com.quantity}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={{ marginLeft: 20 }}>
            <Text>使用余额</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={this.handleInputChange}
              value={this.state.deposit}
              placeholder={"金额"}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.fullPrice}>
              <Text style={styles.fullPriceText}>
                &yen;{this.state.fullPrice}
              </Text>
              <Text>(不含运费)</Text>
            </View>
            <TouchableWithoutFeedback onPress={this.onConfirm}>
              <View style={styles.confirm}>
                <Text>确定</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

export default CreateOrder;
