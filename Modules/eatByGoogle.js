const config = require('../config')
const getJSON = require('get-json');
const getQuickReply = require('../MsgTemplate/qucikReplyTemplate');
const flexTemplate = require('../MsgTemplate/bubbleTemplate')

let askStatus = 0
let searchKeyword = ''


async function getFood(event, userInfo) {
    var replyMsg = '';
    if (event.message.type == 'text') {
        const msg = event.message.text;
        const userID = event.source.userId;
        if (msg.match(/(吃什麼)/)) {
            replyMsg = getQuickReply.quickReply;

        } else if (msg.match(/(找地方)/)) {
            replyMsg = getQuickReply.quickFindPlace;
            askStatus = 1;
        } else if (askStatus === 1) {
            searchKeyword = msg;
            replyMsg = getQuickReply.quickReply;
        }
        return replyMsg;
    } else if (event.message.type == 'location'&& askStatus === 0) {
        await getResultByGoogleAPI(userInfo, event.message.latitude, event.message.longitude).then((msg) => {
            replyMsg = msg;
        }).catch((errorMsg) => {
            console.log("Error : " + errorMsg);
        })
        return replyMsg;
    }
    else if (event.message.type == 'location' && askStatus === 1) {
        await getResultByGoogleAPI(userInfo, event.message.latitude, event.message.longitude, "", searchKeyword).then((msg) => {
            replyMsg = msg;
        }).catch((errorMsg) => {
            console.log("Error : " + errorMsg);
        })
        askStatus=0;
        searchKeyword="";

        return replyMsg
    }
}



const getResultByGoogleAPI = async function (userInfo, lat, lng, type = 'restaurant', keyword = '') {
    const url = config.googleApi.baseUrl + "location=" + lat + "," + lng + "&radius=" + 1000 + "&type=" + type + "&keyword=" + keyword + "&key=" + config.googleApi.key + "&language=zh-TW";
    let responseMsg = "";
    console.log(url);
    //get data from google
    const searchData = await getJSON(encodeURI(url));
    //combine a flexJson with data
    responseMsg = await formFlexJson(searchData);
    return responseMsg;
}

async function formFlexJson(searchData){
    //getHeader
    let flexJson = flexTemplate.flexTopTemplate();
    //form the contents
    for (let i = 1; i <= 5; i++) {
        let target = searchData.results[getRandomFood(searchData.results) - 1]
        let flexModel = new placeInfo(target)
        await fillPlaceUrl(flexModel, target.place_id);
        let flexComponent = flexTemplate.flexContentTemplate(flexModel);
    //push in
        flexJson.contents.contents.push(flexComponent)
    }
    return flexJson
}

function getRandomFood(results) {
    let randomNum = Math.floor(Math.random() * (results.length) + 1);
    return randomNum;
}


//fill cid url into target.place
async function fillPlaceUrl(target, placeID) {
    const url = config.googleApi.placeUrl + "placeid=" + placeID + "&key=" + config.googleApi.key + "&fields=url";
    await getJSON(url).then((response) => {
        target.place = response.result.url;
    });
}



class placeInfo {
    constructor(data) {
        this.name = data.name || "";
        this.vicinity = data.vicinity || "";
        this.rating = data.rating || "";
        this.photo = placeInfo.getPhotoUrl(data);
        this.place = '' //placeInfo.getPlaceUrl(data.place_id);
        //placeInfo.getPhotoUrl(data);
    }
    static getPhotoUrl(data) {
        const url = data.photos == undefined ? 'https://pic.pimg.tw/tsaichengling/1365423647-3598991700.jpg' :
            config.googleApi.photoUrl + "maxwidth=400&photoreference=" + data.photos[0].photo_reference + "&key=" + config.googleApi.key;
        return url
    }
}


module.exports = {
    getFood
};