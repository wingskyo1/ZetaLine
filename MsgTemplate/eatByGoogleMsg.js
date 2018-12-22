

function parseObsStMsg(e) {
    return `推薦餐廳名稱：${e.name} 
地址：${e.vicinity} 
評分：${e.rating} 
---
資料來源：Google Api`; 
}


var quickReply = {
    type: "text", // ①
    text: "Select your favorite food category or send me your location!",
    quickReply: { // ②
        items: [{
                type: "action", // ③
                imageUrl: "https://example.com/sushi.png",
                action: {
                    type: "message",
                    label: "Sushi",
                    text: "Sushi"
                }
            },
            {
                type: "action",
                imageUrl: "https://example.com/tempura.png",
                action: {
                    type: "message",
                    label: "Tempura",
                    text: "Tempura"
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