import util from "./Const"
import fkg from "./Util"

const address = 'http://www.fkg1588.com:8009'
// const address = 'http://127.0.0.1:8080'

// const address = 'http://192.168.23.106:8080'

/**
 * GET请求
 * @typedef {}
 * @type {object}
 * @property {string} [url] - 接口名（API）
 * @property {object} [formData] - 请求接口时的参数
 */
function GET({url, formData} = {}) {
  if (fkg.getAppItem('token') === undefined)
    fkg.setAppItem('token', '')

  let token = fkg.getAppItem('token')

  let options
  if (url === '/login')
    options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      }
    }
  else
    options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        authorization: "Bearer " + token
      }
    }

  let promise = new Promise(function (resolve, reject) {
    fetch(address + url + strJoinAsParams(formData), options).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

/**
 * upload
 * @typedef {}
 * @type {object}
 * @property {object} [formData] - 请求接口时的参数
 */
async function upload(file) {
  let formData = new FormData()//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
  formData.append("file", file)
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    },
    body: formData,
  }

  let promise = new Promise(function (resolve, reject) {
    fetch(address + '/upload', options).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
      util.toastLong(error)
    })
  })

  return promise
}


/**
 * POST请求
 * @typedef {}
 * @type {object}
 * @property {string} [url] - 接口名（API）
 * @property {object} [formData] - 请求接口时的参数
 */
function POST({url, formData} = {}) {
  util.log(token)
  if (fkg.getAppItem('token') === undefined)
    fkg.setAppItem('token', '')

  let token = fkg.getAppItem('token')

  let options
  if (url === '/send')
    options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
        authorization: "Bearer " + token
      },
      body: JSON.stringify(formData)
    }
  else
    options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
        authorization: "Bearer " + token
      },
      body: JSON.stringify(formData)
    }

  let promise = new Promise(function (resolve, reject) {
    fetch(address + url, options).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })

  return promise
}

/**
 * PUT请求
 * @typedef {}
 * @type {object}
 * @property {string} [url] - 接口名（API）
 * @property {object} [formData] - 请求接口时的参数
 */
function PUT({url, formData} = {}) {
  if (token === undefined)
    global.token = ''

  let options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
      authorization: "Bearer " + token
    },
    body: JSON.stringify(formData)
  }

  let promise = new Promise(function (resolve, reject) {
    fetch(address + url, options).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

/**
 * DELETE请求
 * @typedef {}
 * @type {object}
 * @property {string} [url] - 接口名（API）
 * @property {object} [formData] - 请求接口时的参数
 */
function DELETE({url, formData} = {}) {
  if (token === undefined)
    global.token = ''

  let options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
      authorization: "Bearer " + token
    },
    body: JSON.stringify(formData)
  }
  let promise = new Promise(function (resolve, reject) {
    fetch(address + url, options).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

function strJoinAsParams(data) {
  let result = "?"
  for (let key in data) {
    let tuple = key + "=" + data[key]
    result += tuple
    result += "&"
  }
  result = result.substring(0, result.length - 1)
  return result
}

/**
 * 设置异步超时返回
 * @param {function} fetch_promise - 异步函数
 * @param {int} timeout - 超时时间
 */
function _fetch(fetch_promise, timeout = 15000) {
  let abort_fn = null
  setTimeout(function () {
    abort_fn()
  }, timeout)
  let abort_promise = new Promise(function (resolve, reject) {
    abort_fn = function () {
      reject("timeout")
    }
  })
  let abortable_promise = Promise.race([fetch_promise, abort_promise])

  return abortable_promise
}

export default {
  POST, GET, PUT, DELETE, strJoinAsParams, _fetch, upload
}
