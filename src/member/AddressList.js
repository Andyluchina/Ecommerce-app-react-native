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
import {Navigation} from "react-native-navigation"
import util from "../common/Const"
import fkg from "../common/Util"
import HTTP from "../common/HTTPmethod"

export default class AddressList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {
      let memberId = await fkg.getAppItem("currUserId")
      let formData = {memberId: memberId}

      let userType = "member"
      if (!this.props.params.isMember) userType = "organization"

      let response = await HTTP._fetch(
        HTTP.POST({
          url:
          // "/sys/receipt/address/member/search",
          "/sys/receipt/address/" +
          userType +
          "/search",
          formData
        })
      )

      if (response.status === 200) {
        let responseJson = await response.json()
        util.log(responseJson.body.length)
        util.log(responseJson.body)

        if (responseJson.message === "操作成功")
          this.setState({
            data: responseJson.body
          })
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

  async delete(id) {
    try {
      let ids = [id]
      let formData = [id]

      let userType = "member"
      if (!this.props.params.isMember) userType = "organization"

      let response = await HTTP._fetch(
        HTTP.POST({
          url:
          "/sys/receipt/address/" +
          userType +
          "/delete",
          formData
        })
      )

      if (response.status === 200) {
        let responseJson = await response.json()
        if (responseJson.message === "操作成功") {
          this.getData()
        } else {
        }
      } else {
        util.toastLong("网络故障")
      }
    } catch (error) {
      util.toastLong(error)
    }
  }

  renderItem(item) {
    return (
      <View>
        <View style={styles.contentBar}>
          <View>
            <View style={styles.contentItem}>
              <Text style={styles.content}>{item.reveiptPerson}</Text>
              <Text style={styles.content}>{item.reveiptPhone}</Text>
            </View>
            <View
              style={[
                styles.contentItem,
                {borderBottomColor: "#d7d7d7", borderBottomWidth: 1}
              ]}
            >
              <Text style={{color: "#a5a5a5"}}>
                {item.detailAddress}
              </Text>
            </View>
            <View style={[styles.contentItem, {justifyContent: "center"}]}>
              <TouchableOpacity
                style={{width: util.width / 2}}
                onPress={() => {
                  util.log(item)

                  Navigation.push(this.props.componentId, {
                    //Use your stack Id instead of this.pros.componentId
                    component: {
                      name: "AddressEdit",
                      passProps: {
                        id: item.id,
                        isAdd: false,
                        isMember: this.props.params.isMember
                      },
                      options: {
                        topBar: {
                          visible: true,
                          drawBehind: false,
                          animate: false,
                          text: "编辑地址"
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
                <Text style={{color: "#a5a5a5", textAlign: "center"}}>
                  编辑
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: util.width / 2}}
                onPress={() => {
                  this.delete(item.id)
                }}
              >
                <Text style={{color: "#a5a5a5", textAlign: "center"}}>
                  删除
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <ScrollView
          style={{height: util.height, backgroundColor: util.backgroundColor}}
        >
          <TouchableOpacity
            style={{
              height: 50,
              width: util.width - 30,
              marginLeft: 15,
              marginTop: 10,
              backgroundColor: '#ff2e34',
              borderRadius: 5
            }}
            onPress={() => {
              Navigation.push(this.props.componentId, {
                //Use your stack Id instead of this.pros.componentId
                component: {
                  name: "AddressEdit",
                  passProps: {
                    isAdd: true,
                    isMember: this.props.params.isMember
                  },
                  options: {
                    topBar: {
                      visible: true,
                      drawBehind: false,
                      animate: false,
                      text: "编辑地址"
                    },
                    bottomTabs: {
                      visible: false,
                      drawBehind: true,
                      animate: true
                    }
                  }
                }
              })
            }}>
            <Text style={{
              width: util.width - 30,
              marginTop: 16,
              textAlign: 'center',
              fontSize: 18,
              color: 'white',
              fontWeight: 'bold'
            }}>新增</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <View>{this.renderItem(item)}</View>}
            keyExtractor={(item, index) => index + ""}
            onEndReached={() => {
            }}
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -10
  }
})
