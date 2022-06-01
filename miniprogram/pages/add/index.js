// pages/add/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import dayjs from "../../miniprogram_npm/dayjs/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 需要提交的记录的数据
    record: {
      morning: null,
      evening: null,
      breakfast: "",
      brunch: "",
      lunch: "",
      dunch: "",
      dinner: "",
      exercise: "",
    },
    date: "",
    startDate: 0,
    endDate: 0,
    show: false,
    showLoading: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },
  onLoad() {
    const current = new Date();
    const date = dayjs(current).format("YYYY-MM-DD");
    // 默认只能选择最近30天
    const startDate = dayjs(current).subtract(30, 'day').valueOf();
    const endDate = dayjs(current).valueOf();
    this.setData({
      date,
      startDate,
      endDate
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
    })
  },
  handleChangeMorning(event) {
    this.setData({
      record: {
        ...this.data.record,
        morning: event.detail
      }
    })
  },
  handleChangeEvening(event) {
    this.setData({
      record: {
        ...this.data.record,
        evening: event.detail
      }
    })
  },
  handleChangeBreakfast(event) {
    this.setData({
      record: {
        ...this.data.record,
        breakfast: event.detail
      }
    })
  },
  handleChangeBrunch(event) {
    this.setData({
      record: {
        ...this.data.record,
        brunch: event.detail
      }
    })
  },
  handleChangeLunch(event) {
    this.setData({
      record: {
        ...this.data.record,
        lunch: event.detail
      }
    })
  },
  handleChangeDunch(event) {
    this.setData({
      record: {
        ...this.data.record,
        dunch: event.detail
      }
    })
  },
  handleChangeDinner(event) {
    this.setData({
      record: {
        ...this.data.record,
        dinner: event.detail
      }
    })
  },
  handleChangeExercise(event) {
    this.setData({
      record: {
        ...this.data.record,
        exercise: event.detail
      }
    })
  },
  handleReset() {
    this.setData({
      record: {
        morning: null,
        evening: null,
        breakfast: "",
        brunch: "",
        lunch: "",
        dunch: "",
        dinner: "",
        exercise: null,
      },
      date: dayjs(new Date()).format("YYYY-MM-DD")
    })

  },
  async handleSubmit() {
    const {
      record,
      date
    } = this.data;
    if (record.morning <= 1 || record.evening <= 1) {
      Toast("亲，血糖值不可能这么低哦")
      return;
    }
    if (record.exercise < 0) {
      Toast("亲，运动量怎么可能小于0呢")
      return;
    }
    if (!date) {
      Toast("亲，你是不是忘了选择时间了")
      return;
    }
    const time = dayjs(date).valueOf();
    const data = {
      ...record,
      date: time
    }
    this.setData({
      showLoading: true
    })
    try {
      // 调用云函数,将数据存储至云数据库
      await wx.cloud.callFunction({
        name: "addRecord",
        data
      })
      this.handleReset();
      wx.switchTab({
        url: '/pages/list/index',
      })
    } catch (error) {
      Toast("添加记录失败")
    } finally {
      this.setData({
        showLoading: false
      })
    }
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onSelect(event) {
    this.setData({
      show: false,
      date: dayjs(event.detail).format("YYYY-MM-DD"),
    });
  },
  onShareAppMessage() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/add/idex"
    }
  },
  onShareTimeline() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/add/idex"
    }
  }
})