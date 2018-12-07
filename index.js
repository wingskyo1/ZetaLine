var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var aqi = require('./Modules/aqi');

var bot = linebot({
    channelId: '1628760097',
    channelSecret: 'fa6ad7e42c864158294e81fdea65932e',
    channelAccessToken: 'vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU='
});


aqi._getAQIJSON();
_botStart();

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

function _botStart() {
    bot.on('message', function (event) {
       var aqimsg =  aqi.npmfilter(event);
       makeReplyMsg(event,aqimsg);
    });

}



function makeReplyMsg(event, msg) {
    event.reply(msg).then(function (data) {
        console.log("我有印東西出來" + msg);
    }).catch(function (error) {
        console.log('error = ' + error);
    });
}
//Find array elements from msg
//return 






function _getAQILevel(aqi){
    var result ;
    if(aqi > 100){
        result = "快戴上口罩，要變人體空氣清淨機了！ \n _(┐「﹃ﾟ｡)_"
    }
    else if (aqi >50){
        result = "還行還行，但又不太行呢！ \n (`・ω・´)";
    }
    else{
        result ="今日も空気が美しいです。\n  ξ( ✿＞◡❛)";
    }
}