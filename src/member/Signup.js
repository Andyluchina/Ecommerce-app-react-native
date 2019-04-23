//still looking for Chinese support
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView
} from "react-native";
import PhoneForm from "../components/PhoneForm";
import { Navigation } from "react-native-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    marginLeft: 30,
    marginRight: 30
  },
  signupText: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 110
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  phone: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  phoneinput: {
    height: 40,
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    textAlignVertical: "bottom",
    marginBottom: 10
  },
  label: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifiedPhone: false,
      title: "Next",
      username: "",
      password: ""
    };
  }

  onChangeUsername = username => {
    this.setState({ username });
  };

  onChangePassword = password => {
    this.setState({
      password
    });
  };

  //redirection is still to do.
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.signupText}>
            <Text style={styles.title}>注册</Text>
            <View>
              <Text>欢迎！已经有账户了？</Text>
            </View>
            <View>
              <Button
                title="登陆"
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: "Login"
                    }
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.phone}>
            <Text>用户名</Text>
          </View>
          <View style={styles.phoneinput}>
            <TextInput
              style={styles.phoneinput}
              placeholder="请输入用户名"
              value={this.state.username}
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
          <PhoneForm
            mode="signup"
            username={this.state.username}
            password={this.state.password}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Signup;
