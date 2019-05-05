import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView
} from "react-native";
import fkg from "../common/Util";
import { Navigation } from "react-native-navigation";
import { goToMain } from "../common/startMainApp";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    marginLeft: 30,
    marginRight: 30
  },
  loginText: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 120,
    marginTop: 20,
    flex: 1
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  button: {
    width: "90%",
    alignSelf: "center"
  },
  label: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  phoneinput: {
    height: 40,
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    textAlignVertical: "bottom",
    marginBottom: 30
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20
  }
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChangeUsername = username => {
    this.setState({
      username
    });
  };

  onChangePassword = password => {
    this.setState({
      password
    });
  };

  onLogin = () => {
    const param =
      "loginName=" +
      this.state.username +
      "&" +
      "password=" +
      this.state.password +
      "&clientVersion=" +
      fkg.clientVersion;
    console.log(param);
    async function succ(result) {
      console.log(result);
      const code = result.code;
      if (code == fkg.CODE_COMM_0_SUCCESS) {
        //handler result here
        await fkg.setAppItem("currUserName", result.body.currUserName);
        await fkg.setAppItem("currUserId", result.body.currUserId);
        await fkg.setAppItem("currOrgName", result.body.currOrgName);
        await fkg.setAppItem("currOrgId", result.body.currOrgId);
        await fkg.setAppItem("currOrgType", result.body.currOrgType);
        await fkg.setAppItem("token", result.body.token);
        await fkg.setAppItem("authorities", result.body.authorities);
        // if (res === false) {
        //   alert("设备错误");
        //   return;
        // }
        //redirection and starting multitab app
        goToMain();
      } else {
        console.log(result);
        alert(result.message);
      }
    }

    function err(result) {
      console.log(result);
      alert("请求失败" + result);
    }

    fkg.asyncHttpPost(
      "/sec/login",
      param,
      succ,
      err,
      "application/x-www-form-urlencoded"
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.loginText}>
            <Text style={styles.title}>登陆</Text>
            <View>
              <Text>欢迎！还没有账户？</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 5 }}>
                <Button
                  title="注册"
                  onPress={() => {
                    Navigation.push(this.props.componentId, {
                      component: {
                        name: "Signup"
                      }
                    });
                  }}
                />
              </View>
              <Button
                title="找回密码"
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: "RecoverPassword"
                    }
                  });
                }}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text>用户名</Text>
            </View>
            <View style={styles.phoneinput}>
              <TextInput
                style={styles.phoneinput}
                placeholder="请输入用户名"
                value={this.state.useranme}
                onChangeText={this.onChangeUsername}
              />
            </View>
            <View style={styles.label}>
              <Text>密码</Text>
            </View>
            <View style={styles.phoneinput}>
              <TextInput
                style={styles.phoneinput}
                secureTextEntry={true}
                placeholder="请输入密码"
                value={this.state.password}
                onChangeText={this.onChangePassword}
              />
            </View>
          </View>

          <View style={styles.button}>
            <Button title="登陆" onPress={this.onLogin} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Login;
