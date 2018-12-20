var linebot = require('linebot');
var express = require('express');
var aqi = require('./Modules/aqi');
var whatToEat = require('./Modules/whatToEat');


var bot = linebot({
    channelId: '1628760097',
    channelSecret: 'fa6ad7e42c864158294e81fdea65932e',
    channelAccessToken: 'vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on this port", port);
});
//半小時更新ㄧ次，也可以改寫成呼叫就更新，外面會更乾淨，但要處理飛同步先不理他@Q@
aqi._getAQIJSON();

//機器人醒來開始收訊息
_botStart();

function _botStart() {
    bot.on('message', function (event) {
        var sendMsg;
        console.log(event.source.userId + " 傳送了  " + event.message.text);
        if (event.message.text === "功能!") {
            sendMsg = "目前只有查詢空氣的功能，請輸入\"空氣!\"來查詢！";
        }
        sendMsg = aqi.aqiReport(event);
        
        var foodMsg = whatToEat.getFood(event) ;

        sendMsg = (foodMsg == "") ? sendMsg : foodMsg;

        //如果有訊息送出
        if (sendMsg !== undefined) {
            ResponseMsg(event, sendMsg);
        }
    });
}

function ResponseMsg(event, msg) {
    event.reply(msg).then(function (data) {
        console.log("回覆內容 : " + msg);
    }).catch(function (error) {
        console.log('error = ' + error);
    });
}