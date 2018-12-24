

function parseObsStMsg(userInfo,e) {
    return `${userInfo}～我來推薦高級餐廳！
---
餐廳名稱：${e.name||""} 
地址：${e.vicinity||""} 
評分：${e.rating||""} 
---
資料來源：Google Api`; 
}


function newTemplate(userInfo,e) {
    return {
        type: "text", // ①
        text: "要告訴我你的位置才能幫你推薦哦~",
        quickReply: { // ②
            items: [{
                    type: "action", // ③
                    imageUrl: "https://example.com/sushi.png",
                    action: {
                        type: "message",
                        label: "貓貓蟲是豬",
                        text: "貓貓蟲是豬"
                    }
                },
                {
                    type: "action",
                    imageUrl: "https://example.com/tempura.png",
                    action: {
                        type: "message",
                        label: "空氣!",
                        text: "空氣!"
                    }
                },
                {
                    type: "action", // ④
                    action: {
                        type: "location",
                        label: "傳送地址"
                    }
                }
            ]
        }
    }
}



const quickReply = {
    type: "text", // ①
    text: "要告訴我你的位置才能幫你推薦哦~",
    quickReply: { // ②
        items: [{
                type: "action", // ③
                imageUrl: "https://example.com/sushi.png",
                action: {
                    type: "message",
                    label: "貓貓蟲是豬",
                    text: "貓貓蟲是豬"
                }
            },
            {
                type: "action",
                imageUrl: "https://example.com/tempura.png",
                action: {
                    type: "message",
                    label: "空氣!",
                    text: "空氣!"
                }
            },
            {
                type: "action", // ④
                action: {
                    type: "location",
                    label: "傳送地址"
                }
            }
        ]
    }
};


const test = {
    type: "carousel",
    contents: [{
            type: "bubble",
            body: {
                type: "box",
                layout: "horizontal",
                contents: [{
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    wrap: true
                }]
            },
            footer: {
                type: "box",
                layout: "horizontal",
                contents: [{
                    type: "button",
                    style: "primary",
                    action: {
                        type: "uri",
                        label: "Go",
                        uri: "https://example.com"
                    }
                }]
            }
        },
        {
            type: "bubble",
            body: {
                type: "box",
                layout: "horizontal",
                contents: [{
                    type: "text",
                    text: "Hello, World!",
                    wrap: true
                }]
            },
            footer: {
                type: "box",
                layout: "horizontal",
                contents: [{
                    type: "button",
                    style: "primary",
                    action: {
                        type: "uri",
                        label: "Go",
                        uri: "https://example.com"
                    }
                }]
            }
        }
    ]
}



module.exports = parseObsStMsg;
module.exports.quickReply = quickReply;
module.exports.test = test;