

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




module.exports.quickReply = quickReply;
