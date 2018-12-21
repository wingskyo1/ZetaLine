var getJSON = require('get-json');

var foodList = ["肯德基", "喬品", "鮮肉湯包", "阿蓮和粉", "名都飲食", "南豐滷肉飯", "凌波"];
var lasttime=0;
var userlist={};
module.exports = {
    getFood: function (event) {
        if (event.message.type == 'text') {
            var msg = event.message.text;
            var userID = event.source.userId;
            var replyMsg = '';
            if (msg.match(/(吃什麼)/)) {
                var date = new Date();
                var difference = (date.getTime()-userlist[userID])/1000;
                var needToWait = 300- difference;

                if (needToWait > 0) {
                    console.log("test : " + date.getTime())
                    console.log("lasttime : "+ lasttime)
                    replyMsg = "你不能賴皮哦~~~! 請再等 " + Math.round(needToWait) + " 秒後發問";
                } else {
                    replyMsg = this.getRandomFood();
                    userlist[userID] = date.getTime();
                }
            }
            return replyMsg;
        }
    },

    getRandomFood: function () {
        var randomNum = Math.floor(Math.random() * (foodList.length + 1));

        return foodList[randomNum];
    },



};