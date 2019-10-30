let address = require('../../utils/address.js')
let that=this;
Page({
    data: {
        form:{
            gender:'',
            birthday:'',
            address:'',
            xiaohongshuIndex:-1,
            weiboIndex:-1,
            taobaoIndex:-1,
            icon:''
        },
        pageType:1,
        dataArrs: [{
            ico: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
            platform: "https://event.haizitong.com/assets/img/wx.png",
            progress:80
        }],
        genderOption:['男','女'],
        selectGenderIndex:0,
        dqData:new Date(),
        multiIndex: [0, 0, 0],
        addressJson: [],
        xiaohongshu:{
            arrs:['100-300','500-1000','1000-5000','5000-10000','10000-30000','30000-50000','50000以上','没有该账号'],
            sIndex:0
        },
        weibo:{
            arrs:['500-1000','1000-5000','5000-10000','10000-30000','30000-50000','50000以上','没有该账号'],
            sIndex:0
        },
        taobao:{
            arrs:['1-3钻','3-5钻','1-3皇冠','3-5皇冠','金皇冠','没有该账号'],
            sIndex:0
        },
        showImgType:0,
    },
    chooseImage(e) {
        let vm=this;
        wx.chooseImage({
            count: 1,
            success: (res) => {
                vm.setData({
                    ['form.icon']:res.tempFilePaths
                })
            },
            fail: (fail) => {

            }
        })
    },
    showImg:function (e) {
        let type = e.currentTarget.dataset['type'];
        this.setData({
            showImgType: type
        })
    },
    nextPage: function (e) {
        var target = e.currentTarget;
        let url = e.currentTarget.dataset['url'];
        wx.navigateTo({
            url: '..' + url
        })
    },
    bindSelectCont:function (e) {
        let type = e.currentTarget.dataset['type'];
        let sIndex=e.detail.value
        console.log(type,e.detail.value)
        this.setData({
            ['form.'+type+'Index']:sIndex
        })
    },
    changeBut: function (event) {
        let type = event.currentTarget.dataset['index'];
        console.log(type)
        this.setData({
            pageType: type
        })
    },
    bindSelectGender: function(e) {
        this.setData({
            ['form.gender']: this.data.genderOption[e.detail.value]
        })
    },
    bindDateChange: function(e) {
        this.setData({
            ['form.birthday']: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let data=this.data;
        let selArr=e.detail.value
        let arr=this.data.addressJson;
        let addrss=[];
        for(let i in arr){
            addrss.push(arr[i][selArr[i]].cName)
        }
        this.setData({
            ['form.address']:addrss.join(',')
        })
       console.log(addrss)
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var multiIndexOffset = that.data.multiIndex;
        multiIndexOffset[e.detail.column] = e.detail.value;
        if (e.detail.column == 0){
            multiIndexOffset[1] = 0;
            multiIndexOffset[2] = 0;
        }else if(e.detail.column == 1){
            multiIndexOffset[2] = 0;
        }
        that.setData({
            multiIndex: multiIndexOffset,
            areaCode: address.addressJson[multiIndexOffset[0]].areaLst[multiIndexOffset[1]].areaLst[multiIndexOffset[2]].code,
            addressJson: [address.addressJson, address.addressJson[multiIndexOffset[0]].areaLst, address.addressJson[multiIndexOffset[0]].areaLst[multiIndexOffset[1]].areaLst]
        })
        console.log(that.data.areaCode)
    },
    onLoad: function (options) {
        that = this;
        var ob = options.ob
        if (ob != undefined) {
            var json = JSON.parse(ob)
            var sss = json.areaName.split(',')
            var array = address.addressJson
            var multiIndexOff = that.data.multiIndex
            outer://外层循环，outer作为标识符
                for (var i = 0; i < array.length;i++){
                    if (sss[0] == array[i].cName){
                        multiIndexOff[0] = i;
                        for (var j = 0; j < array[i].areaLst.length; j++){
                            if (sss[1] == array[i].areaLst[j].cName) {
                                multiIndexOff[1] = j;
                                for (var k = 0; k < array[i].areaLst[j].areaLst.length; k++) {
                                    if (sss[2] == array[i].areaLst[j].areaLst[k].cName) {
                                        multiIndexOff[2] = k;
                                        break outer;
                                    }
                                }
                            }
                        }
                    }
                }
        }
        this.setData({
            addressJson: [address.addressJson, address.addressJson[that.data.multiIndex[0]].areaLst, address.addressJson[that.data.multiIndex[0]].areaLst[that.data.multiIndex[1]].areaLst]
        })
    },
})
