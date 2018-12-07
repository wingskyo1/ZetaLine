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

_getJSON();
var distinctCountry = [...new Set(regionData.map(x=>x.County))];
_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

function _bot() {
    bot.on('message', function (event) {
        npmfilter(event);
    });

}

function npmfilter(event) {
    if (event.message.type == 'text') {
        var msg = event.message.text;
        var replyMsg = '';
        if (msg.match(/(pm2.5|空氣)/)) {
            console.log("符合關鍵字");
            //console.log(regionData);
            regionData.forEach(function (e, i) {
                //console.log("開始尋找站台")
                if (msg.indexOf(e.SiteName) != -1) {
                    console.log("有找到站台", e.SiteName);
                    replyMsg = e.County + e.SiteName + '\n PM2.5 數值為 ' + e.pm + '\n 空氣品質 AQI 為 ' + e.AQI;
                } else if (msg.indexOf(e.County) != -1) {
                    console.log("沒找到站台但是有找到城市", e.County);
                    replyMsg += e.County + " 設有檢測站的區域有 \n "
                    const result = regionData.filter(data => data.County === e.County);
                    if (result.length !== 0) {
                        result.forEach(function (data, index) {
                            replyMsg += data.SiteName + ", ";
                        });
                    }
                    replyMsg += " \n ヽ( ° ▽°)ノ";
                }
            });
            if (replyMsg == '') {
                replyMsg = '輸入的區域可能沒有空氣監測 ^_^|||, 是在什麼城市呢 ? (^ρ^)/ \n';
                distinctCountry.forEach(function(data,index){
                    replyMsg += data + ", " 

                })
            }
            makeReplyMsg(event , replyMsg);
        }
        return '';
    }
   
}

function makeReplyMsg(event, msg) {
    event.reply(msg).then(function (data) {
        console.log("我有印東西出來" + msg);
    }).catch(function (error) {
        console.log('error = '+error);
    });
}

function _getJSON() {
    clearTimeout(timer);
    getJSON('http://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&sort=County', function (error, response) {


        response.result.records.forEach(function (e, i) {
            regionData[i] = [];
            regionData[i].SiteName = e.SiteName;
            regionData[i].County = e.County;
            regionData[i].AQI = e.AQI;
            regionData[i].pm = e['PM2.5'] * 1;
            regionData[i].PM10 = e.PM10 * 1;

        });
        
        //console.log(distinctCountry);
    });
    timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}