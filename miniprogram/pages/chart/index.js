import * as echarts from '../../ec-canvas/echarts';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import dayjs from "../../miniprogram_npm/dayjs/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: false,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
  },
  onReady() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-line');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const current = new Date();
    // 默认查询最近7天的数据
    const start = dayjs(current).subtract(7, 'day').valueOf();
    const end = dayjs(current).valueOf();
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
      this.setData({
        showLoading: true
      })
      const res = await wx.cloud.callFunction({
        name: "getRecordList",
        data: {
          start,
          end,
          sort: "asc"
        }
      })
      const list = (res.result.data || []).map(v => ({
        ...v,
        date: dayjs(v.date).format("YYYY-MM-DD")
      }))
      this.initChart(list);
    } catch (error) {
      Toast("获取数据失败")
    } finally {
      this.setData({
        showLoading: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },
  // 初始化图表
  initChart(list) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      const days = list.map(v => v.date);
      const mornings = list.map(v => Number(v.morning));
      const evenings = list.map(v => Number(v.evening));
      this.setOption(chart, days, mornings, evenings);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  setOption(chart, days, mornings, evenings) {
    const option = {
      title: {
        text: '最近7天血糖波动情况',
        left: 'center'
      },
      legend: {
        data: ['早上血糖', '晚上血糖'],
        top: 50,
        left: 'center',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '早上血糖',
        type: 'line',
        smooth: true,
        data: mornings
      }, {
        name: '晚上血糖',
        type: 'line',
        smooth: true,
        data: evenings
      }]
    };
    chart.setOption(option);
  },
  onShareAppMessage() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/chart/idex"
    }
  },
  onShareTimeline() {
    return {
      title: "邀请您使用血糖监测小程序",
      path: "pages/chart/idex"
    }
  }
})