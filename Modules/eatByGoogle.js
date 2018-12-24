const config = require('../config')
const getJSON = require('get-json');
const getTemplate = require('../MsgTemplate/eatByGoogleMsg');
const bubbleTemplate = require('../MsgTemplate/bubbleTemplate')


async function getFood (event, userInfo) {
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
    var url = config.googleApi.baseUrl + "location=" + lat + "," + lng + "&radius=" + 1000 + "&type=" + type + "&keyword=" + keyword + "&key=" + config.googleApi.key + "&language=zh-TW";
    var responseMsg = "";
    console.log(url);

    var searchData = await getJSON(url);


    responseMsg = bubbleTemplate.flexTopTemplate();
    // console.log("我回了 :  " + responseMsg);
    for (let i = 1; i <= 5; i++) {
        let target = searchData.results[getRandomFood(searchData.results) - 1]
        console.log(JSON.stringify(target))
        let model = new  placeInfo(target)

        await getPlaceUrl(model,target.place_id);
        let bubbleData = bubbleTemplate.flexContentTemplate(model);
        responseMsg.contents.contents.push(bubbleData)

    }


   
    return responseMsg;
}

function getRandomFood (results) {
    let randomNum = Math.floor(Math.random() * (results.length )+1);
    //console.log("random : " + randomNum)
    return randomNum;
}

class placeInfo {
        constructor(data) {
        this.name = data.name||"";
        this.vicinity = data.vicinity||"";
        this.rating = data.rating||"";
        this.photo = placeInfo.getPhotoUrl(data);
        this.place = ''//placeInfo.getPlaceUrl(data.place_id);
        //placeInfo.getPhotoUrl(data);
    }

    static getPhotoUrl (data) {
        const url = data.photos == undefined ? 'https://pic.pimg.tw/tsaichengling/1365423647-3598991700.jpg' :
        config.googleApi.photoUrl + "maxwidth=400&photoreference=" +  data.photos[0].photo_reference+ "&key=" + config.googleApi.key;
        //console.log("photo :" + url)
        return url
    }

    
}

 async function getPlaceUrl  (target , placeID) {

    const url = config.googleApi.placeUrl + "placeid=" + placeID + "&key=" + config.googleApi.key+"&fields=url";
    console.log("往只 : "+url);
    await getJSON(url).then((response) => {
        console.log(JSON.stringify(response))
        target.place = response.result.url;
        console.log("呼叫place : "+target.place );
    });
    

    ///return placeUrl
}


module.exports = {
    getFood
};