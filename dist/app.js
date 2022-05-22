require('./libs/Mixins.js');

const listeners = [];

App({
  globalData: {


    theme: 'light', // dark
    mode: '', // 模式(care：关怀模式)
    
  },
  userId: 0,
  cartItem:[0,0,0,0,0,0,0,0,0,0,0,0],
// 微信授权登录
weixinLogin() {
  // 获取code
  var that = this
  console.log("dengl")
  wx.login({
      success: (res) => {
          that.get_openid(res.code)
      },
  })
  
},
// 获取openid
get_openid(code) {
  var that = this
  var appid = config.appid
  var secret = config.secret
  wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',//请求微信服务器获取openid
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
          console.log("Openid为:" + res.data.openid) // oHGn55L0ayMhtYxzAiEYHZT4_EIU
          that.login(res.data.openid)
      },
  })
},
  changeGlobalData(data) {
    this.globalData = Object.assign({}, this.globalData, data);
    listeners.forEach((listener) => {
      listener(this.globalData);
    });
  },
  watchGlobalDataChanged(listener) {
    if (listeners.indexOf(listener) < 0) {
      listeners.push(listener);
    }
  },
  unWatchGlobalDataChanged(listener) {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  },
  onThemeChange(resp) {
    this.changeGlobalData({
      theme: resp.theme,
    });
  },
  onLaunch() {
    // TODO: 检测适老化
  },
});
