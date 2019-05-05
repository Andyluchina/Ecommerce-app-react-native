import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { loading } from "../assets/images.json";
import Gestures from "react-native-easy-gestures";
import fkg from "../common/Util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  phone: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  input: {
    height: 50,
    width: "70%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    textAlignVertical: "bottom",
    marginBottom: 20,
    marginRight: 20
  },
  button: {
    width: "40%",
    height: 45
  },
  CodeInputContainer: {
    //  flex: 1,
    width: "95%",
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20
  },
  phoneinput: {
    height: 40,
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    textAlignVertical: "bottom",
    marginBottom: 10
  },
  ImageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: 30
  },
  buttonB: {
    width: "95%",
    marginTop: 20,
    alignSelf: "center"
  }
});

class RecoverPhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: false,
      verified: false,
      phone: "",
      backgroundImage: loading,
      cutoutImage: "data:image/jpg;base64,",
      topLeftY: 0,
      topLeftX: 0,
      serialNo: "",
      scalar: 0.65,
      dist: 0
    };
  }

  componentWillMount() {
    const scalar = (Dimensions.get("window").width - 60) / 340;
    this.setState({
      scalar
    });
    const succ = result => {
      console.log(result.body);
      const { backgroundImage, cutoutImage, serialNo, topLeftY } = result.body;
      this.setState({
        backgroundImage: "data:image/jpg;base64," + backgroundImage,
        cutoutImage: "data:image/jpg;base64," + cutoutImage,
        topLeftY: parseInt(topLeftY),
        serialNo
      });
    };

    const err = result => {
      alert(result);
    };

    fkg.asyncHttpGet("/sec/validation/image", succ, err);
  }

  verifyPhone = () => {
    //verify phone number
    const phone = this.state.phone;
    if (!isNaN(phone)) {
      //good
      if (phone.length === 11) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  onChangePhone = phone => {
    this.setState({
      phone
    });
  };

  sendVerify = () => {
    const number = Math.round(
      (this.state.topLeftX - this.state.dist) / this.state.scalar
    );
    const rnumber = number.toString();
    const param =
      "loginName=" +
      this.state.phone +
      "&serialNo=" +
      this.state.serialNo +
      "&topLeftX=" +
      rnumber;
    let that = this;
    console.log(param);
    function succ(result) {
      console.log(result.body);
      const code = result.code;
      if (!result.body) {
        that.setState({
          verifying: false,
          topLeftX: 0
        });
        //  alert("图片验证失败");
      }
      let message = result.message;
      if (code == fkg.CODE_COMM_0_SUCCESS) {
        //handler result here
        //  alert("重置密码成功");
      } else if (code == fkg.CODE_COMM_INPUT_ERROR) {
        //handler result here
        console.log(Object.keys(result.body).toString());
        console.log(Object.values(result.body).toString());
        let msgs = Object.values(result.body).toString();
        msgs = msgs.replace(new RegExp(",", "g"), "\n").split("\n");
        message = message + msgs;
      }
      alert(message);
    }

    function err(result) {
      alert("请求失败" + result);
    }

    fkg.asyncHttpPost(
      "/member/reset/password",
      param,
      succ,
      err,
      "application/x-www-form-urlencoded"
    );
  };

  onPressB = () => {
    if (!this.verifyPhone()) {
      alert("无效号码");
      return;
    }
    this.setState({
      verifying: true
    });
  };

  renderForm = () => {
    if (!this.state.verifying) {
      return (
        <View id="phoneForm" style={styles.inputContainer}>
          <View style={styles.phone}>
            <Text>手机号</Text>
          </View>
          <View style={styles.phoneinput}>
            <TextInput
              style={styles.phoneinput}
              placeholder="请输入手机号"
              value={this.state.phone}
              onChangeText={this.onChangePhone}
            />
          </View>
          <View style={styles.buttonB}>
            <Button title="找回密码" onPress={this.onPressB} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.ImageContainer}>
          <ImageBackground
            source={{
              uri: this.state.backgroundImage
            }}
            style={{
              flex: 1,
              width: 340 * this.state.scalar,
              height: 240 * this.state.scalar
            }}
          >
            <Gestures
              draggable={{
                y: false,
                x: true
              }}
              scalable={{
                min: 0.1,
                max: 7
              }}
              rotatable={false}
              onStart={(event, styles) => {
                this.setState({
                  dist: Math.floor(event.nativeEvent.pageX)
                });
              }}
              onChange={(event, styles) => {
                // console.log("Change")
                const current = Math.floor(event.nativeEvent.pageX);
                console.log(event.nativeEvent);
                this.setState({
                  topLeftX: current
                });

                console.log({
                  dist: this.state.dist,
                  topLeftX: this.state.topLeftX
                });
              }}
              onRelease={(event, styles) => {
                this.sendVerify();
              }}
            >
              <Image
                source={{
                  uri: this.state.cutoutImage
                }}
                style={{
                  width: 55 * this.state.scalar,
                  height: 55 * this.state.scalar,
                  marginTop: this.state.scalar * this.state.topLeftY
                }}
              />
            </Gestures>
          </ImageBackground>
        </View>
      );
    }
  };

  render() {
    return this.renderForm();
  }
}

export default RecoverPhoneForm;
