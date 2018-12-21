const linebot = require('linebot');
const aqi = require('./Modules/aqi');
const whatToEat = require('./Modules/whatToEat');
const config = require('./config');

module.exports = {
    bot: linebot({
        channelId: config.testbot.channelId,
        channelSecret: config.testbot.channelSecret,
        channelAccessToken: config.testbot.channelAccessToken
    }),

    _botStart: function () {
        const outThis = this;

        this.bot.on('message', function (event) {
            
            console.log(event.source.userId + " 傳送了  " + event.message.text);
            let sendMsg;
            if (event.message.text === "功能!") {
                sendMsg = "目前只有查詢空氣的功能，請輸入\"空氣!\"來查詢！";
            }

            let aqiMsg = aqi.aqiReport(event);
            sendMsg = aqiMsg || sendMsg;

            let foodMsg = whatToEat.getFood(event);
            sendMsg = foodMsg || sendMsg;

            //如果有訊息則送出
            if (sendMsg !== undefined) {
                outThis.ResponseMsg(event, sendMsg);
            }
        });
    },

    ResponseMsg: function (event, msg) {
        event.reply(msg).then(function (data) {
            console.log("回覆內容 : " + msg);
        }).catch(function (error) {
            console.log('error = ' + error);
        });
    }





}