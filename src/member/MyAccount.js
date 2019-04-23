import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import Avatar from "react-native-badge-avatar";
import { getAuth } from "../common/getAuth";
import { Navigation } from "react-native-navigation";

import util from "../common/Const";

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "未登录",
      imageUrl: "https://image-s1.oss-cn-shanghai.aliyuncs.com/yiqu/yonghu.png",

      orderType: ["B2B全国订单", "B2B地方订单", "B2C全国订单", "B2C地方订单"]
    };
  }

  componentDidMount() {
    this.getData();

    DeviceEventEmitter.addListener("refresh", () => {
      //这里面是要调用的方法，比如：刷新
      //value:是下面页面在 通知 时 ，所传递过来的参数
      this.getData();
    });
  }

  componentWillUnmount() {}

  async getData() {}

  renderOrder = () => {};
  navigateToOrder = (orderType, selectedItem, status) => {
    Navigation.push("MyAccount", {
      //Use your stack Id instead of this.pros.componentId
      component: {
        name: "Order",
        passProps: {
          data: {
            orderType,
            selectedItem,
            status
          }
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

  navigateToAddress = isMember => {
    Navigation.push("MyAccount", {
      //Use your stack Id instead of this.pros.componentId
      component: {
        name: "AddressList",
        passProps: {
          params: {
            isMember
          }
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
  render() {
    return (
      <ScrollView style={styles.box}>
        <View style={styles.bgImage}>
          <Image
            style={styles.portrait}
            source={{ uri: this.state.imageUrl }}
          />
          <Text style={styles.netName}>{this.state.name}</Text>
        </View>
        {this.state.orderType.map(item => (
          <View style={styles.contentBar}>
            <TouchableOpacity
              onPress={() => {
                this.navigateToOrder(item, 0, null);
              }}
            >
              <View style={styles.contentItem}>
                <Text style={styles.content}>{item}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconBar}>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToOrder(item, 1, 0);
                }}
              >
                <View style={styles.iconItem}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/daifukuan.png")}
                  />
                  <Text style={styles.icontext}>待付款</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToOrder(item, 2, 1);
                }}
              >
                <View style={styles.iconItem}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/yifahuo.png")}
                  />
                  <Text style={styles.icontext}>待发货</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToOrder(item, 3, 2);
                }}
              >
                <View style={styles.iconItem}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/ziyuan.png")}
                  />
                  <Text style={styles.icontext}>待收货</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToOrder(item, 4, 3);
                }}
              >
                <View style={styles.iconItem}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/yiwancheng.png")}
                  />
                  <Text style={styles.icontext}>已收货</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToOrder(item, 5, 4);
                }}
              >
                <View style={styles.iconItem}>
                  <Image
                    style={styles.icons}
                    source={require("../assets/tuikuan.png")}
                  />
                  <Text style={styles.icontext}>退货</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.contentBar}>
          <View style={styles.course}>
            <TouchableOpacity
              style={styles.case}
              onPress={() => {
                // this.props.navigation.navigate("MemberAddressList", {
                //   isMember: true
                // });
                this.navigateToAddress(true);
              }}
            >
              <Image
                style={styles.addressIcon}
                source={require("../assets/address.png")}
              />
              <Text style={styles.children}> 会员收货地址 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.case}
              onPress={() => {
                this.navigateToAddress(false);
              }}
            >
              <Image
                style={styles.addressIcon}
                source={require("../assets/address.png")}
              />
              <Text style={styles.children}> 机构收货地址 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight
          style={styles.logout}
          underlayColor="#af4184"
          onPress={async () => {
            // 清空登陆缓存
            // storage.save({
            //   key: 'token',
            //   id: '1',
            //   data: "",
            // })
            await AsyncStorage.removeItem("currUserId");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("currOrgId");
            await AsyncStorage.removeItem("currOrgType");
            // 跳转到登陆界面
            getAuth();
          }}
        >
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: util.backgroundColor,
    flexDirection: "column"
  },

  portrait: {
    width: util.width / 4,
    height: util.width / 4,
    borderRadius: util.width / 8,
    marginRight: 15,
    marginLeft: (util.width / 8) * 3,
    marginTop: 30,
    marginBottom: 10
  },

  netName: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 20
  },
  secondLineText: {
    fontSize: 15,
    marginRight: 10
  },
  signature: {
    fontSize: 15,
    marginTop: 10
  },
  rowButtonsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    padding: 15
  },
  rowButtonsTouchable: {
    width: (util.width - 45) / 2
  },
  rowButtons: {
    width: (util.width - 45) / 2,
    color: "#ffffff",
    backgroundColor: "#00a0e9",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center"
  },
  colButtonsView: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: util.width - 60,
    marginLeft: 30,
    backgroundColor: "#fff",
    padding: 15,
    paddingTop: 10,
    borderRadius: 10
  },
  colButtonsUnderline: {
    width: util.width - 70,
    marginLeft: 5,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1
  },
  colButtons: {
    width: util.width - 70,
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    // paddingLeft: 30,
    color: "#717171"
  },
  signOutButton: {
    marginLeft: 35,
    width: util.width - 60,
    color: "#ffffff",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 10
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
  iconBar: {
    width: (util.width * 11) / 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginLeft: 17,
    marginRight: 17,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  contentItem: {
    width: (util.width * 7) / 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#C9C0C2",
    borderBottomWidth: 0.2,
    paddingTop: 20,
    paddingBottom: 15
  },
  lastContentItem: {
    width: (util.width * 7) / 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  bgImage: {
    width: util.width,
    height: 200,
    backgroundColor: util.headerColor
  },
  logout: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: util.headerColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff"
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  iconItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  icontext: {
    marginTop: 20,
    fontSize: 15,
    color: "#453E3E"
  },
  icons: {
    height: 25,
    width: 25,
    borderRadius: 5
    // marginLeft: 5,
  },
  content: {
    color: "#453E3E",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -10
  },
  noMessageText: {
    textAlign: "center",
    color: "#ff6347",
    marginTop: 10
  },

  // 收货地址
  course: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  case: {
    fontSize: 20,
    height: 100,
    width: (util.width - 80) / 2,
    margin: 10,
    justifyContent: "center"
  },
  children: {
    marginTop: 5,
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center"
  },
  addressIcon: {
    height: 50,
    width: 50,
    alignItems: "center",
    marginLeft: (util.width - 180) / 4
  }
});
