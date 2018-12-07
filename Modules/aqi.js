var getJSON = require('get-json');

var timer;
var regionData = [];
var distinctCountry = [] ;

module.exports = {

    

    npmfilter:function (event) {
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
                    replyMsg = e.County + "\n觀測台 : " + e.SiteName + '\n PM2.5 : ' + e.pm + '\n 空氣AQI : ' + e.AQI +" \n";
                    replyMsg += this._getAQILevel(e.AQI);
                }
            });



            if (replyMsg === '') {
                var targetCountry = this.findCountry(distinctCountry, msg)
                if (targetCountry !== undefined) {
                    console.log("沒找到站台但是有找到城市", targetCountry);
                    replyMsg += targetCountry + " 設有檢測站的區域有 \n "
                    const result = regionData.filter(data => data.County === targetCountry);
                    if (result.length !== 0) {
                        result.forEach(function (data, index) {
                            replyMsg += data.SiteName + ", ";
                        });
                    }
                    replyMsg += " \n ヽ( ° ▽°)ノ";

                }
            }

            if (replyMsg == '') {
                replyMsg = '輸入的區域可能沒有空氣監測 ^_^||| \n 在什麼城市呢 ? (^ρ^)/  \n\n';
                distinctCountry.forEach(function (data, index) {
                    replyMsg += data + ", "

                })
            }

        }
        if (replyMsg !== '') {
           return replyMsg;
            // makeReplyMsg(event, replyMsg);
        }
    }
},




findCountry:function(distinctCountry, msg) {
    var targetCity = distinctCountry.find(function (data, index) {
        return msg.indexOf(data.substring(0, 2)) > -1;
    });
    console.log(targetCity);
    return targetCity;
},





_getAQIJSON:function  () {
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


        distinctCountry = [...new Set(regionData.map(x => x.County))];
        console.log("前面的 : " + distinctCountry);
    });
    timer = setInterval(this._getAQIJSON, 1800000); //每半小時抓取一次新資料
},

_getAQILevel:function  (aqi) {
    var result;
    if (aqi > 100) {
        result = "快戴上口罩，要變人體空氣清淨機了！ \n _(┐「﹃ﾟ｡)_"
    }
    else if (aqi > 50) {
        result = "還行還行，但又不太行呢！ \n (`・ω・´)";
    }
    else {
        result = "今日も空気が美しいです。\n  ξ( ✿＞◡❛)";
    }
}
};