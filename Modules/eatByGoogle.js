const config = require('../config')
const getJSON = require('get-json');
const getTemplate = require('../MsgTemplate/eatByGoogleMsg');
const bubbleTemplate = require('../MsgTemplate/bubbleTemplate')


async function getFood(event, userInfo) {
    var replyMsg = '';
    if (event.message.type == 'text') {
        const msg = event.message.text;
        const userID = event.source.userId;

        if (msg.match(/(吃什麼)/)) {

            replyMsg = getTemplate.quickReply;
            console.log(replyMsg)
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
    console.log(url);
    let indexArray = [];
    await getJSON(url).then((response) => {
        var index = getRandomFood(response.results);
        //responseMsg = getTemplate(userInfo, response.results[index - 1]);
        responseMsg = bubbleTemplate.flexTopTemplate();
        
        // console.log("我回了 :  " + responseMsg);
        for (let i = 1; i <= 5; i++) {
            let target = new placeInfo(response.results[index - 1])



        }

    });
    return responseMsg;
}

function getRandomFood(results) {
    let randomNum = Math.floor(Math.random() * (results.length + 1));
    return randomNum;
}

class placeInfo {
    constructor(data) {
        this.name = data.name;
        this.vicinity = data.vicinity;
        this.rating = data.rating;
        this.photo = placeInfo.getPhotoUrl(data);
        this.go = placeInfo.getPlaceUrl(data.place_id);
        //placeInfo.getPhotoUrl(data);
    }

    static  getPhotoUrl(data) {
        const url = config.googleApi.photoUrl + "photoreference=" + data.photos[0].photo_reference + "&key=" + config.googleApi.key;
        console.log("photo :" + url)
        return url
    }

    static  getPlaceUrl(placeID) {
        const url = config.googleApi.placeUrl + "placeid=" + placeID + "&key=" + config.googleApi.key;
        console.log("place : " + url)
        return url
    }
}

module.exports = {
    getFood
};