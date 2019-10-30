//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        dataArrs: [1,2,3,4,5],

    },
    bindNext: function (event) {
        var target = event.currentTarget;
        wx.navigateTo({
            url: '../my-task/index'
        })
    },
})
