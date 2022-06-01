// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const collection = db.collection("blood_glucose");

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const {
    morning,
    evening,
    date,
    exercise,
    breakfast,
    brunch,
    lunch,
    dunch,
    dinner
  } = event;
  try {
    return await collection.add({
      data: {
        morning,
        evening,
        date,
        exercise,
        breakfast,
        brunch,
        lunch,
        dunch,
        dinner,
        openid: wxContext.OPENID
      }
    })
  } catch (error) {
    return Promise.reject(new Error("添加失败!"))
  }
}