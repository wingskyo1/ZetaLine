

const quickReply = {
    type: "text", // ①
    text: "請把你的位置傳送給我 @Q@~",
    quickReply: { // ②
        items: [
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


const quickFindPlace = {
    type: "text", // ①
    text: "想要搜尋什麼呢,也可以自己輸入關鍵字~",
    quickReply: { // ②
        items: [{
                type: "action", // ③
                imageUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
                action: {
                    type: "message",
                    label: "便利商店",
                    text: "便利商店"
                }
            },
            {
                type: "action",
                imageUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
                action: {
                    type: "message",
                    label: "五金",
                    text: "五金"
                }
            },
            {
                type: "action",
                imageUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                action: {
                    type: "message",
                    label: "火鍋",
                    text: "火鍋"
                }
            },
        ]
    }
};




module.exports ={
    quickReply,
    quickFindPlace
}
