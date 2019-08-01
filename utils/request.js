const app = getApp()
// import qs from '../utils/qs.js';
const qs = require('./qs.js');
/**
 * GET
 * 参数 - URL上
 * 返回 - String
 */
let get = (url, params) => {
  let data = qs.stringify(params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.pageInfo.interfaceUrl}${url}?${data}`,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function (res) {
        if (res.data.code === 1 && res.statusCode === 400) {
          resolve(res.data);
          return
        }
        failure(res);
        reject(res)
      },
      fail: function (err) {
        // 接口调用失败的回调函数
        if (res.data.code === 1 && res.statusCode === 400) {
          resolve(res.data);
          return
        }
        
        // 接口调用失败的回调函数
        failure(res);
        reject(err)
      },
      complete: function (res) {
        //console.log(url+res);
      }
    })
  })
}

/**
 * POST
 * 参数 - URL上
 * 返回 - String
 */
let post = (url, params) => {
  params = qs.stringify(params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.pageInfo.interfaceUrl+url,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: params,
      success: function (res) {
        if (res.data.code === 1 && res.statusCode===400){
          resolve(res.data);
          return
        }
        failure(res);
        reject(res)
      },
      fail: function (err) {
        failure(res)
        reject(err)
      },
      complete: function (res) {
        // 接口调用结束的回调函数（调用成功、失败都会执行）
      }
    })
  })
}

function failure(res){
  if (res.statusCode === 400) {
    wx.showToast({
      icon: 'none',
      title: res.data.message,
    })
    return
  }

  wx.showToast({
    icon: 'none',
    title: "网络出现故障，请稍后再试~",
  })

}

module.exports = {
  get,
  post
}