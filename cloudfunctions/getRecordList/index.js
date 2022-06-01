// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const collection = db.collection("blood_glucose");
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const {
    start,
    end,
    sort = "desc"
  } = event;
  try {
    return await collection.where(_.and([{
      date: _.lte(end)
    }, {
      date: _.gte(start)
    }, {
      openid: _.eq(wxContext.OPENID)
    }])).orderBy("date", sort).get();
  } catch (error) {
    return Promise.reject(new Error("查询失败"))
  }
}