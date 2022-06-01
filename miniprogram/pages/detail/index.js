import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import dayjs from "../../miniprogram_npm/dayjs/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: false,
    record: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = options.id;
    this.setData({
      showLoading: true
    });
    // "shareAppMessage"表示“发送给朋友”按钮，"shareTimeline"表示“分享到朋友圈”按钮
    wx.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
      success(res) {
        console.log(res, "分享成功!")
      },
      fail(res) {
        console.log(res, "分享失败!")
      }
    });
    try {
      const res = await wx.cloud.callFunction({
        name: "getRecordDetail",
        data: {
          id
        }
      })
      const data = res.result.data;
      this.setData({
        record: {
          ...data,
          date: dayjs(data.date).format("YYYY-MM-DD")
        }
      })
    } catch (error) {
      Toast("获取详情失败")
    } finally {
      this.setData({
        showLoading: false
      })
    }
  },
  onShareAppMessage() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/detail/idex"
    }
  },
  onShareTimeline() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/detail/idex"
    }
  }
})