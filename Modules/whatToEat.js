
let foodList = ["肯德基", "喬品", "鮮肉湯包", "阿蓮和粉", "名都飲食", "南豐滷肉飯", "凌波"];
let userlist = {};
module.exports = {
    getFood: function (event) {
        if (event.message.type == 'text') {
            const msg = event.message.text;
            const userID = event.source.userId;
            let replyMsg = '';
            if (msg.match(/(吃什麼)/)) {
                const date = new Date();
                let difference = (date.getTime() - userlist[userID]) / 1000;
                let needToWait = 300 - difference;

                if (needToWait > 0) {
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
        let randomNum = Math.floor(Math.random() * (foodList.length + 1));
        return foodList[randomNum];
    },



};