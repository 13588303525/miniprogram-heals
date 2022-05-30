// example/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
      swiperImgNo: 1,
      imgSwiperUrl: '',
      typeCat: [
        { id: 0, name: "水果" },
        { id: 1, name: "鲜花" }
      ],
      fruitInfo: [
        { _id: 0,onShow: 1,imgUrl: '/images/apple.png', name: "苹果",price: 1, unit:'个'},
        { _id: 1,onShow: 1,imgUrl: '/images/banana.png', name: "香蕉",price: 3, unit:'根'},
        { _id: 2,onShow: 1,imgUrl: '/images/pear.png', name: "雪梨",price: 2, unit:'个'},
        { _id: 3,onShow: 1,imgUrl: '/images/banana.png', name: "香蕉",price: 3, unit:'根'},
        { _id: 4,onShow: 1,imgUrl: '/images/pear.png', name: "雪梨",price: 2, unit:'个'},
        { _id: 5,onShow: 1,imgUrl: '/images/banana.png', name: "香蕉",price: 3, unit:'根'},
        { _id: 6,onShow: 1,imgUrl: '/images/pear.png', name: "雪梨",price: 2, unit:'个'},
      ],
      activeTypeId: 0,
      isShow:true, 
      openid: '',   
      offLine:null  //是否维护
    },

    
  // ------------分类展示切换---------
  typeSwitch: function(e) {
    // console.log(e.currentTarget.id)
    getCurrentPages()["0"].setData({
      activeTypeId: parseInt(e.currentTarget.id)
    })
  },

 /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

   // app.weixinLogin();
  //  app.get_openid();
  },
 // ------------加入购物车------------
 addCartByHome: function(e) {


  // console.log(e.currentTarget.dataset._id)
  var self = this
  let item = {}
      //app.cartItem[e.currentTarget.dataset._id] +1;
      item=self.data.fruitInfo[e.currentTarget.dataset._id];
      //app.cartItem[e.currentTarget.dataset._id]=item;
      //console.log("fff"+app.cartItem[e.currentTarget.dataset._id].price)
      if(app.cartItem[e.currentTarget.dataset._id] !=null) {
        item=app.cartItem[e.currentTarget.dataset._id];
        item['num']=app.cartItem[e.currentTarget.dataset._id].num + 1;
      } else {
        item=self.data.fruitInfo[e.currentTarget.dataset._id];
        item['selected']=true;
        item['num']= 1; 
      }
      app.cartItem[e.currentTarget.dataset._id] = item;
      console.log(e.currentTarget.dataset._id )
      console.log(app.cartItem[e.currentTarget.dataset._id] )
      app.hasInCart=true
      //app.isNotRepeteToCart(newCartItem)
      wx.showToast({
        title: '已添加至购物车',
      })
    
},


 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})