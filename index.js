

  var linebot = require('linebot');
  var express = require('express');
  var getJSON = require('get-json');

  
var bot = linebot({
    channelId: '1628760097',
    channelSecret: 'fa6ad7e42c864158294e81fdea65932e',
    channelAccessToken: 'vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU='
  });

  var timer;
  var pm = [];
  _getJSON();
  
  _bot();
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  
  //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
  
  function _bot() {
    bot.on('message', function(event) {
        npmfilter(event);
    });
  
  }
  
  function npmfilter(event){

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
    getJSON('https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&sort=County', function(error, response) {
        console.log(response);
      response.result.records.forEach(function(e, i) {
        pm[i] = [];
        pm[i][0] = e.SiteName;
        pm[i][1] = e['PM2.5'] * 1;
        pm[i][2] = e.PM10 * 1;
      });
    });
    timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
  }