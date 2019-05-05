import React from "react"
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native"
import util from "../common/Const"
import HTTP from "../common/HTTPmethod"
import fkg from "../common/Util"
import {Navigation} from "react-native-navigation"

export default class RegionSelectionLevelThree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      regions: [],
      currentSelections: ""
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 12,
            color: "#453E3E"
          }}
        >
          {this.state.currentSelections}
        </Text>
        {this.state.regions.map(item => (
          <View>
            <TouchableOpacity
              style={{backgroundColor: "#f8f8f8"}}
              onPress={() => {
                fkg.setAppItem("parentId", item.id)
                fkg.setAppItem("regionLevelThree", item.regionFullName)
                Navigation.push(this.props.componentId, {
                  component: {
                    name: "RegionSelectionLevelFour",
                    passProps: {
                      id: this.props.id,
                      isAdd: this.props.isAdd,
                      isMember: this.props.isMember,
                      fatherComponentId: this.props.fatherComponentId
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
                })
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 16,
                  marginBottom: 16,
                  marginLeft: 12
                }}
              >
                {item.regionFullName}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: "#eeeeee",
                borderBottomWidth: 1,
                width: util.width
              }}
            />
          </View>
        ))}
      </View>
    )
  }

  async getData() {
    try {
      this.setState({
        currentSelections:
        (await fkg.getAppItem("province")) +
        "/" +
        (await fkg.getAppItem("regionLevelOne")) +
        "/" +
        (await fkg.getAppItem("regionLevelTwo"))
      })
      let formData = {
        parentId: await fkg.getAppItem("parentId")
      }
      let response = await HTTP._fetch(
        HTTP.POST({url: "/sys/region/search", formData})
      )

      if (response.status === 200) {
        let responseJson = await response.json()

        this.setState({
          regions: responseJson.body
        })
      } else {
        util.toastLong("网络故障")
      }
    } catch (error) {
      util.toastLong(error)
    }
  }
}

const styles = StyleSheet.create({
  flex: {
    backgroundColor: "#ffffff",
    width: util.width,
    height: util.height
  },
  cardView: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    width: util.width,
    height: 280,
    // marginTop: 60,
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
