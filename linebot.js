const linebot = require('linebot');
const aqi = require('./Modules/aqi');
const whatToEat = require('./Modules/whatToEat');
const eatByGoogle = require('./Modules/eatByGoogle')
const config = require('./config');


module.exports = {
    bot: linebot({
        channelId: config.bot.channelId,
        channelSecret: config.bot.channelSecret,
        channelAccessToken: config.bot.channelAccessToken
    }),

    _botStart: function () {
        const outThis = this;

        this.bot.on('message', async function (event) {
            console.log(event.source.userId + " 傳送了  " + event.message.text);
            let sendMsg;
            if (event.message.text === "功能!") {
                sendMsg = "目前只有查詢空氣的功能，請輸入\"空氣!\"來查詢！";
            }

            let userInfo;
            await event.source.profile(event.source.userId).then(function (profile) {
                userInfo = profile.displayName;
            });

            sendMsg = aqi.aqiReport(event) || whatToEat.getFood(event) || await eatByGoogle.getFood(event,userInfo);
            //outThis.ResponseMsg2(event);
            //如果有訊息則送出
            if (sendMsg !== undefined) {
                outThis.ResponseMsg(event, sendMsg);
            }
        });
    },

    ResponseMsg: function (event, msg) {
        event.reply(msg).then(function (data) {
            console.log("回覆內容 : " + JSON.stringify(msg));
        }).catch(function (error) {
            console.log('error = ' + error);
        });
    },
    ResponseMsg2: function (event) {
        event.reply({
                "type": "flex",
                "altText": "This is a Flex Message",
                "contents": {
                    "type": "carousel",
                    "contents": [{
                            "type": "bubble",
                            "header": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "header"
                                }]
                            },
                            "body": {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                    "type": "text",
                                    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "wrap": true
                                }]
                            },
                            "hero": {
                                "type": "image",
                                "url": "https://example.com/flex/images/image.jpg",
                                "size": "full",
                                "aspectRatio": "2:1"
                            },
                            "footer": {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                    "type": "button",
                                    "style": "primary",
                                    "action": {
                                        "type": "uri",
                                        "label": "Go",
                                        "uri": "https://example.com"
                                    }
                                }]
                            }
                        },
                        {
                            "type": "bubble",
                            "body": {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                    "type": "text",
                                    "text": "Hello, World!",
                                    "wrap": true
                                }]
                            },
                            "hero": {
                                "type": "image",
                                "url": "https://i.imgur.com/pXlNbn6.jpg",
                                "size": "full",
                                "aspectRatio": "2:1"
                            },
                            "footer": {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                    "type": "button",
                                    "style": "primary",
                                    "action": {
                                        "type": "uri",
                                        "label": "Go",
                                        "uri": "https://example.com"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        );
    }
}