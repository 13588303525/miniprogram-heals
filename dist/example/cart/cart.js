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

  },

  onShow() {
   
    var self = this
    self.data.carts=Object.keys(app.cartItem).map(function(i){return app.cartItem[i]}); //对象转化为数组
    //self.data.carts = app.cartItem;
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
    console.log("deleteList");
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    app.globalData.carts = carts
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
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
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
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