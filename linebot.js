const linebot = require('linebot');
const aqi = require('./Modules/aqi');
const eatByGoogle = require('./Modules/eatByGoogle')

let bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken

});

function _botStart() {
    bot.on('message', async function (event) {
        //console.log(event.source.userId + " 傳送了  " + event.message.text);
        let sendMsg;
        let userInfo = await getUserName(event);

        if (event.message.text === "功能!") {
            sendMsg = "目前只有查詢空氣的功能，請輸入\"空氣!\"來查詢！";
        }
        sendMsg = aqi.aqiReport(event) || await eatByGoogle.getFood(event, userInfo);
        //如果有訊息則送出
        if (sendMsg) {
            ResponseMsg(event, sendMsg);
        }
    });
}

async function getUserName(event) {
    let userName = "";
    await event.source.profile(event.source.userId).then(function (profile) {
        userName = profile.displayName;
    });
    return userName;
}

function ResponseMsg(event, msg) {
    event.reply(msg).then(function (data) {
        console.log("回覆內容 : " + msg);
    }).catch(function (error) {
        console.log('error = ' + error);
    });
}



module.exports = {
    _botStart,
    bot
}