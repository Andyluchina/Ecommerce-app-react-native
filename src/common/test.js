register = () => event => {
  var param = {
    loginName: loginName,
    password: password,
    pid: pid,
    userName: userName,
    age: age,
    isMale: isMale,
    nickName: nickName,
    mobile: mobile,
    email: email
  };

  function succ(result) {
    var code = result.code;
    // alert( 'succ2 ' + result.code );
    var msg = result.message + "\n";
    if (code != 0 && result.body) {
      var msgs = Object.values(result.body).toString();
      msgs = msgs.replace(new RegExp(",", "g"), "\n");
      msg = msg + msgs;
    }
    alert(msg);
    if (code == 0) that.setState({ path: "/login" });
  }

  function err(result) {
    alert(that.labelMap["common_oper_network_exception"]);
  }

  //alert(validator.isEmail(email));
  pcng.asyncHttpPost(
    "/mbr/user_save",
    param,
    succ,
    err,
    "application/x-www-form-urlencoded"
  );
};

// const B2BorB2C = await fkg.getAppItem("currType");
// const GorR = await fkg.getAppItem("currMall");
// let uri;
// if (B2BorB2C === fkg.B2B) {
//   if (GorR === fkg.G_MALL) {
//     uri = "/commodity/b2b/global/commodity/load?id=";
//   } else {
//     uri = "/commodity/b2b/region/commodity/load?id=";
//   }
// } else {
//   if (GorR === fkg.G_MALL) {
//     uri = "/commodity/b2c/global/commodity/load?id=";
//   } else {
//     uri = "/commodity/b2c/region/commodity/load?id=";
//   }
// }

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Image,
//   Dimensions,
//   TouchableOpacity
// } from "react-native";
// import { WebView } from "react-native-webview";
// class WebViewCommo extends Component {
//   constructor(props) {
//     super(props);
//   }
//   //redirection is still to do.
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           marginRight: 1,
//           marginLeft: 1
//         }}
//       >
//         <TouchableOpacity onPress={this.props.onChangeDisplay}>
//           <View
//             style={{
//               height: 30,
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <Text style={{ fontSize: 20 }}>点击回到主页</Text>
//           </View>
//         </TouchableOpacity>
//         <WebView
//           source={{
//             html: "<html><body>" + this.props.data + "</body></html>"
//           }}
//           style={{
//             width: Dimensions.get("window").width
//           }}
//           automaticallyAdjustContentInsets={true}
//           javaScriptEnabled={false}
//           scrollEnabled={false}
//           scalesPageToFit={true}
//         />
//       </View>
//     );
//   }
// }
//
// export default WebViewCommo;

const { commoditySpecs, bigImageUri, attributes } = commodityRes.body;
const specMap = new Map();
const specSelected = new Map();
for (const spec of commoditySpecs) {
  const specValues = JSON.parse(spec.specValues);
  for (const value of specValues) {
    if (specMap.has(value.ni)) {
      const mapList = specMap.get(value.ni);
      if (!mapList.find(e => e.vi === value.vi)) {
        specMap.get(value.ni).push(value);
      }
    } else {
      specSelected.set(value.ni, value.vi);
      specMap.set(value.ni, [value]);
    }
  }
}
