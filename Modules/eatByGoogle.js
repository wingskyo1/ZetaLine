const config = require('../config')
const getJSON = require('get-json');
const getTemplate = require('../MsgTemplate/eatByGoogleMsg');


async function getFood(event, userInfo) {
    var replyMsg = '';
    if (event.message.type == 'text') {
        const msg = event.message.text;
        const userID = event.source.userId;

        if (msg.match(/(吃什麼)/)) {
            replyMsg = getTemplate.quickReply;
        }
        return replyMsg;
    } else if (event.message.type == 'location') {
        await getResultByGoogleAPI(userInfo, event.message.latitude, event.message.longitude).then((msg) => {
            replyMsg = msg;
        }).catch((errorMsg) => {
            console.log("Error : " + errorMsg);
        })
        return replyMsg;
    }

}



const getResultByGoogleAPI = async function (userInfo, lat, lng, type = 'restaurant', keyword = '') {
    var url = config.googleApi.baseUrl + "location=" + lat + "," + lng + "&radius=" + 500 + "&type=" + type + "&keyword=" + keyword + "&key=" + config.googleApi.key + "&language=zh-TW";
    var responseMsg = "";

    await getJSON(url).then((response) => {
        const index = getRandomFood(response.results);
        responseMsg = getTemplate(userInfo, response.results[index - 1]);
        // console.log("我回了 :  " + responseMsg);

    });
    return responseMsg;
}

function getRandomFood(results) {
    console.log("查到幾間餐廳 :" + results.length)
    let randomNum = Math.floor(Math.random() * (results.length + 1));
    return randomNum;
}

module.exports = {
    getFood
};