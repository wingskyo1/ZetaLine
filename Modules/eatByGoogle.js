const config = require('../config')
const getJSON = require('get-json');
const getTemplate = require('../MsgTemplate/eatByGoogleMsg');


function getFood(event) {
    var replyMsg = '';
    if (event.message.type == 'text') {
        const msg = event.message.text;
        const userID = event.source.userId;

        if (msg.match(/(吃什麼2)/)) {
            replyMsg = getTemplate.quickReply;
        }
    } else if (event.message.type == 'location') {
        console.log("地址有近來過");
        replyMsg = getResultByGoogleAPI(event.message.latitude, event.message.longitude )
        
        console.log(replyMsg);
    }
    setTimeout(function() {
        console.log("執行了");
        console.log("我送出了 " + replyMsg);
    return replyMsg;
      }, 5000);
    
}



function getResultByGoogleAPI(lat, lng, type = 'restaurant', keyword = '' ) {
    var url = config.googleApi.baseUrl + "location=" + lat + "," + lng + "&radius=" + 500 + "&type=" + type + "&keyword=" + keyword + "&key=" + config.googleApi.key + "&language=zh-TW";
    var responseMsg = "";

    getJSON(url, function (error, response) {
        const index = getRandomFood(response.results);
        responseMsg = getTemplate(response.results[index - 1]);
        console.log("我回了 :  " + responseMsg);
        
    });
    return responseMsg;
}

function getRandomFood(results) {
    let randomNum = Math.floor(Math.random() * (results.length + 1));
    return randomNum;
}

module.exports = {
    getFood
};