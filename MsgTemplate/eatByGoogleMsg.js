

function parseObsStMsg(userInfo,e) {
    return `${userInfo}～我來推薦高級餐廳！
---
餐廳名稱：${e.name||""} 
地址：${e.vicinity||""} 
評分：${e.rating||""} 
---
資料來源：Google Api`; 
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
                    label: "給我你的地址"
                }
            }
        ]
    }
};

module.exports = parseObsStMsg;
module.exports.quickReply = quickReply;