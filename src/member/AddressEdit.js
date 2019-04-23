import React from "react"
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Image,
  DeviceEventEmitter
} from "react-native"
import util from "../common/Const"
import ConfirmButtom from "../components/confirmButton"
import fkg from "../common/Util"
import HTTP from "../common/HTTPmethod"
import {Navigation} from "react-native-navigation"

export default class AddressEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailAddress: "",
      reveiptPhone: "",
      reveiptPerson: "",
      remark: "",
      currentSelections: "",
      orgName: "",
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener("BackToAddressEdit", () => {
      // 接收到 update 页发送的通知，后进行的操作内容
      this.getData()
    })

    this.getData()
  }

  async getData() {
    if (!this.props.isAdd) {
      try {
        let formData = {id: this.props.id}
        let token = await fkg.getAppItem("currUserId")
        util.log(formData)

        let userType = "member"
        if (!this.props.isMember) userType = "organization"
        util.log(userType)

        let response = await HTTP._fetch(
          HTTP.GET({
            url:
            // "/sys/receipt/address/member/search",
            "/sys/receipt/address/" +
            userType +
            "/load",
            formData
          })
        )

        util.log(response)
        if (response.status === 200) {
          let responseJson = await response.json()
          util.log(responseJson.body.length)
          util.log(responseJson.body)

          if (responseJson.message === "操作成功") {
            fkg.setAppItem("regionId", responseJson.body.regionId)
            fkg.setAppItem("province", responseJson.body.region1Name)
            fkg.setAppItem("regionLevelOne", responseJson.body.region2Name)
            fkg.setAppItem("regionLevelTwo", responseJson.body.region3Name)
            fkg.setAppItem("regionLevelThree", responseJson.body.region4Name)
            fkg.setAppItem("regionLevelFour", responseJson.body.region5Name)
            this.setState({
              detailAddress: responseJson.body.detailAddress,
              reveiptPerson: responseJson.body.reveiptPerson,
              reveiptPhone: responseJson.body.reveiptPhone,
              remark: responseJson.body.remark,
              orgName: responseJson.body.orgName,
            })
          }
          else
            this.setState({
              data: []
            })
        } else {
          util.toastLong("网络故障")
        }
      } catch (error) {
        util.toastLong(error)
      }
    }

    if ((await fkg.getAppItem("regionId")) != null) {
      this.setState({
        currentSelections:
        (await fkg.getAppItem("province")) +
        "/" +
        (await fkg.getAppItem("regionLevelOne")) +
        "/" +
        (await fkg.getAppItem("regionLevelTwo")) +
        "/" +
        (await fkg.getAppItem("regionLevelThree")) +
        "/" +
        (await fkg.getAppItem("regionLevelFour"))
      })
    }
  }

  async confirm() {
    let formData = {}

    let userType = "member"
    if (this.props.isMember) {
      formData = {
        memberId: await fkg.getAppItem("currUserId"),
        regionId: await fkg.getAppItem("regionId"),
        remark: this.state.remark,
        reveiptPerson: this.state.reveiptPerson,
        reveiptPhone: this.state.reveiptPhone,
        detailAddress: this.state.detailAddress
      }
    } else {
      formData = {
        orgId: await fkg.getAppItem("currOrgId"),
        orgName: this.state.orgName,
        regionId: await fkg.getAppItem("regionId"),
        remark: this.state.remark,
        reveiptPerson: this.state.reveiptPerson,
        reveiptPhone: this.state.reveiptPhone,
        detailAddress: this.state.detailAddress
      }
      userType = "organization"
    }

    let type = "create"
    if (!this.props.isAdd) {
      type = "update"
    }

    try {
      let response = await HTTP._fetch(
        HTTP.POST({
          url:
          "/sys/receipt/address/" +
          userType +
          "/" +
          type,
          formData
        })
      )
      util.log(response)

      if (response.status === 200) {
        let responseJson = await response.json()
        if (responseJson.message === "操作成功")
          Navigation.pop(this.props.componentId)
        else util.toastLong(responseJson.message)
      } else {
        util.toastLong("网络故障")
      }
    } catch (error) {
      util.toastLong(error)
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.cardView}>
          {this.props.isMember
            ? []
            : [
              <View style={styles.viewBoxStyle}>
                <View style={styles.flexStyle}>
                  <Text style={styles.titles}>机构名</Text>
                </View>
                <TextInput
                  style={[styles.textInputStyle]}
                  placeholder="请输入机构名"
                  value={this.state.orgName}
                  onChangeText={text => {
                    this.setState({orgName: text})
                  }}
                />
              </View>,
              <View
                style={{
                  borderBottomColor: "#eeee",
                  borderBottomWidth: 1,
                  width: util.width
                }}
              />
            ]}

          <View style={styles.viewBoxStyle}>
            <View style={styles.flexStyle}>
              <Text style={styles.titles}>收货人姓名</Text>
            </View>
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="请输入收货人姓名"
              value={this.state.reveiptPerson}
              onChangeText={text => {
                this.setState({reveiptPerson: text})
              }}
            />
          </View>

          <View
            style={{
              borderBottomColor: "#eeee",
              borderBottomWidth: 1,
              width: util.width
            }}
          />

          <View style={styles.viewBoxStyle}>
            <View style={styles.flexStyle}>
              <Text style={styles.titles}>手机号码</Text>
            </View>
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="请输入手机号码"
              value={this.state.reveiptPhone}
              onChangeText={text => {
                this.setState({reveiptPhone: text})
              }}
            />
          </View>

          <View
            style={{
              borderBottomColor: "#eeeeee",
              borderBottomWidth: 1,
              width: util.width
            }}
          />

          <View style={styles.viewBoxStyle}>
            <View style={styles.flexStyle}>
              <Text style={styles.titles}>备注</Text>
            </View>
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="请输入备注"
              value={this.state.remark}
              onChangeText={text => {
                this.setState({remark: text})
              }}
            />
          </View>

          <View
            style={{
              borderBottomColor: "#eeeeee",
              borderBottomWidth: 1,
              width: util.width,
              // marginBottom: 30,
            }}
          />

          <TouchableOpacity
            style={styles.viewBoxStyle}
            onPress={() => {
              // fkg.setAppItem("parentId", 8)
              util.log("jjjjjjjj")
              Navigation.push(this.props.componentId, {
                component: {
                  name: "RegionSelection",
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
              })
            }}
          >
            <View style={styles.flexStyle}>
              <Text style={styles.titles}>地址选择</Text>
            </View>
            <TextInput
              style={[styles.textInputStyle, {textAlign: "right"}]}
              placeholder=">"
              value={this.state.currentSelections}
              onFocus={() => {
                util.log("jjjjjjjj")
                Navigation.push(this.props.componentId, {
                  component: {
                    name: "RegionSelection",
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
                })
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              borderBottomColor: "#eeeeee",
              borderBottomWidth: 1,
              width: util.width
            }}/>

          <View style={[styles.viewBoxStyle, {marginBottom: 10}]}>
            <View style={styles.flexStyle}>
              <Text style={[styles.titles]}>详细地址</Text>
            </View>
            <TextInput
              style={[styles.textInputStyle]}
              value={this.state.detailAddress}
              onChangeText={text => {
                this.setState({detailAddress: text})
              }}
            />
          </View>

          <ConfirmButtom
            onPress={() => {
              this.confirm()
            }}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flex: {
    backgroundColor: "#f8f8f8",
    width: util.width,
    height: util.height
  },
  cardView: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    width: util.width,
    // height: 280,
    // marginTop: 60,
    paddingBottom: 50,
    marginBottom: 50,
    borderRadius: 5
  },

  flexStyle: {
    height: 70,
    width: util.width / 4,
    backgroundColor: "#fff"
  },
  flexStyle2: {
    height: 70,
    width: (util.width / 4) * 3,
    backgroundColor: "#fff"
  },
  viewBoxStyle: {
    height: 70,
    width: util.width,
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#f8f8f8",
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1
  },

  titles: {
    fontSize: 14,
    marginTop: 28,
    textAlign: "left",
    marginLeft: 15,
    backgroundColor: "#fff"
  },
  content: {
    alignSelf: "flex-end",
    marginRight: 20
  },

  textInputStyle: {
    width: util.width * 0.75,
    height: 70,
    padding: 0, //去掉Android默认的padding
    paddingRight: 30,
    backgroundColor: "white",
    textAlign: "right"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 20
  },
  btnContainer: {
    width: util.width,
    borderTopWidth: 1,
    borderTopColor: "#777",
    alignItems: "center"
  },
  hidemodalTxt: {
    marginTop: 10
  }
})
