import { AsyncStorage } from "react-native";
const fkg = {};

const HQ_ID = 8;
fkg.HQ_ID = HQ_ID;

const G_MALL = 1;
fkg.G_MALL = G_MALL;

const R_MALL = 3;
fkg.R_MALL = R_MALL;

const B2B = 5;
fkg.B2B = B2B;

const B2C = 7;
fkg.B2C = B2C;

const TYPE_B2B_G = 1;
fkg.TYPE_B2B_G = TYPE_B2B_G;

const TYPE_B2B_R = 3;
fkg.TYPE_B2B_R = TYPE_B2B_R;

const TYPE_B2C_G = 5;
fkg.TYPE_B2C_G = TYPE_B2C_G;

const TYPE_B2C_R = 7;
fkg.TYPE_B2C_R = TYPE_B2C_R;

const PAGE_SIZE = 5;
fkg.PAGE_SIZE = PAGE_SIZE;

const CODE_COMM_0_SUCCESS = 0;
fkg.CODE_COMM_0_SUCCESS = CODE_COMM_0_SUCCESS;

const CODE_COMM_INPUT_ERROR = 70;
fkg.CODE_COMM_INPUT_ERROR = CODE_COMM_INPUT_ERROR;

const MODE_NEW = 1;
fkg.MODE_NEW = MODE_NEW;

const MODE_EDIT = 3;
fkg.MODE_EDIT = MODE_EDIT;

const MODE_VIEW = 5;
fkg.MODE_VIEW = MODE_VIEW;

const PIC_URL = "http://xhyhaiyan.oss-cn-beijing.aliyuncs.com/";
fkg.PIC_URL = PIC_URL;

const clientVersion = "1.0.0";
fkg.clientVersion = clientVersion;

const getUrl = uri => {
  //let websit = "http://106.14.1.151:8009";
  let websit = "http://www.fkg1588.com:8009";
  //let websit = "http://101.132.145.189:8013";
  //  websit = "https://www.fkg1588.com:8009";
  //  websit = "http://127.0.0.1:8009";
  //http://106.14.1.151:8009/commodity/b2b/global/commodity/load
  return websit + uri;
};
fkg.getUrl = getUrl;

const getDomElement = selector => {
  let element = document.querySelector(selector);
  return element;
};
fkg.getDomElement = getDomElement;

const getDomValue = selector => {
  let element = document.querySelector(selector);
  let tn = element.tagName.toLowerCase();
  if (tn == "input" && element.type == "file") return element.files[0];
  return element.value;
};
fkg.getDomValue = getDomValue;

const setDomValue = (selector, val) => {
  let element = document.querySelector(selector);
  let tn = element.tagName.toLowerCase();
  if (tn == "input" && element.type == "file") element.files[0] = val;
  else element.value = val;
};
fkg.setDomValue = setDomValue;

const setAppItem = async (key, value) => {
  //implement storage here
  let val, storedVal;
  switch (typeof value) {
    case "number":
      val = JSON.stringify(value);
      storedVal = JSON.stringify({
        type: "number",
        payload: val
      });
      break;
    case "object":
      val = JSON.stringify(value);
      storedVal = JSON.stringify({
        type: "object",
        payload: val
      });
      break;
    case "string":
      storedVal = JSON.stringify({
        type: "string",
        payload: value
      });
      break;
    default:
      break;
  }

  try {
    await AsyncStorage.setItem(key, storedVal);
    return true;
  } catch (error) {
    // Error saving data
    console.log(error);
    return false;
  }
};
fkg.setAppItem = setAppItem;

const getAppItem = async key => {
  let returnVal;
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const valObj = JSON.parse(value);
      switch (valObj.type) {
        case "number":
          returnVal = Number(valObj.payload);
          break;
        case "string":
          returnVal = valObj.payload;
          break;
        case "object":
          returnVal = JSON.parse(valObj.payload);
        default:
          break;
      }
      return returnVal;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
fkg.getAppItem = getAppItem;

const asyncHttpPost = (url, param, succ, err, contentType, token) => {
  if (!contentType) contentType = "application/json";

  let headers = {};
  headers["content-type"] = contentType;
  // headers["Accept"] = fkg.getAppItem("application/json");
  //
  if (token) {
    headers["token"] = token;
  }
  let params = {
    method: "post",
    credentials: "include", // include, same-origin, *omit
    mode: "cors", // no-cors, cors, *same-origin
    headers: headers,
    body: param
  };
  fetch(fkg.getUrl(url), params)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(succ)
    .catch(err);
};
fkg.asyncHttpPost = asyncHttpPost;

const asyncHttpGet = (url, succ, err, contentType) => {
  if (!contentType) contentType = "application/x-www-form-urlencoded";

  let params = {
    method: "get",
    credentials: "include", // include, same-origin, *omit
    mode: "cors", // no-cors, cors, *same-origin
    headers: {
      "content-type": contentType
    }
  };

  fetch(fkg.getUrl(url), params)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = response.json();
      return json;
    })
    .then(succ)
    .catch(err);
};
fkg.asyncHttpGet = asyncHttpGet;

const pushintoOss = (fileName, file, succ, err) => {
  let OSS = require("ali-oss");
  const client = new OSS({
    region: "oss-cn-beijing",
    bucket: "xhyhaiyan",
    accessKeyId: "LTAIfeJPa5mmsKhL",
    accessKeySecret: "Dfz3Tj7Tyuojl84vSBHX7E9eluivj5"
  });
  client
    .put(fileName, file)
    .then(function(result) {
      return result;
    })
    .then(succ)
    .catch(err);
};
fkg.pushintoOss = pushintoOss;

const genFileName = name => {
  return (
    name + "/" + new Date().getTime() + "_" + Math.round(Math.random() * 10000)
  );
};
fkg.genFileName = genFileName;

const COMMODITY_TYPE_B2B_G = 1;
fkg.COMMODITY_TYPE_B2B_G = COMMODITY_TYPE_B2B_G;

const COMMODITY_TYPE_B2B_R = 3;
fkg.COMMODITY_TYPE_B2B_R = COMMODITY_TYPE_B2B_R;

const COMMODITY_TYPE_B2C_G = 5;
fkg.COMMODITY_TYPE_B2C_G = COMMODITY_TYPE_B2C_G;

const COMMODITY_TYPE_B2C_R = 7;
fkg.COMMODITY_TYPE_B2C_R = COMMODITY_TYPE_B2C_R;

export default fkg;
