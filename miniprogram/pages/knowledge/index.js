// pages/cookbook/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // "shareAppMessage"表示“发送给朋友”按钮，"shareTimeline"表示“分享到朋友圈”按钮
    wx.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
      success(res) {
        console.log(res, "分享成功!")
      },
      fail(res) {
        console.log(res, "分享失败!")
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  onShareAppMessage() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/cookbook/idex"
    }
  },
  onShareTimeline() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/cookbook/idex"
    }
  }
})