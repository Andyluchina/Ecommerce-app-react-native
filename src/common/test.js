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
