const linebot = require('linebot');
const aqi = require('./Modules/aqi');
const eatByGoogle = require('./Modules/eatByGoogle')


module.exports = {
    bot: linebot({
        channelId: process.env.channelId,
        channelSecret: process.env.channelSecret,
        channelAccessToken: process.env.channelAccessToken

    }),

    _botStart: function () {
        const outThis = this;

        this.bot.on('message', async function (event) {
            console.log(event.source.userId + " 傳送了  " + event.message.text);
            let sendMsg;
            if (event.message.text === "功能!") {
                sendMsg = "目前只有查詢空氣的功能，請輸入\"空氣!\"來查詢！";
            }

            let userInfo;
            await event.source.profile(event.source.userId).then(function (profile) {
                userInfo = profile.displayName;
            });

            sendMsg = aqi.aqiReport(event) || await eatByGoogle.getFood(event,userInfo);
            //outThis.ResponseMsg2(event);
            //如果有訊息則送出
            if (sendMsg !== undefined) {
                outThis.ResponseMsg(event, sendMsg);
            }
        });
    },

    ResponseMsg: function (event, msg) {
        event.reply(msg).then(function (data) {
          //  console.log("回覆內容 : " + JSON.stringify(msg));
        }).catch(function (error) {
            console.log('error = ' + error);
        });
    },
   
}