 function getBubbleObj(userInfo, response, indexArray) {
    console.log(JSON.stringify(response));
    return {
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
                            "text": response.results[indexArray[0] - 1].name
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
}


function flexTopTemplate() {
   
    return {
        type: "flex",
        altText: "This is a Flex Message",
        contents: {
            type: "carousel",
            contents: []
        }
    };
}


function flexContentTemplate(userInfo, response, indexArray) {
   
    return {
        "type": "bubble",
        "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": response.results[indexArray[0] - 1].name
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
    };
}





const test = {
    type: "bubble", // ①
    body: { // ②
      type: "box", // ③
      layout: "horizontal",　// ④
      contents: [ // ⑤
        {
          type: "text", // ⑥
          text: "Hello,"
        },
        {
          type: "text", // ⑥
          text: "World!"
        }
      ]
    }
  };

  const getPhotoByGoogleAPI = async function (userInfo, lat, lng, type = 'restaurant', keyword = '') {
    var url = config.googleApi.baseUrl + "location=" + lat + "," + lng + "&radius=" + 500 + "&type=" + type + "&keyword=" + keyword + "&key=" + config.googleApi.key + "&language=zh-TW";
    var responseMsg = "";
    console.log(url);
    let indexArray = [];
    await getJSON(url).then((response) => {
        var index = getRandomFood(response.results);
         indexArray.push(getRandomFood(response.results));
         indexArray.push(getRandomFood(response.results));
        //responseMsg = getTemplate(userInfo, response.results[index - 1]);
        responseMsg = getBubble(userInfo, response, indexArray);
        // console.log("我回了 :  " + responseMsg);

    });
    return responseMsg;
}

module.exports = getBubbleObj;
module.exports.flexTopTemplate = flexTopTemplate;