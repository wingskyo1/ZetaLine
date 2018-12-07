

  var linebot = require('linebot');
  var express = require('express');
  var getJSON = require('get-json');

  
var bot = linebot({
    channelId: '1628760097',
    channelSecret: 'fa6ad7e42c864158294e81fdea65932e',
    channelAccessToken: 'vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU='
  });

  var timer;
  var regionData = [];
  var test22=[];
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
        if (msg.match( /(pm2.5|空氣)/ )) {
          regionData.forEach(function(e, i) {
            if (msg.indexOf(e.SiteName) != -1) {
                replyMsg =e.County + e.SiteName + '\n PM2.5 數值為 ' + e.pm + '\n 空氣品質 AQI 為 '+e.AQI;
            }
            else if (_hasCountry(msg)!==''){
                replyMsg +=e.County +" 設有檢測站的區域有 \n "
                const result = regionData.filter(data => data.County === e.County);
                if(result.length !==0){
                    result.forEach(function(data,index){
                        replyMsg += data + ", ";
                    });
                }
            }
          });
          if (replyMsg == '') {
            replyMsg = '你所輸入的區可能沒有空氣監測,你想問的地方在什麼城市呢 ? ヽ( ° ▽°)ノ ';
          }
        }
            return '';
        }
  
        event.reply(replyMsg).then(function(data) {
          console.log(replyMsg);
        }).catch(function(error) {
          console.log('error');
        });
    
}

function _hasCountry(msg){

    County.forEach(function(element){
        if(msg.indexOf(element)){
            return element;
        }
        else return '';
    });


}


function _getJSON() {
    clearTimeout(timer);
    getJSON('http://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&sort=County', function(error, response) {
        //console.log("json 權應啦  = "+JSON.stringify(response, null, 7));


        var data = JSON.stringify(response.
            result.records, null, 7);
       // console.log(response.result.records);
        //console.log("回應內容 "+data);

        response.result.records.forEach(function(e, i) {
         regionData[i] = [];
         regionData[i].SiteName = e.SiteName;
         regionData[i].County = e.County;
         regionData[i].AQI = e.AQI;
         regionData[i].pm = e['PM2.5'] * 1;
         regionData[i].PM10 = e.PM10 * 1;
         //test22[i] = [];

       });
       const distinctCountry = [...new Set(regionData.map(x=>x.County))]
       console.log(distinctCountry);
    });
    timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
  }
  