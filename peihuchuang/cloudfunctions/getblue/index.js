// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request-promise');

cloud.init()

// 云函数入口函数
// 云函数入口函数
exports.main = async (event, context) => {
  let options = {
    //'http://www.static.gold:3034/findresultMoneybyshebeiId?shebeiId=123456'
    uri: event.url,
    json: true // Automatically parses the JSON string in the response
 };
 let result = await request(options)
 .then(function (repos) {
     return repos;
 })
 .catch(function (err) {
     console.log(err);
 });
 return  result;
}