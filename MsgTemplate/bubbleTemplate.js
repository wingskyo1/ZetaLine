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
////Parameter////
//Name 
//vicinity
//rating
//photo
//place
function flexContentTemplate(data) {

    return {
        "type": "bubble",
        "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": data.name,
                "size": "xl",
                "align": "center",
                "color": "#000079",
                "weight": "bold",
                "wrap": true,
            }]
        },

        "hero": {
            "type": "image",
            "url": data.photo,
            "size": "full",
            "aspectRatio": "1.5:1",
            "margin": "none"
        },
        "body": {
            "type": "box",
            "layout": "horizontal",
            "contents": [{
                "type": "text",
                "text": data.vicinity + "\n評分 :　" + data.rating,
                "wrap": true,
                //"size": "md",
                //"align": "center",
                "color": "#006030"
            }]
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [{
                    "type": "button",
                    "style": "primary",
                    //"color": "#0000ff",
                    "margin": "md",
                    "action": {
                        "type": "uri",
                        "label": "前往餐廳",
                        "uri": data.place
                    }
                },

            ]
        }
    };
}

module.exports = {
    flexContentTemplate,
    flexTopTemplate
}
