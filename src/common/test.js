// register = () => event => {
//   var param = {
//     loginName: loginName,
//     password: password,
//     pid: pid,
//     userName: userName,
//     age: age,
//     isMale: isMale,
//     nickName: nickName,
//     mobile: mobile,
//     email: email
//   };
//
//   function succ(result) {
//     var code = result.code;
//     // alert( 'succ2 ' + result.code );
//     var msg = result.message + "\n";
//     if (code != 0 && result.body) {
//       var msgs = Object.values(result.body).toString();
//       msgs = msgs.replace(new RegExp(",", "g"), "\n");
//       msg = msg + msgs;
//     }
//     alert(msg);
//     if (code == 0) that.setState({ path: "/login" });
//   }
//
//   function err(result) {
//     alert(that.labelMap["common_oper_network_exception"]);
//   }
//
//   //alert(validator.isEmail(email));
//   pcng.asyncHttpPost(
//     "/mbr/user_save",
//     param,
//     succ,
//     err,
//     "application/x-www-form-urlencoded"
//   );
// };
//
// // const B2BorB2C = await fkg.getAppItem("currType");
// // const GorR = await fkg.getAppItem("currMall");
// // let uri;
// // if (B2BorB2C === fkg.B2B) {
// //   if (GorR === fkg.G_MALL) {
// //     uri = "/commodity/b2b/global/commodity/load?id=";
// //   } else {
// //     uri = "/commodity/b2b/region/commodity/load?id=";
// //   }
// // } else {
// //   if (GorR === fkg.G_MALL) {
// //     uri = "/commodity/b2c/global/commodity/load?id=";
// //   } else {
// //     uri = "/commodity/b2c/region/commodity/load?id=";
// //   }
// // }
//
// // import React, { Component } from "react";
//
//
// const { commoditySpecs, bigImageUri, attributes } = commodityRes.body;
// const specMap = new Map();
// const specSelected = new Map();
// for (const spec of commoditySpecs) {
//   const specValues = JSON.parse(spec.specValues);
//   for (const value of specValues) {
//     if (specMap.has(value.ni)) {
//       const mapList = specMap.get(value.ni);
//       if (!mapList.find(e => e.vi === value.vi)) {
//         specMap.get(value.ni).push(value);
//       }
//     } else {
//       specSelected.set(value.ni, value.vi);
//       specMap.set(value.ni, [value]);
//     }
//   }
// }
