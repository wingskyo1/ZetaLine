var getJSON = require('get-json');

var foodList = ["肯德基","喬品","鮮肉湯包","阿蓮和粉","名都飲食","南豐滷肉飯","凌波"];


module.exports = {
    getFood: function (event) {
        if (event.message.type == 'text') {
            var msg = event.message.text;
            var replyMsg = '';
            if (msg.match(/(吃什麼)/)) {
                replyMsg = this.getRandomFood();
                status = 1;
            }
                return replyMsg;
        }
    },

    getRandomFood: function () {
        var randomNum = Math.floor(Math.random()*(foodList.length+1));
        
        return foodList[randomNum];
    },



};