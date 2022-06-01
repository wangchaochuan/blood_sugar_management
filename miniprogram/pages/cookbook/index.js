// pages/cookbook/index.js
import dayjs from "../../miniprogram_npm/dayjs/index";

const breakfastMap = {
  0: "窝头1个(50克)，牛奶1杯(250毫升)，鸡蛋1个，凉拌豆芽1小蝶。",
  1: "全麦面包片(50克)，豆浆1杯(400毫升)，茶鸡蛋1个，凉拌苦瓜1小蝶。",
  2: "蔬菜包子1个(50克)，米粥1碗，鸡蛋1个，拌白菜心1小蝶。",
  3: "豆包1个(50)，荷叶绿豆粥1碗，鸡蛋1个，凉拌三丝1小蝶。",
  4: "牛奶燕麦粥(牛奶250毫升，燕麦25克)，鸡蛋羹(鸡蛋1个)，海米拌芹菜1小蝶。",
  5: "全麦小馒头1个(50克)，薏苡仁粥1碗，鸡蛋1个，拌莴笋丝1小蝶。",
  6: "牛奶240ml，鸡蛋1个，馒头50克",
};
const lunchMap = {
  0: "米饭一碗(100克)，雪菜豆腐，肉丝炒芹菜。",
  1: "烙饼2块(100块)，口蘑冬瓜，牛肉丝炒胡萝卜。",
  2: "荞麦面条1碗(100克)，西红柿炒鸡蛋，素鸡菠菜。",
  3: "玉米面馒头1个(100克)，炒鱿鱼卷芹菜，素烧茄子。",
  4: "荞麦大米饭1碗(100克)，青椒肉丝，香菇豆腐汤。",
  5: "茭白鳝丝面(含面条100克)，醋溜大白菜。",
  6: "烙饼150克，酱牛肉80克，醋烹豆芽菜",
};
const dinnerMap = {
  0: "馒头1个(100克)，盐水大虾，鸡片炒油菜。",
  1: "米饭1碗(100克)，鸡汤豆腐小白菜，清炒虾仁黄瓜。",
  2: "紫米馒头1个(100克)，香菇菜心，沙锅小排骨。",
  3: "米饭1碗(100克)，葱花烧豆腐，椒油圆白菜。。",
  4: "花卷1个(100克)，醋椒鱼，西红柿炒扁豆。",
  5: "葱油饼(含面粉100克)，芹菜香干，紫菜冬瓜汤。",
  6: "米饭150克，肉末烧豆腐，蒜茸菠菜",
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    week: "",
    breakfast: "",
    lunch: "",
    dinner: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const time = new Date();
    const date = dayjs(time).format("YYYY-MM-DD");
    const day = dayjs(time).day();
    let week = "星期";
    switch (day) {
      case 0:
        week += "日";
        break;
      case 1:
        week += "一";
        break;
      case 2:
        week += "二";
        break;
      case 3:
        week += "三";
        break;
      case 4:
        week += "四";
        break;
      case 5:
        week += "五";
        break;
      case 6:
        week += "六";
        break;
    }
    const breakfast = breakfastMap[day];
    const lunch = lunchMap[day];
    const dinner = dinnerMap[day];

    this.setData({
      date,
      week,
      breakfast,
      lunch,
      dinner
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