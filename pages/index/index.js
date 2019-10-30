//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        dataArrs: [{
            ico: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
            platform: "https://event.haizitong.com/assets/img/wx.png",
            progress:80
        },{
            ico: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
            platform: "../../image/xhs.png",
            progress:50
        }],
        images: {},

    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..'+url
        })
    },
    imageLoad: function (e) {
        var $width = e.detail.width, //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height; //图片的真实宽高比例
        var viewHeight = 16,
            viewWidth = viewHeight * ratio; //计算的高度值
        var image = this.data.images;
        //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
        image[e.target.dataset.index] = {
            width: viewWidth,
            height: viewHeight
        }
        console.log(image[e.target.dataset.index])
        this.setData({
            images: image
        })

    }
})
