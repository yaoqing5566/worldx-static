//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log("res.code == " + JSON.stringify(res))
        var code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          data: {
            "withCredentials": true
          },
          success: res => {
            // app.globalData.userInfo = res.userInfo
            // console.log("res == " + JSON.stringify(res))
            wx.request({
              url: 'https://app.ppbuyer.cn/v3.1/api/wxMicroLogin',
              data: {
                'code': code,
                'iv': res.iv,
                'encryptedData': res.encryptedData
              },
              success: function (res) {
                // console.log("wxMicroLogin == "+JSON.stringify(res.data));
                wx.setStorageSync('userId', res.data.userId)
                wx.setStorageSync('openId', res.data.microOpenId)
              }
            });
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },

  globalData: {
    userInfo: null
  }
})