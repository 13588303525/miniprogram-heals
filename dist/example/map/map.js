// page/component/new-pages/map/map.js
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  data: {
    latitude: 0, //首次加载维度
    longitude: 0, //首次加载的经度
    mapName: "", //选点的位置

    isShowStore: false,

    storesLocation: [
      {
        id: 0,
        iconPath: "../../images/apple.png",
        latitude: 23.129074,
        longitude: 113.26442,
        width: 30,
        height: 30,
        title: '四季酒店'
      },
      {
        id: 1,
        iconPath: "../../images/apple.png",
        latitude: 23.127795,
        longitude: 113.265576,
        width: 30,
        height: 30,
        title: '吉祥公寓(公园前地铁站北京路步行街店'
      }
    ]
  },
  onLoad(options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '2G4BZ-DUJES-TMCO2-67M3F-NBFZ6-AAB5M'
    });
  },

  onShow() {
    // this.searchLocation();  // 1. 通过关键字，搜索匹配的地址
    // this.moveToLocation();  // 2. 地图选点
    // this.getLocation();     // 3. 获取定位
    // this.showStore();
  },

  // 1. 通过关键字，搜索匹配的地址
  searchLocation() {
    qqmapsdk.search({
      keyword: '酒店',
      success(res) {
        console.log("酒店"),
          console.log(res);
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {
        console.log(res);
      }

    })
  },

  // 2. 地图选点(添加商铺信息)
  moveToLocation() {
    let that = this
    wx.chooseLocation({
      success(res) {
        let storesLocation = that.data.storesLocation
        let storeLoaction = [{
          id: storesLocation.length+1,
          iconPath: "../../images/apple.png",
          latitude: res.latitude,
          longitude: res.longitude,
          width: 30,
          height: 30,
          title: res.name
        }]
        console.log("地图选点: "+ that.data.storesLocation.length)  
        storesLocation.push(...storeLoaction)
        
        that.setData({
          storesLocation: storesLocation
        })
        console.log(that.data.storesLocation) 
        // console.log("地图选点: "+that.data.storesLocation)
      },
      //错误信息
      fail() {
        console.log(err);
      }
    })
  },

  // 3. 获取定位
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
        })
      }
    })
  },

  // 4. 显示当前位置附近的商户
  showStore() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const lat = res.latitude
        const lot = res.longitude
        that.setData({
          isShowStore:true,
          latitude: lat,
          longitude: lot
        })
      }
    })
  },

  joinStore(){
    this.moveToLocation()  // 地图选点
  }

})