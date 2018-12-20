var getJSON = require('get-json');

var foodList = ["肯德基", "喬品", "鮮肉湯包", "阿蓮和粉", "名都飲食", "南豐滷肉飯", "凌波"];
var lasttime=0;

module.exports = {
    getFood: function (event) {
        if (event.message.type == 'text') {
            var msg = event.message.text;
            var replyMsg = '';
            if (msg.match(/(吃什麼)/)) {
                var date = new Date();
                if (date.getTime() - lasttime < 5 * 60 * 1000) {
                    replyMsg = "你不能一直問哦~~~!";
                } else {
                    replyMsg = this.getRandomFood();
                    lasttime = date.getTime();
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