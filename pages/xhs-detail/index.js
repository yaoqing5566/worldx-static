//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        files: ['https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'],
        images: {},

    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..' + url
        })
    },
    copyText: function (e) {
        console.log(e)
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '复制成功'
                        })
                    }
                })
            }
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    saveImage: function (e) {
        wx.downloadFile({
            url:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
            success:function(res){
                console.log(res)
                let path = res.tempFilePath
                wx.saveImageToPhotosAlbum({
                    filePath:path,
                    success: function (data) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (err) {
                        console.log(err);

                        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            console.log("当初用户拒绝，再次发起授权")
                            wx.openSetting({
                                success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    }
                })
            },fail:function(res){
                console.log(res)
            }
        })

    },
})
