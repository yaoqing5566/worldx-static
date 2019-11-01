//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        banners: ['https://haizitong.com/image/gqbanner.png', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'],
        images: {},
        windowHeight:300,
        current:0,
        latitude: 23.099994,
        longitude: 113.324520,

        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            callout:{
                content:"服务:青少年英语培训\r\n姓名:陶士涵\r\n电话:18808987876",
                bgColor:"#fff",
                padding:"5px",
                borderRadius:"2px",
                borderWidth:"1px",
                borderColor:"#07c160",
            }
        }],
        covers: [{
            latitude: 23.099994,
            longitude: 113.344520,
            iconPath: '/image/location.png'
        }]
    },
    getLocation:function(){
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                wx.openLocation({//​使用微信内置地图查看位置。
                    latitude: 31.0938140000,//要去的纬度-地址
                    longitude: 121.5039390000,//要去的经度-地址
                    name: "O'MALL华侨城商业中心",
                    address: '华侨城商业中心'
                })
            }
        })
    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..' + url
        })
    },
    swiperChange(e) {
        let current = e.detail.current;
        let source = e.detail.source
        //console.log(source);
        this.setData({
            current:current
        })
        console.log(current, e.detail)
    },
    onLoad: function(options) {
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight
        })
    }
})
