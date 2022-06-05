// page/component/new-pages/map/map.js
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  data: {
    
    mapName: "", //选点的位置

    isShowStore: false,
    scale: 16,
    scaleBackup: 16,


    userAddress: {
    name: '',
    phone: '',
    address: "",  //地址
    latitude: 0, //首次加载维度
    longitude: 0 //首次加载的经度
    },
  },
  formSubmit(e) {
    const value = e.detail.value;
     console.log(value)
    if (value.name && value.phone.length === 11 ) {
      console.log(value)
      // 保存到数据库中
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  },
  onLoad(options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '2G4BZ-DUJES-TMCO2-67M3F-NBFZ6-AAB5M'
    });
  },

  onShow() {
  
  },

  // 选择个人地址
  getLocation() {
    let that = this
    wx.chooseLocation({
      success(res) {

        console.log(res.address)  
        // console.log("地图选点: "+that.data.storesLocation)
        let userAddress =  {
          name: '',
          phone: '',
          // detail: ''
          detail: 0,
          message: "",
          address:res.address,  //地址
          latitude: res.latitude, //首次加载维度
          longitude: res.longitude //首次加载的经度
          }
        that.setData({
          userAddress:userAddress,
        })
      },
      //错误信息
      fail() {
        console.log(err);
      }
    })
  },

})