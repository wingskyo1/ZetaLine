var getJSON = require('get-json');

var timer;
var dataFromApi = [];
var countryList = [];
var targetCountry ='';
var status = 0;

module.exports = {
    aqiReport: function (event) {
        if (event.message.type == 'text') {
            var msg = event.message.text;
            var replyMsg = '';
            if (msg.match(/(pm2.5|空氣)/)) {
                replyMsg = this.showCountry();
                status = 1;
            }

            else if (status == 1 && msg < 22) {
                replyMsg = this.showSiteList(msg)
                status = 2;
            }
            else if (status == 2 && msg < 20) {
                replyMsg = this.showResult(msg);
                status = 0;
            }

            if (replyMsg !== '') {
                return replyMsg;
            }
        }
    },
    showCountry: function () {
        var replyMsg = '想要查詢什麼城市的空氣品質呢 ? (^ρ^)/  \n\n';
        countryList.forEach(function (data, index) {
            replyMsg += index + ") " + data + ", "
        })
        return replyMsg;
    },

    showSiteList: function (countryIndex) {
        var replyMsg = '';
        targetCountry = countryList[countryIndex];
        replyMsg += targetCountry + " 設有檢測站的區域有 \n "
        const result = dataFromApi.filter(data => data.County === targetCountry);
        if (result.length !== 0) {
            result.forEach(function (data, index) {
                replyMsg += index + ") " + data.SiteName + " ";
            });
        }
        replyMsg += " \n ヽ( ° ▽°)ノ";
        return replyMsg;
    },

    showResult: function (siteIndex) {
        var targetSiteList = dataFromApi.filter(data => data.County === targetCountry)
        var target = targetSiteList[siteIndex];
        var replyMsg = "城市 : "+target.County + "\n 觀測站 : " + target.SiteName + '\n PM2.5 : ' + target.pm + '\n 空氣AQI : ' + target.AQI +  '\n 風速 : ' + target.WindSpeed + '\n 監測時間 : ' + target.PublishTime +" \n\n";
        replyMsg += this.getAdvise(target.AQI);
        return replyMsg;
    },

    getAdvise: function (aqi) {
        var result='';
        if (aqi > 100) {
            result = "快戴上口罩，要變人體空氣清淨機了！ \n _(┐「﹃ﾟ｡)_"
        }
        else if (aqi > 50) {
            result = "還行還行，但又不太行呢！ \n (`・ω・´)";
        }
        else {
            result = "今日も空気が美しいです。\n  ξ( ✿＞◡❛)";
        }
        return result;
    },

    _getAQIJSON: function () {
        clearTimeout(timer);
        getJSON('http://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&sort=County', function (error, response) {
            response.result.records.forEach(function (e, i) {
                dataFromApi[i] = [];
                dataFromApi[i].SiteName = e.SiteName;
                dataFromApi[i].County = e.County;
                dataFromApi[i].AQI = e.AQI;
                dataFromApi[i].pm = e['PM2.5'] * 1;
                dataFromApi[i].PM10 = e.PM10 * 1;
            });
            countryList = [...new Set(dataFromApi.map(x => x.County))];
            console.log("前面的 : " + countryList);
        });
        timer = setInterval(this._getAQIJSON, 1800000); //每半小時抓取一次新資料
    },


};