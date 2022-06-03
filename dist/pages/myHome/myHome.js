// page/component/new-pages/user/user.js
const app = getApp();

Page({
  data: {
    orders: [],
    hasAddress: false,
    address: {},
    openid: '',
  },
  onLoad() {
    var that = this;
  },

  onShow() {
    var self = this;
    // console.log(self.data)
  }
})