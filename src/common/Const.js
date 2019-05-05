import {Dimensions, Alert} from 'react-native'
import Toast from 'react-native-root-toast';

let {width, height, scale} = Dimensions.get('window');

let backgroundColor = '#f0f0f0';
let headerColor = '#7ab77d'

let dataArr = [];
let data = new Date();
let year = data.getFullYear();
data.setMonth(data.getMonth(), 1)//获取到当前月份,设置月份
for (let i = 0; i < 12; i++) {
  data.setMonth(data.getMonth() + 1);//每次循环一次 月份值减1
  let m = data.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  dataArr.push((m) + '月')
}

/**
 * 提示弹窗
 * @typedef {}
 * @type {object}
 * @property {string} [title] - 弹窗标题
 * @property {string} [content] - 弹窗内容
 * @property {string} [confirmtext] - 弹窗确定键文字
 * @property {function} [confirmFunction] - 确定键触发的函数
 */
function modalAlert({
                      title = "提示",
                      content,
                      confirmtext = "确定",
                      confirmFunction = () => {
                      }
                    } = {}) {
  Alert.alert(title, content, [
    {
      text: confirmtext,
      onPress: confirmFunction
    }
  ]);
}

/**
 * 确认框弹窗
 * @typedef {}
 * @type {object}
 * @property {string} [title] - 弹窗标题
 * @property {string} [content] - 弹窗内容
 * @property {string} [confirmtext] - 弹窗确定键文字
 * @property {string} [canceltext] - 弹窗取消键文字
 * @property {function} [confirmFunction] - 确定键触发的函数
 * @property {function} [cancelFunction] - 取消键触发的函数
 */
function confirmAlert({
                        title = "提示",
                        content,
                        confirmtext = "确定",
                        canceltext = "取消",
                        confirmFunction = () => {
                        },
                        cancelFunction = () => {
                        }
                      } = {}) {
  Alert.alert(title, content, [
    {
      text: confirmtext,
      onPress: confirmFunction
    }, {
      text: canceltext,
      onPress: cancelFunction
    }
  ], {cancelable: false});
}

let toast;

/**
 * 冒一个时间比较短的Toast
 * @param content
 */
function toastShort(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}

/**
 * 冒一个时间比较长的Toast
 * @param content
 */
function toastLong(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    backgroundColor: 'rgba(152,66,250,.8)',
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}

function log(text) {
  console.log("*********************")
  console.log("*********************")
  console.log(text)
  console.log("*********************")
  console.log("*********************")
}

export default {
  width,
  height,
  scale,
  backgroundColor,
  headerColor,

  dataArr,


  modalAlert,
  confirmAlert,
  toastShort,
  toastLong,

  log
}
