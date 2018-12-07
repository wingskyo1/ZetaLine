
var linebot = require('linebot');
var express = require('express');

var timer;
var pm = [];
_getJSON();


var bot = linebot({
  channelId: '1628760097',
  channelSecret: 'fa6ad7e42c864158294e81fdea65932e',
  channelAccessToken: 'vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU='
});

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {
  if (event.message.type = 'text') {
    npmfilter(event);
    //var msg = event.message.text;
  //收到文字訊息時，直接把收到的訊息傳回去
    // event.reply(msg).then(function(data) {
    //   // 傳送訊息成功時，可在此寫程式碼 
    //   console.log(msg);
    // }).catch(function(error) {
    //   // 傳送訊息失敗時，可在此寫程式碼 
    //   console.log('錯誤產生，錯誤碼：'+error);
    // });
  }
});

function npmfilter(message){

        if (event.message.type == 'text') {
            var msg = event.message.text;
            var replyMsg = '';
            if (msg.indexOf('PM2.5') != -1) {
              pm.forEach(function(e, i) {
                if (msg.indexOf(e[0]) != -1) {
                  replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
                }
              });
              if (replyMsg == '') {
                replyMsg = '你想知道什麼區的PM2.5呢 ? ヽ( ° ▽°)ノ';
              }
            }
            if (replyMsg == '') {
                return '';
              replyMsg = '不知道「'+msg+'」是什麼意思 :p';
            }
      
            event.reply(replyMsg).then(function(data) {
              console.log(replyMsg);
            }).catch(function(error) {
              console.log('error');
            });
        }
}

function _getJSON() {
    clearTimeout(timer);
    getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
      response.forEach(function(e, i) {
        pm[i] = [];
        pm[i][0] = e.SiteName;
        pm[i][1] = e['PM2.5'] * 1;
        pm[i][2] = e.PM10 * 1;
      });
    });
    timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
  }

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});