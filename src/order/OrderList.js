import React from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  DeviceEventEmitter,
  ScrollView
} from "react-native"

import util from "../common/Const"
import HTTP from "../common/HTTPmethod"
import fkg from "../common/Util"

export default class OrderList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          id: "323949779883130881",
          action: 0,
          status: 2,
          transactionId: null,
          version: 0,
          createBy: "1234567890",
          createTime: "2019-04-13T14:20:46.226+0000",
          remark: "string",
          updateBy: "1234567890",
          updateTime: "2019-04-13T14:20:46.226+0000",
          specId: "string",
          orderNo: "string",
          receiptAddressId: "string",
          totalAmount: 0,
          integralAmount: 10,
          depositAmount: 0,
          onlineAmount: 10,
          transportCompanyId: "string",
          transportNo: "string",
          freightAmount: 10,
          supplierAmount: 0,
          orgId: "0"
        }
      ]
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {
      let formData = {}
      if (!this.props.navigation.status === undefined)
        formData = {
          status: this.props.navigation.status,
          memberId: await fkg.getAppItem("currUserId")
        }

      let type = ""

      if (this.props.navigation.orderType === "B2B全国订单") {
        type = "b2b/global"
      } else if (this.props.navigation.orderType === "B2B地方订单") {
        type = "b2b/region"
      } else if (this.props.navigation.orderType === "B2C全国订单") {
        type = "b2c/global"
      } else if (this.props.navigation.orderType === "B2C地方订单") {
        type = "b2c/region"
      }

      let response = await HTTP._fetch(
        HTTP.POST({
          url: "/order/" + type + "/order/search",
          formData
        })
      )

      if (response.status === 200) {
        let responseJson = await response.json()

        this.setState({
          data: responseJson.body
        })
      } else util.toastLong("网络错误")
    } catch (error) {
      util.toastLong(error)
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          // this.props.onChooseCourse(id, courseName)
        }}
      >
        <View style={styles.contentBar}>
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate('OrderList')
            }}
          >
            <View style={styles.contentItem}>
              <Text style={styles.content}>{item.id}</Text>
              <Image
                style={styles.right}
                source={require("../assets/wd-icon-it.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.contentItem}>
              <Text style={styles.content}>创建时间</Text>
              <Text style={{fontSize: 15, color: "#453E3E"}}>
                {item.createTime}
              </Text>
            </View>
            {/*<Image style={styles.icon}*/}
            {/*source={{uri: item.img}}/>*/}
            {/*<View style={styles.infoView}>*/}
            {/*<Text allowFontScaling={false} style={styles.infoName}>{item.goodName}</Text>*/}

            {/*<View style={styles.infoTextView}>*/}
            {/*<Text allowFontScaling={false} style={{color: '#696969', textAlign: 'right'}}>{item.totalAmount}元</Text>*/}
            {/*</View>*/}
            {/*</View>*/}
          </View>
          <View style={[styles.row, {justifyContent: "flex-end"}]}>
            <Text
              allowFontScaling={false}
              style={[
                styles.infoName,
                {
                  textAlign: "right",
                  marginRight: 10
                }
              ]}
            >
              共{item.totalAmount}件商品
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <ScrollView
          style={{height: util.height, backgroundColor: util.backgroundColor}}
        >
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <View>{this.renderItem(item)}</View>}
            keyExtractor={(item, index) => index + ""}
          />
        </ScrollView>
      </View>
    )
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
  }
})
