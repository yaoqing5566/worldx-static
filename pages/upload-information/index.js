//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        imgs:{
            img1:'',
            img2:''
        },
        id:'idid'
    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..' + url
        })
    },
    chooseImage: function (e) {
        var that = this;
        let type = e.currentTarget.dataset['type'];
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    ['imgs.img'+type]: res.tempFilePaths[0]
                });
            }
        })
    },
})
