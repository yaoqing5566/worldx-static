//index.js
//获取应用实例
const app = getApp()
var drawQrcode= require('../../utils/weapp.qrcode.min.js')
Page({
  data: {
    dataNewActivity: [],
    dataOldActivity: [],
    page: 1,
    pageCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: 'https://github.com/yingye'
    })
  },

})
