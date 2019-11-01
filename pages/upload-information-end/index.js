//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        formData:{
            wx:'',
            mobile:0
        },
        error: ''

    },
    onLoad: function (options){

        console.log(options.id)
    },
    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    save(){
        if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.data.formData.mobile)) {
            this.setData({
                error: '手机号格式不正确！'
            })
            return;
        }
        console.log(this.data.formData)
    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..' + url
        })
    },
})
