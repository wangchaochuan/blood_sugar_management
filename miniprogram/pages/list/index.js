import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import dayjs from "../../miniprogram_npm/dayjs/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    this.getTabBar().init();
    this.setData({
      showLoading: true
    })
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
    try {
      const current = new Date();
      // 默认查询最近30天的数据
      const start = dayjs(current).subtract(30, 'day').valueOf();
      const end = dayjs(current).valueOf();
      const res = await wx.cloud.callFunction({
        name: "getRecordList",
        data: {
          start,
          end
        }
      })
      const list = (res.result.data || []).map(v => ({
        ...v,
        date: dayjs(v.date).format("YYYY-MM-DD")
      }))
      this.setData({
        list
      })
    } catch (error) {
      Toast("初始化数据失败")
    } finally {
      this.setData({
        showLoading: false
      })
    }
  },
  handleClick(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    })
  },
  onShareAppMessage() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/list/idex"
    }
  },
  onShareTimeline() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/list/idex"
    }
  }
})