var express = require('express');
var aqi = require('./Modules/aqi');
var botModule = require('./linebot');


const app = express();
const linebotParser = botModule.bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on this port", port);
});

//定時更新空氣資料
aqi._getAQIJSON();


//機器人醒來開始收訊息
botModule._botStart();


