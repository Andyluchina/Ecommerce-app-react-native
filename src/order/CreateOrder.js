import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import AddressIcon from "../assets/addressIcon.jpg";
import fkg from "../common/Util";
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
    color: "#d35800"
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

  mockComm = [
    { name: "qwe", price: 12 },
    { name: "qwe", price: 12 },
    { name: "qwe", price: 12 },
    { name: "qwe", price: 12 },
    { name: "qwe", price: 12 }
  ];
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
    this.setState({ commodities: this.mockComm });
    memberId = await fkg.getAppItem("currUserId");
    console.log(memberId);
    console.log(this.props.data);
    const succ = result => {
      console.log(JSON.parse(result.body));
      this.setState({
        addresses: JSON.parse(result.body),
        selectedAddress: JSON.parse(result.body)[0]
      });
    };

    const err = result => {
      alert(result);
    };
    const param = JSON.stringify({ memberId });

    fkg.asyncHttpPost("/sys/receipt/address/member/search", param, succ, err);
  }
  //redirection is still to do.
  onConfirm = () => {
    console.log("confirmed");
  };
  onChangeAddress = () => {
    console.log("changing address");
  };

  handleInputChange = deposit => {
    this.setState({
      deposit
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.onChangeAddress}>
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
        </TouchableWithoutFeedback>
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
            <View style={styles.commoContainer}>
              <View>
                <Text>邮寄</Text>
              </View>
              <View>
                <Text>&yen;{this.state.postage}</Text>
              </View>
            </View>
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
