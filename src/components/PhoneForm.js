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
    backgroundColor: "#F5FCFF"
  },
  phone: {
    alignSelf: "flex-start"
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 40
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
    marginTop: 20
  }
});

class PhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: false,
      verified: false,
      username: "",
      phone: "",
      verificationCode: "",
      backgroundImage: loading,
      cutoutImage: "data:image/jpg;base64,",
      topLeftY: 0,
      topLeftX: 0,
      serialNo: "",
      scalar: 0.65,
      dist: 0,
      value: 0.2,
      timeLeft: 0,
      buttonText: "获取验证码",
      buttonDisabled: false
    };
  }

  registerInfo = {};
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

  onChangeVerificationCode = verificationCode => {
    this.setState({
      verificationCode
    });
  };

  onPress = () => {
    const res = this.verifyPhone();
    if (res) {
      //getting the image thing up
      if (!this.state.verified) {
        console.log("I am here");
        this.setState({
          verifying: true
        });
        console.log(this.state.verifying);
      }
    } else {
      //displaying message about wrong phone number
      alert("无效号码");
    }
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
          verified: false,
          topLeftX: 0
        });
      }
      let message = result.message;
      if (code == fkg.CODE_COMM_0_SUCCESS) {
        //handler result here
        that.setState({
          verifying: false,
          verified: true,
          timeLeft: 120,
          buttonDisabled: true
        });
        var downloadTimer = setInterval(function() {
          const text = "还剩下" + "(" + that.state.timeLeft + "s)";
          const nextTimeleft = that.state.timeLeft - 1;
          that.setState({
            buttonText: text,
            timeLeft: nextTimeleft
          });
          if (that.state.timeLeft < 0) {
            clearInterval(downloadTimer);
            that.setState({
              timeLeft: 0,
              buttonDisabled: false,
              buttonText: "获取验证码"
            });
          }
        }, 1000);
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
      "/sec/validation/sms",
      param,
      succ,
      err,
      "application/x-www-form-urlencoded"
    );
  };

  verifySignup = () => {
    if (this.props.username === "") {
      alert("请填写用户名");
      return false;
    }
    if (this.props.password.length <= 6) {
      alert("密码必须6位或者六位以上");
      return false;
    }
    if (!this.verifyPhone()) {
      alert("请正确填写手机号码");
      return false;
    }
    if (this.state.verificationCode === "") {
      alert("请填写验证码");
      return false;
    }
    if (!this.state.verified) {
      alert("你没有通过验证");
      return false;
    }
    return true;
  };

  onPressB = () => {
    if (!this.verifySignup()) {
      return;
    }
    const param = {
      //set parameter here
      smsCode: this.state.verificationCode,
      phone: this.state.phone,
      nickName: this.props.username,
      loginName: this.state.phone,
      password: this.props.password,
      regionId: "0"
    };

    function succ(result) {
      console.log(result);
      const code = result.code;
      if (code == fkg.CODE_COMM_0_SUCCESS) {
        //handler result here
        //not sure if it should be in effect
        // alert(result.message);
        // Navigation.push("Signup", {
        //   component: {
        //     name: "Login"
        //   }
        // });
      } else {
      }
      alert(result.message);
    }

    function err(result) {
      alert("请求失败" + result);
    }

    fkg.asyncHttpPost("/member/create", JSON.stringify(param), succ, err);
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
          <View style={styles.CodeInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="请输入验证码"
              value={this.state.verificationCode}
              onChangeText={this.onChangeVerificationCode}
            />
            <Button
              title={this.state.buttonText}
              style={styles.button}
              onPress={this.onPress}
              disabled={this.state.buttonDisabled}
            />
          </View>
          <View style={styles.buttonB}>
            <Button title="注册" onPress={this.onPressB} />
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

export default PhoneForm;
