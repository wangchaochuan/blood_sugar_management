// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const collection = db.collection("blood_glucose");

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id;
  try {
    if (!id) {
      return Promise.reject(new Error("查询失败"))
    }
    return await collection.doc(id).get()
  } catch (error) {
    return Promise.reject(new Error("查询失败"))
  }
}