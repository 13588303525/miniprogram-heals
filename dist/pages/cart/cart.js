// page/component/new-pages/cart/cart.js
const app = getApp()

Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    obj: {name: "hello"}
  },

  onLoad(e) {
    var self = this
    // self.getTotalPrice();
    // self.selectAll();
    //this.onShow();
 // 云开发初始化
 if (!wx.cloud) {
  console.error('不支持云开发，请使用 2.2.3 或以上的基础库');
} else {
  wx.cloud.init({
    env: "cloud1-1g1y9qrme91332d1",//这里是你云环境的id,打开云开发面板可以看到
    traceUser: true
  });

  wx.cloud.callFunction({
    name: 'getUserInfo', //云函数名称 
    complete: res => { 
       console.log(res.result.openid) //返回值
       console.log("test")
    }
  })
}
  },

  onShow() {
   
    var self = this
    self.data.carts=Object.keys(app.cartItem).map(function(i){return app.cartItem[i]}); //对象转化为数组
    //self.data.carts = app.cartItem;
    console.log(this.data.carts)
    console.log(app.cartItem);
    console.log("app.cartItem");
 
    self.data.hasList= app.hasInCart;
 
   // if()
    console.log("hasInCart:"+app.hasInCart)
    console.log("hashList:"+self.data.hasList)
    self.selectAll();
    self.getTotalPrice();
  },

  onHide: function () {
    var self = this
    self.getTotalPrice();
    self.selectAll();
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var self = this
    const index = e.currentTarget.dataset.index;
    self.data.carts=Object.keys(app.cartItem).map(function(i){return app.cartItem[i]}); //对象转化为数组
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts;
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    console.log("[start] cart.deleteList()---------------");
    const index = e.currentTarget.dataset.index;
    let cartsTemp = this.data.carts;  // 本地购物车

    console.log("[doing] before splice, cartsTemp = "+JSON.stringify(cartsTemp));
    cartsTemp.splice(index, 1);   // 删除临时变量的条目
    this.setData({
      carts: cartsTemp          // 将临时变量赋值给this.data变量
    });  
    if (!cartsTemp.length) {    
      this.setData({
        hasList: false          // 购物车清空后，hasList置为false，页面展示“购物车是空的哦~”
      });
    } else {
      this.getTotalPrice();    // 购物车非空时，重新计算总价
    }
    console.log("[doing] after splice, cartsTemp = "+JSON.stringify(cartsTemp));

    console.log("[doing] before delete, app.cartItem = "+JSON.stringify(app.cartItem));
    delete app.cartItem[index];
    app.globalData.carts = cartsTemp;
    console.log("[doing] after delete, app.cartItem = "+JSON.stringify(app.cartItem));
    
    console.log("[end] cart.deleteList()---------------");
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    console.log("--")
    console.log(app.cartItem);
    console.log("--")
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    console.log(carts)
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts

    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
//console.log(Object.keys(carts).length)
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }

    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(1)
    });
    app.globalData.carts = carts    
  }

})